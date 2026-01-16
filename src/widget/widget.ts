import { TaboolaApiClient } from '../api/client';
import { TaboolaApiError } from '../api/errors';
import { ApiConfig, RecommendationItem } from '../types/recommendation';
import { RecommendationItemBase } from '../models/recommendation-item';
import { OrganicItem } from '../models/organic-item';
import { SponsoredItem } from '../models/sponsored-item';
import { WidgetRenderer } from './renderer';
import { renderLoading, renderError, renderEmpty } from './states';
import { loadStyles } from './css-loader';
import { mergeConfig, buildApiConfig } from './config';

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

export class TaboolaWidget {
  private container: HTMLElement | null = null;
  private apiClient: TaboolaApiClient;
  private renderer: WidgetRenderer;
  private config: WidgetConfig;

  constructor(config: WidgetConfig) {
    this.config = mergeConfig(config);
    this.apiClient = new TaboolaApiClient();
    this.renderer = new WidgetRenderer();
  }

  async init(): Promise<void> {
    this.container = document.getElementById(this.config.containerId);

    if (!this.container) {
      throw new Error(`Container element with id "${this.config.containerId}" not found`);
    }

    loadStyles();
    renderLoading(this.container);

    try {
      const response = await this.apiClient.fetchRecommendations(buildApiConfig(this.config));

      if (!response.list || response.list.length === 0) {
        renderEmpty(this.container);
        return;
      }

      const items = response.list.map((item) => this.createItem(item));
      this.renderer.render(this.container, items);
    } catch (error: unknown) {
      const message =
        error instanceof TaboolaApiError
          ? error.message
          : 'Failed to load recommendations. Please try again later.';
      renderError(this.container, message);
      throw error;
    }
  }

  private createItem(data: RecommendationItem): RecommendationItemBase {
    return data.origin === 'organic' ? new OrganicItem(data) : new SponsoredItem(data);
  }

  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.container = null;
  }
}
