import { TaboolaResponse, ApiConfig } from '../types/recommendation';

/**
 * Error class for API-related errors
 */
export class TaboolaApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'TaboolaApiError';
  }
}

/**
 * Client for interacting with Taboola Recommendations API
 */
export class TaboolaApiClient {
  private readonly baseUrl = 'http://api.taboola.com/1.0/json';

  /**
   * Fetches recommendations from Taboola API with retry logic
   * @param config API configuration
   * @param maxRetries Maximum number of retry attempts (default: 3)
   * @returns Promise with Taboola response. Returns empty list if API has no recommendations available.
   * @throws TaboolaApiError if request fails after all retries (network errors, HTTP errors, invalid responses)
   * 
   * Note: Empty responses (200 OK with empty list) may be legitimate when:
   * - No recommendations are available for the given source/content
   * - Geographic restrictions apply
   * - API rate limiting or temporary unavailability
   * The method will retry empty responses up to maxRetries times before returning an empty result.
   */
  async fetchRecommendations(config: ApiConfig, maxRetries: number = 3): Promise<TaboolaResponse> {
    const url = this.buildUrl(config);
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Taboola API Request (attempt ${attempt}/${maxRetries}):`, url);
        const response = await fetch(url);

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new TaboolaApiError(
            `API request failed with status ${response.status}`,
            response.status,
            errorText
          );
        }

        const data: TaboolaResponse = await response.json();

        // Validate response structure
        if (!data || !Array.isArray(data.list)) {
          throw new TaboolaApiError(
            'Invalid API response structure',
            response.status,
            data
          );
        }

        // If we got results, return them
        if (data.list.length > 0) {
          console.log(`API request successful on attempt ${attempt}, received ${data.list.length} items`);
          return data;
        }

        // If list is empty, log the response details for debugging
        console.warn(`API returned empty list on attempt ${attempt}. Response ID: ${data.id || 'N/A'}, Status: ${response.status}`);
        console.warn('Full API response:', JSON.stringify(data, null, 2));
        
        // Empty list could be legitimate (no recommendations available) or temporary
        // Only retry if we haven't exhausted retries, but log that it might be legitimate
        if (attempt < maxRetries) {
          const delay = attempt * 500; // Exponential backoff: 500ms, 1000ms, 1500ms
          console.log(`Empty list received, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          lastError = new TaboolaApiError('API returned empty list', response.status, data);
          continue; // Retry the request
        } else {
          // All retries exhausted, return empty response
          console.warn('API returned empty list after all retries. This may be legitimate (no recommendations available) or an API issue.');
          return { id: data.id || '', list: [] };
        }

      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // If it's a network error or HTTP error, retry
        if (attempt < maxRetries) {
          const delay = attempt * 500; // Exponential backoff: 500ms, 1000ms, 1500ms
          console.log(`Request failed on attempt ${attempt}, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        // Last attempt failed, throw the error
        if (error instanceof TaboolaApiError) {
          throw error;
        }

        throw new TaboolaApiError(
          `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          undefined,
          error
        );
      }
    }

    // All retries exhausted with other error (should not reach here for empty lists)
    throw lastError || new TaboolaApiError('Request failed after all retries');
  }

  /**
   * Builds the API URL from configuration
   * @param config API configuration
   * @returns Complete API URL
   */
  private buildUrl(config: ApiConfig): string {
    const params = new URLSearchParams({
      'app.type': config.appType,
      'app.apikey': config.apiKey,
    });

    if (config.count !== undefined) {
      params.append('count', config.count.toString());
    }

    if (config.sourceType) {
      params.append('source.type', config.sourceType);
    }

    if (config.sourceId) {
      params.append('source.id', config.sourceId);
    }

    if (config.sourceUrl) {
      params.append('source.url', config.sourceUrl);
    }

    return `${this.baseUrl}/${config.publisherId}/recommendations.get?${params.toString()}`;
  }
}
