# Slide Data

This directory contains the slide presentation data used by the application.

## slides.json

The main data file containing information about all slide presentations.

### Current Status

**IMPORTANT**: This is a prototype with placeholder data.

1. **Thumbnail Images**: The thumbnails referenced in `slides.json` are currently placeholder files (70 bytes each) located in `/public/thumbnails/`. These need to be replaced with real screenshots following the guide in `/docs/thumbnails-guide.md`.

2. **Source URLs**: The `sourceUrl` fields use example placeholder URLs (e.g., `https://react-patterns.vercel.app`). These URLs don't actually exist. To use real screenshots:
   - Deploy actual slide presentations to real URLs
   - Update the `sourceUrl` fields in `slides.json`
   - Capture screenshots using the documented process

3. **GitHub URLs**: The `githubUrl` fields are placeholder URLs and should be updated with actual repository URLs.

### Replacing Placeholders

See `/docs/thumbnails-guide.md` for complete instructions on:
- Capturing real screenshots (manual or automated)
- Optimizing images with sharp-cli
- Image specifications (1200x675, 16:9 aspect ratio)
- Verification steps

### Data Structure

Each slide object contains:

- `id`: Unique identifier (string)
- `title`: Presentation title
- `description`: Short description
- `thumbnail`: Path to thumbnail image (relative to `/public/`)
- `sourceUrl`: URL where the presentation is hosted
- `githubUrl`: URL to source code repository
- `prompt`: AI prompt used to generate the presentation
- `author`: Author information with name and URL
- `tags`: Array of category tags
- `featured`: Boolean flag for homepage display

## Adding New Slides

To add a new slide presentation:

1. Create a thumbnail (1200x675 PNG) in `/public/thumbnails/`
2. Add an entry to `slides.json` following the structure above
3. Use a unique `id` (incrementing number)
4. Set `featured: true` for homepage display
5. Tag appropriately for filtering

## Example Entry

```json
{
  "id": "06",
  "title": "Your New Presentation",
  "description": "A brief description of your presentation",
  "thumbnail": "/thumbnails/your-presentation.png",
  "sourceUrl": "https://your-presentation.vercel.app",
  "githubUrl": "https://github.com/username/your-presentation",
  "prompt": "Describe the presentation content and style...",
  "author": {
    "name": "Your Name",
    "url": "https://github.com/yourusername"
  },
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false
}
```
