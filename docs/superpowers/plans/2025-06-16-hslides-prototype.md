# HSlides Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a neo-brutalist HTML slides discovery platform with 5-10 curated slides, Dribbble-style masonry grid browsing, and modal viewer with embedded previews.

**Architecture:** Next.js 14+ with App Router, static export for deployment. Neo-Brutalism UI Library as component base, shadcn/ui for complex interactions. JSON data layer with Supabase preparation for seamless Phase 2 migration. Vercel deployment.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Neo-Brutalism UI Library, shadcn/ui, Lucide React, Supabase (prep)

---

## File Structure

**New files to create:**
```
HSlides/
├── app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Homepage grid
│   ├── globals.css                   # Global styles + Tailwind
│   └── components/
│       ├── Header.tsx                # Logo + navigation
│       ├── SlideCard.tsx             # Individual slide card
│       ├── SlideGrid.tsx             # Masonry grid container
│       ├── SlideModal.tsx            # Modal viewer
│       ├── ActionButton.tsx          # Brutalist button
│       └── PromptCopy.tsx            # Copy functionality
├── data/
│   └── slides.json                   # Curated slides data
├── lib/
│   └── utils.ts                      # Utilities (cn function)
├── components/ui/
│   ├── dialog.tsx                    # shadcn dialog (if needed)
│   └── toast.tsx                     # shadcn toast (if needed)
├── public/thumbnails/                # Slide images
├── tailwind.config.js                # Neo-brutalism colors
├── next.config.js                    # Next.js config
├── tsconfig.json                     # TypeScript config
├── .env.local                        # Supabase env vars
└── package.json                      # Dependencies
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `.env.local`

- [ ] **Step 1: Create package.json with dependencies**

```bash
cat > package.json << 'EOF'
{
  "name": "hslides",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "^14.2.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-toast": "^1.1.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.378.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
EOF
```

- [ ] **Step 2: Create next.config.js for static export**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create .env.local for Supabase (placeholder values)**

```bash
cat > .env.local << 'EOF'
# Supabase - Set up at https://supabase.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EOF
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: Dependencies installed successfully

- [ ] **Step 6: Commit project initialization**

```bash
git add package.json next.config.js tsconfig.json .env.local
git commit -m "feat: initialize Next.js project with dependencies"
```

---

## Task 2: Setup Tailwind CSS with Neo-Brutalism Colors

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `app/globals.css`

- [ ] **Step 1: Create tailwind.config.js with neo-brutalism palette**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Neo-brutalism accent colors
        cyan: {
          DEFAULT: "#79F7FF",
        },
        pink: {
          DEFAULT: "#FFA6F6",
        },
        lime: {
          DEFAULT: "#7df752",
        },
        violet: {
          DEFAULT: "#A8A6FF",
        },
        yellow: {
          DEFAULT: "#FFE500",
        },
        orange: {
          DEFAULT: "#FFC29F",
        },
        red: {
          DEFAULT: "#FF9F9F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "scale-in": "scale-in 0.3s ease-out",
        "scale-out": "scale-out 0.2s ease-in",
      },
      boxShadow: {
        "brutal": "4px 4px 0px #000",
        "brutal-lg": "6px 6px 0px #000",
        "brutal-sm": "2px 2px 0px #000",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

- [ ] **Step 2: Create postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Create app/globals.css with neo-brutalism base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Neo-brutalism button base styles */
@layer components {
  .btn-brutal {
    @apply border-3 border-black px-6 py-3 font-semibold transition-all duration-150;
    @apply hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5;
    @apply active:shadow-brutal-sm active:translate-x-0 active:translate-y-0;
  }

  .card-brutal {
    @apply border-3 border-black bg-white shadow-brutal transition-all duration-200;
    @apply hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1;
  }

  .input-brutal {
    @apply border-3 border-black px-4 py-2 focus:outline-none;
  }
}
```

- [ ] **Step 4: Commit Tailwind setup**

```bash
git add tailwind.config.js postcss.config.js app/globals.css
git commit -m "feat: setup Tailwind CSS with neo-brutalism palette"
```

---

## Task 3: Create Utility Functions

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Create lib/utils.ts with cn utility**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
}
```

- [ ] **Step 2: Commit utility functions**

```bash
git add lib/utils.ts
git commit -m "feat: add utility functions (cn, copyToClipboard)"
```

---

## Task 4: Create Data Structure

**Files:**
- Create: `data/slides.json`

- [ ] **Step 1: Create data/slides.json with sample data**

```json
[
  {
    "id": "01",
    "title": "Modern React Patterns",
    "description": "Explore advanced React patterns for building scalable applications",
    "thumbnail": "/thumbnails/react-patterns.png",
    "sourceUrl": "https://react-patterns.vercel.app",
    "githubUrl": "https://github.com/username/react-patterns",
    "prompt": "Create a presentation about advanced React patterns including compound components, render props, and custom hooks. Use modern design with code examples.",
    "author": {
      "name": "Jane Developer",
      "url": "https://github.com/janedev"
    },
    "tags": ["react", "patterns", "frontend"],
    "featured": true
  },
  {
    "id": "02",
    "title": "Design Systems 101",
    "description": "Building scalable design systems with tokens and components",
    "thumbnail": "/thumbnails/design-systems.png",
    "sourceUrl": "https://design-systems.vercel.app",
    "githubUrl": "https://github.com/username/design-systems",
    "prompt": "Create a beginner-friendly introduction to design systems, covering tokens, components, and documentation.",
    "author": {
      "name": "Alex Designer",
      "url": "https://github.com/alexdesigner"
    },
    "tags": ["design-systems", "ui", "tokens"],
    "featured": true
  },
  {
    "id": "03",
    "title": "CSS Grid Mastery",
    "description": "Advanced layout techniques with CSS Grid",
    "thumbnail": "/thumbnails/css-grid.png",
    "sourceUrl": "https://css-grid.vercel.app",
    "githubUrl": "https://github.com/username/css-grid",
    "prompt": "Create a comprehensive guide to CSS Grid with visual examples and real-world layout patterns.",
    "author": {
      "name": "Sam CSS",
      "url": "https://github.com/samcss"
    },
    "tags": ["css", "grid", "layout"],
    "featured": false
  },
  {
    "id": "04",
    "title": "TypeScript Best Practices",
    "description": "Write better TypeScript with practical patterns",
    "thumbnail": "/thumbnails/typescript.png",
    "sourceUrl": "https://typescript-patterns.vercel.app",
    "githubUrl": "https://github.com/username/typescript-patterns",
    "prompt": "Create a presentation on TypeScript best practices, including types, generics, and utility types.",
    "author": {
      "name": "Taylor Typed",
      "url": "https://github.com/taylortyped"
    },
    "tags": ["typescript", "types", "patterns"],
    "featured": false
  },
  {
    "id": "05",
    "title": "Accessibility Fundamentals",
    "description": "Building inclusive web experiences",
    "thumbnail": "/thumbnails/a11y.png",
    "sourceUrl": "https://a11y-fundamentals.vercel.app",
    "githubUrl": "https://github.com/username/a11y",
    "prompt": "Create an accessible presentation covering ARIA, keyboard navigation, and screen readers.",
    "author": {
      "name": "Casey A11y",
      "url": "https://github.com/caseya11y"
    },
    "tags": ["a11y", "accessibility", "inclusive"],
    "featured": true
  }
]
```

- [ ] **Step 2: Commit data structure**

```bash
git add data/slides.json
git commit -m "feat: add sample slide data"
```

---

## Task 5: Build ActionButton Component

**Files:**
- Create: `app/components/ActionButton.tsx`

- [ ] **Step 1: Create ActionButton component with brutalist styling**

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'cyan' | 'pink' | 'lime' | 'violet' | 'yellow' | 'orange' | 'red';
  className?: string;
  disabled?: boolean;
}

const variantColors = {
  cyan: 'bg-cyan',
  pink: 'bg-pink',
  lime: 'bg-lime',
  violet: 'bg-violet',
  yellow: 'bg-yellow',
  orange: 'bg-orange',
  red: 'bg-red',
};

export function ActionButton({
  children,
  onClick,
  href,
  variant = 'yellow',
  className,
  disabled = false,
}: ActionButtonProps) {
  const baseClassName = cn(
    'btn-brutal',
    variantColors[variant],
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Commit ActionButton component**

```bash
git add app/components/ActionButton.tsx
git commit -m "feat: add ActionButton component with neo-brutalism styling"
```

---

## Task 6: Build Header Component

**Files:**
- Create: `app/components/Header.tsx`

- [ ] **Step 1: Create Header component**

```typescript
import React from 'react';
import Link from 'next/link';
import { ActionButton } from './ActionButton';

export function Header() {
  return (
    <header className="border-b-3 border-black bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight hover:text-gray-700 transition-colors"
          >
            HSLIDES
          </Link>
          <nav className="flex gap-3">
            <ActionButton variant="cyan" href="/about">
              About
            </ActionButton>
            <ActionButton variant="pink" href="https://github.com/Dcyaprogrammer/HSlides">
              GitHub
            </ActionButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit Header component**

```bash
git add app/components/Header.tsx
git commit -m "feat: add Header component with navigation"
```

---

## Task 7: Build SlideCard Component

**Files:**
- Create: `app/components/SlideCard.tsx`

- [ ] **Step 1: Create SlideCard component**

```typescript
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SlideCardProps {
  slide: Slide;
  onClick: () => void;
  colorVariant: 'cyan' | 'pink' | 'lime' | 'violet' | 'yellow' | 'orange' | 'red';
}

export function SlideCard({ slide, onClick, colorVariant }: SlideCardProps) {
  const colorClasses = {
    cyan: 'from-cyan to-violet',
    pink: 'from-pink to-yellow',
    lime: 'from-lime to-orange',
    violet: 'from-violet to-cyan',
    yellow: 'from-yellow to-pink',
    orange: 'from-orange to-lime',
    red: 'from-red to-yellow',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'card-brutal cursor-pointer p-4',
        'group hover:z-10'
      )}
    >
      <div className="relative aspect-video mb-3 overflow-hidden border-3 border-black bg-gradient-to-br">
        <div
          className={cn(
            'absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity',
            colorClasses[colorVariant]
          )}
        />
        <Image
          src={slide.thumbnail}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700 transition-colors">
        {slide.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {slide.description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit SlideCard component**

```bash
git add app/components/SlideCard.tsx
git commit -m "feat: add SlideCard component with hover animations"
```

---

## Task 8: Build SlideGrid Component

**Files:**
- Create: `app/components/SlideGrid.tsx`

- [ ] **Step 1: Create SlideGrid component**

```typescript
import React from 'react';
import { SlideCard } from './SlideCard';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SlideGridProps {
  slides: Slide[];
  onSlideClick: (slideId: string) => void;
}

const colorVariants: Array<'cyan' | 'pink' | 'lime' | 'violet' | 'yellow' | 'orange' | 'red'> = [
  'cyan', 'pink', 'lime', 'violet', 'yellow', 'orange', 'red',
];

export function SlideGrid({ slides, onSlideClick }: SlideGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {slides.map((slide, index) => (
        <SlideCard
          key={slide.id}
          slide={slide}
          onClick={() => onSlideClick(slide.id)}
          colorVariant={colorVariants[index % colorVariants.length]}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit SlideGrid component**

```bash
git add app/components/SlideGrid.tsx
git commit -m "feat: add SlideGrid component with responsive layout"
```

---

## Task 9: Build SlideModal Component

**Files:**
- Create: `app/components/SlideModal.tsx`

- [ ] **Step 1: Create SlideModal component**

```typescript
'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { copyToClipboard } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  sourceUrl: string;
  githubUrl: string;
  prompt?: string;
}

interface SlideModalProps {
  slide: Slide | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SlideModal({ slide, isOpen, onClose }: SlideModalProps) {
  const handleCopyPrompt = useCallback(async () => {
    if (slide?.prompt) {
      const success = await copyToClipboard(slide.prompt);
      if (success) {
        alert('Prompt copied to clipboard!');
      }
    }
  }, [slide?.prompt]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!slide || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white border-4 border-black shadow-brutal-lg max-w-5xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border-2 border-black bg-yellow hover:shadow-brutal transition-all"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 pr-12">{slide.title}</h2>

        <div className="relative aspect-video border-3 border-black bg-gray-100 mb-6">
          <iframe
            src={slide.sourceUrl}
            className="w-full h-full"
            title={slide.title}
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionButton variant="cyan" href={slide.sourceUrl}>
            View Full
          </ActionButton>
          <ActionButton variant="pink" href={slide.githubUrl}>
            GitHub
          </ActionButton>
          {slide.prompt && (
            <ActionButton
              variant="lime"
              onClick={handleCopyPrompt}
            >
              Copy Prompt
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit SlideModal component**

```bash
git add app/components/SlideModal.tsx
git commit -m "feat: add SlideModal component with iframe viewer"
```

---

## Task 10: Build Root Layout

**Files:**
- Create: `app/layout.tsx'

- [ ] **Step 1: Create root layout**

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HSlides - HTML Slides Platform for Everyone',
  description: 'Discover beautiful HTML slide presentations from the community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit root layout**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Header"
```

---

## Task 11: Build Homepage

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create homepage with grid and modal**

```typescript
'use client';

import React, { useState } from 'react';
import slides from '@/data/slides.json';
import { SlideGrid } from './components/SlideGrid';
import { SlideModal } from './components/SlideModal';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sourceUrl: string;
  githubUrl: string;
  prompt?: string;
}

export default function HomePage() {
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  const selectedSlide = slides.find((s) => s.id === selectedSlideId) as Slide | undefined;

  const handleCloseModal = () => {
    setSelectedSlideId(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Discover HTML Slides
        </h1>
        <p className="text-xl text-gray-600">
          Beautiful presentations from the community
        </p>
      </div>

      <SlideGrid
        slides={slides}
        onSlideClick={setSelectedSlideId}
      />

      <SlideModal
        slide={selectedSlide || null}
        isOpen={!!selectedSlideId}
        onClose={handleCloseModal}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit homepage**

```bash
git add app/page.tsx
git commit -m "feat: add homepage with slide grid and modal"
```

---

## Task 12: Add Placeholder Thumbnails

**Files:**
- Create: `public/thumbnails/.gitkeep`

- [ ] **Step 1: Create thumbnails directory placeholder**

```bash
mkdir -p public/thumbnails
touch public/thumbnails/.gitkeep
```

- [ ] **Step 2: Create placeholder gradient images**

```bash
# For prototype, create simple SVG placeholders
for slide in "react-patterns" "design-systems" "css-grid" "typescript" "a11y"; do
  cat > "public/thumbnails/${slide}.png" << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==
EOF
done
```

Note: Replace with actual screenshots before deployment

- [ ] **Step 3: Commit thumbnails setup**

```bash
git add public/thumbnails/
git commit -m "feat: add thumbnail placeholder images"
```

---

## Task 13: Test and Build

**Files:**
- Test: Build verification

- [ ] **Step 1: Run development server**

```bash
npm run dev
```

Expected: Server starts at http://localhost:3000

- [ ] **Step 2: Verify homepage loads**

Visit http://localhost:3000 and check:
- Grid displays 5 slide cards
- Header shows logo and navigation
- Cards have brutalist styling
- Hover effects work on cards

- [ ] **Step 3: Verify modal functionality**

Click on a card and check:
- Modal opens with fade + scale animation
- Iframe displays (may show placeholder)
- Three buttons appear (View Full, GitHub, Copy Prompt)
- ESC key closes modal
- Click outside closes modal

- [ ] **Step 4: Test responsive design**

Resize browser and check:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

- [ ] **Step 5: Build static export**

```bash
npm run build
```

Expected: Build completes successfully, `out/` directory created

- [ ] **Step 6: Test static build**

```bash
npm start
```

Visit http://localhost:3000 and verify all features work

- [ ] **Step 7: Commit build verification**

```bash
git add .
git commit -m "test: verify build and functionality"
```

---

## Task 14: Setup Supabase (Preparation for Phase 2)

**Files:**
- Modify: `data/slides.json` (already matches schema)

- [ ] **Step 1: Create Supabase project**

Visit https://supabase.com and create a new project:
- Project name: hslides
- Region: closest to your users
- Save project URL and anon key

- [ ] **Step 2: Update .env.local with Supabase credentials**

```bash
# Replace with actual values from Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

- [ ] **Step 3: Create database schema in Supabase SQL Editor**

```sql
-- Create slides table
CREATE TABLE slides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  source_url TEXT,
  github_url TEXT,
  prompt TEXT,
  author_name TEXT,
  author_url TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_slides_featured ON slides(featured DESC, created_at DESC);

-- Enable RLS
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON slides FOR SELECT
TO public
USING (true);

-- Allow authenticated inserts (for future Phase 2)
CREATE POLICY "Allow authenticated inserts"
ON slides FOR INSERT
TO authenticated
WITH CHECK (true);
```

- [ ] **Step 4: Create storage bucket for thumbnails**

In Supabase dashboard:
1. Navigate to Storage
2. Create new bucket: `thumbnails`
3. Make bucket public
4. Add RLS policy for public read access

- [ ] **Step 5: Add sample data to Supabase**

```sql
INSERT INTO slides (id, title, description, thumbnail, source_url, github_url, prompt, author_name, author_url, tags, featured) VALUES
  ('01', 'Modern React Patterns', 'Explore advanced React patterns for building scalable applications', '/thumbnails/react-patterns.png', 'https://react-patterns.vercel.app', 'https://github.com/username/react-patterns', 'Create a presentation about advanced React patterns...', 'Jane Developer', 'https://github.com/janedev', ARRAY['react', 'patterns', 'frontend'], true),
  ('02', 'Design Systems 101', 'Building scalable design systems with tokens and components', '/thumbnails/design-systems.png', 'https://design-systems.vercel.app', 'https://github.com/username/design-systems', 'Create a beginner-friendly introduction to design systems...', 'Alex Designer', 'https://github.com/alexdesigner', ARRAY['design-systems', 'ui', 'tokens'], true),
  ('03', 'CSS Grid Mastery', 'Advanced layout techniques with CSS Grid', '/thumbnails/css-grid.png', 'https://css-grid.vercel.app', 'https://github.com/username/css-grid', 'Create a comprehensive guide to CSS Grid...', 'Sam CSS', 'https://github.com/samcss', ARRAY['css', 'grid', 'layout'], false),
  ('04', 'TypeScript Best Practices', 'Write better TypeScript with practical patterns', '/thumbnails/typescript.png', 'https://typescript-patterns.vercel.app', 'https://github.com/username/typescript-patterns', 'Create a presentation on TypeScript best practices...', 'Taylor Typed', 'https://github.com/taylortyped', ARRAY['typescript', 'types', 'patterns'], false),
  ('05', 'Accessibility Fundamentals', 'Building inclusive web experiences', '/thumbnails/a11y.png', 'https://a11y-fundamentals.vercel.app', 'https://github.com/username/a11y', 'Create an accessible presentation covering ARIA...', 'Casey A11y', 'https://github.com/caseya11y', ARRAY['a11y', 'accessibility', 'inclusive'], true);
```

- [ ] **Step 6: Document Supabase setup in README**

```bash
cat > README.md << 'EOF'
# HSlides

HTML Slides Platform for Everyone

## Development

```bash
npm install
npm run dev
```

## Deployment

This project uses:
- **Vercel** for frontend hosting
- **Supabase** for backend (Phase 2)

### Supabase Setup

1. Create project at https://supabase.com
2. Run SQL from Task 14 in SQL Editor
3. Create storage bucket `thumbnails`
4. Add env vars to `.env.local` and Vercel

### Build

```bash
npm run build
```

Static files output to `out/` directory.

## Phase 2 Migration

When ready to migrate from JSON to Supabase:
1. Install `@supabase/supabase-js`
2. Replace `import slides from '@/data/slides.json'` with Supabase queries
3. No architecture changes needed
EOF
```

- [ ] **Step 7: Commit Supabase setup**

```bash
git add .env.local README.md
git commit -m "feat: setup Supabase for Phase 2 migration"
```

---

## Task 15: Deploy to Vercel

**Files:**
- Deploy: Vercel deployment

- [ ] **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

- [ ] **Step 2: Login to Vercel**

```bash
vercel login
```

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel
```

Follow prompts:
- Link to existing project or create new
- Framework preset: Next.js
- Root directory: `.`
- Build command: `npm run build`
- Output directory: `out`
- Install command: `npm install`
- Dev command: `npm run dev`

- [ ] **Step 4: Add environment variables in Vercel dashboard**

1. Go to project settings in Vercel dashboard
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- [ ] **Step 5: Verify deployment**

Visit the deployed URL and verify:
- Homepage loads
- Grid displays correctly
- Modal opens on card click
- Responsive design works
- No console errors

- [ ] **Step 6: Add custom domain (optional)**

In Vercel dashboard:
1. Go to Settings → Domains
2. Add custom domain
3. Configure DNS records

- [ ] **Step 7: Commit deployment configuration**

```bash
git add .vercelignore
git commit -m "chore: configure Vercel deployment"
```

---

## Task 16: Replace Placeholder Thumbnails with Real Screenshots

**Files:**
- Modify: `public/thumbnails/*.png`

- [ ] **Step 1: Capture screenshots for each slide**

Option A - Manual:
1. Visit each slide URL
2. Take screenshot at 16:9 aspect ratio
3. Save to `public/thumbnails/`

Option B - Automated (with Puppeteer):
Create script in `scripts/capture-thumbnails.js` (future enhancement)

Required thumbnails:
- react-patterns.png
- design-systems.png
- css-grid.png
- typescript.png
- a11y.png

- [ ] **Step 2: Optimize images**

```bash
# Install image optimization tool
npm install -g sharp-cli

# Optimize all thumbnails
for img in public/thumbnails/*.png; do
  sharp-cli "$img" -o "$img" --png.quality 80
done
```

- [ ] **Step 3: Commit real thumbnails**

```bash
git add public/thumbnails/
git commit -m "feat: add real slide thumbnails"
git push
```

---

## Success Criteria Verification

Run through this checklist before declaring the prototype complete:

- [ ] **Homepage displays 5 slide cards** in brutalist grid layout
- [ ] **Neo-brutalism styling applied**: thick borders, hard shadows, vibrant colors
- [ ] **Hover animations work** on cards (lift + shadow increase)
- [ ] **Clicking card opens modal** with fade + scale animation
- [ ] **Modal displays iframe** with embedded slides
- [ ] **Three action buttons work**: View Full, GitHub, Copy Prompt
- [ ] **Copy Prompt copies to clipboard** with alert confirmation
- [ ] **ESC key closes modal**
- [ ] **Click outside modal closes it**
- [ ] **Responsive layout**: 3 columns (desktop), 2 (tablet), 1 (mobile)
- [ ] **No console errors**
- [ ] **Build succeeds**: `npm run build` creates `out/` directory
- [ ] **Static export works**: `npm start` serves from `out/`
- [ ] **Deployed to Vercel** at accessible URL
- [ ] **Supabase project created** with database schema
- [ ] **Environment variables configured** locally and on Vercel

---

## Phase 2 Migration Notes

When transitioning from JSON to Supabase:

1. **Install Supabase client:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase client utility:**
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

3. **Replace JSON import with Supabase query:**
   ```typescript
   // In app/page.tsx
   import { supabase } from '@/lib/supabase';

   // Replace: import slides from '@/data/slides.json';
   // With:
   const { data: slides } = await supabase
     .from('slides')
     .select('*')
     .order('created_at', { ascending: false });
   ```

4. **Move to dynamic rendering:**
   - Remove `output: 'export'` from `next.config.js`
   - Change page to async component
   - Deploy dynamic app to Vercel

No component changes needed — data layer only.

---

## End of Implementation Plan

**Total estimated time:** 3-4 hours for prototype completion

**Next steps after prototype:**
- Gather user feedback
- Identify most requested features
- Plan Phase 2 enhancements (uploads, search, user accounts)
- Begin Supabase migration
