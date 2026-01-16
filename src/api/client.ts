import { TaboolaResponse, ApiConfig } from '../types/recommendation';
import { TaboolaApiError } from './errors';
import { buildTaboolaUrl } from './url';
import { fetchTaboolaData } from './fetch-handler';

export interface ClientOptions {
  debug?: boolean;
  maxRetries?: number;
}

export class TaboolaApiClient {
  private readonly options: Required<ClientOptions>;

  constructor(options: ClientOptions = {}) {
    this.options = {
      debug: options.debug ?? false,
      maxRetries: options.maxRetries ?? 3,
    };
  }

  async fetchRecommendations(config: ApiConfig): Promise<TaboolaResponse> {
    const url = buildTaboolaUrl(config);
    let lastEmptyResponse: TaboolaResponse | null = null;

    for (let attempt = 1; attempt <= this.options.maxRetries; attempt++) {
      try {
        const data = await fetchTaboolaData(url, this.options.debug);

        if (data.list.length > 0) {
          if (this.options.debug) {
            console.log(`API request successful on attempt ${attempt}, received ${data.list.length} items`);
          }
          return data;
        }

        lastEmptyResponse = { id: data.id || '', list: [] };

        if (attempt < this.options.maxRetries) {
          const delay = attempt * 500;
          if (this.options.debug) {
            console.log(`Empty list received, retrying in ${delay}ms (attempt ${attempt}/${this.options.maxRetries})...`);
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (this.options.debug) {
          console.warn('API returned empty list after all retries.');
        }

        return lastEmptyResponse;
      } catch (error) {
        if (attempt < this.options.maxRetries) {
          const delay = attempt * 500;
          if (this.options.debug) {
            console.log(`Request failed on attempt ${attempt}, retrying in ${delay}ms...`);
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

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

    return lastEmptyResponse || { id: '', list: [] };
  }
}
