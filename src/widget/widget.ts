import { TaboolaApiClient, TaboolaApiError } from '../api/taboola-api';
import { ApiConfig, RecommendationItem } from '../types/recommendation';
import { RecommendationItemBase } from '../models/recommendation-item';
import { OrganicItem } from '../models/organic-item';
import { SponsoredItem } from '../models/sponsored-item';
import { WidgetRenderer } from './renderer';

/**
 * Configuration for TaboolaWidget
 */
export interface WidgetConfig extends Partial<ApiConfig> {
  containerId: string;
  publisherId?: string;
  appType?: string;
  apiKey?: string;
  count?: number;
  sourceType?: string;
  sourceId?: string;
  sourceUrl?: string;
}

/**
 * Main Taboola Widget class
 */
export class TaboolaWidget {
  private container: HTMLElement | null = null;
  private apiClient: TaboolaApiClient;
  private renderer: WidgetRenderer;
  private config: WidgetConfig;
  private isLoading = false;

  constructor(config: WidgetConfig) {
    this.config = {
      publisherId: 'taboola-templates',
      appType: 'desktop',
      apiKey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
      count: 4,
      sourceType: 'video',
      sourceId: '214321562187',
      sourceUrl: 'http://www.site.com/videos/214321562187.html',
      ...config,
    };

    this.apiClient = new TaboolaApiClient();
    this.renderer = new WidgetRenderer();
  }

  /**
   * Initializes the widget
   */
  async init(): Promise<void> {
    // Find container element
    this.container = document.getElementById(this.config.containerId);

    if (!this.container) {
      throw new Error(`Container element with id "${this.config.containerId}" not found`);
    }

    // Inject styles if not already injected
    this.renderer.injectStyles();

    // Show loading state
    this.showLoading();

    try {
      // Fetch recommendations
      const apiConfig: ApiConfig = {
        publisherId: this.config.publisherId!,
        appType: this.config.appType!,
        apiKey: this.config.apiKey!,
        count: this.config.count,
        sourceType: this.config.sourceType,
        sourceId: this.config.sourceId,
        sourceUrl: this.config.sourceUrl,
      };

      const response = await this.apiClient.fetchRecommendations(apiConfig);
      console.log('API Response received:', response);
      console.log('Number of items:', response.list.length);

      // Handle empty response
      if (!response.list || response.list.length === 0) {
        console.warn('API returned empty list after retries');
        this.showEmptyState();
        this.isLoading = false;
        return;
      }

      // Use API response directly
      const items = response.list.map((item) => this.createItem(item));
      console.log('Created items:', items.length);

      // Render items
      this.renderer.render(this.container, items);
      console.log('Items rendered to DOM');

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.showError(error);
      throw error;
    }
  }

  /**
   * Factory method to create appropriate item instance based on origin
   */
  private createItem(data: RecommendationItem): RecommendationItemBase {
    if (data.origin === 'organic') {
      return new OrganicItem(data);
    } else {
      return new SponsoredItem(data);
    }
  }


  /**
   * Shows loading state
   */
  private showLoading(): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="taboola-widget-loading">
        <div class="taboola-widget-loading__spinner"></div>
        <p>Loading recommendations...</p>
      </div>
    `;
  }

  /**
   * Shows error state
   */
  private showError(error: unknown): void {
    if (!this.container) return;

    const errorMessage =
      error instanceof TaboolaApiError
        ? error.message
        : 'Failed to load recommendations. Please try again later.';

    this.container.innerHTML = `
      <div class="taboola-widget-error">
        <p class="taboola-widget-error__message">${errorMessage}</p>
      </div>
    `;
  }

  /**
   * Shows empty state when API returns no recommendations
   */
  private showEmptyState(): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="taboola-widget-empty">
        <p class="taboola-widget-empty__message">
          No recommendations available at this time. Please check back later.
        </p>
      </div>
    `;
  }

  /**
   * Destroys the widget and cleans up
   */
  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.container = null;
    this.isLoading = false;
  }
}
