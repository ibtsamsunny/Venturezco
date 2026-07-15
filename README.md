# Handoff: VenturezCo Marketing Site

## Overview
A full marketing website for VenturezCo, a growth & automation agency. Includes a home page, 5 service pages, 5 industry pages, an insights/blog section, how-we-work, contact/FAQ pages, and a multi-step booking modal. Dark theme, animated hero, sticky-card services section, animated GoHighLevel platform diagram, testimonial marquee, and a full booking flow.

## About the Design Files
The files in `source_files/` are **design references built as HTML/JS prototypes** (a custom "Design Component" runtime — `support.js` provides the templating/reactivity layer used only in this design tool). They are **not production code to copy directly**. The task is to **recreate these designs in the target codebase's environment** — React, Vue, plain JS, etc. — following that codebase's existing component patterns, state management, and build tooling. If no environment exists yet, pick the framework best suited to the project (a marketing site like this suggests Next.js/React or a static site generator) and implement fresh, production-quality components using this HTML as the visual and behavioral spec.

Note: `*.dc.html` files use `{{ }}` template syntax, `<sc-if>`/`<sc-for>` control-flow tags, and a `class Component extends DCLogic` logic block — this is proprietary to the design tool. Read past that syntax to the actual rendered structure/behavior; do not try to run this templating system in the target app.

## Fidelity
**High-fidelity.** Treat colors, typography, spacing, animation timing, and copy as final. Recreate pixel-perfectly using the target codebase's component library/CSS approach.

## Site Map / Files
- `VenturezCo.dc.html` — Home page (hero, growth engine diagram, 4 sticky service cards, GoHighLevel platform diagram, process steps, case studies, testimonials marquee, insights preview, contact CTA, footer, booking modal, WhatsApp button, mobile nav)
- `ServiceDigitalMarketing.dc.html`, `ServiceLeadGeneration.dc.html`, `ServiceAIAutomation.dc.html`, `ServiceGoHighLevel.dc.html`, `ServiceGrowthConsulting.dc.html` — individual service detail pages
- `IndustryRealEstate.dc.html`, `IndustryProfessionalServices.dc.html`, `IndustryHealthcare.dc.html`, `IndustryEcommerce.dc.html`, `IndustryFinancialServices.dc.html` — industry-specific landing pages
- `Insights.dc.html` — blog/article listing
- `BlogPost.dc.html` — single article template
- `HowWeWork.dc.html` — process/methodology page
- `Contact.dc.html` — contact page
- `FAQ.dc.html` — FAQ page
- `BookingModal.dc.html` — standalone reference for the booking modal component (also embedded live in `VenturezCo.dc.html`)
- `hero-blob.js` — canvas-based animated blob/gradient effect used behind the hero headline
- `image-slot.js` — drag-and-drop image placeholder web component (`<image-slot>`) used for testimonial photos and other user-supplied imagery throughout the site — in the real app, replace with actual `<img>`/CDN assets
- `support.js` — the design tool's runtime (templating engine). **Do not port this file** — it has no place in production; it's only what makes the `.dc.html` files previewable in this tool.

## Global Design System

### Colors
- Background: `#0A0A0A` (near-black)
- Primary accent (indigo): `#3B2FE0`, lighter variant `#9F91FF` / `#B3A6FF`
- Secondary accent (violet): `#8B5CF6` / `#C4B5FD`
- Tertiary accent (cyan): `#22D3EE` / `#A5F3FC`
- Additional category accents: green `#22C55E`, amber `#F59E0B`, pink `#EC4899`
- Text: primary `#FFFFFF`, body `#9AA1AD`, muted `#7C8492` / `#6B7280` / `#5B6270`
- Borders: `rgba(255,255,255,0.08–0.14)` hairlines throughout; colored borders at ~`0.2–0.4` alpha for accented cards
- WhatsApp button: `#25D366`

### Typography
- Display/body font: **Satoshi** (weights 400/500/700/900) via Fontshare
- Monospace/label font: **Geist Mono** (400/500) via Google Fonts — used for eyebrow labels, badges, stats, uppercase micro-copy with `letter-spacing: 0.12–0.24em`
- Headings: font-weight 900, tight letter-spacing (-0.02 to -0.03em), fluid sizing via `clamp()` (e.g. hero `clamp(2.6rem,7vw,5.2rem)`)
- Body copy: 15–18px, line-height 1.5–1.6, color `#9AA1AD`

### Spacing / Shape
- Max content width: 1200px (1320px for the platform diagram)
- Section padding: fluid, `clamp(40px,6vw,90px)` vertical
- Border radius: 16–28px on cards, 999px (pill) on buttons/badges/tags
- Shadows: large soft shadows, `0 24-40px 60-120px rgba(0,0,0,0.4-0.6)`

### Buttons
- Primary: solid `#3B2FE0`, pill radius, white text, soft indigo glow shadow
- Secondary: translucent white bg (`rgba(255,255,255,0.04)`), 1px white-10% border, pill
- Magnetic hover effect on primary CTAs (`data-magnetic` — cursor-following transform, see interactions below)

## Interactions & Behavior

### Navigation
- Fixed header, blurred/translucent background, border-bottom hairline
- Desktop (≥900px): full link row incl. two hover-triggered dropdown menus (Services, Industries — each a pill-shaped flyout with colored dot per item)
- Mobile (<900px): hamburger icon toggles a full-width panel below the header; Services/Industries become accordions (chevron rotates 180° open); body scroll is locked while open; panel scrolls internally if content exceeds viewport height
- Book a Call button always visible, opens the booking modal

### Hero
- Canvas-rendered animated gradient "blob" behind headline (`hero-blob.js`), masked to a soft circle, blend-mode screen
- Headline lines animate in (staggered reveal), second line has an animated gradient text fill
- Background parallax layers respond to mouse movement and scroll (subtle, disabled under `prefers-reduced-motion`)
- Animated stat counters count up from 0 on mount/scroll into view

### Services Section
- 4 full-bleed cards using `position: sticky` (each stacks/pins as you scroll past it — a "stacking cards" scrollytelling effect), each with an icon-diagram SVG, tag list, one stat callout, and a CTA
- Collapses to static stacked layout on narrow viewports

### GoHighLevel Platform Diagram
- Circular hub-and-node diagram built in absolutely-positioned percentage coordinates, animated flow-line dashes, spinning ring elements, a central "hub" logo mark
- On screens ≤1080px, collapses to a responsive grid; on ≤640px, becomes a simple vertical stack (wiring/SVG hidden)

### Process / How We Work
4-step timeline with connecting line and step markers that fade in on scroll (`data-reveal`/`data-node` observer-driven reveal).

### Testimonials & Logo Marquee
Infinite auto-scrolling marquee (CSS animation, pauses on hover), duplicated content for seamless looping, masked fade at edges.

### Booking Modal (`BookingModal.dc.html` + embedded in home page)
- Opens via any "Book a Call" CTA or `#book`/`#contact` URL hash
- Step 1: pick a date (next 8 weekdays, horizontally scrollable chip row) and a time slot (grid of chips)
- Step 2: contact form — full name, business name, email, website (2-column grid on desktop, single column ≤560px), help-topic chips, free-text challenge textarea, budget chips, timeline chips; inline validation errors per field, all fields required
- Step 3: confirmation screen with animated checkmark (stroke-dashoffset draw-in)
- Modal traps body scroll while open, closes on backdrop click or explicit close button

### Reveal Animations
Scroll-triggered fade/slide-up reveals (`data-reveal`, `data-reveal-group`) via IntersectionObserver pattern; respects `prefers-reduced-motion: reduce` globally (disables all animation/transition/smooth-scroll).

### Floating WhatsApp Button
Fixed bottom-right, pulsing shadow animation, opens `wa.me` deep link with a prefilled message.

## State Management (per page, roughly)
- Booking modal: open/step/selected date/slot/timezone/form field values/validation errors/completion flag
- Mobile nav: menu open flag, services-accordion open flag, industries-accordion open flag
- Hero counters: current animated values vs. target values (counts up once on first viewport entry)
- Testimonial dot/carousel index (where used)
- Services dropdown / industries dropdown: CSS `:hover`/`:focus-within` driven, no JS state needed for desktop

## Assets
- Fonts loaded from Fontshare (Satoshi) and Google Fonts (Geist Mono) CDNs — replace with self-hosted or the target app's font pipeline
- All illustrative "photos" (testimonial headshots) currently use `randomuser.me` placeholder URLs via `<image-slot>` — replace with real client photos/assets
- All diagrams/icons are hand-built inline SVG (no external icon library) — portable as-is or swap for the target app's icon set
- No other external image assets

## Design Tokens Quick Reference
```
--bg: #0A0A0A
--accent-indigo: #3B2FE0
--accent-indigo-light: #9F91FF
--accent-violet: #8B5CF6
--accent-cyan: #22D3EE
--accent-green: #22C55E
--accent-amber: #F59E0B
--accent-pink: #EC4899
--text-primary: #FFFFFF
--text-body: #9AA1AD
--text-muted: #6B7280
--radius-card: 20-28px
--radius-pill: 999px
--font-display: 'Satoshi', system-ui, sans-serif
--font-mono: 'Geist Mono', monospace
--max-width: 1200px
```

## Recommended Implementation Notes
- Build as a component-based app (React/Next.js recommended for a marketing site with this many near-duplicate landing pages — service/industry pages share a template).
- Extract a shared page shell: header/nav, footer, booking modal, WhatsApp button — these repeat across every page.
- Extract shared "service/industry landing page" template — the 5 service pages and 5 industry pages appear to follow one layout with swapped copy/icons/colors.
- Re-implement scroll reveals and the sticky-card section with your framework's standard patterns (IntersectionObserver hook, CSS `position: sticky`) rather than the bespoke `data-reveal` attribute system.
- Re-implement the hero canvas blob as a standalone component; reference `hero-blob.js` for the exact animation logic.
