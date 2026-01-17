/**
 * Builds the widget header with title and demo mode toggle
 * @param demoEnabled Whether demo mode is currently enabled
 * @param onToggle Callback function called when toggle state changes
 * @returns HTMLElement containing the header structure
 */
export function buildWidgetHeader(
  demoEnabled: boolean,
  onToggle: (enabled: boolean) => void
): HTMLElement {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'taboola-widget__header-container';

  const header = document.createElement('h2');
  header.className = 'taboola-widget__header';
  header.textContent = 'Recommended for you';
  headerContainer.appendChild(header);

  // Demo mode toggle
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'taboola-widget__demo-toggle';
  
  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.id = 'demo-mode-toggle';
  toggleInput.className = 'taboola-widget__demo-toggle-input';
  toggleInput.checked = demoEnabled;
  
  const toggleLabel = document.createElement('label');
  toggleLabel.className = 'taboola-widget__demo-toggle-label';
  toggleLabel.setAttribute('for', 'demo-mode-toggle');
  toggleLabel.textContent = 'Demo mode';
  toggleLabel.insertBefore(toggleInput, toggleLabel.firstChild);
  
  toggleInput.addEventListener('change', () => {
    onToggle(toggleInput.checked);
  });

  toggleContainer.appendChild(toggleLabel);
  headerContainer.appendChild(toggleContainer);

  return headerContainer;
}
