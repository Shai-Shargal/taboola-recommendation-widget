import { RecommendationItem } from '../../types/recommendation';
import { extractRedirectUrl } from './url-parser';
import { trackClick } from './click-tracker';
import { getThumbnailUrl, getThumbnailAlt } from './thumbnail-utils';

/**
 * Abstract base class for recommendation items
 * Implements Strategy pattern for extensibility
 */
export abstract class RecommendationItemBase {
  protected data: RecommendationItem;

  constructor(data: RecommendationItem) {
    this.data = data;
  }

  /**
   * Gets the thumbnail URL (uses first thumbnail from array)
   */
  protected getThumbnailUrl(): string {
    return getThumbnailUrl(this.data);
  }

  /**
   * Gets the thumbnail alt text
   */
  protected getThumbnailAlt(): string {
    return getThumbnailAlt(this.data);
  }

  /**
   * Handles click event on the recommendation item
   * Implements proper click tracking via notify-click URL
   */
  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    const notifyClickUrl = this.data.url;
    
    if (!notifyClickUrl) {
      return;
    }

    const redirectUrl = extractRedirectUrl(notifyClickUrl);
    trackClick(notifyClickUrl);
    const target = this.getLinkTarget();
    if (target === '_blank') {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = redirectUrl;
    }
  }

  /**
   * Gets the link target (to be overridden by subclasses)
   */
  protected abstract getLinkTarget(): '_self' | '_blank';

  /**
   * Renders the recommendation item as a DOM element
   * @returns HTMLElement representing the recommendation
   */
  abstract render(): HTMLElement;

  /**
   * Gets the item data
   */
  getData(): RecommendationItem {
    return this.data;
  }

  /**
   * Gets the origin type
   */
  getOrigin(): string {
    return this.data.origin;
  }
}
