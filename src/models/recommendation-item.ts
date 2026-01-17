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
   * Extracts the redirect URL from a notify-click URL
   * The Taboola API returns notify-click URLs with a 'redir' parameter
   * @param notifyClickUrl The notify-click URL from the API
   * @returns The actual destination URL, or the original URL if parsing fails
   */
  protected extractRedirectUrl(notifyClickUrl: string): string {
    try {
      const url = new URL(notifyClickUrl);
      const redirParam = url.searchParams.get('redir');
      if (redirParam) {
        return decodeURIComponent(redirParam);
      }
    } catch (error) {
      console.warn('Failed to parse notify-click URL:', error);
    }
    // Fallback to original URL if parsing fails
    return notifyClickUrl;
  }

  protected trackClick(notifyClickUrl: string): void {
    try {
      const img = new Image();
      img.style.display = 'none';
      img.src = notifyClickUrl;
      // Add to DOM temporarily to ensure the request fires
      document.body.appendChild(img);
      // Remove after a short delay
      setTimeout(() => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      }, 1000);
    } catch (error) {
      console.warn('Failed to track click:', error);
      // Continue with navigation even if tracking fails
    }
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

    // Extract the actual destination URL from the notify-click URL
    const redirectUrl = this.extractRedirectUrl(notifyClickUrl);
    
    // Track the click by calling the notify-click URL
    this.trackClick(notifyClickUrl);
    
    // Navigate to the actual destination
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
