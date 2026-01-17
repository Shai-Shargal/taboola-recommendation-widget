/**
 * URL parsing utilities for recommendation items
 * Extracts redirect URLs from Taboola notify-click URLs
 */

/**
 * Extracts the redirect URL from a notify-click URL
 * The Taboola API returns notify-click URLs with a 'redir' parameter
 * @param notifyClickUrl The notify-click URL from the API
 * @returns The actual destination URL, or the original URL if parsing fails
 */
export function extractRedirectUrl(notifyClickUrl: string): string {
  try {
    const url = new URL(notifyClickUrl);
    const redirParam = url.searchParams.get('redir');
    if (redirParam) {
      return decodeURIComponent(redirParam);
    }
  } catch (error) {
    console.warn('Failed to parse notify-click URL:', error);
  }
  return notifyClickUrl;
}
