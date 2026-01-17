import { RecommendationItemBase } from '../models/recommendation-item';

export class WidgetRenderer {
  render(container: HTMLElement, items: RecommendationItemBase[]): void {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'taboola-widget';

    // Section header
    const header = document.createElement('h2');
    header.className = 'taboola-widget__header';
    header.textContent = 'Recommended for you';
    wrapper.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'taboola-widget__grid';

    items.forEach((item) => {
      const element = item.render();
      grid.appendChild(element);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
  }
}
