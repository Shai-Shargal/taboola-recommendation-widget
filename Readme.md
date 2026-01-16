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
### Basic Usage

1. Include the compiled JavaScript file in your HTML:
```html
<script src="dist/index.js"></script>
### Basic Usage

1. Include the compiled JavaScript file in your HTML:
```javascript
<script src="dist/index.js"></script>
```

2. Create a container element:
```javascript
<div id="my-widget"></div>
```

3. Initialize the widget:
```javascript
// Using global API
await TaboolaWidget.init({
  containerId: 'my-widget',
  count: 4
});
## Demo

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

Open `examples/demo.html` in a browser to see the widget in action. Make sure to build the project first:

- **Factory Pattern**: Widget creates appropriate item instances based on `origin` field
- **Separation of Concerns**: API, Models, Rendering, and Styling are separated into distinct modules

### Extensibility
Then serve the files using a local server (the API requires CORS, so you'll need a server):

To add a new recommendation type (e.g., Video):

1. Create a new class extending `RecommendationItemBase`:
```typescript
export class VideoItem extends RecommendationItemBase {
npx http-serveret(): '_self' | '_blank' {
    return '_blank';
  }
**Note:** The Taboola API requires a USA VPN to get responses. Make sure you're connected to a USA VPN when testing.
```
Open `examples/demo.html` in a browser to see the widget in action. Make sure to build the project first:
The widget uses a mobile-first responsive grid:
- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 4 columns
Open `examples/demo.html` in a browser to see the widget in action. Make sure to build the project first:

- Open in the same tab
- No branding displayed
- Used for internal site recommendations
npx http-server
Then serve the files using a local server (the API requires CORS, so you'll need a server):
s
- Open in a new tab
**Note:** The Taboola API requires a USA VPN to get responses. Make sure you're connected to a USA VPN when testing.
Destroys the widget and cleans up resources.

### TaboolaApiClient
npx http-server
#### Methods

**Note:** The Taboola API requires a USA VPN to get responses. Make sure you're connected to a USA VPN when testing.get/`): Main widget controller and renderer

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
The widget supports modern browsers with ES2020 support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)