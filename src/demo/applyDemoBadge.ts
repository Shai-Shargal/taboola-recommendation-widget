
export function applyDemoBadge(element: HTMLElement): void {
  element.setAttribute('data-demo', 'true');
  
  const content = element.querySelector('.taboola-recommendation-item__content');
  if (content) {
    const demoBadge = document.createElement('span');
    demoBadge.className = 'taboola-recommendation-item__badge taboola-recommendation-item__badge--demo';
    demoBadge.textContent = 'DEMO';
    demoBadge.setAttribute('aria-label', 'Demo content');
    content.insertBefore(demoBadge, content.firstChild);
  }
}
