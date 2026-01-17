import '../dist/index.js';

function initWidget() {
  if (window.TaboolaWidget) {
    console.log('Initializing Taboola Widget...');
    window.TaboolaWidget.init({
      containerId: 'taboola-widget-1',
      count: 4,
      sourceType: 'video',
      sourceId: '214321562187',
      sourceUrl: 'http://www.site.com/videos/214321562187.html'
    }).then(() => {
      console.log('Widget initialized successfully!');
    }).catch((error) => {
      console.error('Failed to initialize widget:', error);
      const container = document.getElementById('taboola-widget-1');
      if (container) {
        container.innerHTML = 
          '<div style="padding: 20px; text-align: center; color: #e74c3c; border: 2px solid #e74c3c; border-radius: 8px;">' +
          '<p><strong>Error loading widget</strong></p>' +
          '<p>' + error.message + '</p>' +
          '<p style="margin-top: 10px; font-size: 12px; color: #666;">Check the browser console for more details.</p>' +
          '</div>';
      }
    });
  } else {
    setTimeout(initWidget, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initWidget, 200));
} else {
  setTimeout(initWidget, 200);
}
