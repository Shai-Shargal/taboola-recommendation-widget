import { SponsoredItem } from '../../src/models/sponsored-item';
import { RecommendationItem } from '../../src/types/recommendation';

describe('SponsoredItem', () => {
  const mockItemData: RecommendationItem = {
    type: 'video',
    thumbnail: [
      {
        url: 'https://example.com/video-thumb.jpg',
        width: '400',
        height: '300',
      },
    ],
    description: 'Test description for sponsored item',
    name: 'Test Sponsored Video',
    created: '2024-01-01',
    branding: 'Test Advertiser',
    duration: '0',
    views: '0',
    categories: ['entertainment'],
    id: 'sponsored-1',
    origin: 'sponsored',
    url: 'https://example.com/video',
  };

  let item: SponsoredItem;
  let mockWindowOpen: jest.SpyInstance;

  beforeEach(() => {
    item = new SponsoredItem(mockItemData);
    mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
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
      expect(element.className).toContain('taboola-recommendation-item--sponsored');
    });

    it('should include thumbnail image', () => {
      const element = item.render();
      const img = element.querySelector('img');

      expect(img).not.toBeNull();
      expect(img?.src).toBe('https://example.com/video-thumb.jpg');
      expect(img?.alt).toBe('Test Sponsored Video');
    });

    it('should include title', () => {
      const element = item.render();
      const title = element.querySelector('.taboola-recommendation-item__title');

      expect(title).not.toBeNull();
      expect(title?.textContent).toBe('Test Sponsored Video');
    });

    it('should include description', () => {
      const element = item.render();
      const description = element.querySelector('.taboola-recommendation-item__description');

      expect(description).not.toBeNull();
      expect(description?.textContent).toBe('Test description for sponsored item');
    });

    it('should include branding for sponsored items', () => {
      const element = item.render();
      const branding = element.querySelector('.taboola-recommendation-item__branding');

      expect(branding).not.toBeNull();
      expect(branding?.textContent).toBe('Test Advertiser');
      expect(branding?.getAttribute('aria-label')).toContain('Test Advertiser');
    });

    it('should have accessibility attributes', () => {
      const element = item.render();

      expect(element.getAttribute('role')).toBe('link');
      expect(element.getAttribute('tabindex')).toBe('0');
      expect(element.getAttribute('data-origin')).toBe('sponsored');
      expect(element.getAttribute('aria-label')).toContain('Sponsored content');
    });

    it('should handle missing branding gracefully', () => {
      const itemWithoutBranding = new SponsoredItem({
        ...mockItemData,
        branding: undefined,
      });

      const element = itemWithoutBranding.render();
      const branding = element.querySelector('.taboola-recommendation-item__branding');

      expect(branding).toBeNull();
    });
  });

  describe('click handling', () => {
    it('should open link in new tab when clicked', () => {
      const element = item.render();
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

      element.dispatchEvent(clickEvent);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://example.com/video',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('should prevent default behavior on click', () => {
      const element = item.render();
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

      element.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should support keyboard navigation', () => {
      const element = item.render();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(enterEvent, 'preventDefault');

      element.dispatchEvent(enterEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
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
      expect(item.getOrigin()).toBe('sponsored');
    });
  });
});
