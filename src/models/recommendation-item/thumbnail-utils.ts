import { RecommendationItem } from '../../types/recommendation';

export function getThumbnailUrl(item: RecommendationItem): string {
  if (item.thumbnail && item.thumbnail.length > 0) {
    return item.thumbnail[0].url;
  }
  return '';
}

export function getThumbnailAlt(item: RecommendationItem): string {
  return item.name || 'Recommendation thumbnail';
}
