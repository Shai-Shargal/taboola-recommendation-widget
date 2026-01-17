import { ApiConfig } from '../types/recommendation';

// Use HTTPS for API requests to avoid mixed-content blocking on GitHub Pages (served over HTTPS)
const BASE_URL = 'https://api.taboola.com/1.0/json';

export function buildTaboolaUrl(config: ApiConfig): string {
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

  return `${BASE_URL}/${config.publisherId}/recommendations.get?${params.toString()}`;
}
