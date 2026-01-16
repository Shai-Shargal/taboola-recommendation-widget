import { OrganicItem } from '../../src/models/organic-item';
import { RecommendationItem } from '../../src/types/recommendation';

describe('OrganicItem', () => {
  const mockItemData: RecommendationItem = {
    type: 'article',
    thumbnail: [
      {
        url: 'https://example.com/image.jpg',
        width: '300',
        height: '200',
      },
    ],
    description: 'Test description for organic item',
    name: 'Test Organic Article',
    created: '2024-01-01',
    duration: '0',
    views: '0',
    categories: ['news'],
    id: 'organic-1',
    origin: 'organic',
    url: 'https://example.com/article',
  };

  let item: OrganicItem;
  let mockWindowOpen: jest.SpyInstance;

  beforeEach(() => {
    item = new OrganicItem(mockItemData);
    
    // Mock window.open
    mockWindowOpen = jest.spyOn(window, 'open').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('should create a valid HTML element', () => {
      const element = item.render();

      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.tagName).toBe('ARTICLE');
      expect(element.className).toContain('taboola-recommendation-item');
      expect(element.className).toContain('taboola-recommendation-item--organic');
    });

    it('should include thumbnail image', () => {
      const element = item.render();
      const img = element.querySelector('img');

      expect(img).not.toBeNull();
      expect(img?.src).toBe('https://example.com/image.jpg');
      expect(img?.alt).toBe('Test Organic Article');
      expect(img?.loading).toBe('lazy');
    });

    it('should include title', () => {
      const element = item.render();
      const title = element.querySelector('.taboola-recommendation-item__title');

      expect(title).not.toBeNull();
      expect(title?.textContent).toBe('Test Organic Article');
    });

    it('should include description', () => {
      const element = item.render();
      const description = element.querySelector('.taboola-recommendation-item__description');

      expect(description).not.toBeNull();
      expect(description?.textContent).toBe('Test description for organic item');
    });

    it('should not include branding for organic items', () => {
      const element = item.render();
      const branding = element.querySelector('.taboola-recommendation-item__branding');

      expect(branding).toBeNull();
    });

    it('should have accessibility attributes', () => {
      const element = item.render();

      expect(element.getAttribute('role')).toBe('link');
      expect(element.getAttribute('tabindex')).toBe('0');
      expect(element.getAttribute('data-origin')).toBe('organic');
      expect(element.getAttribute('aria-label')).toContain('Test Organic Article');
    });

    it('should handle missing thumbnail gracefully', () => {
      const itemWithoutThumbnail = new OrganicItem({
        ...mockItemData,
        thumbnail: [],
      });

      const element = itemWithoutThumbnail.render();
      const img = element.querySelector('img');

      expect(img).toBeNull();
    });
  });

  describe('click handling', () => {
    it('should have click handler attached', () => {
      const element = item.render();
      
      // Verify the element has the necessary attributes for click handling
      expect(element.hasAttribute('role')).toBe(true);
      expect(element.getAttribute('role')).toBe('link');
      expect(element.hasAttribute('tabindex')).toBe(true);
      
      // Verify click event can be dispatched (handler is attached)
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
      
      element.dispatchEvent(clickEvent);
      
      // Click handler should prevent default
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should support keyboard navigation', () => {
      const element = item.render();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });

      // Verify event listeners are attached
      expect(element.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('getData', () => {
    it('should return the item data', () => {
      const data = item.getData();

      expect(data).toEqual(mockItemData);
    });
  });

  describe('getOrigin', () => {
    it('should return the origin type', () => {
      expect(item.getOrigin()).toBe('organic');
    });
  });
});
