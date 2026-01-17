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

function resolveImports(cssContent, baseDir) {
  const importRegex = /@import\s+['"]([^'"]+)['"];?/g;
  let resolvedContent = cssContent;
  let match;

  while ((match = importRegex.exec(cssContent)) !== null) {
    const importPath = match[1];
    const fullPath = path.resolve(baseDir, importPath);
    
    if (fs.existsSync(fullPath)) {
      let importedContent = fs.readFileSync(fullPath, 'utf8');
      // Recursively resolve imports in the imported file
      importedContent = resolveImports(importedContent, path.dirname(fullPath));
      // Replace the @import with the actual content
      resolvedContent = resolvedContent.replace(match[0], importedContent);
    } else {
      console.warn(`Warning: CSS import not found: ${fullPath}`);
    }
  }

  return resolvedContent;
}

function buildStyles() {
  const srcStyles = path.join(__dirname, '..', 'src', 'styles', 'widget.css');
  const distStylesDir = path.join(__dirname, '..', 'dist', 'styles');
  const distStyles = path.join(distStylesDir, 'widget.css');
  
  if (!fs.existsSync(distStylesDir)) {
    fs.mkdirSync(distStylesDir, { recursive: true });
  }
  
  if (fs.existsSync(srcStyles)) {
    let cssContent = fs.readFileSync(srcStyles, 'utf8');
    const stylesDir = path.dirname(srcStyles);
    
    // Resolve all @import statements
    cssContent = resolveImports(cssContent, stylesDir);
    
    // Write the concatenated CSS
    fs.writeFileSync(distStyles, cssContent);
    console.log('Built and concatenated styles to dist/styles/widget.css');
  } else {
    console.warn(`Warning: Main stylesheet not found: ${srcStyles}`);
  }
}

const distDir = path.join(__dirname, '..', 'dist');
console.log('Fixing imports in dist folder...');
fixImports(distDir);
console.log('Building styles...');
buildStyles();
console.log('Done!');
