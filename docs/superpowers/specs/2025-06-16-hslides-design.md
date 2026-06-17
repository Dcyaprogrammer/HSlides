# HSlides Platform Design Spec

**Project:** HTML Slides Discovery Platform
**Date:** 2025-06-16
**Status:** Prototype

## Overview

HSlides is a neo-brutalist discovery platform for HTML slides, inspired by Dribbble's visual browsing experience. The platform showcases curated HTML slide decks with embedded previews, prompts for reproducibility, and links to live demos and source code.

**Core premise:** Make HTML slides accessible to non-programmers through visual discovery, while providing creators' prompts/skills for viewers to recreate or adapt presentations.

## Goals

- **Primary:** Enable discovery of HTML slides through visual browsing (like Dribbble/Pinterest)
- **Secondary:** Provide prompts and skills alongside slides for reproducibility
- **Scope:** Prototype with 5-10 manually curated slide decks

## Non-Goals (For Later)

- User accounts/authentication
- Upload functionality
- GitHub crawling/automation
- Search, filters, tags
- Ratings, popularity metrics
- Content creation tools (platform only showcases existing slides)

## Architecture & Tech Stack

### Framework
- **Next.js 14+** with App Router and TypeScript
- **React 18+** for UI components
- **Tailwind CSS v3+** for styling
- **TypeScript** for type safety

### Component Libraries
- **Neo-Brutalism UI Library** (base) — Instant brutalist aesthetic
- **shadcn/ui** (supplemental) — Complex interactive components only
- **Lucide React** — Icons

### Data Layer
- **Simple JSON file** (`/data/slides.json`) — Manual curation
- **Static export** — Zero server costs, CDN deployment

### Deployment
- Vercel, Netlify, or GitHub Pages
- Static site generation

## Data Model

### slides.json Structure

```json
[
  {
    "id": "01",
    "title": "Modern React Patterns",
    "description": "Explore advanced React patterns for building scalable applications",
    "thumbnail": "/thumbnails/01-react-patterns.png",
    "sourceUrl": "https://react-patterns.vercel.app",
    "githubUrl": "https://github.com/username/react-patterns",
    "prompt": "Create a presentation about advanced React patterns...",
    "author": {
      "name": "Jane Developer",
      "url": "https://github.com/janedev"
    },
    "tags": ["react", "patterns", "frontend"],
    "featured": true
  }
]
```

### Fields

- `id` — Unique identifier for routing
- `title` — Display name
- `description` — Short overview for grid cards
- `thumbnail` — Local image file path
- `sourceUrl` — Live demo URL
- `githubUrl` — Repository link
- `prompt` — AI prompt used to generate (optional)
- `author` — Creator information
- `tags` — For future filtering
- `featured` — Highlight special decks

## UI/UX Design

### Layout Structure

**Homepage:**
- Hero section with bold neo-brutalist typography
- Responsive masonry grid (3 → 2 → 1 columns)
- Cards with rotating accent colors
- Hover lift animations

**Slide Viewer (Modal):**
- Full-screen overlay with fade + scale animation
- Embedded iframe for slides
- Three action buttons:
  - **View Full** — Opens source URL in new tab
  - **GitHub** — Opens repository
  - **Copy Prompt** — Copies prompt to clipboard with toast notification

**Navigation:**
- Minimal header with logo + 2 links (About, GitHub)
- No complex navigation needed for prototype

### Visual Style

**Neo-Brutalism (Bold):**
- Thick black borders (3px)
- Hard shadows (4px 4px 0px #000)
- High contrast colors
- Flat aesthetic, no gradients
- Bold typography

**Animations:**
- Smooth transitions (150-300ms)
- Hover lift effects on cards
- Modal fade + scale on open/close
- Button press effects
- Loading states with subtle motion
- Toast notifications for feedback

**Responsiveness:**
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: 1-column stacked

## Color Palette

Multi-color neo-brutalism palette (rotating across cards):

- Cyan: `#79F7FF`
- Pink: `#FFA6F6`
- Lime: `#7df752`
- Violet: `#A8A6FF`
- Yellow: `#FFE500`
- Orange: `#FFC29F`
- Red: `#FF9F9F`

**Design Tokens:**
- Borders: `3px solid #000`
- Shadows: `4px 4px 0px #000` (hover: `6px 6px 0px #000`)
- Backgrounds: `#fff` and `#f5f5f5`
- Text: Near-black for readability

**Typography:**
- Headings: System UI fonts, weight 700-800, tight letter-spacing
- Body: System fonts, normal weight
- Monospace: For code snippets in prompts

## Component Structure

```
app/
├── layout.tsx              # Root layout with navigation header
├── page.tsx                # Homepage grid of slide cards
├── globals.css             # Global styles + Tailwind setup
└── components/
    ├── Header.tsx          # Logo + nav links
    ├── SlideCard.tsx       # Individual card in grid
    ├── SlideGrid.tsx       # Masonry grid container
    ├── SlideModal.tsx      # Modal viewer with iframe
    ├── ActionButton.tsx    # Brutalist buttons (View, GitHub, Copy)
    └── PromptCopy.tsx      # Copy-to-clipboard functionality
```

### Component Details

**SlideCard**
- Displays thumbnail, title, description
- Hover animation (lift + shadow increase)
- Rotating accent colors from palette
- Click → opens modal

**SlideGrid**
- Masonry layout container
- Responsive grid (3/2/1 columns)
- Consistent gap spacing

**SlideModal**
- Full-screen overlay with backdrop
- Fade + scale animation (300ms)
- Iframe for embedded slides
- Action buttons row
- ESC key / click outside to close

**ActionButton**
- 3px black border
- Hover: `translate(-2px, -2px)` + shadow
- Active: press effect
- Multiple color variants

## File Structure

```
HSlides/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
│       ├── Header.tsx
│       ├── SlideCard.tsx
│       ├── SlideGrid.tsx
│       ├── SlideModal.tsx
│       └── ActionButton.tsx
├── data/
│   └── slides.json                    # 5-10 curated slides
├── public/
│   └── thumbnails/                     # Slide preview images
├── lib/
│   └── utils.ts                        # Helper functions
├── components/
│   └── ui/                             # shadcn/ui components
│       ├── dialog.tsx
│       └── toast.tsx
├── docs/
│   └── superpowers/specs/
│       └── 2025-06-16-hslides-design.md
├── tailwind.config.js                  # Neo-brutalism colors
├── next.config.js
├── tsconfig.json
└── package.json
```

## Key Features

### Homepage
- Hero section with bold typography
- Responsive masonry grid
- Cards with rotating accent colors
- Hover lift animations
- Click → modal open

### Modal Viewer
- Fade + scale entrance (300ms)
- Embedded iframe for slides
- Three action buttons (View Full, GitHub, Copy Prompt)
- Keyboard support (ESC to close)
- Click outside to close

### Interactions
- Smooth transitions (150-300ms)
- Hover effects on interactive elements
- Loading states
- Copy confirmation toast

## Technical Considerations

### Thumbnail Generation
- **Prototype:** Manual screenshots
- **Future:** Automated capture with Puppeteer

### Iframe Security
- Use `sandbox` attribute for embedded content
- Validate URLs before rendering
- Set content security policy headers

### Performance
- Lazy load images below fold
- Optimize thumbnail images (WebP format)
- Static export for instant loading
- CDN deployment

### Accessibility
- Keyboard navigation (Enter/Space to open modal)
- Focus trapping in modal
- ARIA labels for screen readers
- Color contrast meets WCAG AA
- Semantic HTML structure

## Implementation Notes

### Neo-Brutalism UI Library Integration
1. Clone the library repository
2. Copy needed components to `/app/components`
3. Copy color palette to `tailwind.config.js`
4. Customize as needed for platform

### shadcn/ui Integration
1. Install shadcn/ui CLI
2. Initialize in project
3. Add components as needed (Dialog, Toast)
4. Apply brutalist styling manually to shadcn components

### Content Population
1. Create `slides.json` with 5-10 entries
2. Generate thumbnails manually or with screenshot tool
3. Place thumbnails in `/public/thumbnails/`
4. Test grid layout with varied aspect ratios

## Success Criteria

### Prototype Goals
- [ ] Showcase 5-10 curated HTML slide decks
- [ ] Visually striking neo-brutalist design
- [ ] Smooth animations and interactions
- [ ] Functional modal viewer with iframes
- [ ] Copy prompt to clipboard works
- [ ] Responsive across devices
- [ ] Static export builds successfully
- [ ] Deployed to accessible URL

### Quality Metrics
- Page load time < 2 seconds
- Lighthouse score > 90
- All interactions accessible via keyboard
- Color contrast WCAG AA compliant

## Future Considerations

**Phase 2 (Post-Prototype):**
- User upload functionality
- GitHub repo crawling automation
- Search and filtering
- User accounts and profiles
- Rating and popularity metrics
- Expanded content library

**Technical Debt Tracking:**
- Manual thumbnail generation → automate
- Hardcoded JSON → database/backend
- No caching → implement CDN caching
- No analytics → add usage tracking
