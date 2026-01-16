import { TaboolaApiClient, TaboolaApiError } from '../../src/api/taboola-api';
import { ApiConfig, TaboolaResponse } from '../../src/types/recommendation';

// Mock fetch globally
global.fetch = jest.fn();

describe('TaboolaApiClient', () => {
  let client: TaboolaApiClient;
  const mockConfig: ApiConfig = {
    publisherId: 'taboola-templates',
    appType: 'desktop',
    apiKey: 'test-api-key',
    count: 4,
    sourceType: 'video',
    sourceId: 'test-id',
    sourceUrl: 'https://example.com',
  };

  beforeEach(() => {
    client = new TaboolaApiClient();
    (fetch as jest.Mock).mockClear();
  });

  describe('fetchRecommendations', () => {
    it('should successfully fetch recommendations', async () => {
      const mockResponse: TaboolaResponse = {
        id: 'test-id',
        list: [
          {
            type: 'video',
            thumbnail: [{ url: 'https://example.com/image.jpg' }],
            description: 'Test description',
            name: 'Test Name',
            created: '2024-01-01',
            branding: 'Test Brand',
            duration: '0',
            views: '0',
            categories: ['test'],
            id: 'item-1',
            origin: 'sponsored',
            url: 'https://example.com/item',
          },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.fetchRecommendations(mockConfig);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('taboola-templates/recommendations.get')
      );
    });

    it('should include all query parameters in URL', async () => {
      const mockResponse: TaboolaResponse = {
        id: 'test-id',
        list: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await client.fetchRecommendations(mockConfig);

      const fetchUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain('app.type=desktop');
      expect(fetchUrl).toContain('app.apikey=test-api-key');
      expect(fetchUrl).toContain('count=4');
      expect(fetchUrl).toContain('source.type=video');
      expect(fetchUrl).toContain('source.id=test-id');
      // URL is encoded, so check for encoded version
      expect(fetchUrl).toContain('source.url=https%3A%2F%2Fexample.com');
    });

    it('should throw TaboolaApiError on HTTP error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not Found',
      });

      try {
        await client.fetchRecommendations(mockConfig);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(TaboolaApiError);
        expect((error as TaboolaApiError).statusCode).toBe(404);
      }
    });

    it('should throw TaboolaApiError on invalid response structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'structure' }),
      });

      await expect(client.fetchRecommendations(mockConfig)).rejects.toThrow(
        TaboolaApiError
      );
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(client.fetchRecommendations(mockConfig)).rejects.toThrow(
        TaboolaApiError
      );

      try {
        await client.fetchRecommendations(mockConfig);
      } catch (error) {
        expect(error).toBeInstanceOf(TaboolaApiError);
        expect((error as TaboolaApiError).message).toContain('Network error');
      }
    });

    it('should handle optional parameters', async () => {
      const minimalConfig: ApiConfig = {
        publisherId: 'taboola-templates',
        appType: 'desktop',
        apiKey: 'test-api-key',
      };

      const mockResponse: TaboolaResponse = {
        id: 'test-id',
        list: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await client.fetchRecommendations(minimalConfig);

      const fetchUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).not.toContain('count=');
      expect(fetchUrl).not.toContain('source.type=');
    });
  });
});
