# Ganga Group — Landing Page

A production-ready **Next.js 15 (App Router) + TypeScript + Tailwind CSS** conversion of the Ganga Group static landing page. The design is preserved pixel-for-pixel — layout, typography, spacing, colours, dark/light theming, responsiveness, and every interaction — while the codebase is reorganised into typed, reusable React components.

## Tech stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS 3.4** — colours mapped to CSS variables so the theme switch stays a single source of truth
- **Framer Motion** — scroll reveals, the scroll-progress bar, the hero headline stagger, and the hero scroll parallax
- **Lucide React** — functional/category icons
- **ESLint** (`next/core-web-vitals` + `next/typescript`)

## Getting started

Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Project structure

```
src/
  app/                 # App Router entry: layout (fonts + metadata), page, globals.css, icon
  components/
    common/            # AbcRoot (theme root), Background, Reveal, ScrollProgress, ScrollLink, SpotlightGroup
    effects/           # ParticleField, CursorGlow (canvas / pointer effects)
    layout/            # Navbar, Footer
    ui/                # Button, GlassCard, IconTile, cards (Service/Stat/Product/Tech…), InquiryForm, …
    ui/icons/          # BrandIcons (exact GitHub / X / LinkedIn SVGs)
  sections/            # Hero, About, Services, Products, Technology, Inquiry, Contact
  hooks/               # useTheme, useTilt, useMagnetic, useCountUp, useSpotlight, useScrolled, useSmoothScroll, useHeavyEffects
  lib/data.ts          # all site copy + content (single source of truth)
  types/               # shared TypeScript types
  utils/cn.ts          # class-name merge helper
```

Each major section is its own component under `src/sections`, composed from the reusable primitives in `src/components/ui`. All copy lives in `src/lib/data.ts`.

## How the original behaviours were reproduced

- **Scroll reveals** (`[data-reveal]`) → `Reveal` (Framer Motion `whileInView`, same 0.7s curve, 12% threshold, once).
- **Scroll-progress bar** → `ScrollProgress` (Framer Motion `scaleX`).
- **Hero headline** → word-by-word stagger on mount (Framer Motion), same `0.15 + i·0.06s` timing.
- **Hero parallax/fade**, **particle canvas**, **cursor glow**, **3D tilt**, **magnetic buttons + shine**, **spotlight dim**, **count-up** → dedicated hooks/components. These are imperative, pointer/RAF-driven effects, so they use refs and the Web Animations/Canvas APIs rather than Framer Motion (which isn't the right tool for per-frame canvas or cursor math).
- **Heavy-effects gate** (`useHeavyEffects`) reproduces the original `heavyOK` check — the pointer effects run only when not reduced-motion, not touch-only, and viewport ≥ 760px.
- **Theme toggle** defaults to **dark** and, exactly like the original, is **not persisted** between visits.
- **Reduced motion** is honoured throughout (animations disabled, counters/headline snap to final state).

## Notes / intentional decisions

- **Icons.** Functional icons use Lucide; the GitHub / X / LinkedIn marks are kept as the original inline SVGs (`ui/icons/BrandIcons.tsx`) for exact fidelity, since Lucide no longer ships brand icons. A few Lucide glyphs differ very slightly from the originals (e.g. the AI "sparkle").
- **`next/image` + app images.** Product cards use `next/image` for the app icons and the Colors Quad screenshot. The files live in [`public/apps/`](public/apps/) and are referenced by the `image` field on each product in [`src/lib/data.ts`](src/lib/data.ts). The committed files are **labelled placeholders** — replace each with the real art, keeping the same filename, and the site picks it up with no code change. `next/font` is used for the three Google fonts.
- **Inquiry form.** Validates name/email/type/description on the client (highlighting invalid fields), then POSTs to `/api/inquiry`, which validates again server-side and emails the message via [Resend](https://resend.com). Set `RESEND_API_KEY` (and optionally `INQUIRY_TO` / `INQUIRY_FROM`) — see [`.env.example`](.env.example). Without a key the endpoint returns a 503 and the form shows an error, so the rest of the site still builds and runs.
- **App links.** The product cards link to `/apps/...` paths that existed in the original site map; on this standalone landing page those routes are not included, so they 404 — the same as isolating the original page. In-page nav links smooth-scroll.
- **Background orbs.** In the original the orbs carried a `data-speed` parallax transform, but each also runs a CSS float animation (which overrides the inline transform), so the parallax was never actually visible. The float animation is reproduced faithfully; the dead parallax is omitted.
