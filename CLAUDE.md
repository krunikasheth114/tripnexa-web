@AGENTS.md

# TripNexa Web — Project Reference

## What This Is
TripNexa is a Gujarat/India tourism web app. Users browse destinations, view itinerary packages, and proceed to booking. Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16.2.1 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Forms | react-hook-form |
| AI SDK | @anthropic-ai/sdk |
| Language | TypeScript (strict) |
| Package manager | npm |

---

## Folder Structure — Feature-Based Design

```
trytripnexa-web/
│
├── app/                          # Next.js App Router — routing only
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Tailwind base + design tokens
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── destinations/
│       └── [id]/
│           ├── page.tsx          # Destination detail + itineraries
│           ├── loading.tsx
│           └── book/[itineraryId]/
│               ├── page.tsx      # Booking & payment review
│               └── loading.tsx
│
├── features/                     # Feature modules — primary code location
│   ├── destinations/
│   │   ├── components/
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── DestinationsSection.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── DestinationItineraryExplorer.tsx
│   │   │   └── BookingHeroGallery.tsx
│   │   ├── hooks/                # Destination-specific hooks (future)
│   │   ├── types.ts              # Destination, ItineraryPlan, DestinationGalleryImage
│   │   └── data.ts               # Static data + helper functions (getDestinationById, etc.)
│   │
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SeasonalPicksSection.tsx
│   │   │   └── SummerSpecialSection.tsx
│   │   └── hooks/
│   │
│   └── contact/
│       ├── components/
│       │   └── ContactForm.tsx
│       └── hooks/
│
├── components/                   # Shared layout components only
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── lib/                          # Utilities and configs (prisma, axios, helpers)
├── services/                     # API call layer (when backend is added)
├── store/                        # Zustand/Redux state (when added)
├── hooks/                        # Global reusable hooks
├── types/                        # Global TypeScript types
├── constants/                    # Static enums, config values
│
├── public/                       # Static assets
│   ├── destinations/             # Destination hero images
│   ├── gallery/                  # Destination gallery images
│   ├── hero/                     # Homepage hero carousel images
│   ├── package/                  # Itinerary timeline images
│   ├── seasonal/                 # Seasonal picks images (add manually)
│   ├── summer/                   # Summer special section images
│   └── logo.png, logo-footer.png
│
├── CLAUDE.md                     # This file
├── AGENTS.md                     # Agent behaviour instructions
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Import Conventions

Always use the `@/` alias (maps to project root):

```ts
// Feature components
import HeroSection from "@/features/home/components/HeroSection";
import DestinationsSection from "@/features/destinations/components/DestinationsSection";
import ContactForm from "@/features/contact/components/ContactForm";

// Feature data and types
import { destinations, getDestinationById } from "@/features/destinations/data";
import type { Destination, ItineraryPlan } from "@/features/destinations/types";

// Shared layout
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
```

**Rule:** New components always go inside the matching `features/<name>/components/` folder. Only Navbar and Footer live in `components/`.

---

## Design System

    **Colors (Tailwind tokens defined in globals.css):**
    - Primary / navy: `#28536B` → `text-primary`, `bg-primary`
    - Accent / rose: `#C2948A`
    - Background: `#FAFAF8` → `bg-brand-bg`
    - Dark text: `#0A1E2A`
    - Muted text: `#52636F`

**Typography:**
- Font: Geist Sans (variable `--font-geist-sans`)
- Headings: bold, `text-[#28536B]`
- Eyebrow labels: `text-xs font-semibold uppercase tracking-widest text-[#C2948A]`

**Border radius:**
- Cards / buttons: `rounded-[8px]`
- Modals / large panels: `rounded-[24px]`
- Pills / badges: `rounded-full`

**Hover pattern:**
```
hover:scale-[1.02] hover:shadow-lg transition-all duration-300
```

**Section pattern:**
```tsx
<section className="bg-[#FAFAF8] px-6 py-16 md:py-20">
  <div className="mx-auto max-w-7xl">
    <p className="text-sm font-semibold uppercase tracking-widest text-[#C2948A]">Eyebrow</p>
    <h2 className="text-3xl font-bold text-[#28536B] md:text-5xl">Heading</h2>
  </div>
</section>
```

---

## Data Layer

All destination data lives in `features/destinations/data.ts`. Key exports:

| Export | Description |
|---|---|
| `destinations` | Array of 9 Gujarat destinations |
| `categories` | Filter categories array |
| `heroImage` | Path to homepage hero image |
| `getDestinationById(id)` | Find destination by slug |
| `getDestinationGallery(id)` | Get gallery images for a destination |
| `getItinerariesByDestination(id)` | Get 3 itinerary plans (2D/1N, 5D/4N, 7D/6N) |
| `getItineraryById(destId, itinId)` | Get a single itinerary |

Types live in `features/destinations/types.ts`:
- `Destination`
- `ItineraryPlan`
- `DestinationGalleryImage`

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage — hero, category filter, destinations grid, seasonal picks |
| `/about` | About TripNexa |
| `/contact` | Contact form + support info |
| `/destinations/[id]` | Destination detail with itinerary explorer |
| `/destinations/[id]/book/[itineraryId]` | Booking review + payment options |

---

## Key Rules for AI Agents

1. **Feature-Based Design** — Every new component goes in `features/<feature>/components/`. Never put feature-specific components in `components/`.
2. **No `features/` exceptions** — there is no separate `features/auth/` until auth is actually built. Don't create empty feature shells.
3. **Shared layout only in `components/`** — Only Navbar and Footer live there.
4. **`@/` alias always** — never use relative imports (`../../`).
5. **No comments in code** — only add a comment when the WHY is non-obvious.
6. **No new dependencies** without confirmation — the stack is intentionally lean.
7. **Image fallbacks** — use colored `bg-[]` placeholders when images may not exist.
8. **Tailwind v4** — use `bg-linear-to-b` not `bg-gradient-to-b`, use token names where defined.

---

## Current Status (as of April 2025)

- Homepage: complete (hero, category filter, destinations carousel, seasonal picks)
- Contact page: complete
- About page: complete
- Destination detail page: complete (gallery, itinerary explorer with filters)
- Booking page: complete (timeline, payment sidebar)
- Auth: not started
- Backend/DB: not started (all data is mock/static in `features/destinations/data.ts`)
- Payment gateway: UI only, not integrated
