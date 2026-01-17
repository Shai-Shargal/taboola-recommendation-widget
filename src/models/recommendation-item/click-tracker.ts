/**
 * Click tracking utilities for recommendation items
 * Implements pixel tracking via image beacon
 */

/**
 * Tracks a click event by sending a beacon request
 * Uses an invisible image element to send the tracking request
 * @param notifyClickUrl The notify-click URL to track
 */
export function trackClick(notifyClickUrl: string): void {
  try {
    const img = new Image();
    img.style.display = 'none';
    img.src = notifyClickUrl;
    document.body.appendChild(img);
    setTimeout(() => {
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    }, 1000);
  } catch (error) {
    console.warn('Failed to track click:', error);
  }
}
