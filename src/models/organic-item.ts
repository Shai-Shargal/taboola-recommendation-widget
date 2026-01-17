import { RecommendationItem } from '../types/recommendation';
import { RecommendationItemBase } from './recommendation-item';

/**
 * Organic recommendation item
 * Opens links in a new tab
 */
export class OrganicItem extends RecommendationItemBase {
  constructor(data: RecommendationItem) {
    super(data);
  }

  protected getLinkTarget(): '_self' | '_blank' {
    return '_blank';
  }

  render(): HTMLElement {
    const article = document.createElement('article');
    article.className = 'taboola-recommendation-item taboola-recommendation-item--organic';
    article.setAttribute('data-origin', 'organic');
    article.setAttribute('data-id', this.data.id);

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'taboola-recommendation-item__thumbnail';
    
    const thumbnailUrl = this.getThumbnailUrl();
    if (thumbnailUrl) {
      const img = document.createElement('img');
      img.src = thumbnailUrl;
      img.alt = this.getThumbnailAlt();
      img.loading = 'lazy';
      
      img.onerror = () => {
        img.style.display = 'none';
        if (!imgWrapper.querySelector('.taboola-recommendation-item__thumbnail-placeholder')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'taboola-recommendation-item__thumbnail-placeholder';
          placeholder.setAttribute('aria-hidden', 'true');
          imgWrapper.appendChild(placeholder);
        }
      };
      
      imgWrapper.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'taboola-recommendation-item__thumbnail-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      imgWrapper.appendChild(placeholder);
    }
    
    article.appendChild(imgWrapper);

    const content = document.createElement('div');
    content.className = 'taboola-recommendation-item__content';

    const title = document.createElement('h3');
    title.className = 'taboola-recommendation-item__title';
    title.textContent = this.data.name || '';
    content.appendChild(title);

    if (this.data.branding) {
      const source = document.createElement('div');
      source.className = 'taboola-recommendation-item__source';
      source.textContent = this.data.branding;
      content.appendChild(source);
    }

    if (this.data.description) {
      const description = document.createElement('p');
      description.className = 'taboola-recommendation-item__description';
      description.textContent = this.data.description;
      content.appendChild(description);
    }

    article.appendChild(content);

    article.addEventListener('click', (e) => this.handleClick(e));
    article.setAttribute('role', 'link');
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-label', `${this.data.name || 'Recommendation'}. Click to open in new tab.`);

    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleClick(e as unknown as MouseEvent);
      }
    });

    return article;
  }
}
