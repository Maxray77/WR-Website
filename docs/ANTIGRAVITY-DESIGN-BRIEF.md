# Wildlife Rescue Website — Design Brief for Google Antigravity

**Purpose of this document:** brief Google Antigravity on the current state of the Wildlife Rescue website so it can review the layout, propose multiple cosmetic redesign directions, and let me pick a direction to implement.

**Live site to crawl:** https://wildlife-rescue-website.vercel.app
**Repository (read-only OK):** https://github.com/Maxray77/WR-Website
**Primary domain (when live):** https://raptorrescue.org

---

## 1. About the Organisation

**Wildlife Rescue** is the world's largest raptor rescue facility, based in Delhi, India. Founded by brothers **Mohammad Saud** and **Nadeem Shehzad** in the early 1990s and formally established in 2003, the organisation rescues, treats, and releases injured birds of prey — primarily Black Kites cut by *manja* (glass-coated kite string) — and has rescued **38,500+ birds since 2010**.

The organisation was the subject of the Oscar-nominated, Cannes Golden Eye-winning, Sundance Grand Jury Prize-winning documentary **"All That Breathes"** (2022).

The website serves three primary audiences:
1. **Donors** (Indian + international) — UPI, Razorpay, bank transfer, US 501(c)(3) via R3, GoFundMe
2. **Public / press / partners** — wanting to learn the story, the documentary, the techniques
3. **Volunteers and citizen reporters** — bird sightings, tagged-bird reports, volunteering

**Brand voice:** earnest, factual, conservation-led, slightly literary. Not corporate. Not sentimental. The work speaks for itself — the design should let it.

---

## 2. Tech Stack & Hard Constraints

| Tool | Version | Notes |
|---|---|---|
| Next.js | 16.2.4 | App Router. Server Components by default. |
| React | 19.2.3 | |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | **v4** | Uses `@theme inline` directive in `globals.css` — **NOT** `tailwind.config.ts` |
| Framer Motion | 12.x | Allowed for animations |
| Icons | `lucide-react` | Tree-shakeable, all icons drawn from this set |
| Fonts | `next/font` (Inter + Poppins) | |
| Hosting | Vercel | Auto-deploy from `main` |

### Hard constraints — please do not violate

- ✅ Keep Tailwind CSS v4 with `@theme inline` token system. Do not convert back to v3 config.
- ✅ Server components by default. `"use client"` only where state/effects/event handlers are needed.
- ✅ All images via `next/image` with `fill` + `sizes` (or `width`/`height`).
- ✅ `lucide-react` icons only (no SVG sprite sheets, no icon fonts).
- ✅ No new heavy dependencies. Specifically: no Material UI, no Chakra, no Bootstrap, no styled-components, no Emotion. Tailwind utilities + Framer Motion is the styling toolchain.
- ✅ Accessibility: existing skip-nav, semantic landmarks, alt text, focus rings — preserve all of this.
- ✅ Existing brand palette below is the starting point. Adjustments fine; total replacement of the teal+amber identity is not.
- ✅ Donate flow (Razorpay button ID `pl_H4Jwn7xLqMgktI`, UPI QR, GoFundMe iframe, R3 redirect) must keep working as-is. Restyle the *container*, don't touch the integration.

### Free to redesign

- Section layouts, spacing, rhythm
- Typography scale, weights, line heights, optional new heading font pairing
- Card styles, shadows, borders, radii
- Hero compositions, image treatments, overlays
- Component patterns: stats blocks, timelines, journey steps, call-out boxes
- Button styles, form fields, dropdown nav appearance
- Animation/scroll behaviour (within Framer Motion)
- Imagery treatment: grain, duotone, frames, captions
- Empty/loading states
- Mobile-specific adaptations

---

## 3. Current Brand Tokens

Defined in `src/app/globals.css` via `@theme inline`:

| Token | Hex | Usage |
|---|---|---|
| `--color-teal` | `#0A6E5C` | Primary — buttons, links, headers |
| `--color-teal-dark` | `#064E41` | Hover states, gradient anchors |
| `--color-teal-light` | `#E8F5F1` | Light backgrounds, badges |
| `--color-amber` | `#E8A317` | Accent — CTAs, highlights |
| `--color-amber-light` | `#F5D060` | Secondary accent |
| `--color-amber-bg` | (light amber tint) | Section backgrounds for warm sections |
| `--color-charcoal` | `#1A1A2E` | Body text, primary headings |
| `--color-slate` | `#6B7280` | Secondary text |
| `--color-offwhite` | `#F9FAFB` | Section backgrounds |
| `--color-success` | (green) | Status: released |
| `--color-danger` | (red) | Status: critical, percentages |

**Fonts:**
- **Inter** (`--font-inter`) — body
- **Poppins** (`--font-poppins`) — all `font-[family-name:var(--font-poppins)]` headings

**Most-used patterns to preserve or evolve:**
- Teal gradient hero: `bg-gradient-to-br from-teal-dark to-teal`
- Amber pill badges: `bg-amber/20 text-amber-light px-4 py-1.5 rounded-full`
- Section heading component: large Poppins title + slate subtitle, centered
- Cards: `bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg`
- Stats blocks: 4-up grid, `bg-teal-light` rounded-2xl, big teal Poppins number + slate label

---

## 4. Site Map (31+ routes)

```
Home /
About /about
All That Breathes (documentary) /all-that-breathes
Our Specialty (techniques) /our-specialty
Our Clinic /clinic
Bird Enclosures /enclosures
Treatments /treatments
Conditions We Treat /conditions
  ├── /conditions/septicemia
  ├── /conditions/avian-pox
  ├── /conditions/methane-burns
  ├── /conditions/cut-wounds
  ├── /conditions/fractures
  └── /conditions/orphans
Vulture Conservation /vultures
Species We Treat /species
  ├── 15 dynamic species pages /species/[slug]
Rescue Stories /special-cases
Annual Reports /annual-reports
NWRA Symposium 2025 /nwra-2025
Photo Gallery /gallery
Video Clips /videos
Our Early Days /history
Press & Awards /media
Bird Brothers Book /bird-brothers
Blog /blog
  └── 6 dynamic posts /blog/[slug]
Donate /donate (6-tab interface)
Contact /contact
Report A Tagged Bird /report-tagged-bird
```

---

## 5. Page-by-Page Layouts (current state)

### Home (`/`)
1. Hero — three rotating images (Steppe Eagle, Barn Owl, Avian Pox Black Kite), tagline *"Life itself a kinship, we're all a community of air."* — Nadeem and Saud
2. Impact stats bar (4-up): 38,500+ birds rescued, 106+ species, 20+ years, 26 awards
3. Origin story (2-col with founders' Cannes photo)
4. Featured rescues (3 cards)
5. Donation teaser (INR/USD currency toggle, amount grid)
6. As Featured In (12 dark charcoal media outlet logos)
7. From Our Blog (3 latest posts)
8. Instagram feed (6 hand-curated posts)
9. Connect With Us social row
10. Newsletter signup
11. Footer (4-column)

### About (`/about`)
- Hero
- Vertical timeline of key milestones (Early 1990s → 2025)
- Mission & Values (4-card grid)
- Team grid (9 members, with photos for the founders + Salik)
- Awards & Affiliations (6-card grid)
- Download Our Brochure (CSR PDF preview card)
- CTA

### Donate (`/donate`)
6-tab interface: UPI QR / Online (Razorpay) / Bank Transfer / US Donors (R3 + GoFundMe) / GoFundMe / Cheque. Currency toggle on Online tab.

### Documentary (`/all-that-breathes`)
- Hero with film poster + streaming CTAs (JioHotstar India / Max US)
- Trailer embed
- Awards grid + Nominations grid
- Film details
- Fan art gallery
- CTAs to /about and /donate

### Our Specialty (`/our-specialty`)
- Hero
- Self-Taught to World-Class story (2-col with placeholder)
- Techniques & Equipment (3 cards — Wing Repair, Imaging, Anesthesia) **← due for major expansion, see `docs/PLAN-our-specialty-expansion.md`**
- What We Treat (5-row stat list)
- Rescue Vehicle photo
- Case Studies (3 cards)
- CTA

### Our Clinic (`/clinic`) — newly split, well-developed
- Hero with amber pill "South Asia's Most Advanced Avian Clinic"
- 4 stats
- 2-col "Where Every Rescue Begins" intro with USBC photo
- 9 equipment cards (X-Ray, OT, Ultrasonic Bone Cutter, Surgical Laser, Lab, ICU, Pharmacy, Triage, Microscopy)
- 11-image equipment gallery (4-col grid)
- 5-step vertical journey timeline
- CTA

### Bird Enclosures (`/enclosures`) — newly split, well-developed
- Hero
- 4 stats
- 2-col "A Home for Every Stage" intro with autoplay aviaries video
- 6 enclosure type cards
- 3-image aviary gallery
- "Why These Enclosures Work" — 3 design principles cards (amber accents)
- 6-step rehab journey timeline
- CTA "Sponsor an Enclosure"

### Conditions (`/conditions`)
Listing with severity badges (red Critical / orange Severe / amber Moderate); each card optionally shows photo gallery. Detail pages have hero image + full gallery + case study + treatment description.

### Species (`/species`)
15 species cards with photos where available. Detail pages: hero + about + diet/habitat/threats + photo gallery + optional video + fun fact + CTA.

### Annual Reports (`/annual-reports`)
- Hero
- 4 metric cards
- Annual intake bar chart (2010 → 2025, horizontal bars, teal-to-teal-dark gradient)
- Financial transparency tables
- Where Your Money Goes (5 expenditure rows with bar fills)
- Five Growth Phases (5 cards)
- Archive: 4 years (2025 / 2022 / 2021 / 2020) using shared `AnnualReportCard` component — teal gradient header with key stats, two-up infographic + cover preview, two CTAs

### Blog (`/blog`)
Featured post + 5-card grid. Annual report posts use the `AnnualReportCard` instead of a regular post layout.

### Donate (`/donate`)
6-tab "use client" component. Razorpay embedded HTML, UPI QR, GoFundMe sandboxed iframe.

### Contact (`/contact`)
Form (rate-limited via Upstash Redis), Google Maps embed, emergency hotline card.

---

## 6. Reusable Components

Located in `src/components/`:
- `Header.tsx` — sticky header, "Our Work" + "Media" dropdowns, mobile menu, donate button
- `Footer.tsx` — 4-column with inline newsletter signup
- `Wingman.tsx` — floating AI chatbot widget (bottom-right, teal circle with bird icon)
- `DonateButton.tsx` — reusable CTA, supports `size="sm" | "md" | "lg"` and `variant`
- `SectionHeading.tsx` — title + subtitle, centered
- `ImpactCounter.tsx` — animated stat counter (Framer Motion, intersection-observed)
- `NewsletterSignup.tsx` — banner + inline variants
- `InstagramFeed.tsx` — 6-post grid with hover overlays
- `ContactForm.tsx`, `JsonLd.tsx`, `SkipNav.tsx`, `AnnualReportCard.tsx`

---

## 7. What I Want From This Redesign

**Goal:** elevate the visual presentation so it matches the seriousness and uniqueness of the work. The site is functionally complete (31+ routes, all working) — this is purely cosmetic.

**Principles to optimise for:**
1. **Editorial weight** — closer to *NYT Magazine* / Long-form journalism than a typical NGO site. The story is exceptional; the typography should feel that way.
2. **Photographic dominance** — we have strong real photography (raptors, surgical scenes, aviaries). Designs should foreground the image, not bury it under chrome.
3. **Calm restraint** — fewer card backgrounds, fewer shadows, more whitespace, more confident hierarchy. Right now too many sections look like generic SaaS cards.
4. **Indian provenance, global voice** — the design should not feel "templated Western nonprofit". Subtle nods to provenance are welcome (e.g. typographic choice that reads literary, not corporate).
5. **Donation intent** — the donate paths are critical. Whatever direction you pick, donating must remain frictionless and prominent (but not pushy / pop-up-y).

**Specific things I'd love proposals on:**
1. **Three distinct moodboards / direction options** — call them e.g. *Editorial Field Notes* / *Quiet Modernism* / *Documentary Cinema* — each with a one-page sample showing hero, a section heading style, a card style, a photo-led section, a stats block, and a footer/CTA.
2. **Typography pairing options** — Inter+Poppins is fine but feels generic. Suggest 2–3 alternative pairings (one of which can keep Inter for body if it helps); call out a serif option for editorial weight.
3. **Hero treatment options** — the current rotating hero is functional but conventional. Show 2–3 alternatives (e.g. full-bleed image with overlay quote; split layout; video-led; archival-photo-grid).
4. **Section-rhythm system** — propose a clean alternation pattern between dense info and breathing-room photo sections for long pages like `/clinic`, `/enclosures`, `/our-specialty`.
5. **Card vs. no-card decisions** — flag which sections should drop their card containers in favour of cleaner editorial blocks.
6. **Mobile typography hierarchy** — current mobile is fine but flat. Propose a more dynamic mobile scale.
7. **One signature visual motif** — a small recurring element (a feather mark, a rule, a numbered system, a corner ornament) that ties pages together.

**Out of scope for this pass:**
- Information architecture / nav reorganisation (already settled)
- Copy rewrites
- New routes
- Backend / API / data model changes

---

## 8. Existing Photography You Can Reference

Some standout photo categories already on the site (use the live site to pull examples):
- Founders at Cannes (`/founders-combined.jpg`)
- Operating theater / surgical equipment (`/treatments/usbc-*.jpg`, `/facility/ot-table.jpg`)
- Raptors in aviaries (`/facility/enclosure-*.jpg`)
- Sultan the Egyptian Vulture (`/species/egyptian-vulture-01.jpg`)
- Black Kite under anesthesia (`/species/black-kite-anesthesia.jpg`)
- NWRA 2025 surgical-stage photos (`/nwra-2025/stage1-*.jpg`)
- Brochure CSR cover (`/brochure-cover.jpg`)
- Steppe Eagle, Barn Owl, Avian Pox kite (homepage heros)

---

## 9. What I'd Like Antigravity to Deliver

For each of the 3 direction proposals:
- **Moodboard image** (style frame) showing the hero, palette, type, key components in one frame
- **Component spec sheet** — buttons, cards, badges, navigation, form fields, link styles, heading hierarchy
- **One implemented sample page** — preferably the homepage or `/our-specialty`, in the same Next.js + Tailwind v4 + Framer Motion stack, written as a drop-in replacement for `src/app/page.tsx` or equivalent, so I can preview each direction live before picking
- **Migration notes** — what `globals.css` tokens to add/replace, which existing components stay vs. need to be reskinned, time estimate for full-site rollout

If I pick a direction, the next phase is rolling it across all 31+ routes — but that's a separate engagement after I choose.

---

## 10. Repo Access Instructions for Antigravity

```bash
# Clone (read-only is enough)
git clone https://github.com/Maxray77/WR-Website.git
cd WR-Website

# Install
npm install

# Local dev (will need OPENAI_API_KEY in .env.local for the chatbot, but not for design work)
npm run dev
# → http://localhost:3000
```

**Key files for design work:**
- `src/app/globals.css` — Tailwind v4 `@theme inline` tokens (palette + typography lives here)
- `src/app/layout.tsx` — root layout, font wiring
- `src/components/Header.tsx`, `Footer.tsx`, `SectionHeading.tsx`, `DonateButton.tsx` — reusable shells
- `src/app/page.tsx` — homepage (best test bed for any redesign)
- `src/app/our-specialty/page.tsx` and `src/app/clinic/page.tsx` — long-form content pages with mixed media
- `tailwind.config.*` — **does not exist on purpose**. v4 puts theme in CSS.

**What to ignore (already settled):**
- `src/app/api/*` — backend routes, untouched
- `src/lib/redis.ts`, `src/middleware.ts` — security/storage layer
- `next.config.ts` — minimal, has one redirect

---

## 11. Project Status & Active Work

The site is in active maintenance/polish mode. There is one unrelated piece of in-progress work that the redesign should be aware of:
- `/our-specialty` is scheduled for a major content expansion + a new `/our-specialty/wing-repair` sub-page (see `docs/PLAN-our-specialty-expansion.md`). Antigravity proposals should accommodate this — i.e., the `/our-specialty` redesign should support more sections than currently exist (anatomy diagram blocks, surgical-stage step-throughs, NWRA slide excerpts).

Everything else is stable.

---

**Contact:** Max (project owner) — please reach out if anything in this brief is ambiguous before producing the proposals.
