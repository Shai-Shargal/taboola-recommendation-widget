import { RecommendationItemBase } from '../models/recommendation-item';

/**
 * Handles rendering of recommendation items
 */
export class WidgetRenderer {
  private stylesInjected = false;

  /**
   * Renders recommendation items into the container
   */
  render(container: HTMLElement, items: RecommendationItemBase[]): void {
    // Clear container
    container.innerHTML = '';

    // Create widget wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'taboola-widget';

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'taboola-widget__grid';

    // Render each item
    items.forEach((item) => {
      const element = item.render();
      grid.appendChild(element);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
  }

  /**
   * Injects CSS styles into the document
   */
  injectStyles(): void {
    if (this.stylesInjected) {
      return;
    }

    const styleId = 'taboola-widget-styles';
    if (document.getElementById(styleId)) {
      this.stylesInjected = true;
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = this.getStyles();
    document.head.appendChild(style);
    this.stylesInjected = true;
  }

  /**
   * Returns the CSS styles for the widget
   */
  private getStyles(): string {
    return `
      /* Taboola Widget Styles */
      .taboola-widget {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .taboola-widget__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        width: 100%;
      }

      /* Loading State */
      .taboola-widget-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
      }

      .taboola-widget-loading__spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Error State */
      .taboola-widget-error {
        padding: 20px;
        text-align: center;
        color: #e74c3c;
      }

      .taboola-widget-error__message {
        margin: 0;
      }

      /* Empty State */
      .taboola-widget-empty {
        padding: 40px 20px;
        text-align: center;
        color: #7f8c8d;
      }

      .taboola-widget-empty__message {
        margin: 0;
        font-size: 14px;
      }

      /* Recommendation Item */
      .taboola-recommendation-item {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        contain: layout style paint;
        will-change: transform;
      }

      .taboola-recommendation-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .taboola-recommendation-item:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
      }

      .taboola-recommendation-item__thumbnail {
        width: 100%;
        padding-top: 56.25%; /* 16:9 aspect ratio */
        position: relative;
        overflow: hidden;
        background: #f5f5f5;
      }

      .taboola-recommendation-item__thumbnail img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .taboola-recommendation-item__content {
        padding: 12px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .taboola-recommendation-item__title {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.4;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .taboola-recommendation-item__description {
        margin: 0 0 8px 0;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }

      .taboola-recommendation-item__branding {
        margin-top: auto;
        font-size: 12px;
        color: #999;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Responsive Design - Tablet */
      @media (min-width: 768px) {
        .taboola-widget__grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      }

      /* Responsive Design - Desktop */
      @media (min-width: 1024px) {
        .taboola-widget__grid {
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .taboola-recommendation-item__title {
          font-size: 18px;
        }
      }
    `;
  }
}
