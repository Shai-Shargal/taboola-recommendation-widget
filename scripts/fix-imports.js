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
      
      // Fix import statements to include .js extension (relative imports)
      content = content.replace(
        /from\s+['"](\.\.?\/[^'"]+)['"]/g,
        (match, importPath) => {
          // Only add .js if it doesn't already have an extension
          if (!importPath.match(/\.(js|json)$/)) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      // Also fix import() dynamic imports
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

const distDir = path.join(__dirname, '..', 'dist');
console.log('Fixing imports in dist folder...');
fixImports(distDir);
console.log('Done!');
