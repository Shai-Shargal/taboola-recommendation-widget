export function renderLoading(container: HTMLElement): void {
  const skeletonCards = Array(6).fill(0).map(() => `
    <div class="taboola-widget-loading__skeleton">
      <div class="taboola-widget-loading__skeleton-thumbnail"></div>
      <div class="taboola-widget-loading__skeleton-content">
        <div class="taboola-widget-loading__skeleton-line taboola-widget-loading__skeleton-line--title"></div>
        <div class="taboola-widget-loading__skeleton-line taboola-widget-loading__skeleton-line--title"></div>
        <div class="taboola-widget-loading__skeleton-line taboola-widget-loading__skeleton-line--short"></div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="taboola-widget">
      <div class="taboola-widget__header">Recommended for you</div>
      <div class="taboola-widget-loading">
        ${skeletonCards}
      </div>
    </div>
  `;
}

export function renderError(container: HTMLElement, message: string): void {
  container.innerHTML = `
    <div class="taboola-widget-error">
      <p class="taboola-widget-error__message">${message}</p>
    </div>
  `;
}

export function renderEmpty(container: HTMLElement): void {
  container.innerHTML = `
    <div class="taboola-widget-empty">
      <p class="taboola-widget-empty__message">
        No recommendations available at this time. Please check back later.
      </p>
    </div>
  `;
}
