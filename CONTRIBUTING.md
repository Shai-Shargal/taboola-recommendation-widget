# Contributing to Taboola Recommendation Widget

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Shai-Shargal/taboola-recommendation-widget.git
cd taboola-recommendation-widget
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the project:**
```bash
npm run build
```

4. **Run tests:**
```bash
npm test
```

## Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose
- Maintain consistent indentation (2 spaces)

## Adding New Features

### Adding a New Recommendation Type

1. Create a new class in `src/models/` extending `RecommendationItemBase`
2. Implement the required abstract methods
3. Update the factory method in `TaboolaWidget.createItem()`
4. Add unit tests in `tests/models/`
5. Update documentation

### Example:

```typescript
// src/models/video-item.ts
export class VideoItem extends RecommendationItemBase {
  protected getLinkTarget(): '_self' | '_blank' {
    return '_blank';
  }
  
  render(): HTMLElement {
    // Implementation
  }
}
```

## Testing

- Write tests for all new features
- Maintain or improve test coverage
- Run tests before submitting: `npm test`
- Tests should be isolated and independent

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit a pull request with a clear description

## Questions?

Feel free to open an issue for questions or discussions.
