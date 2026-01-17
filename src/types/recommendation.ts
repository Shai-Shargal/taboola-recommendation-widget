export interface Thumbnail {
  url: string;
  width?: string;
  height?: string;
}

export type Origin = 'sponsored' | 'organic';

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

export interface TaboolaResponse {
  id: string;
  list: RecommendationItem[];
}

export interface ApiConfig {
  publisherId: string;
  appType: string;
  apiKey: string;
  count?: number;
  sourceType?: string;
  sourceId?: string;
  sourceUrl?: string;
}
