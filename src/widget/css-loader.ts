let stylesLoaded = false;

export function loadStyles(): void {
  if (stylesLoaded) return;

  const styleId = 'taboola-widget-styles';
  if (document.getElementById(styleId)) {
    stylesLoaded = true;
    return;
  }

  const link = document.createElement('link');
  link.id = styleId;
  link.rel = 'stylesheet';
  // Use relative path to work on GitHub Pages (served from subdirectory) and local development
  link.href = './dist/styles/widget.css';

  document.head.appendChild(link);
  stylesLoaded = true;
}
