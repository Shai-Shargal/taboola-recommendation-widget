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
