# Taboola Recommendation Widget

A fully functional, responsive Taboola recommendation widget built with TypeScript. This widget displays recommendations from the Taboola API, supporting both organic and sponsored content types.

## Features

- ✅ **TypeScript Implementation** - Pure TypeScript, no frameworks
- ✅ **Responsive Design** - Mobile-first approach with breakpoints for mobile, tablet, and desktop
- ✅ **Dual Content Types** - Supports both organic (same tab) and sponsored (new tab) recommendations
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

## Building

Compile TypeScript to JavaScript:
```bash
npm run build
```

The compiled files will be in the `dist/` directory.

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Usage

### Basic Usage

1. Include the compiled JavaScript file in your HTML:
```html
<script src="dist/index.js"></script>
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
  count: 4
});
```

### Advanced Usage

```javascript
import { TaboolaWidget } from './dist/index.js';

const widget = new TaboolaWidget({
  containerId: 'my-widget',
  publisherId: 'taboola-templates',
  appType: 'desktop',
  apiKey: 'your-api-key',
  count: 4,
  sourceType: 'video',
  sourceId: 'your-source-id',
  sourceUrl: 'https://your-site.com'
});

await widget.init();
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | `string` | **required** | ID of the container element |
| `publisherId` | `string` | `'taboola-templates'` | Taboola publisher ID |
| `appType` | `string` | `'desktop'` | Application type (desktop/mobile) |
| `apiKey` | `string` | `'f9040ab1b9c802857aa783c469d0e0ff7e7366e4'` | API key |
| `count` | `number` | `4` | Number of recommendations to fetch |
| `sourceType` | `string` | `'video'` | Source content type |
| `sourceId` | `string` | `'demo123'` | Source content ID |
| `sourceUrl` | `string` | `'https://example.com'` | Source content URL |

## Demo

Open `examples/demo.html` in a browser to see the widget in action. Make sure to build the project first:

```bash
npm run build
```

Then serve the files using a local server (the API requires CORS, so you'll need a server):

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

**Note:** The Taboola API requires a USA VPN to get responses. Make sure you're connected to a USA VPN when testing.

## Architecture

### Design Patterns

- **Strategy Pattern**: Different recommendation types (Organic, Sponsored) implement the same interface
- **Factory Pattern**: Widget creates appropriate item instances based on `origin` field
- **Separation of Concerns**: API, Models, Rendering, and Styling are separated into distinct modules

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

2. Update the factory method in `TaboolaWidget`:
```typescript
private createItem(data: RecommendationItem): RecommendationItemBase {
  if (data.origin === 'organic') {
    return new OrganicItem(data);
  } else if (data.origin === 'video') {
    return new VideoItem(data);
  } else {
    return new SponsoredItem(data);
  }
}
```

## Responsive Design

The widget uses a mobile-first responsive grid:

- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 4 columns

## Content Types

### Organic Recommendations
- Open in the same tab
- No branding displayed
- Used for internal site recommendations

### Sponsored Recommendations
- Open in a new tab
- Display advertiser branding
- Used for external sponsored content

## API Reference

### TaboolaWidget

#### Constructor
```typescript
new TaboolaWidget(config: WidgetConfig)
```

#### Methods

##### `init(): Promise<void>`
Initializes the widget and fetches recommendations.

##### `destroy(): void`
Destroys the widget and cleans up resources.

### TaboolaApiClient

#### Methods

##### `fetchRecommendations(config: ApiConfig): Promise<TaboolaResponse>`
Fetches recommendations from the Taboola API.

## Development

### Development Mode

Watch for changes and recompile:
```bash
npm run dev
```

### Code Structure

- **API Layer** (`src/api/`): Handles Taboola API communication
- **Type System** (`src/types/`): TypeScript interfaces for type safety
- **Model Layer** (`src/models/`): Recommendation item implementations
- **Widget Layer** (`src/widget/`): Main widget controller and renderer

## Testing

The project includes comprehensive unit tests:

- **API Tests**: Mock fetch API and test error scenarios
- **Model Tests**: Test OrganicItem and SponsoredItem rendering and behavior
- **Widget Tests**: Test widget initialization, rendering, and error handling

Run tests with:
```bash
npm test
```

## Browser Support

The widget supports modern browsers with ES2020 support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- **Lazy Loading**: Images use native `loading="lazy"` attribute
- **CSS Containment**: Layout isolation for better performance
- **Event Delegation**: Efficient event handling
- **Minimal DOM Manipulation**: Optimized rendering

## Accessibility

- Semantic HTML (`<article>`, proper heading hierarchy)
- ARIA labels and roles
- Keyboard navigation support (Enter and Space keys)
- Focus management
- Alt text for images

## License

MIT

## Author

Built as part of the Taboola Frontend Engineering Home Assignment.
