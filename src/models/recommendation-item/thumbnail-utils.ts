import { RecommendationItem } from '../../types/recommendation';

/**
 * Thumbnail utilities for recommendation items
 */

/**
 * Gets the thumbnail URL from a recommendation item
 * Uses the first thumbnail from the array
 * @param item The recommendation item
 * @returns The thumbnail URL, or empty string if not available
 */
export function getThumbnailUrl(item: RecommendationItem): string {
  if (item.thumbnail && item.thumbnail.length > 0) {
    return item.thumbnail[0].url;
  }
  return '';
}

/**
 * Gets the thumbnail alt text for accessibility
 * @param item The recommendation item
 * @returns The alt text for the thumbnail
 */
export function getThumbnailAlt(item: RecommendationItem): string {
  return item.name || 'Recommendation thumbnail';
}
