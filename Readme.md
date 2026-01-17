# Taboola Recommendation Widget

[![CI](https://github.com/Shai-Shargal/taboola-recommendation-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/Shai-Shargal/taboola-recommendation-widget/actions/workflows/ci.yml)

A fully functional, responsive Taboola recommendation widget built with TypeScript. This widget displays recommendations from the Taboola API, supporting both organic and sponsored content types with a modern, polished UI.

## Features

- ✅ **TypeScript Implementation** - Pure TypeScript, no frameworks
- ✅ **Responsive Grid Layout** - Modern CSS Grid with 3/2/1 column layouts (desktop/tablet/mobile)
- ✅ **Polished UI/UX** - Clean card design with consistent heights, proper image aspect ratios, and refined typography
- ✅ **Dual Content Types** - Supports both organic and sponsored recommendations (both open in new tab)
- ✅ **Demo Mode** - Toggle to show demo recommendation card for testing
- ✅ **Extensible Architecture** - Easy to add new recommendation types in the future
- ✅ **Unit Test Coverage** - Comprehensive test suite using Jest
- ✅ **Accessibility** - ARIA labels, keyboard navigation, and semantic HTML
- ✅ **Performance Optimized** - Lazy loading images, CSS containment, event delegation

## Project Structure

```
taboola-recommendation-widget/
├── src/
│   ├── api/              # API client for Taboola REST API
│   ├── types/            # TypeScript type definitions
│   ├── models/           # Recommendation item classes
│   ├── widget/           # Widget core and renderer
│   ├── demo/             # Demo mode utilities
│   ├── dom/               # DOM building utilities
│   ├── styles/           # CSS styles for the widget
│   └── index.ts          # Entry point
├── tests/                # Unit tests
├── examples/             # Demo HTML page
├── dist/                 # Compiled JavaScript output
└── package.json
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shai-Shargal/taboola-recommendation-widget.git
cd taboola-recommendation-widget
```

2. Install dependencies:
```bash
npm install
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Run locally:**
   ```bash
   npm run serve
   # Then open http://localhost:8000/examples/demo.html
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Building

Compile TypeScript to JavaScript and copy CSS files:
```bash
npm run build
```

The compiled files will be in the `dist/` directory. **Important:** After making CSS changes, you must run `npm run build` to copy the updated styles to the `dist/` folder.

## Basic Usage

1. Include the compiled JavaScript file in your HTML:
```html
<script type="module" src="dist/index.js"></script>
```

2. Create a container element:
```html
<div id="my-widget"></div>
```

3. Initialize the widget:
```javascript
// Using global API
await TaboolaWidget.init({
  containerId: 'my-widget',
  count: 4,
  sourceType: 'video',
  sourceId: '214321562187',
  sourceUrl: 'http://www.site.com/videos/214321562187.html'
});
```

## Demo

### Live Demo

🌐 **[View Live Demo](https://shai-shargal.github.io/taboola-recommendation-widget/)** (GitHub Pages)

### Local Development

1. Build the project:
```bash
npm run build
```

2. Start a local server (the API requires CORS, so you'll need a server):
```bash
# Using npm serve script
npm run serve

# Or using Python
python -m http.server 8000

# Or using Node.js (http-server)
npx http-server -p 8000
```

3. Open `http://localhost:8000/examples/demo.html` in your browser

## Design & Styling

The widget features a modern, production-ready design:

### Responsive Grid Layout
- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns  
- **Desktop** (> 1024px): 3 columns

### Card Design
- Consistent card heights across all items
- 16:9 aspect ratio for all thumbnails
- Rounded corners (4px border-radius)
- Subtle hover effects (opacity and transform)
- Clean typography with proper line-height and text clamping
- Image placeholder for missing or failed images

### Typography
- System font stack for optimal performance
- Responsive font sizes (13-14px for titles, 12px for descriptions)
- Text truncation with ellipsis (2 lines max for title and description)

### Image Handling
- Fixed aspect ratio using CSS `aspect-ratio: 16/9`
- `object-fit: cover` for consistent image display
- Smooth zoom effect on hover
- Lazy loading for performance

## Architecture

### Design Patterns

- **Factory Pattern**: Widget creates appropriate item instances based on `origin` field
- **Separation of Concerns**: API, Models, Rendering, and Styling are separated into distinct modules

### Content Types

#### Organic Items
- Open in a new tab
- Display branding if available
- Used for internal site recommendations

#### Sponsored Items
- Open in a new tab
- Display "Sponsored" badge
- Display advertiser branding
- Used for external sponsored content

### Demo Mode

The widget includes a demo mode toggle that allows you to add a demo recommendation card to the list. When enabled:
- A demo card appears as the first item
- The demo card is clearly labeled with a "DEMO" badge
- The demo card uses the same rendering logic as real recommendations
- Useful for testing and demonstrations

### Extensibility

To add a new recommendation type (e.g., Video):

1. Create a new class extending `RecommendationItemBase`:
```typescript
export class VideoItem extends RecommendationItemBase {
  protected getLinkTarget(): '_self' | '_blank' {
    return '_blank';
  }
  
  render(): HTMLElement {
    // Custom rendering logic
  }
}
```

2. Update the factory method in `TaboolaWidget.createItem()` to handle the new type

## API Reference

### TaboolaWidget

Main widget controller and renderer.

#### Methods

**init(config: WidgetConfig): Promise<void>**
- Initializes the widget with the provided configuration
- Fetches recommendations from the Taboola API
- Renders items in the specified container

**destroy(): void**
- Destroys the widget and cleans up resources

### WidgetConfig

```typescript
interface WidgetConfig {
  containerId: string;      // Required: ID of the container element
  publisherId?: string;      // Optional: Taboola publisher ID
  appType?: string;          // Optional: Application type
  apiKey?: string;           // Optional: API key
  count?: number;            // Optional: Number of recommendations (default: 4)
  sourceType?: string;       // Optional: Source type (e.g., 'video')
  sourceId?: string;         // Optional: Source ID
  sourceUrl?: string;        // Optional: Source URL
}
```

## Testing

The project includes comprehensive unit tests:

- **API Tests**: Mock fetch API and test error scenarios
- **Model Tests**: Test OrganicItem and SponsoredItem rendering and behavior
- **Widget Tests**: Test widget initialization, rendering, and error handling

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Browser Support

The widget supports modern browsers with ES2020 support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- **Lazy Loading**: Images use native `loading="lazy"` attribute
- **CSS Grid**: Efficient layout with minimal reflows
- **Event Delegation**: Efficient event handling
- **Minimal DOM Manipulation**: Optimized rendering
- **CSS Containment**: Layout isolation for better performance

## Accessibility

- Semantic HTML (`<article>`, proper heading hierarchy)
- ARIA labels and roles
- Keyboard navigation support (Enter and Space keys)
- Focus management
- Alt text for images
- Proper color contrast ratios

## Development

### Making CSS Changes

1. Edit `src/styles/widget.css`
2. Run `npm run build` to copy CSS to `dist/styles/widget.css`
3. Refresh your browser (hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`)

### Watch Mode

For TypeScript development:
```bash
npm run dev
```

This will watch for TypeScript changes and recompile automatically.

## License

MIT

## Author

Built as part of the Taboola Frontend Engineering Home Assignment.
