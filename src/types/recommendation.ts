/**
 * Thumbnail image object from Taboola API
 */
export interface Thumbnail {
  url: string;
  width?: string;
  height?: string;
}

/**
 * Origin type for recommendations
 */
export type Origin = 'sponsored' | 'organic';

/**
 * Recommendation item from Taboola API
 */
export interface RecommendationItem {
  type: string;
  thumbnail: Thumbnail[];
  description: string;
  name: string;
  created: string;
  branding?: string;
  duration: string;
  views: string;
  categories: string[];
  id: string;
  origin: Origin;
  url: string;
}

/**
 * Taboola API response structure
 */
export interface TaboolaResponse {
  id: string;
  list: RecommendationItem[];
}

/**
 * Configuration for API requests
 */
export interface ApiConfig {
  publisherId: string;
  appType: string;
  apiKey: string;
  count?: number;
  sourceType?: string;
  sourceId?: string;
  sourceUrl?: string;
}
