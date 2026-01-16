import { TaboolaWidget, WidgetConfig } from './widget/widget';

export { TaboolaWidget } from './widget/widget';
export { TaboolaApiClient } from './api/client';
export { TaboolaApiError } from './api/errors';
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

declare global {
  interface Window {
    TaboolaWidget: {
      init: (config: WidgetConfig) => Promise<void>;
      create: (config: WidgetConfig) => TaboolaWidget;
    };
  }
}

async function initWidget(config: WidgetConfig): Promise<void> {
  const widget = new TaboolaWidget(config);
  await widget.init();
}

function createWidget(config: WidgetConfig): TaboolaWidget {
  return new TaboolaWidget(config);
}

if (typeof window !== 'undefined') {
  window.TaboolaWidget = {
    init: initWidget,
    create: createWidget,
  };
}

export default TaboolaWidget;
