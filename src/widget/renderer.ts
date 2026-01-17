import { RecommendationItemBase } from '../models/recommendation-item/base';
import { SponsoredItem } from '../models/sponsored-item';
import { createDemoRecommendation } from '../demo/createDemoRecommendation';
import { applyDemoBadge } from '../demo/applyDemoBadge';
import { buildWidgetHeader } from '../dom/buildWidgetHeader';

export class WidgetRenderer {
  private demoModeEnabled: boolean = false;
  private currentItems: RecommendationItemBase[] = [];
  private currentContainer: HTMLElement | null = null;

  render(container: HTMLElement, items: RecommendationItemBase[]): void {
    this.currentItems = items;
    this.currentContainer = container;
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'taboola-widget';

    const header = buildWidgetHeader(this.demoModeEnabled, (enabled) => {
      this.demoModeEnabled = enabled;
      if (this.currentContainer) {
        this.render(this.currentContainer, this.currentItems);
      }
    });
    wrapper.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'taboola-widget__grid';

    if (this.demoModeEnabled) {
      const demoElement = this.createDemoItem();
      grid.appendChild(demoElement);
    }

    items.forEach((item) => {
      const element = item.render();
      grid.appendChild(element);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
  }

  private createDemoItem(): HTMLElement {
    const demoData = createDemoRecommendation();
    const demoItem = new SponsoredItem(demoData);
    const element = demoItem.render();
    applyDemoBadge(element);
    return element;
  }
}
