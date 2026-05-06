@AGENTS.md

# TripNexa Web Project Reference

## What This Is

TripNexa is a Gujarat/India tourism web app. Users browse destinations, view itinerary packages, and proceed to booking. Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Folder Structure - App-Colocated

This project does not use a `features/` folder. Route-specific code is colocated under `app/` using private folders prefixed with `_`, which Next.js ignores for routing.

```text
trytripnexa-web/
  app/
    _components/
      HeroSection.tsx
      SeasonalPicksSection.tsx
      SummerSpecialSection.tsx
    about/
      page.tsx
    contact/
      page.tsx
      _components/
        ContactForm.tsx
    destinations/
      [id]/
        page.tsx
        loading.tsx
        book/[itineraryId]/
          page.tsx
          loading.tsx
      _components/
      _lib/
      _loading/
      _pages/
      _types/
    globals.css
    layout.tsx
    page.tsx
  components/
    Navbar.tsx
    Footer.tsx
  services/
    destinations.ts
```

## Import Conventions

Use the `@/` alias:

```ts
import HeroSection from "@/app/_components/HeroSection";
import ContactForm from "@/app/contact/_components/ContactForm";
import DestinationsSection from "@/app/destinations/_components/DestinationsSection";
import { getDestinationPageData } from "@/app/destinations/_lib/api";
import type { Destination } from "@/app/destinations/_types/types";
```

Shared layout components such as Navbar and Footer stay in `components/`.

## Key Rules

1. Do not recreate `features/`; route-specific code belongs in private `_folder` directories inside `app/`.
2. Keep route files (`page.tsx`, `loading.tsx`) focused on routing conventions and route-level exports.
3. Keep API transport in `services/`; route-specific data mapping can live in the route's `_lib/`.
4. Use `@/` imports, not deep relative imports.
5. Do not add dependencies without confirmation.

## Current Data Notes

Destination package fetching uses `services/destinations.ts` and destination page mapping lives in `app/destinations/_lib/api.ts`.
