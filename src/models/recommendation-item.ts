/**
 * Re-export the base class for backward compatibility
 * The implementation has been split into separate utility modules
 */
export { RecommendationItemBase } from './recommendation-item/base';

/**
 * Re-export utilities for external use if needed
 */
export { extractRedirectUrl } from './recommendation-item/url-parser';
export { trackClick } from './recommendation-item/click-tracker';
export { getThumbnailUrl, getThumbnailAlt } from './recommendation-item/thumbnail-utils';
