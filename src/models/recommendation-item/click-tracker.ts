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
