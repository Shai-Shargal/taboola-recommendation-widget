const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixImports(fullPath);
    } else if (file.name.endsWith('.js') && !file.name.endsWith('.map.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(
        /from\s+['"](\.\.?\/[^'"]+)['"]/g,
        (match, importPath) => {
          if (!importPath.match(/\.(js|json)$/)) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      content = content.replace(
        /import\s*\(\s*['"](\.\/[^'"]+)['"]\s*\)/g,
        (match, importPath) => {
          if (!importPath.match(/\.(js|json)$/)) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`Fixed imports in: ${fullPath}`);
    }
  }
}

function copyStyles() {
  const srcStyles = path.join(__dirname, '..', 'src', 'styles', 'widget.css');
  const distStylesDir = path.join(__dirname, '..', 'dist', 'styles');
  const distStyles = path.join(distStylesDir, 'widget.css');
  
  if (!fs.existsSync(distStylesDir)) {
    fs.mkdirSync(distStylesDir, { recursive: true });
  }
  
  if (fs.existsSync(srcStyles)) {
    fs.copyFileSync(srcStyles, distStyles);
    console.log('Copied styles to dist/styles/widget.css');
  }
}

const distDir = path.join(__dirname, '..', 'dist');
console.log('Fixing imports in dist folder...');
fixImports(distDir);
console.log('Copying styles...');
copyStyles();
console.log('Done!');
