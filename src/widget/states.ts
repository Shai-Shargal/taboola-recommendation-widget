export function renderLoading(container: HTMLElement): void {
  container.innerHTML = `
    <div class="taboola-widget-loading">
      <div class="taboola-widget-loading__spinner"></div>
      <p>Loading recommendations...</p>
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
