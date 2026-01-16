import { TaboolaWidget, WidgetConfig } from '../../src/widget/widget';
import { TaboolaApiClient } from '../../src/api/client';
import { TaboolaResponse } from '../../src/types/recommendation';

jest.mock('../../src/api/client');

describe('TaboolaWidget', () => {
  let container: HTMLElement;
  let mockApiClient: jest.Mocked<TaboolaApiClient>;
  let widgetConfig: WidgetConfig;

  const mockResponse: TaboolaResponse = {
    id: 'test-response-id',
    list: [
      {
        type: 'video',
        thumbnail: [{ url: 'https://example.com/image1.jpg' }],
        description: 'Description 1',
        name: 'Item 1',
        created: '2024-01-01',
        branding: 'Brand 1',
        duration: '0',
        views: '0',
        categories: ['cat1'],
        id: 'item-1',
        origin: 'sponsored',
        url: 'https://example.com/item1',
      },
      {
        type: 'article',
        thumbnail: [{ url: 'https://example.com/image2.jpg' }],
        description: 'Description 2',
        name: 'Item 2',
        created: '2024-01-01',
        duration: '0',
        views: '0',
        categories: ['cat2'],
        id: 'item-2',
        origin: 'organic',
        url: 'https://example.com/item2',
      },
    ],
  };

  beforeEach(() => {
    // Create a container element
    container = document.createElement('div');
    container.id = 'test-widget-container';
    document.body.appendChild(container);

    widgetConfig = {
      containerId: 'test-widget-container',
      count: 2,
    };

    // Mock the API client
    mockApiClient = {
      fetchRecommendations: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as jest.Mocked<TaboolaApiClient>;

    // Replace the API client in the widget
    jest.spyOn(TaboolaApiClient.prototype, 'fetchRecommendations').mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should throw error if container not found', async () => {
      const config: WidgetConfig = {
        containerId: 'non-existent-container',
      };

      const widget = new TaboolaWidget(config);

      await expect(widget.init()).rejects.toThrow('Container element with id "non-existent-container" not found');
    });

    it('should initialize successfully with valid container', async () => {
      const widget = new TaboolaWidget(widgetConfig);

      await widget.init();

      expect(container.querySelector('.taboola-widget')).not.toBeNull();
    });

    it('should use default configuration values', async () => {
      const widget = new TaboolaWidget({
        containerId: 'test-widget-container',
      });

      await widget.init();

      // Verify API was called with defaults
      expect(TaboolaApiClient.prototype.fetchRecommendations).toHaveBeenCalledWith(
        expect.objectContaining({
          publisherId: 'taboola-templates',
          appType: 'desktop',
          apiKey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
          count: 4,
        })
      );
    });
  });

  describe('rendering', () => {
    it('should render recommendations in the container', async () => {
      const widget = new TaboolaWidget(widgetConfig);

      await widget.init();

      const widgetElement = container.querySelector('.taboola-widget');
      expect(widgetElement).not.toBeNull();

      const items = container.querySelectorAll('.taboola-recommendation-item');
      expect(items.length).toBe(2);
    });

    it('should create correct item types based on origin', async () => {
      const widget = new TaboolaWidget(widgetConfig);

      await widget.init();

      const sponsoredItem = container.querySelector('.taboola-recommendation-item--sponsored');
      const organicItem = container.querySelector('.taboola-recommendation-item--organic');

      expect(sponsoredItem).not.toBeNull();
      expect(organicItem).not.toBeNull();
    });

    it('should show loading state initially', async () => {
      // Delay the API response
      jest.spyOn(TaboolaApiClient.prototype, 'fetchRecommendations').mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockResponse), 100))
      );

      const widget = new TaboolaWidget(widgetConfig);
      const initPromise = widget.init();

      // Check loading state
      expect(container.querySelector('.taboola-widget-loading')).not.toBeNull();

      await initPromise;
    });
  });

  describe('error handling', () => {
    it('should display error message on API failure', async () => {
      const error = new Error('API Error');
      jest.spyOn(TaboolaApiClient.prototype, 'fetchRecommendations').mockRejectedValue(error);

      const widget = new TaboolaWidget(widgetConfig);

      await expect(widget.init()).rejects.toThrow();

      const errorElement = container.querySelector('.taboola-widget-error');
      expect(errorElement).not.toBeNull();
      expect(errorElement?.textContent).toContain('Failed to load recommendations');
    });

    it('should handle empty response list', async () => {
      const emptyResponse: TaboolaResponse = {
        id: 'test-id',
        list: [],
      };

      jest.spyOn(TaboolaApiClient.prototype, 'fetchRecommendations').mockResolvedValue(emptyResponse);

      const widget = new TaboolaWidget(widgetConfig);

      await widget.init();

      const items = container.querySelectorAll('.taboola-recommendation-item');
      expect(items.length).toBe(0);
    });
  });

  describe('destroy', () => {
    it('should clean up widget on destroy', async () => {
      const widget = new TaboolaWidget(widgetConfig);

      await widget.init();
      expect(container.querySelector('.taboola-widget')).not.toBeNull();

      widget.destroy();

      expect(container.innerHTML).toBe('');
      expect(container.querySelector('.taboola-widget')).toBeNull();
    });
  });

  describe('configuration', () => {
    it('should use custom configuration values', async () => {
      const customConfig: WidgetConfig = {
        containerId: 'test-widget-container',
        publisherId: 'custom-publisher',
        appType: 'mobile',
        apiKey: 'custom-key',
        count: 6,
        sourceType: 'article',
        sourceId: 'custom-id',
        sourceUrl: 'https://custom.com',
      };

      const widget = new TaboolaWidget(customConfig);

      await widget.init();

      expect(TaboolaApiClient.prototype.fetchRecommendations).toHaveBeenCalledWith(
        expect.objectContaining({
          publisherId: 'custom-publisher',
          appType: 'mobile',
          apiKey: 'custom-key',
          count: 6,
          sourceType: 'article',
          sourceId: 'custom-id',
          sourceUrl: 'https://custom.com',
        })
      );
    });
  });
});
