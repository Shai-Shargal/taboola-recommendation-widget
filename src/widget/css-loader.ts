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
  // Resolve CSS path relative to current page directory to work on GitHub Pages (subdirectory) and local dev
  // Get the directory part of the current URL (with trailing slash) and append the relative path
  const currentPath = window.location.pathname;
  const baseDir = currentPath.endsWith('/') ? currentPath : currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  link.href = window.location.origin + baseDir + 'dist/styles/widget.css';

  document.head.appendChild(link);
  stylesLoaded = true;
}
