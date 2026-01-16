const fs = require('fs');
const path = require('path');

// Simple bundler that combines all JS files into one
function bundleFiles() {
  const distDir = path.join(__dirname, '..', 'dist');
  const outputFile = path.join(distDir, 'taboola-widget.bundle.js');
  
  // Read all JS files in order
  const files = [
    'types/recommendation.js',
    'models/recommendation-item.js',
    'models/organic-item.js',
    'models/sponsored-item.js',
    'api/taboola-api.js',
    'widget/renderer.js',
    'widget/widget.js',
    'index.js'
  ];
  
  let bundle = `// Taboola Widget Bundle
(function() {
  'use strict';
  
  // Module system simulation
  const modules = {};
  const exports = {};
  
`;
  
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace ES6 imports/exports with IIFE pattern
      // This is a simple approach - for production, use a real bundler
      content = content.replace(/import\s+.*?from\s+['"](.*?)['"];?/g, '');
      content = content.replace(/export\s+\{[^}]*\}\s+from\s+['"](.*?)['"];?/g, '');
      
      bundle += `\n  // ${file}\n`;
      bundle += content.split('\n').map(line => '  ' + line).join('\n');
      bundle += '\n';
    }
  });
  
  bundle += `
  // Expose global API
  if (typeof window !== 'undefined') {
    window.TaboolaWidget = {
      init: async function(config) {
        const { TaboolaWidget } = await import('./index.js');
        const widget = new TaboolaWidget(config);
        await widget.init();
      },
      create: function(config) {
        return new TaboolaWidget(config);
      }
    };
  }
})();
`;
  
  fs.writeFileSync(outputFile, bundle);
  console.log('Bundle created:', outputFile);
}

bundleFiles();
