---
name: About Page Structure
description: Location, section layout, and design decisions for the TripNexa /about page
type: project
---

The about page lives at `app/about/page.tsx` and is a standalone App Router page (no nested layout).

**Why:** Standalone page using shared root layout (`app/layout.tsx`), imports `Navbar` from `@/components/Navbar` directly — same pattern as `app/page.tsx`.

**Sections in order:**
1. Hero/Intro — centered text block, `max-w-4xl`, `py-20 md:py-28`
2. What We Do — 6 feature cards in a responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` grid on a white background band
3. Why TripNexa — bullet list with inline `IconCheck` SVG, secondary color subtext
4. Vision & Mission — side-by-side cards: Vision on `#FAFAF8`, Mission on `#28536B` (inverted)
5. Our Promise — centered text block
6. CTA — full-width `#28536B` band, white "Start Planning" button linking to "/"

**Design decisions:**
- All border radii use `rounded-[8px]` — no `rounded-full` anywhere per brief
- Icons are inline SVG components (no external icon library) to avoid dependencies
- Mission card uses inverted colors (dark background, white text) to create visual contrast against the Vision card
- CTA button is white-on-dark (inverted primary) since it sits on the primary color background

**How to apply:** When adding sub-pages or route segments, follow this same pattern: create `app/<route>/page.tsx`, import `Navbar`, wrap in `<main className="min-h-screen bg-[#FAFAF8]">`.
