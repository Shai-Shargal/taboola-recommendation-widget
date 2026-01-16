import { RecommendationItem, Thumbnail } from '../types/recommendation';

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
    if (this.data.thumbnail && this.data.thumbnail.length > 0) {
      return this.data.thumbnail[0].url;
    }
    return '';
  }

  /**
   * Gets the thumbnail alt text
   */
  protected getThumbnailAlt(): string {
    return this.data.name || 'Recommendation thumbnail';
  }

  /**
   * Handles click event on the recommendation item
   */
  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    const url = this.data.url;
    
    if (url) {
      // Determine target based on item type
      const target = this.getLinkTarget();
      if (target === '_blank') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url;
      }
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
