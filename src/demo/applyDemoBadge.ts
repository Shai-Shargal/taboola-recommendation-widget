/**
 * Applies a DEMO badge to a recommendation item element
 * @param element The HTMLElement representing a recommendation card
 */
export function applyDemoBadge(element: HTMLElement): void {
  element.setAttribute('data-demo', 'true');
  
  // Add DEMO badge to the content div (before Sponsored badge)
  const content = element.querySelector('.taboola-recommendation-item__content');
  if (content) {
    const demoBadge = document.createElement('span');
    demoBadge.className = 'taboola-recommendation-item__badge taboola-recommendation-item__badge--demo';
    demoBadge.textContent = 'DEMO';
    demoBadge.setAttribute('aria-label', 'Demo content');
    content.insertBefore(demoBadge, content.firstChild);
  }
}
