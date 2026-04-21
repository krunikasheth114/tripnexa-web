---
name: TripNexa Homepage Structure
description: Component tree and file layout for the TripNexa Gujarat tourism homepage built on 2026-04-01
type: project
---

Homepage built with 6 components composing the main page:

- `components/Navbar.tsx` — sticky top nav with logo, links, CTA button, mobile hamburger
- `components/HeroSection.tsx` — full-viewport hero with background image, heading, subtitle, two CTA buttons
- `components/CategoryFilter.tsx` — client component with horizontal scrollable pill chips for filtering
- `components/DestinationCard.tsx` — reusable card with image zoom on hover, gradient overlay, category badge
- `components/DestinationsSection.tsx` — grid section rendering 3 DestinationCards from mock data
- `utils/mockData.ts` — typed mock data (destinations, categories, heroImage)
- `app/page.tsx` — composes all sections into the homepage
- `app/globals.css` — Tailwind v4 theme with custom colors (primary, secondary, brand-bg) + scrollbar-hide utility
- `next.config.ts` — configured with Unsplash remotePatterns for next/image

**Why:** Initial homepage build for the TripNexa Gujarat tourism platform.
**How to apply:** Use these components as the foundation. Extend with more sections (Featured, Footer, etc.) as needed.
