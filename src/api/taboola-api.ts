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
   * Fetches recommendations from Taboola API
   * @param config API configuration
   * @returns Promise with Taboola response
   * @throws TaboolaApiError if request fails
   */
  async fetchRecommendations(config: ApiConfig): Promise<TaboolaResponse> {
    const url = this.buildUrl(config);

    try {
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

      return data;
    } catch (error) {
      if (error instanceof TaboolaApiError) {
        throw error;
      }

      // Handle network errors
      throw new TaboolaApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
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
