import { ApiConfig } from '../types/recommendation';
import { WidgetConfig } from './widget';

const DEFAULT_CONFIG = {
  publisherId: 'taboola-templates',
  appType: 'desktop',
  apiKey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  count: 4,
  sourceType: 'video',
  sourceId: '214321562187',
  sourceUrl: 'http://www.site.com/videos/214321562187.html',
};

export function mergeConfig(config: WidgetConfig): WidgetConfig {
  return { ...DEFAULT_CONFIG, ...config };
}

export function buildApiConfig(config: WidgetConfig): ApiConfig {
  return {
    publisherId: config.publisherId!,
    appType: config.appType!,
    apiKey: config.apiKey!,
    count: config.count,
    sourceType: config.sourceType,
    sourceId: config.sourceId,
    sourceUrl: config.sourceUrl,
  };
}
