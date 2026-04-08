# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

Migration of a Shopify site (Avante v12.0.0 theme) to Next.js. The site is a **100% static informational portal** promoting Monterrey as a FIFA 2026 World Cup host city. No e-commerce, no CMS, no forms. Content is hardcoded in components.

**Migration plan:** See `PLAN-MIGRACION-NEXTJS.md` for the full migration roadmap, file mappings, and phase-by-phase instructions.

## Shopify Reference Files — READ ONLY

The `shopify_files/` directory contains the original Shopify theme files used as migration reference. **NEVER create, edit, or delete files in `shopify_files/`** unless explicitly authorized by the user. These files are source-of-truth for design tokens, translations, and content structure.

Currently available:
- `shopify_files/config/settings_data.json` — Design tokens (colors, typography, spacing, radii)
- `shopify_files/config/settings_schema.json` — Schema definitions for theme settings
- `shopify_files/locales/*.json` — Translation files (es, en, fr, de, it) + schema files

As the user adds more Shopify files (sections, snippets, templates, assets, layout), they will appear here. Always read from this directory when migrating a component.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16+ (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS v4 (via @tailwindcss/postcss) |
| Components UI | shadcn/ui |
| Carousels | Swiper |
| Animations | Framer Motion |
| i18n | next-intl |
| Deploy target | Vercel (static export) |

## Architecture

Target structure (being built incrementally):

```
src/
  app/[locale]/          # i18n routing — all pages nested under locale
    layout.tsx           # Root layout (replaces theme.liquid)
    page.tsx             # Home
    .../page.tsx         # ~38 static pages
  components/
    layout/              # Header, Footer, MegaMenu, AnnouncementBar, Flyout, BackToTop
    sections/            # Page-level components (VideoBanner, RichText, Banners, etc.)
    ui/                  # Atomic components (Button, Icon, Logo, CountdownTimer, etc.)
  lib/                   # Utils, constants
  i18n/                  # next-intl config (routing.ts, request.ts)
  messages/              # Translation JSON files (es, en, fr, de, it)
  styles/sections/       # CSS Modules for complex sections
```

## Key Conventions

### Next.js 16 Breaking Changes
- **`proxy.ts` replaces `middleware.ts`** for request interception (including i18n redirects)
- **`params` is async** — always use `await params` in pages/layouts
- **Type helpers**: Use `PageProps<'/[locale]'>` and `LayoutProps<'/[locale]'>` for route typing
- **Always check** `node_modules/next/dist/docs/` before using any Next.js API — conventions may differ from training data

### Tailwind CSS v4
- Uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Design tokens defined via `@theme inline {}` in globals.css
- No `tailwind.config.ts` — configuration is CSS-native

### i18n
- 5 locales: `es` (default), `en`, `fr`, `de`, `it`
- All pages under `app/[locale]/`
- Translations in `src/messages/*.json`
- Static rendering via `generateStaticParams` in root layout

### Component Patterns
- **Server Components** by default — only add `"use client"` when needed (interactivity, browser APIs, Swiper, Framer Motion)
- **Breakpoint principal: 920px = md** — matches Avante theme's main breakpoint
- When migrating Liquid to React:
  - `{{ variable }}` → props or hardcoded constants
  - `{% if %}` → conditional JSX
  - `{% for %}` → `.map()`
  - `{% render 'snippet' %}` → import component
  - `section.settings.*` → props
  - Shopify CDN URLs → local paths (`/images/`, `/videos/`)

### Static Export
- Target: `output: 'export'` in next.config.ts
- No dynamic server features (no cookies, no rewrites, no server actions)
- Images: use custom loader or `unoptimized: true`

### Brand Colors
- Red: `#db0138`
- Blue dark: `#1f3359`
- Blue: `#2e4785`
- Blue light: `#82bbe8`
