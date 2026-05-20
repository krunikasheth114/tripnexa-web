---
name: TripNexa Homepage Structure (v3 Dark Redesign)
description: Component tree and file layout for the TripNexa home page after 2026-05-19 redesign. 4-section dark-theme layout.
type: project
---

## Home page — `app/page.tsx`

Renders four sections via `components/Layout` (Navbar + Footer wrapper):

1. `app/_components/HeroSection.tsx` — split layout (60/40): two overlapping images left, tag + headline + description + CTAs right
2. `app/_components/DestinationsHomeSection.tsx` — 3-card grid (Rann, Gir, Somnath) with tall aspect-[3/4] images, static data
3. `app/_components/PackagesSection.tsx` — 4-card grid (Heritage Ahmedabad, Gir Safari, Rann Utsav, Dwarka Pilgrimage), static data
4. `app/_components/HotelsSection.tsx` — 5-card grid (Taj Ummed, Gir Forest Lodge, Tent City, Radhika Beach, Rann Riders), static data

## Navigation — `components/Navbar.tsx`

Links: Home `/`, Destinations `/destinations`, Hotels `/hotels`, Car Rentals `/car-rentals`
Active link detection via `usePathname`. Mobile hamburger toggles mobile menu state.
Logo is text-based: "Trip" (white) + "Nexa" (orange gradient).

## New pages added 2026-05-19

- `app/hotels/page.tsx` — Coming Soon page (full-screen centered, heading, badge, back link)
- `app/car-rentals/page.tsx` — Coming Soon page (same pattern)

## next.config.ts — remotePatterns

Includes both `trytripnexa-images.s3.amazonaws.com` and `images.unsplash.com` for next/image.

**Why:** Full home page redesign with dark zinc/orange aesthetic. New nav links added for Hotels and Car Rentals sections.
**How to apply:** All four `app/_components/` files together compose the home page. Keep static data in the component files themselves (no external service calls for these home sections).
