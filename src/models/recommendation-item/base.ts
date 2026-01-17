import { RecommendationItem } from '../../types/recommendation';
import { extractRedirectUrl } from './url-parser';
import { trackClick } from './click-tracker';
import { getThumbnailUrl, getThumbnailAlt } from './thumbnail-utils';

export abstract class RecommendationItemBase {
  protected data: RecommendationItem;

  constructor(data: RecommendationItem) {
    this.data = data;
  }

  protected getThumbnailUrl(): string {
    return getThumbnailUrl(this.data);
  }

  protected getThumbnailAlt(): string {
    return getThumbnailAlt(this.data);
  }

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

  protected abstract getLinkTarget(): '_self' | '_blank';

  abstract render(): HTMLElement;

  getData(): RecommendationItem {
    return this.data;
  }

  getOrigin(): string {
    return this.data.origin;
  }
}
