---
name: TripNexa Design System v3 — Dark Redesign
description: Current design system after 2026-05-19 home page redesign. Dark zinc bg, orange-500 accent, Playfair/Inter fonts, rounded-[8px] everywhere.
type: project
---

## Current System (v3) — Home page and new pages

Dark, premium Gen-Z aesthetic applied to home page and new pages (hotels, car-rentals) in 2026-05-19 redesign.

**Colors**
- Background: `zinc-950` — page bg
- Surface alternate: `zinc-900` — card/section alt bg
- Accent: `orange-500` / hover `orange-600` — all CTAs, badges, active states
- Text Primary: `white`
- Text Muted: `zinc-400`
- Text Subtle: `zinc-500`
- Borders: `white/5`, `white/10`, `white/15`

**Fonts** (same as v2 — loaded in `app/layout.tsx`)
- Display/headings: `font-[family-name:var(--font-playfair)]`
- Body: Inter via `--font-inter` CSS variable

**Buttons (v3)**
- Primary: `bg-orange-500 text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-orange-600 transition-colors duration-200`
- Secondary: `border border-white/15 text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-white/5 transition-colors duration-200`
- Navbar CTA: `bg-orange-500 text-white px-5 py-2 rounded-[8px] text-sm font-semibold hover:bg-orange-600`

**Cards (v3)**
- Border radius: `rounded-[8px]` — everywhere, no exceptions for new components
- Border: `border border-white/5`
- Hover: `hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 hover:scale-105 transition-all duration-300`
- Image zoom: `group-hover:scale-110 transition-transform duration-500`

**Sections**
- Padding: `px-6 py-20 md:py-24`
- Container: `max-w-7xl mx-auto`
- Section eyebrow label: `text-xs font-semibold uppercase tracking-[0.2em] text-orange-400`

## Legacy System (v2) — Existing pages only

The teal/terracotta palette is still active in `globals.css` CSS variables and used by existing pages (destinations, about, contact, footer). Do NOT change these unless asked.

- Primary: `#28536B`, Secondary: `#C2948A`, Background: `#FAFAF8`, Dark: `#0A1E2A`

**Why:** User requested full dark redesign for home page on 2026-05-19. Old palette kept for existing non-home pages to avoid breaking changes.
**How to apply:** New home-page components and new pages use v3 dark system. Existing pages (about, contact, destinations, footer) use v2 teal palette unless explicitly asked to update.
