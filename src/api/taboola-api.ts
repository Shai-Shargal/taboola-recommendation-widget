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
   * @returns Promise with Taboola response
   * @throws TaboolaApiError if request fails after all retries
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

        // If list is empty, log and retry
        console.log(`API returned empty list on attempt ${attempt}, retrying...`);
        lastError = new TaboolaApiError('API returned empty list', response.status, data);

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

    // All retries exhausted with empty list
    if (lastError instanceof TaboolaApiError && lastError.message === 'API returned empty list') {
      console.warn('API returned empty list after all retries');
      // Return empty response instead of throwing
      return { id: '', list: [] };
    }

    // All retries exhausted with other error
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
