import { TaboolaWidget, WidgetConfig } from './widget/widget';

// Export main classes and types
export { TaboolaWidget } from './widget/widget';
export { TaboolaApiClient, TaboolaApiError } from './api/taboola-api';
export { OrganicItem } from './models/organic-item';
export { SponsoredItem } from './models/sponsored-item';
export { RecommendationItemBase } from './models/recommendation-item';
export type { WidgetConfig } from './widget/widget';
export type { ApiConfig } from './types/recommendation';
export type {
  TaboolaResponse,
  RecommendationItem,
  Thumbnail,
  Origin,
} from './types/recommendation';

/**
 * Global initialization function for easy integration
 * Usage: TaboolaWidget.init({ containerId: 'my-widget' })
 */
declare global {
  interface Window {
    TaboolaWidget: {
      init: (config: WidgetConfig) => Promise<void>;
      create: (config: WidgetConfig) => TaboolaWidget;
    };
  }
}

/**
 * Initialize a widget instance
 * @param config Widget configuration
 */
async function initWidget(config: WidgetConfig): Promise<void> {
  const widget = new TaboolaWidget(config);
  await widget.init();
}

/**
 * Create a widget instance (for advanced usage)
 * @param config Widget configuration
 * @returns Widget instance
 */
function createWidget(config: WidgetConfig): TaboolaWidget {
  return new TaboolaWidget(config);
}

// Expose global API if running in browser
if (typeof window !== 'undefined') {
  window.TaboolaWidget = {
    init: initWidget,
    create: createWidget,
  };
}

export default TaboolaWidget;
