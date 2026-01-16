import { TaboolaResponse } from '../types/recommendation';
import { TaboolaApiError } from './errors';

export async function fetchTaboolaData(url: string, debug: boolean): Promise<TaboolaResponse> {
  if (debug) {
    console.log(`Taboola API Request:`, url);
  }

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

  if (!data || !Array.isArray(data.list)) {
    throw new TaboolaApiError('Invalid API response structure', response.status, data);
  }

  return data;
}
