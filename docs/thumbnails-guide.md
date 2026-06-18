# Thumbnail Capture Guide

This guide explains how to replace placeholder thumbnails with real screenshots of the slide presentations.

## Current Placeholders

The following slides currently have placeholder images that need to be replaced with actual screenshots:

1. **Modern React Patterns**
   - URL: https://react-patterns.vercel.app
   - Thumbnail: `/thumbnails/react-patterns.png`
   - Featured: Yes

2. **Design Systems 101**
   - URL: https://design-systems.vercel.app
   - Thumbnail: `/thumbnails/design-systems.png`
   - Featured: Yes

3. **CSS Grid Mastery**
   - URL: https://css-grid.vercel.app
   - Thumbnail: `/thumbnails/css-grid.png`
   - Featured: No

4. **TypeScript Best Practices**
   - URL: https://typescript-patterns.vercel.app
   - Thumbnail: `/thumbnails/typescript.png`
   - Featured: No

5. **Accessibility Fundamentals**
   - URL: https://a11y-fundamentals.vercel.app
   - Thumbnail: `/thumbnails/a11y.png`
   - Featured: Yes

## Screenshot Specifications

- **Aspect Ratio**: 16:9 (landscape)
- **Resolution**: 1200x675 pixels
- **Format**: PNG
- **File Size**: Keep under 200KB when possible
- **Location**: `/public/thumbnails/`

## Method 1: Manual Capture (Quick & Easy)

### Using macOS Built-in Tools

1. Open the slide presentation URL in your browser
2. Press `Cmd + Shift + 4` then `Space` to enter window capture mode
3. Click on the browser window to capture
4. Open the screenshot in Preview
5. Use `Tools → Adjust Size` to set dimensions to 1200x675 pixels
6. Save as PNG to `/public/thumbnails/`

### Using Browser Developer Tools

1. Open the URL in Chrome/Edge
2. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)
3. Type "screenshot" and select "Capture node screenshot"
4. Use the `<body>` element to capture the full page
5. Resize to 1200x675 pixels if needed

## Method 2: Automated Capture with Puppeteer

For automated screenshot capture, use the following script:

### Setup

```bash
npm install --save-dev puppeteer sharp
```

### Capture Script

Create `scripts/capture-thumbnails.js`:

```javascript
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const slides = require('../data/slides.json');

const THUMBNAIL_DIR = path.join(__dirname, '../public/thumbnails');
const WIDTH = 1200;
const HEIGHT = 675;

async function captureThumbnail(slide) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport to desired dimensions
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1
    });

    console.log(`Capturing: ${slide.title}`);
    await page.goto(slide.sourceUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit more for any animations to complete
    await page.waitForTimeout(2000);

    // Take screenshot
    const outputPath = path.join(THUMBNAIL_DIR, path.basename(slide.thumbnail));
    await page.screenshot({
      path: outputPath,
      fullPage: false
    });

    // Optimize with sharp
    await sharp(outputPath)
      .resize(WIDTH, HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 80,
        compressionLevel: 9
      })
      .toFile(outputPath.replace('.png', '_temp.png'));

    // Replace original with optimized version
    fs.renameSync(
      outputPath.replace('.png', '_temp.png'),
      outputPath
    );

    console.log(`✓ Saved: ${outputPath}`);

  } catch (error) {
    console.error(`✗ Failed to capture ${slide.title}:`, error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Starting thumbnail capture...\n');

  // Ensure thumbnail directory exists
  if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
  }

  // Capture each slide
  for (const slide of slides) {
    await captureThumbnail(slide);
  }

  console.log('\n✓ All thumbnails captured!');
}

main().catch(console.error);
```

### Run the Script

```bash
node scripts/capture-thumbnails.js
```

## Method 3: Using sharp-cli for Optimization

If you have screenshots but need to optimize them:

### Install sharp-cli

```bash
npm install --global sharp-cli
```

### Optimize Images

```bash
# Resize a single image
sharp-cli input.png --resize 1200x675 --fit cover --output /public/thumbnails/output.png

# Optimize all thumbnails
cd public/thumbnails
for img in *.png; do
  sharp-cli "$img" --resize 1200x675 --fit cover --png-compressionLevel 9 --output "optimized_$img"
  mv "optimized_$img" "$img"
done
```

## Method 4: Using Vercel Screenshot API (Alternative)

For hosted solutions, you can use screenshot services:

- **Vercel Screenshot API**: Built into Vercel deployments
- **Screenshot One**: https://screenshotone.com
- **Puppeteer-based services**: Many hosting options available

Example with a screenshot service:

```bash
# Example URL pattern (varies by service)
curl "https://api.screenshotone.com/take?url=https://react-patterns.vercel.app&viewport_width=1200&viewport_height=675&format=png&device_scale_factor=1" \
  --output react-patterns.png
```

## Important Notes

### URLs in Current Data

The current `data/slides.json` uses example placeholder URLs (e.g., `https://react-patterns.vercel.app`). These URLs don't actually exist - they're examples for the prototype.

**To use real screenshots, you need to:**

1. Deploy actual slide presentations to real URLs
2. Update the `sourceUrl` field in `data/slides.json` for each slide
3. Run the capture script or manually capture screenshots
4. Place the captured images in `/public/thumbnails/`

### Image Optimization Tips

- **Format**: Use PNG for screenshots with text/code (better quality)
- **Compression**: Use compression level 9 for smallest file size
- **Quality**: PNG quality setting around 80-85 for good balance
- **Dimensions**: Always resize to exactly 1200x675 for consistency

### Browser Settings for Best Results

When capturing manually:

1. Use Chrome or Edge for best rendering
2. Hide browser extensions that might inject UI
3. Zoom level should be 100%
4. Consider using reader mode for cleaner captures
5. For slides with dark themes, ensure proper contrast

## Verification

After capturing thumbnails, verify they appear correctly:

```bash
# Start the dev server
npm run dev

# Visit http://localhost:5173 and check:
# - All thumbnails load correctly
# - Images are crisp and not pixelated
# - File sizes are reasonable
# - Featured slides look good on the home page
```

## Troubleshooting

### Screenshots Look Blurry

- Ensure you're capturing at 1200x675 resolution
- Check device pixel ratio (should be 1 for thumbnails)
- Verify browser zoom is at 100%

### File Sizes Too Large

- Increase PNG compression level
- Consider using WebP format (update references in data/slides.json)
- Use sharp-cli for aggressive optimization

### Puppeteer Times Out

- Increase timeout value in the script
- Ensure URLs are accessible from your network
- Check if pages require JavaScript to render
- Try increasing the `networkidle0` timeout

## Next Steps

After replacing placeholders with real screenshots:

1. Update `data/slides.json` with actual working URLs
2. Commit the new thumbnail images
3. Test the application to ensure everything loads
4. Consider adding automated screenshot generation to your CI/CD pipeline

## Example Workflow

```bash
# 1. Deploy your actual slide presentations
# 2. Update URLs in data/slides.json
# 3. Run the capture script
node scripts/capture-thumbnails.js

# 4. Verify thumbnails
ls -lh public/thumbnails/

# 5. Commit changes
git add public/thumbnails/ data/slides.json
git commit -m "feat: replace placeholder thumbnails with real screenshots"

# 6. Test locally
npm run dev
```

---

**Note**: This is a prototype. The current thumbnails in `/public/thumbnails/` are placeholder files (70 bytes each). Replace them with real screenshots following the methods above.
