# Quick Start Guide

Get the Taboola Recommendation Widget up and running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Build the Project

```bash
npm run build
```

This compiles TypeScript and fixes ES module imports for browser compatibility.

## Step 3: Start a Local Server

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000
```

## Step 4: Open Demo Page

Navigate to: `http://localhost:8000/examples/demo.html`

You should see:
- ✅ Loading spinner
- ✅ 4 recommendation cards
- ✅ Responsive grid layout
- ✅ Clickable items

## Verify Everything Works

1. **Check Browser Console (F12):**
   - Should see: "Widget loaded, initializing..."
   - Should see: "Widget initialized successfully!"
   - No red errors

2. **Test Interactions:**
   - Click on a recommendation card
   - Sponsored items open in new tab
   - Organic items open in same tab

3. **Test Responsive Design:**
   - Resize browser window
   - Mobile (< 768px): 1 column
   - Tablet (768px - 1024px): 2 columns
   - Desktop (> 1024px): 4 columns

## Run Tests

```bash
npm test
```

All 39 tests should pass.

## Common Issues

### Widget doesn't load
- ✅ Check you're using `http://localhost:8000` (not `file://`)
- ✅ Verify `npm run build` completed successfully
- ✅ Check browser console for errors

### API errors
- ✅ Check Network tab in DevTools
- ✅ Verify API endpoint is accessible

### Module import errors
- ✅ Rebuild: `npm run build`
- ✅ The build script fixes imports automatically

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Explore the code in `src/` directory

## Need Help?

Check the Troubleshooting section in [README.md](README.md) or open an issue on GitHub.
