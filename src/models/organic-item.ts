import { RecommendationItem } from '../types/recommendation';
import { RecommendationItemBase } from './recommendation-item';

/**
 * Organic recommendation item
 * Opens links in the same tab
 */
export class OrganicItem extends RecommendationItemBase {
  constructor(data: RecommendationItem) {
    super(data);
  }

  protected getLinkTarget(): '_self' | '_blank' {
    return '_self';
  }

  render(): HTMLElement {
    const article = document.createElement('article');
    article.className = 'taboola-recommendation-item taboola-recommendation-item--organic';
    article.setAttribute('data-origin', 'organic');
    article.setAttribute('data-id', this.data.id);

    // Thumbnail
    const thumbnailUrl = this.getThumbnailUrl();
    if (thumbnailUrl) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'taboola-recommendation-item__thumbnail';
      
      const img = document.createElement('img');
      img.src = thumbnailUrl;
      img.alt = this.getThumbnailAlt();
      img.loading = 'lazy';
      imgWrapper.appendChild(img);
      article.appendChild(imgWrapper);
    }

    // Content wrapper
    const content = document.createElement('div');
    content.className = 'taboola-recommendation-item__content';

    // Title
    const title = document.createElement('h3');
    title.className = 'taboola-recommendation-item__title';
    title.textContent = this.data.name || '';
    content.appendChild(title);

    // Description
    if (this.data.description) {
      const description = document.createElement('p');
      description.className = 'taboola-recommendation-item__description';
      description.textContent = this.data.description;
      content.appendChild(description);
    }

    article.appendChild(content);

    // Click handler
    article.addEventListener('click', (e) => this.handleClick(e));
    article.setAttribute('role', 'link');
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-label', `${this.data.name || 'Recommendation'}. Click to open.`);

    // Keyboard support
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleClick(e as unknown as MouseEvent);
      }
    });

    return article;
  }
}
