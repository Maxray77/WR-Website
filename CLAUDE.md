# Wildlife Rescue Website — Project Guide

This file is read automatically by Claude Code at the start of every session.
**Update the "Current Status" section before handing off work to a teammate.**

---

## Project Overview

**Site:** Wildlife Rescue — raptorrescue.org
**Organization:** Wildlife Rescue, Delhi, India — the world's largest raptor rescue facility
**Purpose:** Public-facing website for Wildlife Rescue. Covers the organization's mission, team, the Oscar-nominated documentary "All That Breathes", and donation options for Indian and international donors.
**US Sponsor:** Raptor Rescue and Research Inc. (EIN: 87-3289299), 351 E, 50th St. Apt. # 2, New York, NY – 10022, USA

---

## Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.1.6 | App Router, Turbopack |
| React | 19.2.3 | Server Components by default |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | 4.x | v4 — uses `@theme inline` in `globals.css`, NOT `tailwind.config.ts` |
| Framer Motion | 12.x | Page/section animations |
| AI SDK | 6.x | Wingman chatbot (streaming, OpenAI GPT-4o-mini) |
| Icons | lucide-react | Tree-shakeable |

> **Tailwind v4 Gotcha:** Colors are defined in `globals.css` via `@theme inline`, NOT in `tailwind.config.ts`. To add a new color:
> ```css
> @theme inline {
>   --color-my-new-color: #hexvalue;
> }
> ```
> Then use as `text-my-new-color`, `bg-my-new-color`, etc.

---

## Brand Colors & Fonts

Defined in `src/app/globals.css`:

| Token | Hex | Usage |
|-------|-----|-------|
| `teal` | `#0A6E5C` | Primary — buttons, links, headers |
| `teal-dark` | `#064E41` | Hover states |
| `teal-light` | `#E8F5F1` | Light backgrounds |
| `amber` | `#E8A317` | Accent — CTAs, highlights |
| `amber-light` | `#F5D060` | Secondary accent |
| `charcoal` | `#1A1A2E` | Body text |
| `slate` | `#6B7280` | Secondary text |
| `offwhite` | `#F9FAFB` | Section backgrounds |

**Fonts:** Inter (body, `--font-inter`) + Poppins (headings, `--font-poppins`)

---

## Project Structure

```
src/
  app/
    layout.tsx              # Root layout — fonts, Header, Footer, GA4, JSON-LD, skip nav
    page.tsx                # Homepage — hero, stats, rescues, Instagram, newsletter
    globals.css             # Tailwind v4 @theme inline + brand tokens
    loading.tsx             # Root loading skeleton
    robots.ts               # robots.txt generation
    sitemap.ts              # Dynamic sitemap (pages + blog + species + conditions)
    about/page.tsx          # About — origin story, mission, team bios
    donate/page.tsx         # Donate — 6-tab interface (UPI, Razorpay, bank, US 501c3, GoFundMe, cheque)
    contact/page.tsx        # Contact — form, map, emergency hotline
    all-that-breathes/      # Documentary — trailer, accolades, streaming, fan art gallery
    our-specialty/          # Surgical techniques, equipment, medical conditions
    special-cases/          # 6 rescue stories with case numbers
    conditions/
      page.tsx              # Conditions listing — 6 cards with severity badges
      [slug]/page.tsx       # Dynamic condition detail (causes, symptoms, treatment, case study)
    videos/                 # Featured HBO trailer + 8 categorized video cards
    gallery/                # 16-photo masonry grid, category filter, lightbox
    vultures/page.tsx       # Vulture conservation — 9 species, intake data, crisis timeline
    species/
      page.tsx              # Species listing — 11 cards
      loading.tsx           # Species loading skeleton
      [slug]/page.tsx       # Dynamic species profiles (habitat, diet, threats)
    annual-reports/         # Intake chart, financial tables, growth phases
    media/                  # Awards timeline, press coverage, press kit
    blog/
      page.tsx              # Blog listing — featured post + grid
      [slug]/page.tsx       # Dynamic blog posts
    api/
      chat/route.ts         # POST — Wingman AI chatbot (AI SDK v6 + OpenAI streaming)
      contact/route.ts      # POST — contact form submissions
      volunteer/route.ts    # POST — volunteer applications
      newsletter/route.ts   # POST — email subscriptions
  components/
    Header.tsx              # Sticky header with dropdown nav ("Our Work", "Media")
    Footer.tsx              # 4-column footer with newsletter inline
    Wingman.tsx             # Floating AI chatbot widget (bottom-right)
    DonateButton.tsx        # Reusable CTA button
    SectionHeading.tsx      # Consistent section titles
    ImpactCounter.tsx       # Animated stat counters (client component)
    NewsletterSignup.tsx    # Banner + inline variants → /api/newsletter
    InstagramFeed.tsx       # 6-post grid with hover overlays (@wildliferescueindia)
    ContactForm.tsx         # Contact form → /api/contact
    JsonLd.tsx              # Organization + WebSite structured data
    SkipNav.tsx             # Accessibility skip-to-content link
  lib/
    constants.ts            # IMPACT_STATS, RESCUE_BY_YEAR, CONTACT, BANK_DETAILS, social links
    metadata.ts             # Site-wide SEO metadata
    wingman-prompt.ts       # Wingman system prompt — full WR knowledge base
    species-data.ts         # 11 species with full profile data (incl. Black Eared Kite, Wetland Birds, Eagles)
    conditions-data.ts      # 6 medical conditions with causes, symptoms, treatment, case studies
    blog-data.ts            # 5 blog posts (static — replace with CMS later)
```

---

## Donation Page Details (`src/app/donate/page.tsx`)

The donate page is a single `"use client"` component with 6 tabs:

| Tab | What it does |
|-----|-------------|
| **Scan & Pay (UPI)** | QR code image (`/upi-qr.jpg`) + UPI ID (`wildliferescue@hdfcbank`) |
| **Online** | Currency toggle (INR/USD), amount grid, custom amount, **Razorpay payment button** (embedded HTML via `dangerouslySetInnerHTML`, button ID: `pl_H4Jwn7xLqMgktI`) |
| **Bank Transfer** | HDFC bank details from `BANK_DETAILS` constant |
| **US Donors** | Two options: (1) Tax-deductible via R3 → raptorrescueusa.org/donate, (2) No tax benefits → GoFundMe |
| **GoFundMe** | Direct link to `gofund.me/d9df0362` (US$ donations) |
| **Mail Cheque** | India and US mailing addresses |

**Razorpay:** Embedded as raw HTML script tag — no npm package needed. Payment button ID is `pl_H4Jwn7xLqMgktI`.

---

## Coding Standards

- **Language:** TypeScript strict mode. No `any` types without a comment.
- **Styling:** Tailwind CSS v4 utility classes. Avoid inline styles.
- **Components:** Functional components + hooks. No class components.
- **Server vs Client:** All pages/sections are **server components** by default. Add `"use client"` only when using `useState`, `useEffect`, or event handlers (e.g. forms, tab switchers, Wingman).
- **Animations:** Use Framer Motion for transitions/reveals.
- **Naming:** Components → `PascalCase`. Utilities/hooks → `camelCase`. File names match their export.
- **Data:** Update data in `src/lib/constants.ts`, `species-data.ts`, `blog-data.ts` — don't hardcode content in components.
- **Commits:** Conventional commits — `feat:`, `fix:`, `chore:`, `docs:`, etc.

---

## Local Development

```bash
cd "C:/Users/maxra/Documents/Claude/WR website/wildlife-rescue-website"

npm install       # Install dependencies
npm run dev       # Dev server → http://localhost:3000
npm run build     # Production build (validates types + generates pages)
npm run lint      # ESLint
```

**Environment variables (`.env.local`):**
```
OPENAI_API_KEY=sk-...                  # Required for Wingman chatbot
NEXT_PUBLIC_GA_ID=G-FQLSMRBG87        # Google Analytics 4 (live)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_ # Razorpay Checkout.js (public key)
RAZORPAY_KEY_SECRET=...               # Razorpay secret (server only, never public)
RAZORPAY_WEBHOOK_SECRET=...           # Razorpay webhook HMAC secret
```

---

## Git Workflow

- **`main`** — canonical branch with all work (Phases 1–4 + Wingman + latest updates)
- **`master`** — initial Create Next App commit only (legacy, do not use)
- All old `claude/*` worktree branches have been cleaned up
- **Remote:** https://github.com/Maxray77/WR-Website.git
- **Vercel:** https://wildlife-rescue-website.vercel.app (⚠️ returns DEPLOYMENT_NOT_FOUND as of 2026-05-05 — Vercel GitHub integration may be broken; production domain is raptorrescue.org)

---

## Key Organization Details

- **Website:** raptorrescue.org
- **Address:** C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village, Delhi – 110084, India
- **Phone:** +91 98100 29698
- **Email:** nadeem@raptorrescue.org
- **WhatsApp:** https://wa.me/919810029698
- **Social:** @wildliferescueindia (Instagram), @wildliferescue.in (Facebook)
- **Bank:** HDFC Bank, A/C: Wildlife Rescue, 50100181991374, IFSC: HDFC0000558, Ajmeri Gate Delhi, Savings
- **UPI:** wildliferescue@hdfcbank
- **Razorpay Button ID:** pl_H4Jwn7xLqMgktI
- **GoFundMe:** https://gofund.me/d9df0362
- **Registered:** March 2010, Indian Trusts Act; FCRA 2020
- **80(G) Reg:** AAATW2352B25DL02 | PAN: AAATW2352B

---

## What's Been Built (Phases 1–4 Complete)

- **30+ routes**, all working (home, about, donate, contact, documentary, our-specialty, **facility**, **treatments**, **vultures**, special-cases, **conditions × 6**, videos, gallery, **species × 15**, annual-reports, media, blog, API endpoints)
- **Wingman AI chatbot** — floating widget, streams responses via AI SDK v6 + OpenAI
- **Razorpay payment button** — embedded HTML on donate page
- **GoFundMe integration** — linked for US$ donors
- **SEO** — meta tags, OG/Twitter cards, JSON-LD, sitemap, robots.txt
- **Accessibility** — skip nav, semantic HTML, loading skeletons
- **Security hardening** — security headers middleware, CSRF origin checking, Wingman URL validation, input hardening, rate limiting (Upstash), persistent Redis storage, GoFundMe sandboxed iframe

---

## What's Left (Future Work)

- [ ] CMS integration (Sanity.io) to replace static blog/species data
- [x] ~~Real Instagram API feed~~ — replaced API approach with hand-curated `INSTAGRAM_POSTS` in constants (API deprecated Dec 2024)
- [x] ~~Newsletter backend~~ — stored in Redis (upgrade to Mailchimp/Resend later)
- [ ] Real photo/video assets to replace placeholders
- [x] ~~Deploy to Vercel (production)~~ — live at wildlife-rescue-website.vercel.app
- [ ] Add real vulture photos (10 placeholders on /vultures page)
- [ ] Domain setup (raptorrescue.org → Vercel)
- [x] ~~Security audit & hardening~~ — completed 2026-04-10
- [ ] Set up Upstash Redis on Vercel (add env vars to activate rate limiting + storage)

---

## Current Status

**Last updated by:** Claude Code — 2026-05-23 (end of session, all committed + pushed) — **Two new sections shipped on `/annual-reports` from the 14,092-case clinical database; release-rate Outcomes section paused pending Saud's review.** Final commit `00f9090` on `main` (live on Vercel after auto-deploy).

### What landed today

**1. Excel case-records extraction (16,450 .xlsx files at `C:\Users\maxra\Documents\Wildlife Rescue\Data\Case Records Excel\Case Records\`)**
- Built `extract_case_records.py` + `export_case_records_to_website.py` in `Master Data/`
- 14,092 unique cases parsed (~35.5% of 39,681 intake, vs prior 7,230 register sample)
- Outputs: `case_records.csv` + `case_records.db` (SQLite) at `Master Data/`
- Auto-generated `src/lib/case-records-data.ts` consumed by website
- Three classifier issues resolved with Saud: (a) Avian Pox false-positive (29.6% → true 1.3% — bare `"ap"` matched "perpapagium"), (b) "Beyond Recovery" dropped (prognosis not condition), (c) Juvenile cohort fixed (10.7% → true 33.8% via structured `age` field instead of condition keywords)

**2. `/annual-reports` page refresh** (live after Vercel deploy)
- **Why They Come In** (refreshed `IntakeConditionsSection.tsx`): Manja 42.4%, Septicemia 16.7%, Fractures 16.0%, Dehydration 14.0%, External-Normal 12.7%, Orphans 10.7%, Avian Pox 1.3%. New overlap caveat banner.
- **Who Arrives at Our Door** (rebuilt `IntakeAgeSection.tsx`): age breakdown from structured field (Adult 9,253, Nestling 1,896, Fledgling 1,849, Juvenile 911, Hatchling 118). NEW 3-card seasonal grid (Summer heat + dehydration / April–May dust storms / Monsoon kite-flying festivals → manja injuries to inexperienced juveniles — Saud's framing). MBD callout with clinically accurate prognosis ("MBD cannot be reversed. Only early-stage cases can be stopped in their tracks — managed with corrective diet and supportive care to prevent further degradation, and released if the bird can still manage flight").

**3. `IntakeOutcomesSection.tsx` — BUILT BUT UNWIRED** (in repo, commented marker in `annual-reports/page.tsx`)
- Hero "77.1% of Black Kites released" + species table + adults vs juveniles (67.9% vs 74.8%) + year-over-year chart (2019-2022 clean trend; 2023+ flagged provisional)
- Removed from live page at user's request pending Saud's review of release-rate data + year-over-year dip interpretation. 1-line revival when ready.

### Pending pickup for next session

1. **Saud's review of release rates** — once cleared, uncomment the import + `<IntakeOutcomesSection />` line in `src/app/annual-reports/page.tsx`. The 2023+ dip (84.2% → 54.5% → 65.5% → 62.2%) is already footnoted as provisional. Component is production-ready.
2. **Tier 3** (species-page outcome stats) — per-species "X% released since 2019" mini-section on each `/species/[slug]` page. Data already in `case-records-data.ts` `SPECIES_OUTCOMES`. Plan in `docs/PLAN-case-records-integration.md`.
3. **Tier 4** (treatment-usage stats on `/treatments`) — would require building a treatment-keyword classifier similar to conditions. Planning notes in same doc.
4. **Raptor Lab App** — separate sibling repo at `C:\Users\maxra\Documents\Claude\Raptor Lab App\` — Phase 1 build kicks off once equipment data outputs are confirmed (SL120 USB export check, DR detector DICOM, microscope camera model).

### Files of record

| File | Purpose |
|---|---|
| `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\extract_case_records.py` | Re-runnable .xlsx → SQLite extractor |
| `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\export_case_records_to_website.py` | SQLite → `case-records-data.ts` exporter |
| `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\case_records.db` | SQLite with 14,092 indexed cases |
| `src/lib/case-records-data.ts` | Auto-generated TS data consumed by website |
| `docs/PLAN-case-records-integration.md` | Full plan + open questions for Saud |

### Earlier sessions retained below for context

**2026-05-23 (earlier) — Raptor Lab App scoped in sibling repo.**

**2026-05-22 — plates + socials + OCR pilot. All on `main`, all pushed and live.** 16,450 case-record `.xlsx` files at `C:\Users\maxra\Documents\Wildlife Rescue\Data\Case Records Excel\Case Records\` → `extract_case_records.py` → 14,092 unique cases (~35.5% of 39,681 intake). **3 resolved findings:** (1) Avian Pox 29.6% → true **1.3%** (false positive from `"ap"` matching "perpapagium"); (2) "Beyond Recovery" dropped (it's a prognosis, not a condition); (3) **Juvenile cohort was undercounted 3x** — condition-keyword classifier said 10.7%, but structured `age` field shows true **33.8% juvenile-stage** (Nestling 13.5% + Fledgling 13.0% + Juvenile 6.5% + Hatchling 0.8%). Saud also flagged that **67% of dehydration/emaciation cases are juveniles**, not adults — overlap is significant. **NEW finding:** 8% of juveniles arrive with Metabolic Bone Disease (signal of improper hand-rearing pre-transfer). **Outcome rates publish-ready:** Black Kite 77.1% released, juveniles 74.8% (better than adults' 67.9%). **Build plan revised** to 3 orthogonal sections (Who Arrives by Age + Why They Come In Conditions + What Happens Outcomes) with shared caveat about overlap — see `docs/PLAN-case-records-integration.md` Tier 2. **No website code changed this session.** Still pending Saud's review: 2023+ release-rate dip — recommendation is to publish 2019–2022 trend cleanly + footnote 2023+ as provisional.

**Earlier 2026-05-23:** Raptor Lab App project scoped in a separate sibling repo at `C:\Users\maxra\Documents\Claude\Raptor Lab App\` (planning doc + CLAUDE.md). No code yet for that either.

**Previous session 2026-05-22 — plates + socials + OCR pilot. All on `main`, all pushed and live.**

### Pending pickup for next session (case-records integration)

1. **Saud's vet review** on findings before publishing — open questions list in `docs/PLAN-case-records-integration.md` §"Open Questions" (Avian Pox 29.6%, "Beyond Recovery" classification, 2023+ release-rate dip, 2021 partial coverage)
2. **Build Tier 1 + Tier 2 together** (~2 hours focused session):
   - Refresh `intake-data.ts` `CONDITION_BREAKDOWN` from the 14k extraction
   - Update caveat in `IntakeConditionsSection.tsx` ("7,230 cases / 18.2%" → "14,092 cases / 35.5%")
   - NEW `IntakeOutcomesSection.tsx` — first publication of release rates (77.1% Black Kites = donor headline stat)
   - Wire new section into `/annual-reports`
3. **Tier 3+ later** — species-page outcome stats, treatment-usage stats, future admin UI for research DB

### New files (not in repo — outside `src/`)

- `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\extract_case_records.py` — re-runnable extractor
- `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\case_records.csv` — flat CSV
- `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\case_records.db` — SQLite with indexes

### What landed today

**1. 24 vintage public-domain plates wired into `/annual-reports`** (commits `69a9b1d`, `e6cc83f`, `9108b33`)
- **Top-10 Featured Raptors** — Gould (Black Kite, Crested Serpent Eagle, Egyptian Vulture, Short-Toed Snake Eagle), Hardwicke (Black Eared Kite), Lady Gwillim (Oriental Honey Buzzard), Huet/Prêtre (Shikra, Spotted Owlet), Pennant (Indian Scops Owl), German raptor lithograph (Barn Owl)
- **Endangered & Threatened (11 cards)** — Huet/Prêtre (Black Headed Ibis), Pennant (Painted Stork), Levaillant (Alexandrine Parakeet), Fauna Japonica (Japanese Quail), Hardwicke (Steppe Eagle), Gwillim (Pied Harrier, Woolly Necked Stork, Indian Darter), Gould (Laggar Falcon, Eastern Imperial Eagle, Egyptian Vulture)
- **3 reptiles** — Iconographia Zoologica (Red Sand Boa), Sowerby & Lear 1872 (Soft Shelled Turtle), Albert Günther 1864 (Three-Striped Roofed Terrapin)
- All plates downloaded at 1200px from Wikimedia via `Special:FilePath?width=1200`, normalised to 1000px JPEG via PIL (74–185 KB each, ~3 MB total across 23 files)
- `PlatePlaceholder.tsx` rewritten — has a `PLATES` manifest of attribution metadata (artist, work, year); renders `next/image` when slug exists, falls back to aged-paper placeholder otherwise; `plateSlug()` helper does kebab-case derivation
- Attribution surfaced via image `alt`+`title` plus a single italic credit line under the Featured Raptors grid (broadened from "ornithological plates" to "plates by ... Edward Lear, Albert Günther and others (1700–1894)" so it covers herpetology)

**2. Social links fix** (commit `21071a9`)
- YouTube: was hardcoded `"#"` (the icon reloaded the page); real channel is `https://www.youtube.com/@wildliferescue341` ("Wildlife Rescue"). JsonLd also had a fabricated `@WildlifeRescueDelhi` reference (404) — fixed.
- Facebook: was `facebook.com/wildliferescue.in` (resolves but unofficial); real page is `facebook.com/wildliferescue.india/`.
- Instagram unchanged (`instagram.com/wildliferescueindia` is correct).
- Updated both `CONTACT` constants in `src/lib/constants.ts` and the `sameAs[]` array in `src/components/JsonLd.tsx`.

**3. OCR feasibility pilot on Case Record PDFs** (research only — no website changes)
- Source: `C:\Users\maxra\Documents\Wildlife Rescue\Data\Case Rocord\` — six populated folders (2016, 2017, 2019, 2020, 2022, Case Record Others Birds with 2017/2018/2019 subdirs)
- **~6,553 detailed clinical case records** total (1 per page). Each page is a structured Case Record form: Date, RM No, Case No, Species (common+scientific), Sex, Age, Weight, Body Score, 24-point external exam, Condition (free-text diagnosis), Treatment (drug regimen), Remarks, Final Status + release date, vet signature.
- **All key fields are TYPED, not handwritten.** Only the vet signature is handwritten. OCR is highly viable.
- Installed `rapidocr_onnxruntime` (pip-only, no admin, no Tesseract binary needed) and ran a 113-page pilot on `Case Record 2022/January.pdf`:
  - Time: 203 seconds (~1.8 s/page)
  - Coverage: Date 100%, Case No 98%, Species 100%, **Condition 100%**, Treatment 100%, Final Status 96%
  - Sample condition output: "Right Wing Cut Wound | Tensor Propatagialis Long Tendon Cut | Perpapagium Skin Cut | Old Dried Wound" — exact anatomical signature of manja injuries, far richer than the existing 18-category register data
  - Minor post-processing fixes needed: insert missing spaces (`BlackKite` → `Black Kite`, `POMeloxicam` → `PO Meloxicam`), regex-cut vet signature out of Final Status
- Pilot CSV saved at: `C:\Users\maxra\Documents\Wildlife Rescue\Data\Case Rocord\_pilot\jan2022_pilot.csv`
- Full pass projection: **~3.3 hours of compute** to process all 6,553 pages → CSV with Case No · Date · Species · Condition · Final Status. User chose to defer to a future session.
- Note: `Case Record 2023/` folder is empty (0 files); the rest of 2023 already lives in the Master Intake Database via Excel files in `Data/Intake Records/2023/`.

### Pending pickup for next session

1. **Full OCR extraction on all 6,553 case records** (Phase 1 of the patient-records database project):
   - Re-run the pilot script across all PDF folders
   - Post-process: space normalisation, signature stripping, species canonical mapping
   - Output: master CSV + aggregated JSON (counts per condition keyword, classified into the existing 18 categories + extra clinical sub-types)
   - Feed into `intake-data.ts` to refresh `/annual-reports` "Why They Come In" section with a much larger documented sample (potentially expanding from 7,230 → 13,000+ documented cases) and update the caveat banner accordingly
2. **Phase 2 — Patient records research database** (separate, longer-term):
   - Same OCR pass extracts ALL 30+ fields per case (not just Condition)
   - Output to SQLite/Postgres + admin search/filter UI
   - Foundation for clinical research, outcome analysis by Body Score, length-of-stay by species/condition, treatment regimen analytics
3. **Revive "Chicks & Juveniles" section** — `IntakeAgeSection.tsx` is built but unwired (age data only tagged for 5.5% of cases — needs sharper framing)
4. **Optionally revive "Where They Are Transferred From"** — `IntakePartnersSection.tsx` built but unwired (top 4 partners = 89% of intake)

### Top numbers to remember (unchanged from 2026-05-21)

- 39,681 cases · 156 species · 859 org partners · 99.70% IUCN coverage
- Black Kite = 32,510 cases = 81.9% of intake
- Manja Injuries = 39.1% of 7,230 documented register conditions
- Plate manifest: 23 unique slugs (Egyptian Vulture appears in both Featured Raptors and Endangered cards = 24 rendered cards, 0 placeholders)

### Files touched today

- `public/plates/*.jpg` — **NEW** (23 files, ~3 MB total)
- `src/components/intake/PlatePlaceholder.tsx` — rewritten with `PLATES` manifest, `plateSlug()`, `getPlateInfo()`, image+fallback rendering
- `src/components/intake/IntakeSpeciesSection.tsx` — added italic attribution credit line under Featured Raptors grid
- `src/lib/constants.ts` — YouTube + Facebook URLs corrected
- `src/components/JsonLd.tsx` — `sameAs[]` URLs corrected
- (research artifact, not in repo): `C:\Users\maxra\Documents\Wildlife Rescue\Data\Case Rocord\_pilot\jan2022_pilot.csv`

### Commits pushed today (newest first)

- `9108b33` — feat(annual-reports): add plates for 3 reptile species
- `21071a9` — fix(socials): point YouTube + Facebook to real live pages
- `e6cc83f` — feat(annual-reports): add plates for 10 more endangered species
- `69a9b1d` — feat(annual-reports): wire in 10 vintage ornithological plates for featured raptors

---

**Previous session (2026-05-21 late evening) handoff retained below for context:**

**Last updated by:** Claude Code — 2026-05-21 (late evening) — `/annual-reports` now has TWO live new sections (Who We Rescue + Why They Come In). Species count down to 156 after aggressive typo cleanup. Pending: vintage Wikimedia plates for top species; revival of the dropped "Chicks & Juveniles" section.

**Session 2026-05-21 (late evening — page-build phase) — built four sections on `/annual-reports`, then aggressively cleaned + curated based on user feedback. Final state has two surviving sections.**

### What landed on `/annual-reports`

Order on page: Hero → KPI (3 stats) → Annual Intake Chart → **Who We Rescue** → **Why They Come In** → Five Growth Phases → Report Archive → Cross-link to `/financials`.

**Who We Rescue (`IntakeSpeciesSection.tsx`):**
- Lead paragraph reframes the org as raptor-focused (Black Kites = 81.9% of intake).
- "Featured Raptors" subsection: top 10 raptors only, with `PlatePlaceholder` cards for forthcoming vintage public-domain illustrations. Filters out egrets / crows / hornbills / kingfishers / pigeons / ibises via an explicit `RAPTORS` set.
- Current featured order: Black Kite, Barn Owl, Black Eared Kite, Shikra, Spotted Owlet, Crested Serpent Eagle, Egyptian Vulture (EN), Indian Scops Owl, Oriental Honey Buzzard, Short-Toed Snake Eagle.
- "Endangered & Threatened Species" subsection: shows only CR/EN/VU/NT species per project rule (LC + blank get no badge anywhere).
- Collapsible "View all 156 species" appendix listing every species in rank order — pigeons, crows, etc. live here for transparency.
- IUCN badges via shared `IucnBadge.tsx` (renders only for CR/EN/VU/NT).

**Why They Come In (`IntakeConditionsSection.tsx`):**
- Headline: "Manja injuries account for 39.1% of intake."
- Bar chart of 18 condition categories (Manja Injuries in amber as the signature WR specialty; rest in teal gradient). Sorted descending; "External Examination Normal" + "Other / Various" parked at the bottom.
- **Critical caveat banner**: data is based on 7,230 documented register cases (18.2% of total intake), not all 39,681 — patterns extend broadly but percentages reflect the documented subset.

### Sections built & then removed during this session

- **`IntakePartnersSection.tsx`** — built ("Where They Are Transferred From"), user removed. Component file preserved in repo, just unwired from the page.
- **`IntakeAgeSection.tsx`** — built ("Chicks & Juveniles"), reframed twice, user removed because age data was too sparse to honestly extrapolate. The "Adult (implied) = 94.5%" stat was the trigger for removal — it created a false denominator since unmarked ≠ measured-as-adult. Component file preserved for future revival once age tagging improves or framing is sharper.

### Species data — final state after 4 cleanup passes

| Pass | Species count | IUCN coverage |
|---|---|---|
| Raw extract | 284 | seeded ~30 |
| First merge | 261 | 98.9% |
| Second merge (Black Kite (J), SVSJ family) | 246 | 98.9% |
| Aggressive typo pass (~96 aliases) | 165 | 99.5% |
| **Final cleanup (today)** | **156** | **99.70%** |

The 17 remaining IUCN-blank species are intentional placeholders (mix-breed Pigeon, domestic Kitten/Cat/Hen/Budgie/Zebra Finch, ambiguous "Ibis"/"Munia"/"Dove" generics, illegible record-keeping entries like "Pound Horn"/"Purpal Horn"/"Dupkela"). All flagged in the master file's Audit Log.

**Major typo merges this session** (logged for next-session reference — already baked into `build_master_intake.py`):
- Black Kite cluster: "back kite", "blackkite", "black kiite", "(died Before Reaching)", "(unable To Capture)"
- Hornbill cluster: "horn bill", "hornbill" (9 cases), "indian grey horn bill", "horn bill(indion grey)", "baby hornbill"
- Crested Serpent Eagle: "creased serpent eagle", "serpent egale", "serpent eagle", "cs eagle"
- Five-Striped Palm Squirrel: 8 variants ("fs palm squirrell", "5 strip palm squirell", "squierll e", etc.)
- Owl variants: "indian scoops owl", "pallid scopes/scoopes owl", "spotted owl", "scopes owl"
- Hyphen variants: "black-winged stilt/kite", "white-breasted waterhen", "black-headed gull/ibis", "yellow-footed green pigeon"
- Other: "honey buzard"+"crested bazzard"+"oriental hunny buzzard" → Oriental Honey Buzzard; "egyptian valture/vultur"+"egyption vultur" → Egyptian Vulture; "mayna"/"maina" → Common Myna; "babler"+"jungle babler" → Jungle Babbler

### Components built this session (all in `src/components/intake/`)

- `IucnBadge.tsx` — renders CR/EN/VU/NT badge only, with hover tooltip. Hex colours: CR red-100/700, EN orange-100/700, VU amber-100/800, NT yellow-100/800.
- `PlatePlaceholder.tsx` — aged-paper placeholder card with Feather icon. Aspect 3:4. Will swap to `next/image` once Wikimedia plates land at `/public/plates/{slug}.jpg`.
- `IntakeSpeciesSection.tsx` — uses `"use client"` for expandable appendix state. Has hardcoded RAPTORS set for filtering. SpeciesCard + EndangeredCard sub-components inline.
- `IntakeConditionsSection.tsx` — server component, data-only rendering.
- `IntakeAgeSection.tsx` — server component (currently unwired).
- `IntakePartnersSection.tsx` — server component (currently unwired).

### Build scripts on disk at `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\`

- `Master Intake Database.xlsx` — 6 sheets, 39,681 cases. Single source of truth.
- `build_master_intake.py` — rebuilds the .xlsx from source spreadsheets. Supports 3 source locations (Wildlife Department Records, Data/Intake Records, D:/Case Rocord) + EXTRA_FILES for one-off paths.
- `export_intake_data.py` — reads the .xlsx and emits `src/lib/intake-data.ts`. Condition keyword classification rules (18 categories) live here. Re-run after any master-file edit.

### Pending pickup for next session

1. **Source vintage public-domain plates from Wikimedia Commons** for the top 10 featured raptors. Recommended sources:
   - John Gould — *Birds of Asia* (1850-1883): Black Kite, Egyptian Vulture, Shikra, owls
   - Audubon — *Birds of America*: Barn Owl, Peregrine Falcon
   - Daniel Giraud Elliot — eagles, vultures
   - Joseph Smit / Henrik Grönvold — late-1800s Indian gallery plates
   - Manual download → sharp-cli compress to ~1000px wide JPEG → save to `/public/plates/{slug}.jpg`.
   - Update `PlatePlaceholder.tsx` to render `<Image>` when the file exists, fall back to placeholder otherwise.

2. **Revive "Chicks & Juveniles" section** with better data or sharper framing. The fundamental issue is that age is only explicitly tagged for ~2,200 of 39,681 cases (5.5%). Options for next session: (a) only show chick counts as raw numbers, drop all percentages; (b) reframe as "Orphan Care" stat block alongside conditions; (c) wait for richer age data to be captured.

3. **Source-data hunts that would improve the dataset** (logged in Audit Log sheet):
   - 2017 Jan-Oct register files (currently have only Nov + Dec)
   - 2018 Jan + Dec intake monthly files (binder fills the data, no monthly attribution)
   - 2020 Feb register, 2022 Nov register, 2024 Jun register
   - 2025/2026 registers (years in progress)

4. **Section design refinements** based on real-page eyeballing — the user may want to tweak copy, visual hierarchy, or card layouts.

### Top numbers to remember for next session

- **39,681 cases · 156 species · 859 org partners · 99.70% IUCN coverage**
- Black Kite = 32,510 cases = 81.9% of intake (raptor-rescue identity story)
- Manja Injuries = 39.1% of 7,230 documented conditions (signature specialty story)
- Top 4 partners = 89.0% of intake (Charity Birds Hospital, S.V.S.J. Sewa Trust, Sanjay Gandhi Animal Care Center, Prem Bhawan) — though partner section is currently unwired

### Commits pushed today (newest first)

- `4ad1f9c` — remove Chicks & Juveniles section pending correction
- `bb95071` — drop misleading 'Adult (implied)' card, reframe section
- `3959934` — final species cleanup pass (165 → 156)
- `1c63a3e` — featured cards now show raptors only
- `385a367` — remove 'Where They Are Transferred From' section
- `3db5bcf` — exclude Pigeon + Blue Rock Pigeon from featured cards
- `c4273bd` — consolidate 96 species typo variants (261 → 165)
- `0388d9b` — species/conditions/age/partners sections (initial build)
- `13116e0` — export Master Intake Database aggregations
- `5099d7b` — split /annual-reports + /financials, Wages merge, 2025 PDF refresh

---

**Earlier session log (2026-05-21 evening — Master Intake Database expansion to 17 years, IUCN classifications filled, aggregated rollups exported):**

**Session 2026-05-21 (evening continuation) — Master Intake Database expanded to full 17-year coverage, IUCN classifications filled, aggregated rollups exported to TypeScript for the website.**

### What was done this evening

1. **Expanded master file from 11 years (2010-2020) to all 17 years (2010-2026).** New year folders ingested:
   - `Data/Intake Records/2021/` through `2026/` — all monthly files + annual consolidated `Annual2021.xlsx`, `2024.xlsx`, `Annual 2024.xlsx`, `2025.xlsx`, `Cases 2026.xlsx`
   - Supplementary files from `D:/Case Rocord/`: `Case 2017.xlsx` (full year), `2023/October Birds.xlsx`, `2023/December Birds.xlsx`, `2023/October Other Birds 2.xlsx`, `2023/December Other Birds 2.xlsx`
   - `Data/Intake Records/2019/March Other Birds 2019.xlsx` (missing register file)

2. **Final coverage state** — 39,681 unique cases. Intake months 12/12 for all years; register months 12/12 for 2019, 2021, 2023; 10-11/12 for other completed years; partial for 2025/2026 (in progress).

3. **Data rules locked in this session** (carry forward):
   - Black Kite (J/H/F) suffix extracted to Age column; (M) suffix to **new Hybrid column** (not Age). Species column always shows "Black Kite" — group-by-Species rolls up all ages.
   - (OHB) suffix → species recoded to "Oriental Honey Buzzard"
   - (DOA) suffix → moves to Final Status = "Dead On Arrival", strips from species
   - All "Mr./Mrs./Ms./Miss/Dr./Prof./Capt./Maj./Col." prefixed partner names auto-excluded from Partners list (Mr. Rajiv Jain + Mr. Umar manually added as employees). Shri/Sri/Smt/Sh deliberately kept since they appear in legitimate org names.
   - "Anomaly: Date year differs from source-file year" renamed to **"Inventory — Cross-Year Cases"** — these 4,036 cases are scheduled-species birds being declared to Forest Department / wildlife authorities while under multi-year care. Legitimate, not anomalous.

4. **Partner aliases** (full list now in `build_master_intake.py`):
   - **Sanjay Gandhi Animal Care Center** ← SGACC, S. G. Animal Care Center, …Centre variants
   - **S.V.S.J. Sewa Trust** ← Shri Vijaynand Surishwar Jain Seva/Sewa Trust (full name), Shahdra/Shahadra Bird Hospital, Bird Hospital Shahdra/Shahadra
   - **Charity Birds Hospital** ← Charity Bird Hospital (singular variant)

5. **Species aliases** (full list in script): 25+ typo + abbreviation merges including "blackkite" → Black Kite, "cattel egret" → Cattle Egret, "creasted serpent eagle" → Crested Serpent Eagle, "cs eagle" → Crested Serpent Eagle, "scopes owl" → Indian Scops Owl, "rose ring perakeet" → Rose-Ringed Parakeet, "five stripped palm squirrel" → Five-Striped Palm Squirrel, "asian koel" = Common Koel = Indian Koel = Koel, "spectacle cobra" = Indian Cobra. Black Kite ≠ Black Eared Kite (different species). "Pigeon" (mix-breed racing) ≠ "Blue Rock Pigeon" (wild) — kept separate.

6. **IUCN classifications filled for top 69 species (98.9% of cases)**:
   - All major raptors, vultures (CR for Gyps species, EN for Egyptian + Steppe), wetland birds, common Indian birds
   - Filtered to display CR/EN/VU/NT only on public page (LC + unknown → no badge)
   - Remaining 192 species (1.1% of cases) are generic names ("Pigeon", "Lapwing", "Dove") that can't be classified or one-off typos

7. **`src/lib/intake-data.ts` exported** — single auto-generated TypeScript module the website imports for the upcoming page sections. Contains:
   - `INTAKE_TOTAL = 39681`
   - `SPECIES_BREAKDOWN` — 261 species with case counts + IUCN
   - `CONDITION_BREAKDOWN` — 18 categories aggregated from free-text condition column (Manja Injuries 39.1%, Orphans 18.5%, Fractures 16.3%, etc. — based on 7,230 documented register cases)
   - `AGE_BREAKDOWN` — Adult/Juvenile/Fledgling/Nestling/Hatchling
   - `PARTNER_BREAKDOWN` — 859 org partners (individuals excluded)
   - `YEARLY_INTAKE` — annual totals 2010-2026
   - Re-generate via: `python "C:/Users/maxra/Documents/Wildlife Rescue/Data/Master Data/export_intake_data.py"`

### Files produced this session

**On disk (outside repo) — `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\`:**
- `Master Intake Database.xlsx` (~1.4 MB) — 6 sheets: Intake, Sources, Species Map, Partners, Conflicts Log, Audit Log
- `build_master_intake.py` — re-runnable, supports 3 file locations (`Wildlife Department Records/Intake Records/`, `Data/Intake Records/`, `D:/Case Rocord/`) + explicit EXTRA_FILES list for one-off paths
- `export_intake_data.py` — reads the .xlsx, runs condition classification + age cross-extraction + partner filtering, emits `intake-data.ts`

**In the repo:**
- `src/lib/intake-data.ts` — auto-generated, ~49 KB, ready to import

### Pending pickup for next session

**Page-build phase** — `/annual-reports` gets new sections (the user wants these per the earlier roadmap):

1. **"Who We Rescue — Species"** (the centerpiece) — featured top 10 with vintage public-domain plates (John Gould, Audubon, Daniel Giraud Elliot from Wikimedia), endangered highlights using CR/EN/VU/NT badges only, collapsible full-list appendix of all 261 species for credibility.

2. **"Why They Come In — Conditions"** — Manja Injuries leading at 39.1%, must include clear caveat that this is based on register data (7,230 cases of scheduled species), not all 39,681 intake records.

3. **"Who They Are — Age"** — donut/bar chart of Adult/Juvenile/Fledgling/Nestling/Hatchling. Caveat: 94.5% of cases lack explicit age marker — show 26%-of-documented-cases-were-chicks as the honest framing.

4. **"Where They Are Transferred From"** — top partner orgs. Top 4 (Charity Birds Hospital, SVSJ, SGACC, Prem Bhawan) account for 80.7% of intake. Brief intro paragraph for each.

5. **Source illustrations from Wikimedia Commons** — public-domain ornithological plates (John Gould *Birds of Asia* 1850-1883 most relevant for Indian raptors/vultures). Manual download, sharp-cli compression, save to `/public/plates/`, full attribution on the page.

**Outstanding data gaps to fill if user finds them** (audit-log entries):
- 2017 Jan-Oct register files (only have Nov, Dec)
- 2018 Jan + Dec intake files (binder provides the data, but no monthly attribution)
- 2020 Feb register
- 2022 Nov register
- 2024 Jun register
- 2025/2026 registers (years in progress)

**Top species headline numbers (memorise these for page-design conversations):**

| Cases | Species |
|---|---|
| 32,356 | Black Kite (incl. juveniles + hatchlings + fledglings) |
| 1,337 | Blue Rock Pigeon |
| 1,078 | Barn Owl |
| 749 | Black Eared Kite |
| 460 | Shikra |
| 415 | Cattle Egret |
| 341 | Common Crow |
| 157 | Spotted Owlet |
| 102 | Indian Grey Hornbill |
| 90 | Crested Serpent Eagle |

**Top condition story (among 7,230 documented):** Manja Injuries 39.1% → Orphans/Chicks 18.5% → Fractures 16.3%. This is the page's emotional hook.

**Top partner concentration:** Top 4 orgs handle 80.7% of intake. This is the "Where they are transferred from" story.

---

**Previous evening status was the morning thread (`/annual-reports` page split, Wages-merge, 2025 PDF refresh, Master Intake pilot at 2010-2020) — that's preserved in the git history at commit `5099d7b`.**

---

**Session 2026-05-21 (morning) — three threads of work, all on `main` for the website + a new data foundation in `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\`.**

### Thread 1 — `/annual-reports` "Where Your Money Goes" simplification
- Merged Wages into Salaries & Honorarium head per year ("Wages, Salaries & Honorarium") in `src/lib/expenditure-data.ts` (all 5 years).
- Removed sub-item bullets from `src/components/ExpenditureBreakdown.tsx` render (data preserved in the file; just hidden).
- Added inline note below the bars: "Top-level heads shown for clarity. For a detailed line-item breakdown of any head, please write to saud@raptorrescue.org."

### Thread 2 — 2025 Annual Report PDF replaced
- `public/wr-annual-report.pdf` swapped from old 2.95 MB version to the new 13.2 MB file (`C:\Users\maxra\Documents\Wildlife Rescue\Annual Report\2025\2025 Annual Report.pdf`). Same URL — wired into `/blog/wr-annual-report-2025`, `/annual-reports` 2025 card, and homepage "From Our Blog".

### Thread 3 — Page split: `/annual-reports` → `/annual-reports` + `/financials`
- New `src/app/financials/page.tsx` — moved the 5-year financial table, `<ExpenditureBreakdown />`, PDF/Excel downloads, footnotes, and 4 financial-only KPIs out of `/annual-reports`. Hero icon: DollarSign. Cross-link back to `/annual-reports` at bottom.
- `src/app/annual-reports/page.tsx` rewritten as "Annual Rescue Reports": hero (FileText), 3 rescue KPIs, intake chart since 2010, Five Growth Phases, AnnualReportCard archive, cross-link to `/financials` at bottom. Financial sections completely removed.
- Header dropdown ("Our Work") shows BOTH entries now: "Annual Rescue Reports" + "Financial Transparency" (desktop + mobile lists).
- `src/app/sitemap.ts` registers `/financials`.
- `src/lib/wingman-prompt.ts` updated: `/annual-reports` description split into rescue-focused + financial-focused descriptions.

### Thread 4 (parallel research, no website code) — Master Intake Database pilot

This is the **foundation for the next big page** the user wants — `/annual-reports` species-wise / condition-wise / age-wise breakdowns with vintage public-domain bird plates as illustrations.

**Plan agreed with user:**
- Aggregate species, conditions (where available), age, and partner-org data from the raw intake spreadsheets into a single master file.
- Public page will show **top 20 species + full list appendix** (for credibility), conditions, age breakdown (adult/juvenile/hatchling/fledgling), and a "Where they are transferred from" partner-org section.
- Illustrations sourced from **public-domain ornithological plates** — John Gould (Birds of Asia 1850–1883), Audubon, Daniel Giraud Elliot, Edward Lear, Joseph Smit, Henrik Grönvold. Wikimedia + Biodiversity Heritage Library. NOT AI-generated.
- IUCN status stored in master file for all species but **only displayed on the page for CR / EN / VU / NT** species (LC and Unknown get nothing visible — reduces clutter).

**Files produced this session:**
- `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\Master Intake Database.xlsx` (~930 KB) — 6 sheets:
  1. **Intake** — one row per unique C.No., 19,939 rows; columns: C.No., Date, Year, Species (raw), Species (normalised), **Age**, Partner raw, Partner cleaned, Place, Condition, Final Status, IUCN Status, Source File(s)
  2. **Sources** — every file processed (82 sources), type, rows imported, notes
  3. **Species Map** — 246 distinct species → canonical name + IUCN status (editable). User to fill IUCN for blanks.
  4. **Partners** — 1,660 distinct partner orgs → cleaned display name + raw variants
  5. **Conflicts Log** — 44 cases where register-file Condition/Status changed across months (later-month wins per user instruction)
  6. **Audit Log** — every gap, anomaly, decision-pending item — single sheet for user to triage
- `C:\Users\maxra\Documents\Wildlife Rescue\Data\Master Data\build_master_intake.py` — fully reproducible Python script (openpyxl). Re-run after dropping new files into the source folders.

**Years covered + reconciliation against `RESCUE_BY_YEAR` (audited):**

| Year | Captured | Audited | Status |
|---|---|---|---|
| 2010 | 362 | 362 | ✓ exact |
| 2011 | 1,011 | 1,011 | ✓ |
| 2012 | 1,346 | 1,346 | ✓ |
| 2013 | 1,324 | 1,324 | ✓ |
| 2014 | 1,974 | 1,974 | ✓ |
| 2015 | 2,306 | 2,306 | ✓ |
| 2016 | 2,365 | 2,365 | ✓ |
| 2017 | 2,112 | 2,469 | gap −357 (binder short, no monthly files for Jan-Nov) |
| 2018 | 2,090 | 2,815 | gap −725 (binder short, missing monthly intake Jan + Dec) |
| 2019 | 2,135 | 2,565 | gap −430 (consolidated `Case 2019.xlsx` short of audited) |
| 2020 | 2,489 | 2,489 | ✓ exact |
| **Total** | **19,939** | **21,026** | **−1,087** |

**Data rules locked in this session (carry forward to all future master-file work):**
- Binder file (`2010 to 2020.xlsx`, 11 sheets) used ONLY to fill gaps — processed after monthly folders, first-in-wins ensures monthly intake data takes precedence. Register Condition/Final Status data NEVER touched by binder.
- WPA-register dedup: later-month entry wins per C.No. (because Final Status updates as treatment progresses).
- IUCN status kept in master but on the page only show CR / EN / VU / NT (drop LC + Unknown).
- Species capitalisation is case-insensitive in source data; canonical Title Case in output. Black Kite ≠ Black Eared Kite. "Crow" merged into "Common Crow". "Pigeon" (mix-breed racing pigeons) is NOT the same as "Blue Rock Pigeon" (wild) — keep separate.
- Partner-org auto-merge: apostrophe + punctuation stripping, plus manual alias overrides for known orgs:
  - **Sanjay Gandhi Animal Care Center** ← SGACC, S. G. Animal Care Center, …Centre variants
  - **S.V.S.J. Sewa Trust** ← Shahdra Bird Hospital, Shahadra Bird Hospital, Bird Hospital Shahdra, Bird Hospital Shahadra
  - **Charity Birds Hospital** ← Charity Bird Hospital (singular variant)
- Age suffix extraction (parenthetical at end of species name):
  - `(J)` → Age = **Juvenile** (517 cases)
  - `(H)` → Age = **Hatchling** (113 cases)
  - `(F)` → Age = **Fledgling** (5 cases)
  - `(M)` → Age = **Mix** (mix-breed Kites — 2 cases — flagged in Audit Log; technically not an age, may move to separate Hybrid column later)
- "Unknown" partner kept as literal "Unknown" (not "Not Recorded" — feels less unprofessional per user).

**Pending pickup for next session (the big questions to ask the user):**
1. **Source-data hunt for missing 2017/2018/2019 cases** — user may have additional spreadsheets we haven't found yet. Without them, the page footnote needs to acknowledge the gap (or use audited annual totals for headlines + master-file data only for species/condition/partner distribution).
2. **Ingest 2021–2026** — folders likely at `C:\Users\maxra\Documents\Wildlife Rescue\Wildlife Department Records\Intake Records\2021\` through `2026\`. Same monthly Case/Other Birds structure expected. Re-run `build_master_intake.py` after adding to `YEARS` list.
3. **User to scan Audit Log sheet** and fill blanks in Species Map (IUCN status for low-confidence species).
4. **Then start the page build**: top 20 species with vintage plates, condition section, age section, "Where they are transferred from" partner section, full-species appendix. Cards/charts use WR brand teal + amber.

**Top 10 species in master (2010-2020 combined):**

| Cases | Species | IUCN |
|---|---|---|
| 16,621 | Black Kite | LC |
| 534 | Barn Owl | LC |
| 331 | Black Eared Kite | LC |
| 262 | Common Crow | (TBD) |
| 257 | Blue Rock Pigeon | LC |
| 226 | Cattle Egret | LC |
| 210 | Shikra | LC |
| 89 | Spotted Owlet | LC |
| 65 | Pigeon | (TBD — mix-breed racing pigeons) |
| 47 | Crested Serpent Eagle | LC |

**Top partners (after merges):**

| Cases | Partner |
|---|---|
| 11,813 | Charity Birds Hospital |
| 1,798 | Sanjay Gandhi Animal Care Center |
| 1,743 | S.V.S.J. Sewa Trust |
| 364 | Prem Bhawan |
| 319 | "Unknown" |
| 167 | Wildlife SOS |
| 155 | Mr. Rajiv Jain |

---

**Previous status carried forward:**

**Session 2026-05-20 (afternoon) — `/annual-reports` financial transparency overhaul, commit `58edf01` pushed to `main` (live):**
- [x] **New interactive 5-year expenditure breakdown** on `/annual-reports`. Replaced the static FY 2024-25 stub with a year-tab picker (FY 2020-21 → 2024-25). Each year shows 6 top-level heads (Salaries & Honorarium · Wages · Food for Birds · Rescue & Release Logistics · Medicine + Service Charges + Direct Hospital · Other Operational Expenses) with %-of-total bars and named sub-line-items. Other Operational is broken into 5 transparency sub-buckets (Audit & Professional · Office & Utilities · Repair & Vehicle Maintenance · Staff Welfare & Travel · Depreciation & Misc). Capital Investment shown separately below the bars (off-I&E equipment).
- [x] **Data sourced from per-year audited Excel I&E A/c** in `C:\Users\maxra\Documents\Wildlife Rescue\Accounts\Audit YYYY-YY\…\Wildlife Rescue'YY Consolidated.xlsx` (FY 21-22, 22-23, 23-24, 24-25). FY 20-21 reconstructed from the 5-year binder PDF (no Excel for that year; sums exactly to audited total).
- [x] **Two totals corrected in the existing 5-year financial table** to match audited Excel (resolved a conflict with a parallel-session commit that used outdated binder-summary figures):
  - FY 22-23 Direct Expenses: ₹13,46,398 → **₹15,40,394**
  - FY 22-23 Total Expenditure: ₹26,11,711 → **₹28,05,707**
  - FY 24-25 Total Expenditure: ₹42,44,343 → **₹38,44,343** (matches audited surplus ₹4,22,304 = Income ₹42,66,647 − Exp ₹38,44,343)
- [x] **Deleted `src/components/YearlyExpenditureBreakdown.tsx`** (the parallel-session simpler 3-bucket version) in favour of the more detailed `ExpenditureBreakdown.tsx`.

**New files:**
- `src/lib/expenditure-data.ts` — typed `YearExpenditure[]` with per-year heads + subItems + capex; `formatINR()` (Indian lakh/crore grouping) + `formatUSD()` helpers; flat ₹84.5/USD conversion.
- `src/components/ExpenditureBreakdown.tsx` — client component (`"use client"`); 5 year tabs, total expenditure headline (₹ + ~US$), per-head bars with chevron-bulleted sub-items, Capital Investment block, Income/Expenditure/Surplus stat tiles, audit footnote. Falls back to "Detailed breakdown coming soon" stub if a year has no `heads` array (none currently).

**Methodology notes (in case the audit firm changes again next year):**
- The audit firm's Direct/Indirect classification changes year-on-year. From FY 23-24 onwards most items moved into Direct; FY 24-25 introduced separate "Salaries" and "Honorarium" lines (previously clubbed). The component's 6-head bucketing is methodology-agnostic — just map each new line item into one of the 6 heads in `expenditure-data.ts`.
- FY 22-23 onwards: capex is on the Balance Sheet, not on the I&E A/c (per audit notes). FY 24-25 capex = ₹12.7L (ambulance ₹10.15L + anaesthesia machine ₹1.41L + oxygen concentrator ₹57k + other clinic equipment).
- "Wages" line in FY 22-23 = "Rescue Staff Salaries" (renamed). In FY 23-24 it dropped to ₹29,700 (residual); most rescue staff comp consolidated into "Salaries & Honorarium" (₹18.04L) that year.
- USD conversion uses flat ₹84.5/USD in the new component for visual consistency. The existing financial table above it uses per-year RBI FY-average rates (more accurate); both shown on the page.

---

**Previously completed (Session 2026-05-20 morning — bulk photo refresh):**
- Two commits pushed to `main`: `d0b226a` (initial bulk refresh) and `cdc7666` (more clinic/enclosure/species photos).

Content-only session. All photos compressed via `PIL.Image.thumbnail((1800,1800), LANCZOS)` + `ImageOps.exif_transpose` + JPEG q=82 progressive. One CR3 raw file converted with `rawpy` (installed mid-session). No code logic changes.

**Pages touched:**

- **`/history`** — added Scops Owl 05 portrait at `public/history/scops-owl-05.jpg`. Set `objectPosition: "center top"` on Scops Owl entry and `"center 25%"` on Chhitku entry to bring their faces into frame. Initially added a "Saud With a Bird" photo but user flagged it as a duplicate of the existing "Saud Treating a Black Kite" — removed and deleted the file.
- **`/gallery`** — user asked to trim hard, then started adding. Final state: 7 cards (Black Eared Kite from species, Manja Thread in Wound, Black Kite, Painted Stork, Crow Under Gas Anesthesia, Black Headed Ibis Under Anesthesia, Cattle Egret in Clinic). Photos at `public/gallery/*.jpg`. All other placeholder/aspirational PHOTOS entries deleted. **Known limitation (NOT fixed, flagged to user):** the lightbox at `src/app/gallery/page.tsx:168` still renders a "Full-size Photo Placeholder" gradient instead of the actual image. Pre-existing — fix is a 5-line change to swap the placeholder div for an `<Image>` using `lightboxPhoto.src`.
- **`/clinic`** — `EQUIPMENT_GALLERY` array in `src/app/clinic/page.tsx` extended with 13 new photos (Ultrasonic Scalpel & Vessel Sealer + console + attachments grouped together, Microwave Ablation Machine, Gas Anesthesia + MAM combined setup, Centrifuge, Automatic Blood Chemistry Analyzer, Clinic Microscope, Staff Daily Routine, Black Kite with Manja Cut Wound case, Laser Cautery & Physical Therapy ×2 views, Digital X-Ray with DR Detector + dedicated gas anesthesia, X-Ray Control & Switch, Black Kite under anesthesia for X-Ray, Bandage Change, Fluid Therapy for Hydration). Also added a NEW `CLINIC_FEATURES` card "Ultrasonic Scalpel & Vessel Sealer" with `Scissors` icon between the existing Surgical Laser and Diagnostic Lab cards. All photos in `public/facility/*.jpg`.
- **`/enclosures`** — `AVIARY_GALLERY` extended from 3 → 9 cards (added enclosure-04 through enclosure-09 at `public/facility/`).
- **`/species/greater-coucal`** — NEW species entry at end of `SPECIES_LIST` in `src/lib/species-data.ts`. Slug `greater-coucal`, scientific name *Centropus sinensis*, ~10/year, "Ground Cuckoo" category. Full habitat/diet/behavior/threats/funFact. Single image at `public/species/greater-coucal-01.jpg` (converted from CR3 raw). **Important:** the source photo has the bird's face on the right side; user flagged that face was cropped in the hero, fixed with `imagePosition: "right center"`. CR3 → JPEG conversion required `pip install rawpy` mid-session.

**Tooling notes for next photo session:**

- `.CR3` Canon raw files: PIL can't read them. Use `rawpy.imread(src).postprocess(use_camera_wb=True)` → `Image.fromarray()`. The `extract_thumb()` shortcut returned format type 4 (unsupported) on this camera's CR3s, so full demosaic was required. ~3-5s per image for a 6022×4024 sensor.
- Windows console cp1252 chokes on em-dashes / non-ASCII when Python prints. Either redirect to a file with UTF-8 or stick to ASCII in `print()` statements during one-liners.
- Preview server `eval` flakes when navigating via `window.location.href` — page sometimes lands at `chrome-error://` or `localhost:3000/` even though curl confirms the route returns 200. Workaround: use `location.href = '/foo'` (relative) and wrap the verification in `new Promise(r => setTimeout(...))` with 1500-2500ms delay. If that still misses, fetch directly with curl + grep for the H1.

**Two commits pushed to `main`:**

- `d0b226a` — initial bulk refresh: history (Scops Owl + face crops), gallery trim to 7, clinic Ultrasonic Scalpel + console + attachments + Microwave + Centrifuge + Blood Chemistry + Microscope + Staff routine + manja cut wound + Gas+MAM
- `cdc7666` — second pass: clinic Laser Cautery ×2 + Digital X-Ray + control switch + Black Kite X-Ray anesthesia + Bandage Change + Fluid Therapy; enclosure-04 through 09; Greater Coucal species

**Open / pending:**

- **Gallery lightbox shows placeholder, not the actual photo** — pre-existing, flagged but not fixed. 5-line fix in `src/app/gallery/page.tsx:168`.
- Verify Vercel deploy completes cleanly (both commits) — no code changes, only data + images, so build risk is low.

**~~Previous session~~ (2026-05-18) handoff retained below for context:**

**Last updated by:** Claude Code — 2026-05-18 (80(G) donation receipt system Phase 1b — emailed PDF receipts shipped end-to-end and verified live; ₹100 preset + custom-amount input added; nadeem@ → saud@ refactored across donor-facing surfaces; Upstash Redis activated)

**Session 2026-05-18 — Phase 1b shipped, all on `main` and verified with a real ₹100 test donation that arrived in user's inbox with both PDFs attached.**

This session implemented the second half of the 80(G) receipt system (PDF generation + Resend email delivery), did the operational rollout (Resend account, raptorrescue.org domain verification, Vercel env vars, Upstash Redis activation), debugged + fixed three issues caught during the live test (Redis not configured, Windows path issue on @react-pdf/renderer, embedded Razorpay widget bypassing the 80G flow), and shipped associated UX improvements (₹100 preset, custom-amount input).

**Final commit chain on `main` from this session (oldest → newest):**

- `bd8a6a2` `feat(donations): Phase 1b — automated emailed PDF receipts via Resend` — initial Phase 1b code (PDF template, Resend wrapper, webhook integration, admin preview endpoint, ~1700 LOC across 5 new files + 1 modified)
- `ece0da8` `feat(receipts): add Mohammad Saud signature image + role correction` — Saud's transparent-background signature PNG added at `public/signature.png`; SIGNATORY.role fixed to "Treasurer" (was "Trustee"); fixed a @react-pdf/renderer Windows-absolute-path bug by switching `<Image src={path} />` → `<Image src={buffer} />` (path-based silently reserved layout space but didn't embed the PNG; buffer-based renders correctly cross-platform)
- `e197231` `fix(receipts): point donor-facing email to saud@ (was nadeem@)` — ORG.email + disclaimer in receipt PDF + Resend HTML email body all point to Saud (he handles donations, Nadeem doesn't)
- `a413372` `fix(donations): point thank-you screen receipt-query email to saud@` — two donor-facing references on the post-payment thank-you modal (`DonationThankYou.tsx`)
- `c1374db` `fix(redis): accept KV_REST_API_* env var names too` — Vercel Marketplace Upstash integration creates env vars with `KV_REST_API_*` prefix (legacy Vercel KV branding); code now reads either `UPSTASH_REDIS_REST_*` or `KV_REST_API_*` so the integration "just works" without manual env-var renaming
- `bdd7876` `feat(donations): add ₹100 preset + custom amount input, drop Razorpay widget` — ₹100 "Every rupee helps" added to DONATION_AMOUNTS_INR; grid widened to 5 columns; embedded Razorpay payment-button widget replaced with "Want to give a different amount?" inline ₹ input + Continue button that routes through the same 80(G) modal as preset cards (so custom amounts no longer create orphan donations); UPI Tip + Bank Transfer fallback texts updated to saud@

**Operational rollout completed this session (NOT just code):**

| Step | What | Status |
|---|---|---|
| 1 | Resend account created at resend.com (free tier, 3k emails/month) | ✅ Done |
| 2 | API key generated, added to Vercel as `RESEND_API_KEY` | ✅ Done |
| 3 | `raptorrescue.org` verified as Resend sending domain (DNS records added at GoDaddy: SPF TXT, DKIM CNAMEs, MX, DMARC) | ✅ Done — Resend shows green verified ✓ |
| 4 | `RECEIPT_FROM_EMAIL` set in Vercel: `Wildlife Rescue <receipts@raptorrescue.org>` | ✅ Done |
| 5 | `RECEIPT_REPLY_TO` set in Vercel: `saud@raptorrescue.org` | ✅ Done |
| 6 | `ADMIN_USERNAME` + `ADMIN_PASSWORD` set in Vercel (user chose own credentials, stored in user's password manager) | ✅ Done |
| 7 | `PAN_ENCRYPTION_KEY` set in Vercel (fresh 32-byte hex, generated this session: `d1ace17d65...`; saved in user's password manager — DO NOT ROTATE) | ✅ Done |
| 8 | Upstash for Redis database created via Vercel → Storage → Marketplace (database name `upstash-kv-canary-elephant`, Mumbai region, free tier, connected to all envs) | ✅ Done |
| 9 | Live preview of receipt verified at `/api/admin/receipt-preview` — signature renders, layout fits one page, branding correct | ✅ Done |
| 10 | Live end-to-end test: real ₹100 donation through `/donate` → thank-you screen + 80G cert download → receipt email arrived within 30s with two PDFs attached | ✅ Verified |

**Production state — what donors experience right now:**

1. Visits `https://www.raptorrescue.org/donate`
2. Sees 5 INR preset amount cards (₹100, ₹500, ₹1,000, ₹2,500, ₹5,000) OR uses the "Want to give a different amount?" input below for any custom amount up to ₹1,00,000
3. Clicking any amount opens the choice modal: "Would you like an 80(G) tax-deduction receipt?" with two prominent cards (No / Yes)
4. **Yes path**: donor fills name, email, PAN, address. Server validates PAN regex, blocks header injection, etc. Then Razorpay Checkout opens with amount prefilled
5. **No path**: skips straight to Razorpay Checkout
6. After payment captures: Razorpay handler fires the thank-you overlay with Razorpay Payment ID + "Download 80(G) Certificate" button (immediate static cert download)
7. Razorpay webhook fires at `https://www.raptorrescue.org/api/razorpay-webhook` (~5-30 seconds after capture)
8. Webhook validates HMAC, looks up donor draft in Redis, calls `persistDonation()` which: assigns receipt number `WR/2026-27/000NNN` via atomic Redis INCR (idempotent NX guard so duplicate webhook deliveries don't double-issue), encrypts PAN with AES-256-GCM, stores donation record, indexes into the FY sorted set
9. If `created: true`, `sendDonationReceipt()` fires: generates the provisional receipt PDF on-the-fly (`@react-pdf/renderer` → Buffer), reads the static 80G cert from `public/80g-certificate.pdf`, sends Resend email with both PDFs attached. Skips silently if donor is anonymous or no email
10. Donor sees the receipt email in their inbox within ~30 seconds. Reply-To routes to Saud

**Admin workflow:**

- `https://www.raptorrescue.org/api/admin/donations?fy=2026-27` (HTTP Basic auth) → returns Form 10BD-compatible CSV with all donor details (Pre-Acknowledgement Number = our receipt number, Name, ID Type=1 for PAN, PAN, Section Code=`80G(5)(iv)`, etc.). User's CA uploads this to incometax.gov.in. JSON output also available at `?format=json` (with PAN replaced by `[encrypted]` marker for safety).
- `https://www.raptorrescue.org/api/admin/receipt-preview?name=...&amount=...&pan=...` (HTTP Basic auth) → renders a sample receipt PDF inline for layout spot-checks.

**Open issues / pending pickup for future sessions:**

- **CA review of disclaimer wording** in `src/lib/receipt-pdf.tsx` (search for `styles.disclaimer`). Current wording is standard 80(G) paraphrasing; CA should confirm exact phrasing required.
- **Form 10BE auto-issuance (Phase 2)** — after FY closes (31 March 2027 for current donations), WR files Form 10BD with IT Dept, they issue per-donor Form 10BE certificates. Need an admin endpoint that ingests those (CSV upload), updates each donation record's `status` from `provisional_issued` → `10be_issued`, and emails the formal cert to each donor. Build this around April-May 2027.
- **`/vultures` real photos** — 10 placeholders to replace with WR's own photos when available (current photos are Wikimedia CC-licensed; Egyptian Vulture in particular flagged for replacement with user's own wounded-vulture photo).
- **Per-year "Where Your Money Goes" bucket refinement** (`src/components/YearlyExpenditureBreakdown.tsx`) — user previously flagged some bucket categorisation needs tweaking (e.g. split "Other Operating Expenses" further). Bucket sums currently reconcile to I&E A/c totals to the rupee; preserve that invariant when refining.
- **2021 infographic PDF wrapper (optional)** — `infographicPdf` field for 2021 currently points to the JPG file, so clicking "Download infographic" downloads a JPG instead of a PDF (other years have separate `.pdf` files). Cosmetic only; can be left as-is.
- ~~**Sanity write token rotation**~~ — DONE 2026-05-18. Old token revoked, new token issued and set in Vercel + local `.env.local`. Verified 2026-05-19: `/blog` serves images from `cdn.sanity.io` (authenticated reads working).

**Pending pickup specific to Phase 1b (one-time setup tasks):**

- **Confirm Resend deliverability with a wider variety of email providers** — test sends to Gmail, Outlook/Hotmail, Yahoo, ProtonMail, common Indian providers (Rediffmail, BSNL, etc.) to make sure receipt emails aren't going to spam on first send. Resend handles SPF/DKIM/DMARC well but some receivers (especially corporate filters) treat new sending domains conservatively for the first few days.
- **Optional: `RECEIPT_BCC` env var** — if user wants every receipt to also BCC an internal address for archival (e.g. an archive folder Saud monitors), add `RECEIPT_BCC=saud@raptorrescue.org` (or whatever) to Vercel.
- **Optional: GA4 conversion tracking secret** — `GA4_MEASUREMENT_PROTOCOL_SECRET` env var (from GA4 Admin → Data Streams → Measurement Protocol API secrets) — enables server-side conversion events from the webhook in addition to the client-side `gtag` events. Not blocking; just deeper analytics.

---

**Original Phase 1b technical notes (Session 2026-05-18 — describes the code that was committed in `bd8a6a2`):**

- [x] **Packages installed**: `@react-pdf/renderer@^4.3.2` (PDF generation, server-side) + `resend@^6.12.3` (email delivery). `package.json` + `package-lock.json` updated.

- [x] **`src/lib/amount-in-words.ts`** — NEW (~65 lines). Converts integer rupee amount to Indian-numbering words using lakhs/crores. Examples:
  - `amountInWords(500)` → "Five Hundred Rupees Only"
  - `amountInWords(125000)` → "One Lakh Twenty Five Thousand Rupees Only"
  - `amountInWords(10000000)` → "One Crore Rupees Only"
  Note: returns "X Rupees Only" — caller must NOT prepend "Rupees" (this was a bug caught during preview — "(Rupees Two Thousand Rupees Only)").

- [x] **`src/lib/receipt-pdf.tsx`** — NEW (~290 lines). React component using `@react-pdf/renderer` that emits the provisional 80(G) receipt as an A4 PDF.
  - Layout: header (logo top-left, org details top-right), teal title bar with receipt number on the right, four sections (Donor Details / Donation Details / Tax Exemption Details / Disclaimer + signature), fixed footer with operations address + receipt number.
  - Renders single-page A4 even for large amounts (tested ₹2,500 and ₹1,25,000). Verified visually via `/api/admin/receipt-preview` against the live PDF rendered.
  - PAN handling: caller decrypts the encrypted PAN and passes it in; PDF displays masked form `ABCDE` + `XXXX` + last digit (`ABCDEXXXXF`) — never the full PAN. If decryption fails, displays "On file (encrypted)".
  - **Placeholders that need CA/user sign-off before going live:**
    - `SIGNATORY = { name: "Mohammad Saud", role: "Trustee" }` — typed only, no image. Drop a 200×80 PNG at `public/signature.png` and the template auto-detects + renders it instead of the blank signature line.
    - Statutory disclaimer wording — paraphrased from standard 80(G) language, CA should confirm.
    - Constant `LOGO_PATH = public/logo-receipt.png` — compressed from `logo-black.png` (1.87 MB → 69 KB, 500×435) using PIL.
  - Helper: `nextAY(fy)` converts "2026-27" → "2027-28" for the Assessment Year display.
  - Public API: `renderReceiptPdf(record: DonationRecord, pan?: string): Promise<Buffer>` (async, uses `renderToBuffer` from @react-pdf/renderer).

- [x] **`src/lib/email.ts`** — NEW (~210 lines). Resend wrapper that ships the "tax pack" email.
  - Public API: `sendDonationReceipt(record: DonationRecord): Promise<SendReceiptResult>` where `SendReceiptResult = { sent: boolean, skipped?: "no_api_key"|"anonymous_donor"|"missing_email", messageId?: string, error?: string }`. Never throws — webhook can decide what to log.
  - **Skip conditions** (return early, don't email):
    - `donor.anonymous === true` (opted out of 80G — no receipt to send)
    - missing or fallback email (`no-email@example.invalid` from webhook's anonymous synthesis path)
    - `RESEND_API_KEY` env var not set (gracefully no-ops with `console.warn`)
  - **PAN decryption**: pulls `record.panEncrypted` through `decryptPan()` exported from `donations.ts`. Falls back to inline `record.donor.pan` for legacy records pre-encryption.
  - **Attachments**: dynamically-generated receipt PDF (filename `Wildlife-Rescue-Receipt-WR-{fy}-{seq}.pdf` with `/` replaced by `-`) + static 80G cert from `STATIC_RECEIPT_ATTACHMENTS` in `donations.ts` (`public/80g-certificate.pdf`). Static PDFs loaded via `fs.readFile(path.join(process.cwd(), 'public', ...))` — works on Vercel (public/ is bundled with the deployment).
  - **HTML email body**: WR-branded teal gradient header + amount summary card (teal-light bg) + amber-bordered "tax pack" callout explaining the two attachments + Form 10BE next-step note (will arrive after Form 10BD filing, typically by 31 May the following year) + reply-to instructions + signed by "Nadeem & Saud, Co-Founders" + footer with org compliance IDs.
  - Env vars consumed:
    - `RESEND_API_KEY` (required) — from resend.com → API Keys
    - `RECEIPT_FROM_EMAIL` (optional; defaults to `Wildlife Rescue <onboarding@resend.dev>` for testing without a verified domain)
    - `RECEIPT_REPLY_TO` (optional; defaults to `nadeem@raptorrescue.org`)
    - `RECEIPT_BCC` (optional; comma-separated for internal archival)

- [x] **`src/app/api/razorpay-webhook/route.ts`** — UPDATED. After `persistDonation` returns `{ created: true }`, calls `sendDonationReceipt(record)`. Wrapped in try/catch (defensive — `sendDonationReceipt` already catches internally). Logs result. **Only fires on `created: true`** so duplicate webhook deliveries (which Razorpay does on transient failures) don't double-email. The full chain is now: signature verify → JSON parse → persist (idempotent NX) → if-created send email → GA4 conversion → return 200.

- [x] **`src/app/api/admin/receipt-preview/route.ts`** — NEW (~95 lines). HTTP Basic-auth-protected GET endpoint that renders a sample receipt PDF inline in the browser. Same auth pattern as `/api/admin/donations` (ADMIN_USERNAME + ADMIN_PASSWORD; returns 503 if either unset). Accepts query params: `name`, `email`, `phone`, `amount` (rupees), `pan`, `city`, `state`, `pincode`, `address`. Use this to spot-check layout after any edit to `receipt-pdf.tsx`. Example:
  ```
  curl -u wr-admin:<password> 'http://localhost:3000/api/admin/receipt-preview?name=Jane+Doe&amount=2500&pan=ABCDE1234F' -o preview.pdf
  ```

- [x] **`public/logo-receipt.png`** — NEW (69 KB, 500×435). Compressed from `public/logo-black.png` (1.87 MB) using `PIL.Image.thumbnail((500, 500), LANCZOS)`. Used by `receipt-pdf.tsx` for the letterhead logo.

**Verification done this session:**
- `npm run build` passes clean (Next.js 16.2.4, Turbopack, 68 routes, no new warnings).
- `npx tsc --noEmit` clean.
- Receipt PDF rendered end-to-end via dev server + `/api/admin/receipt-preview`. Tested with ₹2,500 (single page, donor at Bangalore) and ₹1,25,000 (Mumbai, Maharashtra). Both fit on one A4 page. Indian numbering verified (`₹1,25,000.00` with lakh comma + "One Lakh Twenty Five Thousand" in words).
- Bug caught and fixed mid-session: PDF was emitting "Rupees X Rupees Only" because both the layout and `amountInWords()` were adding "Rupees". Fixed by dropping "Rupees" prefix from the template — `amountInWords()` returns it.
- Layout iteration: first render emitted 2 pages with signature stranded on page 2. Compressed paddings (page padding 36→28, section margin 14→8, kvRow gap 4→2, signature top margin 28→14), trimmed disclaimer slightly, dropped font size from 10→9.5. Now consistently fits one page across the realistic donation range.

**Production state — what's NOT yet live (because nothing has been committed/merged):**

| Component | Status |
|---|---|
| All Phase 1b code is on the worktree branch `claude/heuristic-blackburn-293ce5` | ⏳ Not committed, not on main |
| `npm install @react-pdf/renderer resend` adds these as direct deps | ⏳ package.json modified, not committed |
| Vercel build will need these new packages when this merges to main | (already passes locally with `--legacy-peer-deps` already in `.npmrc` + `vercel.json`) |

**Env vars to add in Vercel before Phase 1b actually emails real donors:**

```
RESEND_API_KEY            # From resend.com → API Keys → "Create API Key"
RECEIPT_FROM_EMAIL        # e.g. "Wildlife Rescue <receipts@raptorrescue.org>"
                          # Requires verifying raptorrescue.org as sending domain in Resend
                          # (Resend → Domains → Add Domain → add SPF/DKIM/MX records via your DNS provider)
                          # While testing, can use Resend's default "onboarding@resend.dev"
RECEIPT_REPLY_TO          # optional, defaults to nadeem@raptorrescue.org
RECEIPT_BCC               # optional, comma-separated. Could set to nadeem@raptorrescue.org for internal archive
```

Plus the Phase 1a env vars that were queued and are still needed:

```
ADMIN_USERNAME            # any string; used for /api/admin/donations + /api/admin/receipt-preview
ADMIN_PASSWORD            # strong password
PAN_ENCRYPTION_KEY        # 64-hex (32 bytes). Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                          # ⚠️ NEVER rotate casually — old encrypted PANs cannot be decrypted without the original key
```

Without `RESEND_API_KEY`:
- Donation persistence still works (Phase 1a unaffected).
- `sendDonationReceipt` no-ops with `console.warn("RESEND_API_KEY not configured")`.
- Donor still sees the post-payment thank-you screen with the 80G cert download (Phase 1a) — they just don't get an email.

Without `RECEIPT_FROM_EMAIL`:
- Falls back to `onboarding@resend.dev` (Resend's default sender). Email still ships; just looks less branded.

**Resend setup the user still needs to do:**

1. **Create a Resend account** at resend.com (free, 3k emails/month).
2. **Generate an API key** (Resend → API Keys → "Create API Key"; full access; copy once, can't view again). Add as `RESEND_API_KEY` in Vercel.
3. **Verify raptorrescue.org as a sending domain** (Resend → Domains → Add Domain → enter "raptorrescue.org"). Resend will give you 5 DNS records (SPF/DKIM/DMARC + return-path). Add these to GoDaddy/Cloudflare or wherever raptorrescue.org DNS is hosted. Verification typically takes 5-30 minutes after the DNS records propagate. Until verified, emails will be rejected from `receipts@raptorrescue.org`.
4. **Test before going live**: pull `RESEND_API_KEY` into local `.env.local`, run a real ₹100 test donation through Razorpay in test mode, confirm email arrives at your inbox with both PDFs attached.
5. **Optional but recommended**: add a `RECEIPT_BCC=archive@raptorrescue.org` (or whatever — even your own inbox) so you have an internal copy of every receipt sent.

**CA/legal sign-off the user still owes:**

These were flagged as placeholders during this session. The receipt will still work with current defaults, but should be reviewed before the first real donor receives one:

- **Signatory image** — currently typed name "Mohammad Saud, Trustee" with no signature image. The template auto-detects `public/signature.png` (200×80 transparent PNG) and renders it above the typed name if present. Get a clean digital signature scan from Nadeem or Saud and drop it at that path.
- **Disclaimer wording** — currently the paraphrased standard 80(G) language. CA should confirm the exact phrasing they want for "this is a provisional receipt; Form 10BE follows" + 10% AGTI ceiling language. Lives in `src/lib/receipt-pdf.tsx` inside the `<Text style={styles.disclaimer}>` block.
- **FCRA exclusion flag** — if any of the donations need to be excluded from Form 10BD (e.g. CSR contributions or FCRA-restricted donations), we need to add a flag to the donation record and CSV export. Currently not implemented; all donations included in Form 10BD CSV export.
- **Minimum amount for receipt** — currently no minimum (₹1 would still get a receipt). If CA recommends a floor (e.g. ₹100 to avoid issuing receipts for nominal donations that won't be claimed), add an early-return in `sendDonationReceipt`.

**Local dev testing instructions:**

To test the full flow on your machine:

```bash
# 1. Worktree already has .env.local with ADMIN_USERNAME + ADMIN_PASSWORD + PAN_ENCRYPTION_KEY set
# 2. Run dev server
npm run dev

# 3. Preview the PDF (returns inline PDF; opens in browser)
curl -u wr-admin:local-dev-only-2026 'http://localhost:3000/api/admin/receipt-preview?name=Test+Donor&amount=5000&pan=ABCDE1234F' -o /tmp/test.pdf
# Or open in browser: http://localhost:3000/api/admin/receipt-preview?... (it'll prompt for the auth)

# 4. To test the full webhook+email path, set RESEND_API_KEY temporarily in .env.local and
#    fire a synthetic webhook payload at /api/razorpay-webhook with a valid HMAC signature.
#    (This is involved; easier to just do a real ₹100 Razorpay test-mode donation once
#    RESEND_API_KEY is in Vercel preview env.)
```

**Key files touched this session:**

- `src/lib/amount-in-words.ts` — **NEW** (~65 lines)
- `src/lib/receipt-pdf.tsx` — **NEW** (~290 lines): @react-pdf/renderer A4 template
- `src/lib/email.ts` — **NEW** (~210 lines): Resend wrapper, attachments, HTML body
- `src/app/api/razorpay-webhook/route.ts` — UPDATED: import `sendDonationReceipt`, call after `result.created`
- `src/app/api/admin/receipt-preview/route.ts` — **NEW** (~95 lines): HTTP Basic auth, sample data
- `public/logo-receipt.png` — **NEW** (69 KB, compressed 500×435 version of logo-black.png)
- `package.json` + `package-lock.json` — `@react-pdf/renderer ^4.3.2` + `resend ^6.12.3` added

**Pending pickup for future sessions (Phase 1c+ ideas):**

- **Form 10BE certificate auto-issuance** (Stage 2 of the compliance flow). After WR files Form 10BD with the IT Dept (typically Apr-May post FY close), the IT Dept issues Form 10BE per-donor. We'll need to ingest those (likely a manual CSV upload from the user) and email them out to donors who got provisional receipts the previous year. Each donor record currently has a `status: "provisional_issued"` field that flips to `"10be_issued"` once the formal cert is delivered.
- **Donor self-service receipt re-fetch** — if a donor loses their email, they should be able to look up their receipt by payment ID + email. Add an unprotected `/api/receipt-lookup?payment=pay_xxx&email=foo@bar.com` that re-renders the same PDF (rate-limited).
- **Bulk re-send** — admin endpoint to re-send receipts in bulk (for cases where Resend went down during webhook fire).
- **Signature image** — drop a real one at `public/signature.png`.
- **Disclaimer + signatory CA review** before first real donor email.

---

**Previously completed (Session 2026-05-14 — six commits, all live on `main`):**

- [x] **2026 intake records refreshed from source spreadsheet** (commit `de721f6`). Source: `C:\Users\maxra\Documents\Wildlife Rescue\Data\Intake Records\2026\Cases 2026.xlsx`.
  - **Method:** `openpyxl` + count rows where DATE column (col C) is a real `datetime` and C.No. (col A) is numeric. 1,807 cases from 1 Jan 2026 to 13 May 2026, case #37,650 → #39,456. Row count matches `(max - min + 1)` exactly = zero gaps/duplicates in the source data.
  - **`src/lib/constants.ts:196`** — `RESCUE_BY_YEAR` 2026 entry: 951 (Jan–Mar placeholder) → 1,807, comment updated to "Partial year (Jan 1 – 13 May)". New sum across all years = 39,312.
  - **`src/app/annual-reports/page.tsx:88`** — "Total birds rescued" stat card: hardcoded `"39,000+"` → dynamic `${totalRescued.toLocaleString()}+` (now renders **39,312+**) with new subtitle "2026 partial through 13 May".
  - **`src/lib/wingman-prompt.ts`** — chatbot's partial-year line: `Jan–Mar: 951` → `Jan 1 – 13 May: 1,807`. Per-year list also refreshed to match the audited values that landed in `RESCUE_BY_YEAR` during the 2026-05-12 session (2011: 1,011 ✓ etc.) — wingman had been showing stale pre-audit numbers.
  - **Marketing references unchanged:** the various rounded `"39,000+"` strings in Footer, metadata, JsonLd, homepage, treatments, bird-brothers, IMPACT_STATS were left alone — `"39,000+"` is still accurate against 39,312 and changing 8 files for a +312 delta isn't worth the churn. Bump them when we hit 40,000.

- [x] **Team profile edits — Sana photo + Samia surname + Salik hobby** (commit `16fca81`).
  - **`/public/team/sana.jpg`** replaced from `C:\Users\maxra\Pictures\Website Pics\Staff WR\Sana.jpeg`. Compressed with `PIL.Image.thumbnail((1200, 1200), LANCZOS)` + `ImageOps.exif_transpose` (to apply orientation tag) + `quality=82 optimize=True progressive=True` → 82 KB / 792×1200.
  - **`Samia Shafiq` → `Samia`** — surname dropped from display name in `src/lib/constants.ts`. Verified `Shafiq` no longer appears anywhere in `src/` after the edit.
  - **Salik Rehman bio** — "swimming, playing cricket, and watching films" → "swimming, playing cricket, video games, and watching films". User flagged video games had been omitted.

- [x] **New volunteer added — Ahmad Ghazali** (commit `0e66764`). New 10th team member appended at the end of `TEAM` array in `src/lib/constants.ts`.
  - **Photo** `C:\Users\maxra\Pictures\Website Pics\Staff WR\Ahmad.jpeg` → `/public/team/ahmad.jpg` (19 KB, 432×628). Source already had correct orientation, no rotation needed.
  - **Role:** Volunteer. **Bio:** the user-supplied four-paragraph text was collapsed into a single paragraph (matches the format of the other 9 entries — `TEAM` uses single-paragraph bios consistently). Joined the age-14 origin, school + biology + future-vet aspirations, baby-season role, and dedication framing into one ~135-word bio.

- [x] **80(G) donation receipt system — Phase 1a shipped** (commits `1f92286` + `3156349` + `37da6a6`). This is the first half of a two-stage automated 80(G) compliance system. Stage 1 = provisional receipt at payment time; Stage 2 = Form 10BE certificate after annual Form 10BD filing with IT Dept.

  **Phase 1a (this session) — Data capture + persistence + admin export + 80G cert delivery:**

  - **`src/lib/donations.ts`** — NEW (~230 lines). The data layer.
    - Types: `DonorDetails`, `DonationRecord` with FY-keyed sequential receipt numbers (`WR/2026-27/000001` format).
    - `validateDonorDetails()` — server-side PAN regex `^[A-Z]{5}[0-9]{4}[A-Z]$`, email, Indian pincode `^[1-9][0-9]{5}$`, header-injection blocking, length caps. Anonymous path only needs name + email.
    - `getFinancialYear()` — India FY runs 1 Apr – 31 Mar. Returns `"2026-27"`.
    - `encryptPan()` / `decryptPan()` — AES-256-GCM if `PAN_ENCRYPTION_KEY` env var is 32-byte hex; otherwise plaintext fallback with `console.warn`. Encrypted PAN stored as `base64(iv).base64(ct).base64(tag)`.
    - `nextReceiptNumber(fy)` — atomic `redis.incr` on `donation:fy:{fy}:counter`. Throws if Redis not configured (fail loud rather than ship duplicate receipt numbers).
    - `storeDonorDraft(orderId, donor)` / `getDonorDraft(orderId)` — donor PII keyed by Razorpay order_id, 24h TTL. Bridge between create-order and webhook.
    - `persistDonation(...)` — idempotent NX-guarded write to `donation:payment:{paymentId}`. Indexes into `donation:fy:{fy}:index` (sorted set, score = captured_at) for admin listing. If two concurrent webhook deliveries race the same payment_id, the loser burns its receipt number (gap in sequence is acceptable; duplicate is not).
    - `listDonationsForFy(fy)` — admin export.
    - `STATIC_RECEIPT_ATTACHMENTS` constant — exported list of static PDFs to attach alongside the dynamically-generated provisional receipt PDF in Phase 1b emails. Currently `[{ publicPath: "/80g-certificate.pdf", filename: "Wildlife-Rescue-80G-Certificate.pdf", description: "..." }]`. Forms the "tax pack" the donor forwards to their CA.

  - **`src/components/DonorDetailsModal.tsx`** — NEW (~340 lines). Two-step modal, opens when user clicks any INR amount card on `/donate`.
    - **Step 1 ("choice")** — Title "Would you like an 80(G) tax-deduction receipt?" + 2 prominent cards side-by-side (desktop) / stacked (mobile):
      - LEFT: "No, donate directly" — neutral white card with subtle hover (border-teal + lift). Icon: Heart. Sub: "Skip to payment — no personal details needed beyond your card / UPI." Bullets: "Fastest option" / "No tax-deduction certificate". Click → `onSubmit(null)`.
      - RIGHT: "Yes, I'd like an 80(G) receipt" — visually prominent teal-gradient card with **amber "Tax-Deductible" badge** floating at top-right. Icon: FileCheck (amber-light on teal). Sub: "Claim a 50% deduction from your taxable income." Bullets: "I'll share my name, PAN & address" / "Receipt issued instantly by email" / "Form 10BE certificate after FY filing". Click → `step = "details"`.
    - **Step 2 ("details")** — Existing PAN/address form, only rendered if Yes was clicked. "← Back to options" link at top to return to step 1 (form state preserved). Anonymous toggle removed (now handled by the choice step). Single full-width "Continue to pay ₹X →" submit CTA.
    - Header strip shows "Step 1 of 2" / "Step 2 of 2" so donors always know where they are; donation amount displayed prominently in the header.
    - Validation order matters: name → email → PAN → address → city → state → pincode. First failure surfaces a specific, helpful error message inline (red toast with AlertCircle icon).
    - Country field removed — defaults to India internally (80G only applies to Indian tax-payers; non-Indian donors use the No path).
    - `onSubmit` signature is `(donor: DonorFormData | null) => Promise<void>`. `null` = skip 80G; defined = full 80G flow.

  - **`src/components/DonationThankYou.tsx`** — NEW (~120 lines). Post-Razorpay-success overlay (z-index 110, above other modals).
    - **Triggered from** Razorpay's `handler` callback in `donate/page.tsx`; takes `{ paymentId, amount, receipt80g, donorEmail }`.
    - Teal-gradient header with `CheckCircle2` icon: "Thank You for Saving Lives — Your donation of ₹X was successful."
    - **Razorpay Payment ID** card with copy-to-clipboard button.
    - **80(G) Certificate card** — extra-emphasised teal-bordered card for 80G donors, neutral for non-80G. Big "Download 80(G) Certificate" button → `<a href="/80g-certificate.pdf" download="Wildlife-Rescue-80G-Certificate.pdf">`. **This is the immediate delivery of the 80(G) certificate at the moment of successful donation** — before Phase 1b emails are wired up, the donor still gets the cert.
    - **Provisional receipt note** — for 80G donors: "Will be emailed to {donorEmail} shortly" + Form 10BE explainer. For non-80G donors: "Want to claim 80(G) later? Email us with these details."
    - Esc / × / backdrop close. Body scroll-locked while open.

  - **`src/app/api/create-order/route.ts`** — UPDATED. Now accepts optional `donor` field alongside `amount`. Calls `validateDonorDetails()` server-side; returns 400 with helpful error string on PAN/email/pincode validation failure. Order of operations: validate body → validate donor → check Razorpay keys (returns 503 if missing; this order means devs working locally still see donor-validation feedback). On success, `storeDonorDraft(order.id, donor)` stashes PII in Redis keyed by Razorpay order_id, **NOT** in Razorpay's `notes` field — PAN/address never leave our infrastructure. Razorpay's notes only get a `donor_email` marker and `donor_anonymous: "true"|"false"` flag for their dashboard's reference.

  - **`src/app/api/razorpay-webhook/route.ts`** — UPDATED. HMAC signature verification unchanged. On `payment.captured`:
    1. Look up donor draft via `getDonorDraft(payment.order_id)`.
    2. If no draft (Redis down, legacy flow, etc.) → synthesize anonymous donor from Razorpay's basic fields (`payment.email`, `payment.contact`) so the donation is never lost.
    3. `persistDonation(...)` — idempotent NX write, assigns receipt number, indexes into FY sorted set, encrypts PAN if key configured.
    4. Existing GA4 Measurement Protocol conversion event still fires unchanged.
    5. Failure handling: persistence errors are caught and logged but **always return 200** to Razorpay so they don't retry-storm the webhook. Donor still paid; can be reconciled from Razorpay dashboard if needed.
    6. TODO marker added for Phase 1b — when receipt email goes out, attach BOTH the generated provisional receipt PDF AND the static 80G cert from `STATIC_RECEIPT_ATTACHMENTS`.

  - **`src/app/api/admin/donations/route.ts`** — NEW (~110 lines). Admin CSV/JSON export of donations by FY.
    - **Auth:** HTTP Basic via `ADMIN_USERNAME` + `ADMIN_PASSWORD` env vars. Returns 503 if those aren't set (safe by default — endpoint stays inert).
    - **Default output (`?format=10bd`)**: Form 10BD-compatible CSV with all official columns (SL.NO, Pre-Acknowledgement Number = our receipt number, Name, ID Type=1 for PAN, ID Number=PAN, Section Code=`80G(5)(iv)`, UIN blank, Donation Type=Specific Grant, Mode of receipt=Other than Cash, Amount INR) plus contextual columns (Email, Phone, Address, City, State, Pincode, Country, Razorpay Payment ID, Captured At). UTF-8 with BOM for Excel. CA uploads this to incometax.gov.in.
    - **JSON output (`?format=json`)** — full record dump for debugging; PAN never returned in plaintext (replaced with `[encrypted]` marker).
    - **Usage:** `curl -u <user>:<pass> "https://www.raptorrescue.org/api/admin/donations?fy=2026-27" -o WR-donations-2026-27.csv`

  - **`src/app/donate/page.tsx`** — UPDATED. INR amount cards rewired:
    - Old flow: click ₹500 → POST `/api/create-order` → Razorpay opens.
    - New flow: click ₹500 → `DonorDetailsModal` opens at step "choice" → user picks No or Yes → step 2 form (if Yes) → POST `/api/create-order` with donor field → Razorpay opens → on success `setThankYou(...)` mounts `DonationThankYou` overlay.
    - `handleDonorSubmit(donor: DonorFormData | null)` — if `donor` is `null` (No path), creates order without `donor` field; webhook handles via fallback. If defined (Yes path), includes full donor object with `anonymous: false`.
    - Razorpay `prefill` receives donor name/email/phone when available (skipped for No path so Razorpay collects them via its own UI).
    - GA4 events: `donation_path { receipt_80g: yes|no, amount }` fires on order create; existing `donation` event now includes `receipt_80g` flag for funnel analysis.
    - **Existing embedded Razorpay payment button widget below the amount grid is unchanged** — donors with arbitrary/custom amounts still get the original flow. This is the fallback if anything ever breaks on the new modal.

**Production state — what's live on `main` after this session:**

| Component | Status | Requires env var? |
|---|---|---|
| 2026 intake numbers updated to 1,807 across the site | ✅ Live | None |
| Team page reflects Sana photo, Samia (no surname), Salik (+ video games), Ahmad Ghazali | ✅ Live | None |
| Donor-details modal (choice-first UX) before Razorpay | ✅ Live | None |
| `/api/create-order` validates donor + stashes draft in Redis keyed by order_id | ✅ Live | Existing Razorpay + Upstash |
| Webhook persists donation with FY-sequential receipt number + idempotent NX guard | ✅ Live | Existing Razorpay + Upstash |
| Post-payment thank-you screen with 80(G) cert download | ✅ Live | None (cert already in `/public`) |
| Admin Form 10BD CSV export at `/api/admin/donations` | ✅ Live | `ADMIN_USERNAME` + `ADMIN_PASSWORD` (returns 503 until set) |
| PAN encryption at rest (AES-256-GCM) | ✅ Coded; falls back to plaintext + warn | `PAN_ENCRYPTION_KEY` (32-byte hex) |
| Automated emailed PDF receipt + 80G cert as "tax pack" | ⏳ Phase 1b — next session | `RESEND_API_KEY` when ready |

**Env vars to add in Vercel before this is collecting real-donor data:**

```
ADMIN_USERNAME           # any string, you choose
ADMIN_PASSWORD           # any strong password (used for HTTP Basic auth)
PAN_ENCRYPTION_KEY       # 64 hex chars = 32 bytes. Generate once with: openssl rand -hex 32
                         # NEVER rotate casually — old encrypted PANs cannot be decrypted without the original key.
```

Without these the system still works:
- Without `ADMIN_USERNAME/PASSWORD` → admin export returns 503 (safe default; no one can pull donor PII from the endpoint).
- Without `PAN_ENCRYPTION_KEY` → PAN stored plaintext in private Redis with `console.warn`. Set this asap to be safe.

**Pending for Phase 1b (next session) — automated emailed receipts:**

- User to **create a Resend account** at resend.com (free tier covers 3k emails/month, plenty for ~3k donors/year) and add `RESEND_API_KEY` + `RECEIPT_FROM_EMAIL` (e.g. `receipts@raptorrescue.org`) to Vercel env vars.
- User to **talk with CA / tax counsel** about (1) exact disclaimer wording on the provisional receipt PDF, (2) authorised signatory (Nadeem/Saud digital signature image), (3) whether to flag CSR/FCRA donations for exclusion from Form 10BD, (4) minimum donation amount for receipt (if any).
- Then I'll build:
  - `@react-pdf/renderer` template for the provisional receipt with WR letterhead, 80G reg no. AAATW2352B25DL02, PAN AAATW2352B, donor name/PAN/address, receipt number, amount in words + digits, mode, payment ID, statutory disclaimer.
  - Resend integration with PDF attached + the static 80G cert as a second attachment (auto-picked from `STATIC_RECEIPT_ATTACHMENTS`).
  - Webhook fires the email after `persistDonation` returns `{ created: true }`. Idempotent — won't re-email on duplicate webhook delivery.

**Key files touched this session:**

- `src/lib/constants.ts` — `RESCUE_BY_YEAR` 2026 entry refreshed; `TEAM` array: Sana imagePosition retained, Samia surname dropped, Salik bio updated, Ahmad Ghazali appended at end.
- `src/app/annual-reports/page.tsx` — stat card switched from hardcoded to dynamic.
- `src/lib/wingman-prompt.ts` — partial-year line + per-year list refreshed.
- `src/lib/donations.ts` — **NEW** (~250 lines): data layer, validation, encryption, persistence, FY logic, `STATIC_RECEIPT_ATTACHMENTS`.
- `src/components/DonorDetailsModal.tsx` — **NEW** (~340 lines): two-step modal (choice → details).
- `src/components/DonationThankYou.tsx` — **NEW** (~120 lines): post-payment overlay with 80G cert download.
- `src/app/api/create-order/route.ts` — accepts donor, validates, stashes draft.
- `src/app/api/razorpay-webhook/route.ts` — persists donation, fallback for missing draft, TODO marker for Phase 1b.
- `src/app/api/admin/donations/route.ts` — **NEW** (~110 lines): Form 10BD CSV export with HTTP Basic auth.
- `src/app/donate/page.tsx` — rewired INR amount click → modal → Razorpay → thank-you.
- `public/team/sana.jpg` — replaced (792×1200, 82 KB).
- `public/team/ahmad.jpg` — **NEW** (432×628, 19 KB).
- `public/80g-certificate.pdf` — unchanged; already on disk from the existing /donate 80(G) tab. Confirmed identical hash to `C:\Users\maxra\Documents\Wildlife Rescue\12A Renewal\2026\Certificates\80(G) 2026.pdf` (md5 `4699ffb0…`).

**Tooling notes from this session:**

- **Excel intake extraction:** `python -c "import openpyxl; wb = openpyxl.load_workbook(path, data_only=True); ws = wb.active; cases = [r for r in ws.iter_rows(min_row=3, values_only=True) if isinstance(r[2], datetime.datetime) and isinstance(r[0], (int,float))]"`. Row count is authoritative — the source spreadsheet may have trailing empty rows (the 2026 file goes to row 2353 but only the first 1,807 have a valid DATE).
- **Photo compression:** `from PIL import Image, ImageOps; im = Image.open(src); im = ImageOps.exif_transpose(im); im.thumbnail((1200, 1200), Image.LANCZOS); im.save(dst, 'JPEG', quality=82, optimize=True, progressive=True)`. The `exif_transpose` step is essential — without it, photos with EXIF orientation tags render sideways on web (this bit us before on the Black Eared Kite). Cygwin/Git Bash + Python 3.14 on Windows: avoid printing UTF-8 chars (arrow, em-dash) to the console, they choke cp1252.
- **Idempotent Redis writes for receipt numbering:** `await redis.set(key, value, { nx: true })` returns `null` if key already exists. Pattern for "first writer wins" + counter race avoidance: INCR first to claim a number, then SETNX the record. If SETNX returns null, you lost the race — the counter you spent is now a gap in the sequence, but that's acceptable; what's NOT acceptable is two records sharing the same receipt number.
- **Validation order in API routes:** put cheap content validations (regex, length, type) BEFORE expensive env-var/network checks (Razorpay keys). Local devs without prod credentials still see useful feedback; users with bad input get clear errors fast.

**Uncommitted local state at session end:**

- `.claude/settings.local.json` — workstation-specific, untracked / dirty (expected, never committed).
- `.claude/scheduled_tasks.lock` — runtime artifact from a ScheduleWakeup call earlier in the session; harmless, untracked.

---

**Session 2026-05-13 — three commits, all live on `main`:**

- [x] **Donate page layout redesign — UPI QR promoted to always-visible card** (commit `6cc62c1`). The QR code used to live inside the "Scan & Pay (UPI)" tab, which was the default tab — so the tall QR image was the first thing donors saw and pushed the other tabs down/out of view. Restructured `src/app/donate/page.tsx`:
  - **Removed "upi" from the `TABS` array** entirely (8 tabs → 7 tabs).
  - **Default `activeTab` changed from `"upi"` to `"online"`** — so the INR preset amount buttons are now the first thing donors see in the tab panel.
  - **New always-visible "Scan & Pay via UPI" card** rendered *above* the tab strip, containing the QR code, UPI ID badge, "How to Pay" 3-step list, and the 80(G) receipt tip. Sits in its own `bg-white rounded-2xl border` panel with a teal phone icon next to the heading.
  - **Effect:** Indian mobile donors see the QR immediately without clicking anything. International donors / card payers see the tab strip + preset amounts immediately below, no scrolling past the QR needed.
  - **Verified locally** via DOM probe + screenshot — both layouts render clean, tabs are accessible, no `activeTab === "upi"` orphan code left.
- [x] **Razorpay-compliance policy pages — `/refund-policy` and `/terms`** (commit `e661e53`). Razorpay requires Indian merchants to publicly link Refund/Cancellation, Terms of Service, Privacy Policy (already had it), and Contact (already had it) before approving live-mode merchant accounts. The Tier-5 `/terms + /refund-policy` item in the website roadmap is now complete.
  - **`/refund-policy`** — `src/app/refund-policy/page.tsx` (~290 lines). 12 sections: scope, nature of donation as gift, general no-refund rule, eligible refund exceptions (duplicate / wrong amount / unauthorised / technical error / missing 80G receipt), how to request, Razorpay 5–10 working day refund window, failed transaction guidance, no recurring subscriptions, 80(G) receipt issuance (10 working days after donor sends Name + PAN + Address + transaction ID), international donations routing (R3 → `nshehzad@raptorrescueusa.org` + GoFundMe), chargeback guidance ("contact us first"), contact block. Scroll-spy TOC. Last-updated date: 13 May 2026.
  - **`/terms`** — `src/app/terms/page.tsx` (~310 lines). 16 sections: acceptance, about Wildlife Rescue (Indian Trusts Act 2010 + FCRA + 80G IDs), permitted use + prohibited acts, donations (donor warranties re: lawful source / FCRA compliance / acceptance discretion), payment processors disclosed (Razorpay, R3, GoFundMe), user-submitted content licence, IP rights, third-party services, Wingman AI disclaimer (informational only, not vet/medical advice, urgent → call hotline), warranty disclaimer, liability cap at "lesser of damages or sum of donations in past 12 months", indemnification, termination, Delhi jurisdiction (Indian law). Same scroll-spy TOC pattern as privacy policy.
  - **Donate page disclaimer** — small text added directly under the Razorpay button inside the "Pay Securely via Razorpay" card: *"Donations are voluntary charitable contributions and are generally non-refundable. Please review our Refund & Cancellation Policy and Terms of Service before proceeding."* Both phrases link to the new pages.
  - **Footer** — `src/components/Footer.tsx` Quick Links now has 3 legal links in order: Refund Policy, Terms of Service, Privacy Policy.
  - **Sitemap** — `src/app/sitemap.ts` registers both new routes with `yearly` change frequency, priority 0.3.
  - **TypeScript clean** (`npx tsc --noEmit` zero errors). Verified both pages render via DOM probe (refund: 13 h2s incl. "Contents"; terms: 17 h2s incl. "Contents").
- [x] **International donations contact email corrected** (commit `43f008f`). On `/refund-policy` section 10, the placeholder `contact@raptorrescueusa.org` (which doesn't exist) was replaced with the real US-side contact `nshehzad@raptorrescueusa.org`. One-line fix.

**Action item still open for user (NOT done in this session — requires Razorpay dashboard access):**
- Razorpay Dashboard → Account & Settings → Website Details. Paste these three URLs into the policy field so compliance can see them during the next merchant review:
  - `https://www.raptorrescue.org/refund-policy`
  - `https://www.raptorrescue.org/terms`
  - `https://www.raptorrescue.org/privacy-policy`

**Analytics question raised this session (no code changes — informational, for next session's reference):**
- User asked where to check site traffic + visitor location. Pointed them at:
  - **GA4** (measurement ID `G-FQLSMRBG87`, already live since 2026-05-08) — Reports → User → Demographics → Demographic details, change dimension to City or Region. Real-time tab also has live country/city. Note: only "Accept all" visitors are tracked due to Consent Mode v2; "Essential only" clicks are *not* in GA4 (typical 30–60% under-count).
  - **Vercel Analytics + Vercel Observability → Logs** — for cookieless raw request counts with country-code geo. 30-day retention on free plan.

**Key files touched this session:**
- `src/app/donate/page.tsx` — UPI tab removed from `TABS`, default tab `"online"`, new always-visible UPI card rendered above tab strip, Razorpay button disclaimer added with links to /refund-policy and /terms
- `src/app/refund-policy/page.tsx` — **NEW** (~290 lines, 12 sections)
- `src/app/terms/page.tsx` — **NEW** (~310 lines, 16 sections)
- `src/components/Footer.tsx` — Refund Policy + Terms of Service added to Quick Links
- `src/app/sitemap.ts` — `/refund-policy` and `/terms` registered

**Uncommitted local state at session end:**
- `.claude/settings.local.json` — workstation-specific, untracked / dirty (expected, never committed)

---

**Previously completed (Session 2026-05-12 — seven commits, all live on `main`):**

- [x] **"Rescue & Medical Expenses" merged bucket** on `/annual-reports` "Where Your Money Goes" (commit `a7ac893`). Collapsed `YearlyExpenditureBreakdown.tsx` from 5 buckets to 3 by merging six audited I&E A/c lines: Food for Birds + Medicine for Birds + Rescue & Release Logistics + Clinic Rent + Ambulance/Vehicle Maintenance + Service Charges.
  - **Source:** re-rendered the 5-Year FD PDFs at 4× scale via `pypdfium2` (cache at `%TEMP%\wr-fd-pages-hi\`). Extracted Clinic Rent / Vehicle Maintenance / Service Charges per year from the I&E A/c page (p2 except FY 22-23 where p2/p3 are swapped). FY 2020-21 has no separate Vehicle Maintenance or Service Charges lines — the bucket only includes Food + Medicine + R&R + Clinic Rent (₹80,000, which is much lower than other years' ₹2,40,000+; likely partial-year COVID rent).
  - **Per-year merged-bucket totals:** FY 24-25 ₹6,88,886 (16.2%) | FY 23-24 ₹6,52,467 (22.2%) | FY 22-23 ₹6,09,330 (23.3%) | FY 21-22 ₹6,78,193 (32.0%) | FY 20-21 ₹5,87,778 (31.3%). All years reconcile to the unchanged Total Expenditure to the rupee; Salaries+Wages+Honorarium bucket unchanged; Other Operating = residual.
  - **OCR errors found in prior-session data (NOT corrected here — flagged for future audit):** (1) FY 2022-23 audited Total Expenditure is actually ₹28,05,707 (Direct ₹15,40,394 + Indirect ₹12,65,313) but site shows ₹26,11,711 — ₹1,93,996 gap, partial explanation is FCRA capex reclassification (Computer Hardware ₹2,18,666 + Clinic Equipments ₹50,150 + Refrigerator ₹29,800) but the maths doesn't fully reconcile. (2) FY 2023-24 Food/Medicine values look swapped: site shows Food ₹1,88,616 / Medicine ₹41,772, audited PDF shows Food ₹1,48,616 / Medicine ₹61,772 (net effect on merged bucket ≈ zero so totals still reconcile). (3) FY 2020-21 Clinic Rent ₹80,000 is genuine, not an error — was partial-year due to COVID. **Decision:** keep existing component bucket values for Salaries/Total, only override the 3 new line items (Clinic Rent, Vehicle Maint, Service Charges) coming out of "Other Operating". This was a minimal-disruption merge — anything beyond can be a future audit pass.
- [x] **USD figures added across the financial transparency section** (commit `9fa5a0a`). Translation methodology: FY-average RBI reference rates per year (FY 20-21: ₹74.2/$, FY 21-22: ₹74.5/$, FY 22-23: ₹80.2/$, FY 23-24: ₹82.8/$, FY 24-25: ₹84.5/$). Reasoning: a single 5-year average rate would distort YoY trends as the rupee weakened ~14% over the period; year-specific rates show what was actually spent in dollar terms each year and is standard NGO translation practice.
  - **YearlyExpenditureBreakdown:** added `amountUsd`/`totalUsd`/`rate` fields to `Bucket`/`YearData` interfaces. USD shown as small grey text below the INR amount on each bucket and inline next to the year-total. Per-year footnote spells out the rate ("₹84.5/$ for FY 2024-25").
  - **FINANCIAL_TABLE on `/annual-reports`:** added optional `usd?: (string|null)[]` to `FinRow` type. USD shown ONLY on the four bold/surplus rows (Total Income, Total Expenditure, Surplus/(Deficit), Total Assets) to avoid cluttering line-item rows that aren't load-bearing for international donors. Added a single methodology footnote at the bottom listing all 5 FY rates.
  - **5-year USD totals for quick reference:** FY 20-21 ~$25,335 → FY 21-22 ~$28,415 → FY 22-23 ~$32,565 → FY 23-24 ~$35,504 → FY 24-25 ~$50,229. (Roughly 2× growth in dollar terms over 5 years even with the rupee weakening.)
  - **Future maintenance:** when adding FY 2025-26, look up RBI's monthly reference rate, average the 12 closing rates Apr–Mar, then add as a new column to FINANCIAL_TABLE + new entry to YEARLY array in YearlyExpenditureBreakdown.

**Earlier work this session (5 commits prior to the financial work):**

- [x] **Intake data 2010-2020 corrected against audited case records** (commit `d1f8ba6`). Source: `C:\Users\maxra\Documents\Wildlife Rescue\Data\2010-2020\2010 to 2020.xlsx` — 11 sheets, one per year, each containing every individual case record with `C.no.`, `DATE`, `ANIMAL`, `Caller`, `PLACE`. Total row count per sheet = true annual intake.
  - **Method:** `openpyxl` + count rows where `C.no.` (column A) is numeric. Excel case numbers are sequential (2010 starts at #317, 2020 ends at #20,245). Row count and `(last-first+1)` matched perfectly for 7 of 11 years; off by 1-6 for 2011, 2015, 2019 (renumbered cases / data entry artifacts) — trusted the row count as the source of truth since it counts actual case entries.
  - **Corrections applied to `src/lib/constants.ts` `RESCUE_BY_YEAR`:** 2011: 1,017→1,011 | 2012: 1,303→**1,346** | 2013: 1,306→**1,324** | 2014: 1,926→**1,974** | 2015: 2,460→**2,306** | 2016: 2,307→**2,365** | 2019: 2,564→2,565 | 2020: 2,532→**2,489**. Years 2010, 2017, 2018 were already correct.
  - **Knock-on text corrections:** TIMELINE 2011 entry "181% to 1,017 birds" → "179% to 1,011 birds" (recalc: (1011-362)/362 = 179.3%). TIMELINE 2014 "1,926 birds rescued" → "1,974 birds rescued". TIMELINE 2020 "drops only 1%" → "drops only 3%" (recalc: (2489-2565)/2565 = -2.96%, so previous "−1%" was wrong even against the *old* numbers — likely a typo from when the page was first written). Annual-reports page Phase 2 range "1,017–1,926/year" → "1,011–1,974/year", Phase 3 "~2,100–2,460/year" → "~2,083–2,365/year", Phase 4 "2,532–2,815/year" → "2,489–2,815/year" + "−1% in 2020" → "−3% in 2020".
- [x] **Intake chart heading retitled** (commit `77255b2`) — `/annual-reports` H2 "Annual Intake: 2010–2025" → "Annual Intake: Since 2010"; subtitle "Birds rescued per year — from founding to record-breaking 2025." → "from founding to today." Reason: the chart already includes a partial-year 2026 bar, so the range label was misleading.
- [x] **ATB poster on homepage layout bug — DEBUGGED + FIXED** (commit `d709f28`). User reported the poster was invisible despite hard refresh, incognito, mobile data, and Vercel redeploy.
  - **Root cause** (took DOM probing to find): the poster anchor `<Link className="block group">` sat inside a `flex justify-center` container. As a flex child with no explicit width and no flex-basis, the anchor collapsed to **0 width**, which collapsed the inner `w-full aspect-square` div to **0×0**. The image WAS loading (`complete: true`, `naturalWidth: 416`) — just rendering invisibly in a zero-size box. This is why no amount of cache-busting helped: the HTML was correct, the bytes were valid, the layout was broken from day one.
  - **Diagnostic process:** curl confirmed `<img src="/_next/image?url=%2Fatb-poster.jpg...">` present in HTML and `/atb-poster.jpg` returned 200 with valid JPEG bytes. Empty commit `c684ac7` triggered a fresh Vercel deploy as a sanity check (didn't help — predictable in hindsight). Then started local dev server and used `preview_eval` to read `getBoundingClientRect()` on the image and walk up the parent chain — that's when the 0×0 collapse showed up at the `<a class="block group">` level.
  - **Fix:** moved `w-full max-w-xs sm:max-w-sm` from the inner div onto the `<Link>` itself. Anchor now gets a real flex-item size (320px on mobile, 384px on sm+), and the inner div's `w-full aspect-square` correctly fills it. Also added `priority` to the `<Image>` to disable lazy-loading (this is a key brand asset, worth eagerly loading; rules out lazy-load flakiness on slow networks).
  - **Verified locally:** anchor rect = 320×320, image rect = 320×320, screenshot confirms poster renders inside the dark Documentary Spotlight section above the trailer. **Lesson:** When user reports "not showing" but curl confirms the element is in the HTML, don't keep redeploying — open a local dev server and probe the live DOM with `getBoundingClientRect()` immediately. A 0×0 element is invisible but indistinguishable from "missing" without a DOM probe.
- [x] **"Total birds rescued" stat tweaked** (commit `641691a`) — `/annual-reports` 4-stat grid second card: hardcoded to **"39,000+"** (was dynamic from `RESCUE_BY_YEAR` sum, displaying 38,456+); case-number subtitle "Case #317 to #38,772" removed. The `<p>` rendering `m.sub` is now conditional (`{m.sub && <p>...</p>}`) so the empty sub doesn't leave dead vertical space; the other three cards keep their subtitles. **Temporary** — when user has audited 2026 numbers through 30 April 2026, swap line 88 back to the dynamic form `\`${totalRescued.toLocaleString()}+\`` and `\`Case #317 to #${(316 + totalRescued).toLocaleString()}\``, and update the 2026 entry in `constants.ts:196` to the real total.

**Tooling notes from this session:**
- Excel intake extraction: `python -c "import openpyxl; wb = openpyxl.load_workbook(...); for sh in wb.sheetnames: ws=wb[sh]; count = sum(1 for row in ws.iter_rows(values_only=True) if isinstance(row[0], (int, float)))"`. Avoid printing every row — Windows cp1252 console will choke on em-dashes (−). When you must print, redirect to a file with UTF-8 encoding.
- DOM-probing the production site through a local Next.js dev server proxy is the fastest way to investigate "it's in the HTML but I can't see it" complaints. `getBoundingClientRect()` returning 0×0 is the smoking gun for collapsed layouts.

**Production state — what's live on `main` after this session:**
| Page | What changed |
|---|---|
| `/` (homepage) | ATB Academy Award Nominee poster now actually renders above trailer (320×320 mobile, 384×384 sm+) |
| `/annual-reports` | Intake chart: 7 corrected bars + heading "Since 2010" + corrected % growth labels; "Total birds rescued" stat shows "39,000+" without case-number subtitle |
| `/about` | TIMELINE entries 2011 + 2014 + 2020 show corrected numbers |
| Anywhere using `RESCUE_BY_YEAR` | Sum is now 38,456 → will become 39,000+ once user adds full Apr-2026 data |

**Pending pickup for future sessions:**
- Update `RESCUE_BY_YEAR` 2026 entry once full Jan-Apr 2026 audited data is ready (currently shows 951 as "partial Jan-Mar"). When updating, revert annual-reports stat card line 88 to dynamic form and re-render the `m.sub` conditional inline so the case-number subtitle returns.
- Per-year "Where Your Money Goes" bucket refinement (carry-over from 2026-05-11) — user flagged some categorisation needs tweaking in `src/components/YearlyExpenditureBreakdown.tsx`.
- 2019-20 financial detail — if user sources audited statements, add as 7th column to `FINANCIAL_TABLE` in `src/app/annual-reports/page.tsx` and re-generate Excel/PDF.
- ~~2021 infographic JPG slot~~ — DONE (live as of 2026-05-18, wired into `annual-reports-data.ts` with `infographicImage` + `infographicPdf` both pointing to `/annual-reports/infographic-2021.jpg`).

---

**Previously completed (Session 2026-05-11 — three commits, all live on `main`):**

- [x] **2021 Annual Report infographic captured and live** (commit `b59ad2d`).
  - Captured `https://www.raptorrescue.org/annual-reports/infographic-2021.html` via headless Puppeteer (1200×4510 portrait) using temp install at `%TEMP%\puppeteer-temp\`.
  - Compressed to JPEG at 1200px wide → 513 KB, saved to `public/annual-reports/infographic-2021.jpg`.
  - Wired into `src/lib/annual-reports-data.ts` 2021 entry: added `infographicImage` and pointed `infographicPdf` at the JPG (no separate PDF for 2021). Replaces the "Coming soon" placeholder on `/annual-reports`.
- [x] **5-Year Financial Transparency table — fully shipped end-to-end** (commits `dfd5e7a`, `1d3cf9d`).
  - **Source documents:** 5 scanned PDFs at `C:\Users\maxra\Documents\Wildlife Rescue\Accounts\5 Year FD\` (FY 2020-21 through FY 2024-25, all audited by A. Rehman & Associates CA). All 5 PDFs were scanned/image-based (zero extractable text); used `pypdfium2` at 4–6× scale → PNG renders for visual OCR.
  - **Page mapping per PDF:** p1 Balance Sheet, p2 Income & Expenditure A/c, p3 Receipts & Payments A/c, p4 Fixed Assets Schedule — **except FY 22-23 which has p2 and p3 swapped**.
  - **Critical OCR correction caught and fixed mid-session:** FY 21-22 Donations Received was `22,64,672.60` (not `24,64,672` as first read); Direct Expenses `4,66,185.47` (not `6,06,185.47`); Total Income `22,72,104.60` (not `24,72,104`). Always re-render flagged digits at 6× zoom + crop into halves to disambiguate.
  - **Verified arithmetic for every year:** Direct + Indirect (+ FCRA capex-on-I&E for FY20-21/21-22) + Surplus = Total per I&E A/c, matches to the rupee.
  - **Known source-document inconsistency (not OCR):** FY 24-25 surplus is `4,22,304.31` on the I&E but `4,22,304.51` on the Balance Sheet — 20-paise rounding mismatch in the auditor's PDF itself. Footnoted on the website table; the I&E figure is the one used.
  - **Excel built with `openpyxl`** at `C:\Users\maxra\Documents\Wildlife Rescue\Accounts\5 Year FD\WR_5Year_Financial_Summary.xlsx` (7.5 KB). Single sheet, WR brand colors (teal header, teal-light section bands, off-white bold totals, amber surplus row), Indian lakh-style number format `##,##,##,##0.00`, frozen header + first column, 7 notes at bottom.
  - **PDF built with `reportlab`** (since no LibreOffice on this machine) at the same path, `.pdf` extension (5.8 KB, landscape A4). Matches Excel content + styling. **Lesson:** Don't waste time hunting for LibreOffice/soffice on Windows — go straight to `reportlab` for direct generation; the styling primitives (`TableStyle`, `Paragraph`, `colors.HexColor`) map cleanly to the brand tokens.
  - **Both files committed to `public/annual-reports/`** as `wr-financials-5yr.{xlsx,pdf}`. Verified via fetch HEAD: 200 OK with correct `application/pdf` and `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` Content-Types; PDF bytes intact (`%PDF-1.4`…`%%EOF`).
  - **`/annual-reports` page Financial Transparency section completely rewritten** (`src/app/annual-reports/page.tsx`):
    - **Replaced** the previous 2-column (Year / Income / Expenditure) static table with a **4-section, 6-column rich table** (line item + FY 20-21 through FY 24-25): INCOME / EXPENDITURE per I&E / CAPITAL INVESTMENT per FA Schedule / BALANCE SHEET closing.
    - **Dropped** the prior FY 2019-20 row — we don't have the audited detail breakdown for that year. Can be added back if those statements are sourced.
    - **Sticky first column** (`sticky left-0 z-10`) so the line-item label stays visible during horizontal scroll on mobile/tablet.
    - Three categorization styles: section banners (teal-light), bold totals (off-white + teal-dark text), amber surplus row.
    - Two footnotes wired below the table (FCRA capex reclassification from FY 22-23 onwards; FY 24-25 ambulance + clinic equipment investment breakdown).
    - Two download buttons: PDF (teal solid) + Excel (white outline) using `FileText` and `FileSpreadsheet` from `lucide-react`.
    - **Kept** the existing "Where Your Money Goes (2024-25)" expenditure breakdown that sits below the new table — visual complement, untouched.
  - **React Fragment key gotcha caught:** Initial implementation used `<>...</>` inside `.map()`, which triggered "Each child in a list should have a unique key prop" warnings. Fixed by importing `React` and using `<React.Fragment key={...}>`. Stale errors lingered in the browser console after the fix (turbopack didn't clear them) but the actual page rendered correctly — verified via DOM probe rather than trusting the error log.
  - **Build verified clean** via `npx tsc --noEmit`. Preview at desktop width (1400px) shows all 5 FY columns rendering with section bands, surplus highlight, and downloads working.

**Also completed in this session (later additions):**

- [x] **Per-year "Where Your Money Goes" expenditure breakdown** with interactive year tabs (commits `1757760` then `250d2ff`). First implemented as cumulative 5-year totals (`1757760`), then the user asked to switch to per-year — extracted into `src/components/YearlyExpenditureBreakdown.tsx` (client component, "use client" + `useState`). Year tabs (FY 24-25 default → FY 20-21) at the top; each tab swaps the 5-bucket progress bars to that year's figures.
  - **Hydration gotcha caught:** The interactive tabs initially didn't switch (clicking did nothing). DOM probe showed the button had no React fiber attached — i.e. the section hadn't hydrated. Root cause was stale turbopack cache from an earlier `<>` fragment that I'd already replaced with `<React.Fragment>`. Fix: stop the dev server, `rm -rf .next`, restart. After cache clear, fiber attached and tabs switched correctly. **Lesson:** When a client component renders SSR HTML but click handlers don't fire, first check `Object.getOwnPropertyNames(el).filter(k => k.startsWith('__react'))` — if it's `[]`, hydration failed; nuke `.next` and restart.
- [x] **HBO Academy Award Nominee poster** added to both `/all-that-breathes` and homepage Documentary Spotlight (commits `c4643b1`, `d254331`). Source: `C:\Users\maxra\Pictures\ATB Pics\Poster ATB.png` (1.4 MB PNG) → compressed via sharp-cli to `public/atb-poster.jpg` (122 KB, 1000×1000). On `/all-that-breathes`: centered at top of charcoal hero, max 512px wide, rounded with shadow + white ring (`ring-1 ring-white/10`). On homepage: same poster, max 384px wide, centered above the trailer iframe, wrapped in `<Link href="/all-that-breathes">` with `group-hover:scale-[1.02]` for subtle interactivity. **Note:** User initially asked for the "Every Minute of the film is gold dust" Guardian-quote poster, but couldn't find one online with that exact text — they swapped to this Academy Award Nominee poster.

**Pending pickup for future sessions:**
- **Per-year "Where Your Money Goes" breakdown — needs detail refinement** (commit `250d2ff`). User flagged that some of the bucket categorisation needs further tweaking. Source data is in `src/components/YearlyExpenditureBreakdown.tsx` (client component, year tabs FY 20-21 → FY 24-25). Currently uses 5 buckets: Salaries/Wages/Honorarium, Food for Birds, Rescue & Release Logistics, Medicine for Birds, Other Operating Expenses. Likely refinements requested: split "Other Operating Expenses" into more meaningful sub-categories (Rent ₹2.40 L recurring, Depreciation, Utilities, etc.), or re-classify which items belong in which bucket. Bucket sums currently reconcile to I&E A/c total for each year to the rupee — preserve that invariant when refining.
- 2019-20 financial detail — if the user sources those audited statements, add as a 7th column to the FINANCIAL_TABLE in `src/app/annual-reports/page.tsx` and re-generate Excel/PDF.
- Annual reports for FY 2025-26 will follow the same pattern — drop the audited PDF in `C:\Users\maxra\Documents\Wildlife Rescue\Accounts\` and re-run the same workflow (render at 4× scale → visual OCR → update `FINANCIAL_TABLE` array → re-generate Excel/PDF → commit).

**Tooling reference (for next financial extraction):**
- Render PDFs to PNG: `python` + `pypdfium2`, `page.render(scale=4.0).to_pil().save(...)` — works without poppler/tesseract. Increase to scale 6.0 + crop halves when a specific digit is ambiguous.
- Excel build script saved at `C:\Users\maxra\AppData\Local\Temp\build_financial_xlsx.py` (reusable; just update the `add_row()` calls).
- PDF build script saved at `C:\Users\maxra\AppData\Local\Temp\build_financial_pdf.py` (same).
- Draft notes saved at `docs/financial-transparency-draft.md` (markdown table + ⚠️ flag conventions + helper Python snippets).

---

**Previously completed (Session 2026-05-09 — Razorpay live + Sanity live):**

- [x] **Razorpay Checkout.js fully live in production**:
  - All 3 env vars set in Vercel: `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
  - Initial credentials had wrong Key ID (`rzp_live_SmqDYOtmo672CL` per CLAUDE.md was incorrect — actual was `rzp_live_SnHujqnnz34ul0`); secret was also a Stripe key by mistake (`sk_live_...` prefix). Both rotated again afterwards (current Key ID: `rzp_live_SnIx4rCXJyioqk`).
  - `/api/create-order` verified live: returns `{ order_id, amount, currency, key_id }` with HTTP 200 from Razorpay
  - **Webhook registered in Razorpay dashboard** — URL `https://www.raptorrescue.org/api/razorpay-webhook`, event `payment.captured`, HMAC-SHA256 signature verification working
  - Webhook endpoint verified: returns 400 "Missing signature" / 400 "Invalid signature" correctly (NOT 500 — confirms env var is read)
  - Debug commit (`c4b704a`) added temporary error detail surfacing to diagnose auth failure; reverted in `8cfb4a7` after fix confirmed
- [x] **Sanity CMS activated in production**:
  - All 5 env vars set in Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_WRITE_TOKEN`, `SANITY_REVALIDATE_SECRET`
  - **Verified live**: `/blog` now serves 47 images from `cdn.sanity.io` (only 8 `/_next/image` URLs remain, all page chrome/non-blog)
  - Sanity Studio at `/studio` returns 200 OK
  - Live blog flipped from static fallback → Sanity CMS. Mohammad Afeef and Samia can now publish posts via Studio.

**Pending follow-ups from this session:**
- ~~⚠️ **Rotate `SANITY_API_WRITE_TOKEN`**~~ — DONE 2026-05-18.
- Set up Sanity → Vercel webhook for instant publishing updates (currently relies on default revalidation)
- Invite Mohammad Afeef + Samia to Sanity as Editors (Sanity Manage → Members → +Invite)
- Email blog publishing guide to staff (latest version: `C:\Users\maxra\Documents\Wildlife Rescue\WR_Blog_Publishing_Guide_for_Staff_2026-05-09.docx`)
- Optional: `GA4_MEASUREMENT_PROTOCOL_SECRET` env var to enable server-side GA4 conversion events from Razorpay webhook
- Google Search Console verification (paste token into commented `verification:` block in `src/lib/metadata.ts`)
- After Vercel deploys commit `4c70a4c`, click "Refresh table" in Sanity Manage → Studio compatibility overview — should show ✓ Compatible (was "Unknown / refused to connect" because catch-all `/studio/[[...tool]]` was intercepting manifest requests)

**Late-session additions (2026-05-09 evening):**
- [x] **Created updated staff blog publishing guide** — `WR_Blog_Publishing_Guide_for_Staff_2026-05-09.docx` (15 KB) at `C:\Users\maxra\Documents\Wildlife Rescue\`. WR-branded teal/amber, 9 sections covering login, Studio overview, writing posts, photos, troubleshooting, and contacts.
- [x] **Sanity packages upgraded** (commit `86c3c71`) — `sanity` 5.23 → 5.24, `@sanity/vision` 5.23 → 5.24, `next-sanity` 12.4.0 → 12.4.5
- [x] **Studio manifest published** (commit `4c70a4c`) — `npx sanity manifest extract --path public/studio/static` generates `create-manifest.json`, `create-schema.json`, `create-tools.json` (~12 KB total). Files committed AND added as `prebuild` npm script so they regenerate on every Vercel build. Fixes the "Unknown / refused to connect" status in Sanity Manage's Studio compatibility overview.

**Tomorrow's pickup:**
1. Verify Sanity Manage compatibility check (click Refresh after Vercel deploy completes)
2. ~~Rotate `SANITY_API_WRITE_TOKEN`~~ — DONE 2026-05-18
3. Google Search Console verification

---

**Previously completed (Session 2026-05-08 — analytics + Razorpay, all on `main`):**

- [x] **GA4 activated** — user added `NEXT_PUBLIC_GA_ID=G-FQLSMRBG87` to Vercel. Confirmed live: `window.gtag` fires, `G-FQLSMRBG87` script loads from `googletagmanager.com`, `dataLayer` populated. Consent Mode v2 already in place from last session — analytics only fires for visitors who click "Accept all".
- [x] **Donation conversion tracking** (commit `8815df9`) — `src/app/donate/page.tsx` now fires three GA4 events:
  - `donation_tab_view` — fires with `{ tab, tab_label }` whenever any payment method tab is clicked
  - `donation_method_click` — fires with `{ method: "R3"|"GoFundMe", currency: "USD" }` on all R3 and GoFundMe links (3 locations each)
  - `donation_started` — fires with `{ method: "razorpay", currency: "INR" }` when Razorpay button area is clicked
- [x] **Razorpay Checkout.js integration** (commit `87531f4`):
  - **`src/app/api/create-order/route.ts`** — NEW server route; creates a Razorpay order via `api.razorpay.com/v1/orders` using `RAZORPAY_KEY_SECRET`; validates amount (paise, 100–10,000,000 range); returns `order_id`, `amount`, `currency`, `key_id`
  - **INR amount cards on `/donate`** — converted from static `<div>` tiles to clickable `<button>` elements; clicking any preset amount (₹500/₹1,000/₹2,500/₹5,000) calls `/api/create-order`, then opens Razorpay Checkout modal with amount prefilled; loading state shows `…` on the clicked card; hover styles added (teal border + teal-light bg)
  - **`checkout.js` loaded on mount** — `https://checkout.razorpay.com/v1/checkout.js` appended to `<body>` via `useEffect`; `window.Razorpay` available when user clicks
  - **Success handler** — fires `gtag('event', 'donation', { method, currency, value, transaction_id })` on payment completion (client-side, before modal closes)
  - **Existing payment button widget retained** — still shown below the amount grid for custom/arbitrary amounts
  - **`src/app/api/razorpay-webhook/route.ts`** — NEW webhook route; verifies `x-razorpay-signature` via HMAC-SHA256 against `RAZORPAY_WEBHOOK_SECRET`; on `payment.captured` event logs payment and optionally fires GA4 Measurement Protocol if `GA4_MEASUREMENT_PROTOCOL_SECRET` is set
  - **`src/middleware.ts`** — `/api/razorpay-webhook` exempted from CSRF origin check (Razorpay POSTs from their own servers; secured by HMAC signature instead)
- [x] **Verified locally** — API call returns valid `order_id`; `window.Razorpay` loads; clicking ₹500 opens Razorpay checkout modal. TypeScript clean (`tsc --noEmit` zero errors).

**Production state — Razorpay fully live and verified (2026-05-09):**
- ✅ `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_live_SnIx4rCXJyioqk` (rotated after exposure earlier in session) — set and verified
- ✅ `RAZORPAY_KEY_SECRET` = rotated and verified (`/api/create-order` returns live `order_id`)
- ✅ `RAZORPAY_WEBHOOK_SECRET` = `c4d43c35ee24f0021032772ba4b3732fcc079085de5d31e87198522c1c4e6796` — set in Vercel
- ✅ **Razorpay webhook registered** in dashboard at `https://www.raptorrescue.org/api/razorpay-webhook` for `payment.captured` event
- Verified webhook endpoint responds correctly: 400 "Missing signature" without sig, 400 "Invalid signature" with bogus sig (NOT 500 "Webhook not configured" — confirms env var is read)

**Optional follow-up (not blocking):**
- `GA4_MEASUREMENT_PROTOCOL_SECRET` — to enable server-side GA4 conversion events from webhook (currently webhook just logs payments). Get from Google Analytics → Admin → Data Streams → Measurement Protocol API secrets.

**Next step (queued for next session):**
- Sanity env vars (5 vars) to flip live blog from static fallback to Sanity CMS
- Google Search Console verification

**Key files touched this session:**
- `src/app/donate/page.tsx` — GA4 tracking events + Checkout.js integration + clickable INR cards
- `src/app/api/create-order/route.ts` — **NEW**: Razorpay order creation route
- `src/app/api/razorpay-webhook/route.ts` — **NEW**: webhook verification + GA4 Measurement Protocol
- `src/middleware.ts` — webhook CSRF exemption added

---

**What was just completed (Session 2026-05-07 — SEO + privacy + domain pointing, all on `main`):**

- [x] **Domains pointed live to Vercel** — user pointed both `raptorrescue.org` and `wildliferescue.org.in` (plus their `www.` variants) at Vercel. Verified via curl: both `raptorrescue.org` and `www.raptorrescue.org` return HTTP 200 from Vercel with full security headers (CSP, HSTS); `wildliferescue.org.in` 308-redirects to `www.raptorrescue.org`. **Pending in Vercel UI:** set non-www → www canonical redirect on `raptorrescue.org` (currently both serve identical 200s, which is duplicate content for SEO).
- [x] **Comprehensive SEO optimisation** (commit `5d8168d`):
  - **`src/lib/metadata.ts`** rewritten — award-led title and description (Oscar nom, Sundance Grand Jury Prize, Cannes Golden Eye, Peabody, Jackson Wild, Gotham), keywords expanded 8 → 24 (founders' names, award names, "All That Breathes", manja injuries, vulture conservation), `openGraph.images` now uses `/founders-combined.jpg` (1600×1200) with alt text, `alternates.canonical` (per-page on /about, /donate, /contact, /all-that-breathes), `googleBot` directives (`max-image-preview: large`, `max-snippet: -1`, `max-video-preview: -1`), correct twitter handle (@wildliferescueindia, was wrong @wildliferescue), `verification:` block stubbed (commented) for Google Search Console / Bing later.
  - **`src/components/JsonLd.tsx`** — fixed factual errors and enriched. Wrong `taxID: "47-5731705"` (a US 501c3 EIN that someone had attached to the Indian Trust org) replaced with Indian PAN `AAATW2352B`; the US EIN `87-3289299` is now correctly nested under `funder` (R3 entity). Founding date `2003` → `1990` (matches "early 1990s"). Broken `/logo.png` → `/logo-black.png` (real file) as proper `ImageObject` with dimensions. Truncated street address → full `C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village`. Type changed `NGO` → `["NGO", "AnimalShelter"]`. Added `founders` (Nadeem & Saud), `slogan`, `foundingLocation`, `knowsAbout` (8 expertise areas), `award` array (6 documentary honours), `subjectOf` Movie schema linking to All That Breathes, `@id` anchors so WebSite → Organization graph references resolve, `potentialAction` SearchAction on WebSite for sitelinks search box.
  - **`src/app/robots.ts`** — added `Disallow: /studio` (Sanity admin) and `host` directive.
  - **`src/app/sitemap.ts`** — added missing `/bird-brothers` route.
  - **`src/app/layout.tsx`** — removed hardcoded duplicate OG/Twitter `<meta>` tags that were conflicting with Metadata API output (incl. wrong @wildliferescue Twitter handle).
  - **One factual error caught and corrected mid-session:** initial JsonLd draft included a fabricated "Rolex Award for Enterprise (Mohammad Saud, 2022)" entry. User flagged it; removed in subsequent commit. Lesson: stick to verifiable facts in CLAUDE.md / constants.ts for structured data.
- [x] **Privacy policy + cookie consent banner** (commit `01c6560`):
  - **`/privacy-policy` page** — 15 sections, scroll-spy TOC, written to be DPDP Act 2023 (India) and GDPR (EEA/UK) aware. Documents every third-party processor: Vercel, GA4, Razorpay, GoFundMe, R3, OpenAI (Wingman), Upstash, Sanity, YouTube, Google Maps. Lists user rights, retention periods (24 months for contact, 7 years for donations per FCRA, 14 months for GA4 default), security measures, data subject rights workflow.
  - **`src/components/CookieConsent.tsx`** — bottom banner appearing 600 ms after first visit; "Essential only" / "Accept all" buttons; localStorage-backed (`wr-cookie-consent` key, version 1); applies stored choice via Consent Mode update on every page load. Dismissable × counts as Essential only.
  - **Google Consent Mode v2 wired into `layout.tsx`** — inline `beforeInteractive` script defaults `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` all to `"denied"` *before* GA4 loads (with `wait_for_update: 500`). Banner flips to `"granted"` only when user clicks Accept all. **GA4 scripts are now gated on a real measurement ID** — `G-XXXXXXXXXX` placeholder no longer loads at all (was firing in production prior to this fix). GA4 config call now uses `anonymize_ip: true`.
  - **`src/components/Footer.tsx`** — added "Privacy Policy" link to Quick Links.
  - **`src/app/sitemap.ts`** — added `/privacy-policy`.
- [x] **All commits pushed to `main`** (`394fc11 → 5d8168d → 01c6560`). Vercel auto-deployed.

**Production state confirmed via curl** (after deploy):
| URL | HTTP | Notes |
|---|---|---|
| `raptorrescue.org` | 200 (Vercel) | Live ✅ — but duplicate of www |
| `www.raptorrescue.org` | 200 (Vercel) | **Canonical (per metadata)** |
| `wildliferescue.org.in` | 307 → www | ✅ |
| `www.wildliferescue.org.in` | 308 → www.raptorrescue.org | ✅ |
| `/sitemap.xml` | 200 | Reachable |
| `/robots.txt` | 200 | Has new `Disallow: /studio` |

**Production state — env vars (still pending in Vercel UI):**
- ❌ `NEXT_PUBLIC_GA_ID` is unset → site loads `G-XXXXXXXXXX`, BUT after this session's gating that placeholder no longer triggers any tracking. Real measurement ID needed to activate analytics. Consent Mode v2 already in place, so GA4 will be DPDP/GDPR-compliant the moment the env var is set.
- ❌ Sanity env vars (5 of them) still unset → blog still serving static fallback. Verified via curl: all blog images on `/blog` come from `/_next/image?url=%2F...` (local public dir), zero `cdn.sanity.io` URLs.
- ❌ Upstash Redis env vars unset → rate limiting + persistent storage inactive (graceful fallback to console.log).

**Roadmap document delivered to user:**
- `C:\Users\maxra\Documents\Wildlife Rescue\WR_Website_Roadmap.docx` (15 KB) — 5-tier prioritised list of remaining improvements (domain canonicalisation, env vars, Search Console, donation conversion tracking, FAQ/Breadcrumb/Article schemas, per-page OG images, video sitemap, newsletter backend, Sentry, image optimisation, Lighthouse, accessibility, /terms + /refund-policy). WR-branded teal/amber. Tier 1 = active blockers; "If you only do three" = top recommendation: domain canonical redirect → privacy + consent (now done) → donation conversion tracking.

**Next step (queued for next session):**
- User to set `NEXT_PUBLIC_GA_ID`, Sanity env vars, and the non-www → www redirect in Vercel UI.
- Once GA4 is firing, wire **donation conversion tracking** — Razorpay redirect-on-success URL with `gtag('event', 'donation', ...)`. This is Tier 2 #5 in the roadmap and the natural next implementation task.
- Verify ownership in Google Search Console once domain canonical is set; paste verification token into the commented `verification:` block in `src/lib/metadata.ts`.

**Key files touched this session:**
- `src/lib/metadata.ts` — full rewrite
- `src/components/JsonLd.tsx` — full rewrite (factual fixes + enrichment)
- `src/app/robots.ts` — disallow /studio + host directive
- `src/app/sitemap.ts` — added /bird-brothers and /privacy-policy
- `src/app/layout.tsx` — Consent Mode v2 + gated GA4 + CookieConsent mount + removed duplicate meta
- `src/components/CookieConsent.tsx` — **NEW** (158 lines)
- `src/app/privacy-policy/page.tsx` — **NEW** (~290 lines, 15 sections)
- `src/components/Footer.tsx` — Privacy Policy link added

---

**Previously completed (Session 2026-05-06 — donation amount UX, all on `main`):**
- [x] **USD amount cards now open an R3 / GoFundMe options modal** (commit `0c17d62`).
  - New client component `src/components/UsdAmountGrid.tsx` — reusable grid of USD amount buttons; clicking any amount opens a centered modal with the selected amount displayed prominently and two CTAs: **"Donate via R3 — Tax-Deductible (501c3)"** → raptorrescueusa.org/donate, and **"Donate via GoFundMe"** → gofund.me/d9df0362. Modal supports Esc / backdrop / × to dismiss; body scroll-locked while open.
  - Wired into both **`/` (homepage)** USD teaser row (was previously dimmed/non-clickable, now active with `variant="teaser"`) and **`/donate` Online tab → USD currency** (replacing the previous static USD grid).
  - Verified in preview: clicking $25 on /donate displays modal with "$25" + correct R3 + GoFundMe links; clicking $50 on / works the same way.
- [x] **Pre-existing hydration bug in homepage fixed** (same commit) — `src/app/page.tsx` line 1 had `"use client"` despite `Home` being declared `async`. React refuses to render an async client component, which was emitting a console error every render and causing intermittent hydration failures. Removed the directive — `Home` is now a proper Server Component (which is correct, since it `await`s `getBlogPosts()`).
- [x] **INR direct-pay-via-Razorpay attempt → reverted** (commits `0c17d62` then `1800ce6`).
  - First attempt: made INR preset cards on both pages link to `https://pages.razorpay.com/pl_H4Jwn7xLqMgktI?amount={n}` so a single click would open Razorpay with the amount prefilled.
  - **This URL pattern returns 404** — `pl_H4Jwn7xLqMgktI` is a Razorpay **Payment Button widget ID**, not a Payment **Page** ID, so there's no hosted URL at `pages.razorpay.com/pl_*`. User reported the error screen and I reverted.
  - INR cards on /donate are back to non-clickable suggestion tiles above the embedded Razorpay button (the previous flow). Homepage INR cards are back to `<Link href="/donate?tab=online">`.
- [x] All commits pushed to `main`. Vercel auto-deploys.

**Pending — true single-click INR donation (deferred at user's request):**
To make the INR amount cards trigger Razorpay payment in a single click with the amount pre-filled, two options exist:
1. **Razorpay Checkout integration** — needs the org's public **Razorpay Key ID** (NOT the Button ID) plus a small `/api/create-order` server route that creates an order and returns `order_id`. Then `Razorpay({ key, order_id, amount, ... }).open()` from a click handler. This is the proper integration; works in any Indian bank's checkout flow.
2. **Razorpay Payment Page** (different product from the current Payment Button) — Razorpay generates a hosted URL like `https://rzp.io/l/xxx` that accepts `?amount=` to prefill. Org needs to create one in the Razorpay dashboard under Payment Pages → New Payment Page. Once created, swap the `pages.razorpay.com/pl_*` URL for the new Payment Page URL.
The current setup (embedded Razorpay button widget below the suggested-amount tiles) is fully functional — donor clicks the button, types the amount, pays. Only the UX papercut of "click amount → click button → type amount" remains.

**Key files this session:**
- `src/components/UsdAmountGrid.tsx` — **NEW**: client component, USD grid + modal, supports `variant="full" | "teaser"` for /donate vs / styling
- `src/app/donate/page.tsx` — Online tab USD branch now uses `<UsdAmountGrid variant="full" />` instead of inline static grid + 2 option cards; INR branch unchanged from original (kept "Pay Securely via Razorpay" header + embedded button)
- `src/app/page.tsx` — homepage USD teaser row now uses `<UsdAmountGrid variant="teaser" />`; **removed `"use client"` directive** (was an async-client-component bug); INR cards still `<Link href="/donate?tab=online">`

---

**Previously completed (Session 2026-05-05 evening — Vercel deploy fixes + Crested Serpent Eagle photo):**
- [x] **Vercel deployment unblocked** — `npm install` was failing on Vercel due to two issues:
  - `lightningcss-win32-x64-msvc` was listed as a hard `dependency` in `package.json` — that's a Windows-only native binding that cannot install on Vercel's Linux build runners. Removed from deps; npm now resolves the correct platform binding (linux-x64-gnu on Vercel) automatically via lightningcss's own `optionalDependencies`.
  - `@sanity/codegen` and `@sanity/sdk` have a peer-dep conflict on `@sanity/telemetry` (`^0.9.0` vs `^1.1.0`). Default `npm install` fails strict resolution.
- [x] **Two new files added to fix this** (commits `193575d`, `014f512`):
  - **`.npmrc`** with `legacy-peer-deps=true` — handles local installs and any tool that respects npmrc.
  - **`vercel.json`** with `installCommand: "npm install --legacy-peer-deps"` — belt-and-suspenders override at the Vercel project level.
- [x] **`styled-components` added as explicit dependency** (commit `b712b29`) — Sanity UI imports it but it wasn't in `package.json`; Vercel was failing on `Module not found: 'styled-components'`.
- [x] **Local node_modules rebuilt from scratch** — old install was corrupted (0-byte directory). `rm -rf node_modules package-lock.json && npm install --prefer-offline --legacy-peer-deps` got back to a working state. Build passes (`✓ Compiled successfully in 30.1s`, 61 static pages).
- [x] **Crested Serpent Eagle photo added** (commit `dfdcec5`) — `public/species/crested-serpent-eagle.jpg` (187 KB, compressed from 1.27 MB original `C:\Users\maxra\Pictures\2026_04_10\CSE.JPG` with sharp-cli at 1600px wide, q=80). Wired into the `crested-serpent-eagle` species entry as `image` + `images[]` so the placeholder gradient on `/species` listing card and `/species/crested-serpent-eagle` detail page is replaced with the real photo. Verified in preview (image loaded, naturalWidth 399, alt text correct).
- All commits pushed to `main`. Vercel should now auto-deploy successfully (no more `npm install exited with 1`).

**Worktree-vs-parent gotcha discovered this session:**
- The dev preview server runs from `.claude/worktrees/hardcore-meninsky-cba263/`, not the parent project. Edits made via the Edit tool to the parent project's `src/` are NOT seen by the preview. Always edit the worktree path when a preview server is running and you intend to verify the change. Public assets (`/public/*`) are also worktree-local — copy or write them to the worktree's `public/` directory.

**Previously completed (Session 2026-05-05 daytime — content edits on /enclosures and /our-specialty):**
- [x] **`/enclosures` housing descriptions updated from `Recovery Cages.docx`** — Recovery Cages, Flight Aviaries, Chick Nursery, Open-Air Cooled Pens rewritten with WR-provided text (light grammar cleanup). Removed Permanent Resident Housing card, Lifelong Care stat box, and Behavioural Enrichment design principle card.
- [x] **`/enclosures` rehab journey steps corrected** — Step 2: "stiffened" → "bandaged wings". Steps 4–6 rewritten: Main Flight Aviary drops "Hunting", Outdoor Conditioning Pen trimmed, Release updated to "protected forest" + Black Kites slow-released from flight cage.
- [x] **`/our-specialty` wording corrections** — "relentless experimentation" → "relentless research"; "adopted by rehabilitators" → "received well by rehabilitators" (all 3 occurrences including hero, NWRA card detail, and Self-Taught paragraph); NWRA card "Now received well..." sentence removed entirely.
- [x] **`/our-specialty` surgery placeholder replaced** — YouTube embed `FPbSOzekGyg` (privacy-enhanced, youtube-nocookie.com) replaces the "Surgery in Progress — Photo Placeholder" box. CSP already allowed youtube-nocookie.
- [x] **`/our-specialty` equipment caption** — "that most wildlife rescue facilities cannot perform" → "successfully".
- [x] **`/our-specialty` manja description** — added "all year round and" before "especially during Independence Day".
- [x] **`/our-specialty` medical condition percentages updated** — Orphaned & Fallen Chicks ~25% → ~35%; Collision & Electrocution renamed to "Collisions, Fractures & Other Injuries", ~20% → ~14%; Entanglement & Other ~5% → ~1%.
- All commits pushed to `main` via `git push origin claude/hardcore-meninsky-cba263:main` (commits `131b62f`–`7a5e5f8`).

**~~⚠️ Vercel auto-deploy is broken as of 2026-05-05~~ — RESOLVED 2026-05-05 evening.**
- Root cause was `npm install exited with 1` on every Vercel build (not a GitHub integration issue). Two underlying problems: Windows-only `lightningcss-win32-x64-msvc` in `dependencies`, and `@sanity/telemetry` peer-dep conflict.
- Fixed by `.npmrc` + `vercel.json` (both with `legacy-peer-deps`), removing the Windows binding from deps, and adding `styled-components`. See "What was just completed" above.

**What was just completed (Session 2026-05-04 — Sanity ACTIVATED end-to-end on `main`):**
- [x] **Sanity project created** at sanity.io — Project ID: **`ivyjyqwz`**, dataset: `production`
- [x] **All 7 existing blog posts migrated to Sanity** via `npm run blog:migrate` — uploaded posts, dedup'd authors (5 unique), categories (6), and featured images. Verified locally — `/blog` reads from Sanity with images served from `cdn.sanity.io/images/ivyjyqwz/production/...`.
- [x] **Two production fixes shipped** (commit `74baf1a`):
  - `src/sanity/lib/client.ts` — passes `SANITY_API_WRITE_TOKEN` so reads work against the **default-private dataset**. Token has no `NEXT_PUBLIC_` prefix, so it's server-only and never reaches the browser. Sanity datasets are now private-by-default in newer projects (post-2024) and public reads return empty without auth.
  - `src/sanity/lib/client.ts` — `useCdn: process.env.NODE_ENV === "production"` (was always-true). The `apicdn.sanity.io` subdomain fails to resolve on some Indian residential ISPs; direct `api.sanity.io` always works.
  - `scripts/migrate-blog-to-sanity.mjs` — explicitly loads `.env.local` (Next.js convention) instead of relying on dotenv's default `.env` lookup.
- [x] **`.env.local` configured locally** (both project root and worktree) with all 5 Sanity env vars.
- [x] **Branch `claude/hardcore-meninsky-cba263` merged to `main` and pushed** (commit `74baf1a`). Vercel auto-deployed.
- [x] **Staff blog publishing guide created** — `C:\Users\maxra\Documents\Wildlife Rescue\WR_Blog_Publishing_Guide_for_Staff.docx` (15 KB). 9 sections covering login, post-writing, photos, editing/deleting, writing tips, troubleshooting, and contacts. WR-branded (teal/amber). Designed for non-technical staff like Mohammad Afeef and Samia.

**Sanity credentials (do NOT commit; in `.env.local` only):**
- Project ID: `ivyjyqwz`
- Dataset: `production`
- API version: `2024-10-01`
- Write token: stored in `.env.local` (label: "Migration token", Editor permissions)
- Revalidate secret: `68a320fe6a1b84a750ac12f72fee905b0f6e52eff4aa8476788d92607e901462`

**Still pending — user must do these in Vercel UI:**
- [ ] **Add the 5 Sanity env vars to Vercel** (Settings → Environment Variables → apply to Production + Preview + Development): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_WRITE_TOKEN`, `SANITY_REVALIDATE_SECRET`. Then **redeploy** (Deployments → ⋯ → Redeploy). Until this is done, the **live site uses the static fallback** — Sanity only works locally.
- [ ] **Set up the Sanity → Vercel webhook** for instant updates (`docs/sanity-setup.md` Step 7). Without it, new posts take up to 5 minutes to appear; with it, they appear in seconds.
- [ ] **Invite staff to Sanity** as Editors (Sanity Manage → Members → +Invite): Mohammad Afeef, Samia Shafiq, Nadeem (Admin), Saud (Admin).
- [ ] **Email `WR_Blog_Publishing_Guide_for_Staff.docx` to Afeef and Samia** along with their invite.

**Sanity activation summary:**
- ✅ Code deployed to `main` (Vercel auto-deployed)
- ✅ Sanity project created + 7 posts migrated
- ✅ Working locally (verified via `/blog` and `/studio`)
- ⏳ Waiting on user to add env vars in Vercel UI to flip the live site over to Sanity

**What was just completed (Earlier 2026-05-04 — Sanity CMS code + migration scripts):**
- [x] **Sanity CMS integrated** — replaces static `BLOG_POSTS` array with a headless CMS so non-developer staff can write/publish posts.
  - **Embedded Studio at `/studio`** — staff log in there to author posts (rich text editor, image uploads, drafts, scheduled publish).
  - **Schemas:** `post`, `author`, `category`, `blockContent` — in `src/sanity/schemaTypes/`.
  - **Adapter pattern:** `src/lib/blog.ts` checks env vars; reads from Sanity if configured, falls back to static `blog-data.ts` if not. Blog pages and homepage call this adapter exclusively. Site continues to work without Sanity env vars.
  - **Migration:** `npm run blog:snapshot` then `npm run blog:migrate` ports the existing 7 posts (markdown→Portable Text + image uploads + dedup'd authors/categories).
  - **Webhook revalidation:** `/api/revalidate` invalidates cache tags when Sanity publishes — new posts appear within seconds.
  - **Setup guide for staff:** `docs/sanity-setup.md` (account creation → migration → invite teammates → daily publishing workflow).
  - **Build passes** with no env vars set (uses static fallback). Activates Sanity once user creates project at sanity.io and adds `NEXT_PUBLIC_SANITY_PROJECT_ID` + token to Vercel.
  - **New deps:** `sanity`, `next-sanity`, `@sanity/vision`, `@portabletext/react`, `@sanity/image-url`, `@sanity/client`, `dotenv`, `tsx`.
  - **Note:** Windows native `lightningcss-win32-x64-msvc` binding had to be reinstalled after the npm install dropped it. The .node file was copied from the lightningcss-win32-x64-msvc package into lightningcss/ to satisfy a fallback require path.
- [x] **Favicon replaced** — `src/app/favicon.ico` removed; `src/app/icon.png` added (Wildlife Rescue round logo, white on teal circle background, 512×512, 41 KB). Next.js App Router serves this automatically.
- [x] **Staff details Word doc created** — `C:\Users\maxra\Documents\Wildlife Rescue\WR_Staff_Details_for_CSR_Proposal.docx` (16 KB). Contains all 10 team member bios, org registration details, awards table, and CSR drafting notes. For use when asking Claude to write a CSR proposal.
- [x] **handoff.md created** — `docs/handoff.md` in project root. Summary of current site state, tech stack, and design briefing context for sharing with Claude.ai or designers.

**Branch status:** `claude/hardcore-meninsky-cba263` — favicon + Sanity CMS not yet merged to `main`. Merge to deploy. Sanity will only activate on Vercel once env vars are set there (see `docs/sanity-setup.md`).

**What was just completed (Earlier in 2026-05-04 session — favicon + staff details doc):**
- [x] **Favicon replaced** — `src/app/favicon.ico` removed; `src/app/icon.png` added (Wildlife Rescue round logo, white on teal circle background, 512×512, 41 KB). Next.js App Router serves this automatically. Branch pushed, pending merge to `main`.
- [x] **Staff details Word doc created** — `C:\Users\maxra\Documents\Wildlife Rescue\WR_Staff_Details_for_CSR_Proposal.docx` (16 KB). Contains all 10 team member bios, org registration details, awards table, and CSR drafting notes. For use when asking Claude to write a CSR proposal.
- [x] **handoff.md created** — `docs/handoff.md` in project root. Summary of current site state, tech stack, and design briefing context for sharing with Claude.ai or designers.

**Branch status:** `claude/hardcore-meninsky-cba263` — favicon commit not yet merged to `main`. Merge to deploy.

**What was just completed (Session 2026-05-01 — vulture page + UI fixes, all on `main`):**
- [x] **Vulture photos added** — 9 CC-licensed photos from Wikimedia Commons downloaded, compressed, and wired into `/vultures` species grid. `public/vultures/` directory created. Photos: white-rumped, indian, slender-billed, red-headed, cinereous, bearded (front2 portrait), himalayan, eurasian-griffon, egyptian vultures. Attribution overlays shown on each card.
- [x] **Vulture species data overhauled** — all 9 entries in `INDIA_VULTURE_SPECIES` rewritten with accurate threats and notes:
  - Gyps trio (White-rumped, Indian/Long-billed, Slender-billed): diclofenac-focused, all CR
  - Red-headed: diclofenac + persecution for traditional medicine, solitary habits noted
  - Egyptian: "dual jeopardy" framing — threatened on both wintering + breeding grounds; lead poisoning removed
  - Himalayan Griffon: status corrected from NT → **LC**; power line electrocution + NSAID noted
  - Cinereous: winter visitor only, global decline framing
- [x] **"Key Differences by Species" section added** to `/vultures` — 5 colour-coded callout cards after the species grid (Diclofenac Trio / Compounded Crisis / Dual Jeopardy / Relative Success Story / Global Decline). Commit `762892b`.
- [x] **Lead poisoning removed** from "Common Injuries We Treat" card on `/vultures`
- [x] **Status legend updated** — now includes `LC = Least Concern`
- [x] **Wingman eagle flipped** — callout bubble eagle emoji now faces right (`-scale-x-100` removed from Wingman.tsx line 77; the default 🦅 faces right without mirroring)
- [x] **Clinic hero badge updated** — "South Asia's Most Advanced Avian Clinic" → "One of India's Most Advanced Clinics for Birds" (`src/app/clinic/page.tsx`)
- [x] **Clinic equipment card renamed** — "Surgical Microscopy" → "Clinic Microscope" (`src/app/clinic/page.tsx`)
- [x] **Donate page** — removed "Recommended" badge from the R3 (501c3) donation option (`src/app/donate/page.tsx`)

**Pending (flagged, not yet acted on):**
- `/our-specialty` expansion + `/our-specialty/wing-repair` page — see `docs/PLAN-our-specialty-expansion.md`. Waiting on user assets (X-rays, NWRA decks, anatomy diagrams).
- "How We Prepare for Kite-Flying Season" post body still describes monsoon electrocutions. Content rewrite needed if topic is meant to actually shift to manja injuries.
- User is sharing `docs/ANTIGRAVITY-DESIGN-BRIEF.md` with Google Antigravity; awaiting redesign proposals.
- Egyptian Vulture placeholder slot on `/vultures` — user has their own wounded vulture photo to add. Drop file at `public/vultures/egyptian-vulture.jpg` (will replace the current Wikimedia photo).

**New public assets (this session):**
- `public/vultures/white-rumped-vulture.jpg` (30 KB) — Petra Karstedt / CC BY-SA 1.0
- `public/vultures/indian-vulture.jpg` (59 KB) — Yathin sk / CC BY-SA 3.0
- `public/vultures/slender-billed-vulture.jpg` (153 KB) — gailhampshire / CC BY 2.0
- `public/vultures/red-headed-vulture.jpg` (41 KB) — Vishal Sabharwal / CC BY-SA 3.0
- `public/vultures/cinereous-vulture.jpg` (43 KB) — Alastair Rae / CC BY-SA 2.0
- `public/vultures/bearded-vulture.jpg` (98 KB) — Richard Bartz / CC BY-SA 2.5
- `public/vultures/himalayan-vulture.jpg` (177 KB) — gailhampshire / CC BY 2.0
- `public/vultures/eurasian-griffon-vulture.jpg` (55 KB) — H. Zell / CC BY-SA 3.0
- `public/vultures/egyptian-vulture.jpg` (111 KB) — J.M.Garg / CC BY-SA 3.0 (placeholder — user to replace with own photo)

**Key files touched this session:**
- `src/app/vultures/page.tsx` — `image?`/`imageCredit?` fields added to species interface; species data rewritten; "Key Differences by Species" section added; lead poisoning removed; LC added to legend
- `src/components/Wingman.tsx` — eagle emoji direction fixed (faces right)
- `src/app/clinic/page.tsx` — hero badge text + "Clinic Microscope" card rename
- `public/vultures/` — **NEW directory**: 9 compressed vulture photos

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-29 evening — content corrections, all on `main`):**
- [x] **Cut Wounds & Lacerations corrected** — percentage `~35%` → `~40%`, annualCases `~1,300/year` → `~1,500/year`; description text "approximately 35% of all cases" → "approximately 40%". Verified via preview (`/conditions/cut-wounds` serves the new values, zero residual `35%`/`1,300/year`).
- [x] **Antigravity design brief drafted** — `docs/ANTIGRAVITY-DESIGN-BRIEF.md` (commit `19eb598`). Self-contained briefing for Google Antigravity covering org context, tech stack + hard constraints, brand tokens, full site map, page-by-page layouts, reusable components, redesign goals, and 3-direction proposal request. User will share with Antigravity to get cosmetic redesign options.
- [x] **Avian Pox corrected** (commits `f09fbce`, `5cb4768`):
  - Removed all wet/dry form distinction (not relevant to our caseload — we don't see wet form)
  - Reframed as a juvenile-only condition; ~60 cases/year (was ~300/year, ~8% of intake)
  - Listing card headline now reads "Juveniles only" instead of a percentage
  - Description rewritten — adults have established immunity; we see only juveniles, primarily after monsoon
  - Symptoms / treatment / common species cleaned of all wet-form references
  - Stripped a literal `**…**` markdown emphasis that was rendering as text
  - Added optional `percentageLabel` field to `Condition` interface for cases where "of cases" doesn't fit
- [x] **Recovery-rate scrubbed site-wide** (commit `6e596d0`):
  - Removed `recoveryRate` field from `Condition` interface and from all 6 entries (cut-wounds, fractures, septicemia, methane, orphans, other-conditions)
  - Stripped recovery-rate stat blocks from `/conditions` listing card and `/conditions/[slug]` detail hero (the third stat cell now shows `avgRecoveryTime` instead)
  - `/treatments` highlights bar — "Recovery Rate ~65%" replaced with "Birds Treated Since 2010 — 38,500+"
  - NWRA blog post bullet rewritten — was "Recovery rates have improved from 60% to over 80%"; now references staged/reproducible technique
  - Plan doc (`docs/PLAN-our-specialty-expansion.md`) updated to drop recovery-rate stat and note the no-public-rate policy for future wing-repair page
  - Verified: zero `recovery rate` / `recoveryRate` matches anywhere in `src/` or `docs/`
- [x] **Methane & Chemical Burns** — percentage `~2%` → `<1%`, annualCases `~75/year` → `~30/year` (commit `6e596d0`)
- [x] **Septicemia corrected** (commits `e6435b7` + `876b957`):
  - Renamed from "Septicemia & Infections" → "Septicemia"
  - Percentage: ~10% → ~4% → **~2.5%** (final)
  - annualCases: ~370/year → ~150/year → **~95/year** (final)
  - Description text aligned to ~2.5%
  - Slug `/conditions/septicemia` retained for link stability

**Earlier work this conversation (carried over from earlier today, 2026-04-29 daytime):**
- **`/facility` split into `/clinic` + `/enclosures`** (commit `14481fe`) — both pages get heavily expanded promotional content reflecting them as core organisational strengths.
  - `/clinic` — "South Asia's Most Advanced Avian Clinic". 9 equipment cards (X-Ray, Modern OT, Ultrasonic Bone Cutter, Surgical Laser, Diagnostic Lab, ICU, Pharmacy, Triage, Surgical Microscopy), 11-image equipment gallery, 5-step clinical journey ending with handoff to aviaries.
  - `/enclosures` — "Where Rescued Birds Become Wild Again". 6 housing-type cards, NEW "Why These Enclosures Work" section (Low-Stress Design / Hygiene & Disease Control / Behavioural Enrichment), aviary photo gallery, 6-step rehab journey ending in release.
  - Header dropdown ("Our Work") replaces "Our Facility" with "Our Clinic" + "Bird Enclosures" (desktop + mobile lists). `next.config.ts` adds permanent 301 redirect `/facility → /clinic` so old inbound links and SEO don't break. Sitemap updated. Inbound links from `/history` and `/treatments` repointed.
  - Image folder `/public/facility/*` retained — only the route was split, not the assets.
- **Plan saved for `/our-specialty` expansion + new `/our-specialty/wing-repair` page** at `docs/PLAN-our-specialty-expansion.md` (commit `dcc454b`). Awaiting user to collect: X-rays, NWRA presentation slides, anatomy diagrams.

**Pending (flagged, not yet acted on):**
- `/our-specialty` expansion + `/our-specialty/wing-repair` page — see `docs/PLAN-our-specialty-expansion.md`. Waiting on user assets (X-rays, NWRA decks, anatomy diagrams).
- "How We Prepare for Kite-Flying Season" post body still describes monsoon electrocutions. Content rewrite needed if topic is meant to actually shift to manja injuries.
- User is sharing `docs/ANTIGRAVITY-DESIGN-BRIEF.md` with Google Antigravity; awaiting redesign proposals.

**New routes (this conversation):**
- `/clinic` — replaces clinic half of old `/facility`
- `/enclosures` — replaces aviary half of old `/facility`
- `/facility` — now 301 → `/clinic`

**New public assets (across this conversation):**
- `public/scaling-avian-impact.pdf` (13.5 MB) + `public/scaling-avian-impact-cover.jpg` (158 KB)
- `public/brochure-cover.jpg` (194 KB)

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-29 morning — facility split + planning, all on `main`):**
- [x] **`/facility` split into `/clinic` + `/enclosures`** (commit `14481fe`) — both pages get heavily expanded promotional content reflecting them as core organisational strengths.
  - **`/clinic`** — "South Asia's Most Advanced Avian Clinic". 9 equipment cards (X-Ray, Modern OT, **Ultrasonic Bone Cutter**, **Surgical Laser**, Diagnostic Lab, ICU, Pharmacy, Triage, **Surgical Microscopy**), 11-image equipment gallery, 5-step clinical journey ending with handoff to aviaries. CTA: "Help Us Equip the Clinic".
  - **`/enclosures`** — "Where Rescued Birds Become Wild Again". 6 housing-type cards, NEW "Why These Enclosures Work" section (Low-Stress Design / Hygiene & Disease Control / Behavioural Enrichment), aviary photo gallery, 6-step rehab journey ending in release. CTA: "Sponsor an Enclosure". Aviaries video reused from old facility page.
  - **Wiring:** Header dropdown ("Our Work") replaces "Our Facility" with "Our Clinic" + "Bird Enclosures" (desktop + mobile lists). `next.config.ts` adds permanent 301 redirect `/facility → /clinic` so old inbound links and SEO don't break. Sitemap updated. Inbound links from `/history` and `/treatments` repointed.
  - **Image folder `/public/facility/*` retained** (paths unchanged) — only the route was split, not the assets.
  - Type-checked clean (`npx tsc --noEmit`).
- [x] **Plan saved for `/our-specialty` expansion + new `/our-specialty/wing-repair` page** at `docs/PLAN-our-specialty-expansion.md` (commit `dcc454b`). Awaiting user to collect: X-rays, NWRA presentation slides, anatomy diagrams. Plan covers expanded equipment grid, dedicated X-Ray section, and a comprehensive wing-repair page with anatomy / surgical stages / case studies / NWRA slide excerpts.
  - **Decision logged:** do NOT use Blender/Claude for anatomy diagrams. Use NWRA slides (peer-reviewed, authoritative) + Wikimedia CC-licensed bird wing diagrams as fallback.

**Earlier work this conversation (carried over from 2026-04-28):**
- **Scaling Avian Impact 2025 report** wired into the existing "2025: Our Biggest Year Ever — 4,184 Birds Rescued" blog post (`record-breaking-2025`).
  - `public/scaling-avian-impact.pdf` (13.5 MB) — full report copied from `C:/Users/maxra/Downloads/Scaling_Avian_Impact.pdf`
  - `public/scaling-avian-impact-cover.jpg` (158 KB) — page-1 cover preview rendered at 1800px wide using a fresh `pdfjs-dist` + `@napi-rs/canvas` toolchain at `C:/Users/maxra/AppData/Local/Temp/pdfconv2/`
  - Surfaces automatically on homepage "From Our Blog" (cover thumbnail), `/blog` listing card, and `/blog/record-breaking-2025` (hero image + PDF download banner). Commit `e171a74`.
- **Blog title retitled** — "How We Prepared for Monsoon Season 2025" → "How We Prepare for Kite-Flying Season" (slug `monsoon-2025-preparedness` retained for link stability; body content unchanged). Commit `9235da4`.

**Earlier work this conversation (carried over from 2026-04-17 late polish):**
- Founding date corrected site-wide ("late 1990s" → "early 1990s") in 4 files (`constants.ts` ×2, `app/page.tsx`, `wingman-prompt.ts`). Commit `744cfb3`.
- `/about` "Download Our Brochure" card — replaced FileText icon with real brochure cover image (`public/brochure-cover.jpg`, 194 KB, from `C:/Users/maxra/Pictures/Website Pics/BrochureP1.png`), 3:4 rounded preview with shadow/ring. Commit `ae29482`.
- `/facility` stats bar — removed "50+ Enclosures & Aviaries" count, replaced "2 Operating Theaters" (factually wrong) with "Advanced — Modern Operation Theater with latest machines"; metadata description also updated. Commit `a31a6f3`. **Note:** This page no longer exists — facility was split into `/clinic` + `/enclosures` on 2026-04-29.

**New public assets (this conversation):**
- `public/scaling-avian-impact.pdf` (13.5 MB)
- `public/scaling-avian-impact-cover.jpg` (158 KB)
- `public/brochure-cover.jpg` (194 KB)

**New routes (this conversation):**
- `/clinic` — replaces clinic half of old `/facility`
- `/enclosures` — replaces aviary half of old `/facility`
- `/facility` — now a 301 redirect to `/clinic`

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-28 — content additions):**
- [x] **Scaling Avian Impact 2025 report** — wired into the existing "2025: Our Biggest Year Ever — 4,184 Birds Rescued" blog post (`record-breaking-2025`)
  - `public/scaling-avian-impact.pdf` (13.5 MB) — full report copied from `C:/Users/maxra/Downloads/Scaling_Avian_Impact.pdf`
  - `public/scaling-avian-impact-cover.jpg` (158 KB) — page-1 cover preview rendered at 1800px wide using a fresh `pdfjs-dist` + `@napi-rs/canvas` toolchain at `C:/Users/maxra/AppData/Local/Temp/pdfconv2/`
  - Post `image` + `pdfUrl` fields populated; excerpt updated to mention "Scaling Avian Impact"
  - Surfaces automatically: homepage "From Our Blog" (cover thumbnail), `/blog` listing card, and `/blog/record-breaking-2025` (hero image + PDF download banner). Commit `e171a74`.
- [x] **Blog title retitled** — "How We Prepared for Monsoon Season 2025" → "How We Prepare for Kite-Flying Season". Commit `9235da4`.

---

**Previously completed (Session 2026-04-22 evening — photo additions & fixes, all merged to `main`):**
- [x] **Black Naped Ibis photo** — `public/species/black-naped-ibis-01.jpg` (129KB) added to Wetland Birds gallery in `species-data.ts`
- [x] **Black Kite photos ×2** — `black-kite-02.jpg` (141KB, clinic) and `black-kite-recovery.jpg` (149KB, recovering from anesthesia after manja wing repair) added to Black Kite gallery
- [x] **Spotted Owlet 05** — `public/species/spotted-owlet-05.jpg` (107KB) added to Spotted Owlet gallery
- [x] **Crane photo** — `public/species/crane-01.jpg` (124KB) added to Wetland Birds gallery
- [x] **Baby Spotted Owlet** — `public/treatments/baby-spotted-owlet.jpg` (119KB) added as lead photo in "Orphan & Chick Rehabilitation" section on `/treatments`
- [x] **Sultan the Egyptian Vulture** — `public/species/egyptian-vulture-01.jpg` (157KB) now appears in: (1) homepage Featured Rescue card (Sultan entry, summary updated to mention septicemia), (2) `/species/egyptian-vulture` hero + gallery, (3) `/conditions/septicemia` photo gallery. `public/conditions/septicemia-egyptian-vulture.jpg` also added.
- [x] **Bug fix: double-s on plural species names** — `src/app/species/[slug]/page.tsx` CTA heading "Help Protect {name}s" now checks if name already ends in 's' (fixes "Wetland Birdss", "Eagless")
- [x] **Merged worktree `claude/xenodochial-mendeleev-ef9de2` → `main`** — all 15 commits from the 2026-04-22 session deployed to Vercel
- [x] **Black Eared Kite hero rotated** — `public/species/black-eared-kite.jpg` rotated 90° CCW (was sideways on `/species/black-kite`)
- [x] **Methane burns condition fixed** — removed wrong Black Eared Kite image as hero; added `public/conditions/methane-burn-hero.jpg` (160KB, from `IMG_4635.JPG`) as correct hero; rotated `methane-burn-02.jpg` 90° CCW; removed duplicate hero from gallery `images[]`; `caseStudy.image` also updated

**Key files touched this session:**
- `src/lib/species-data.ts` — Black Naped Ibis, Black Kite ×2, Spotted Owlet 05, Crane, Egyptian Vulture (image + images)
- `src/lib/conditions-data.ts` — Sultan photo in septicemia gallery; methane-burns hero replaced + gallery deduped
- `src/lib/constants.ts` — Sultan's FEATURED_RESCUES entry updated with image + revised summary (septicemia)
- `src/lib/treatments-data.ts` — baby Spotted Owlet photo in orphan-chick-care media
- `src/app/species/[slug]/page.tsx` — pluralisation fix for CTA heading
- `public/species/` — **NEW**: black-naped-ibis-01, black-kite-02, black-kite-recovery, spotted-owlet-05, crane-01, egyptian-vulture-01; **UPDATED**: black-eared-kite (rotated)
- `public/conditions/` — **NEW**: methane-burn-hero.jpg, septicemia-egyptian-vulture.jpg; **UPDATED**: methane-burn-02 (rotated)
- `public/treatments/` — **NEW**: baby-spotted-owlet.jpg

- [x] **Black Eared Kite species page image rotations** — `black-eared-kite-02.jpg` (hero + first gallery image) rotated 90° CCW; `black-eared-kite.jpg` (right gallery image) rotated 90° CW. Commit `157ea15`.

**Uncommitted local state:**
- `.claude/settings.local.json` — workstation-specific, untracked
- All changes are on `main` and live on Vercel

---

**Previously completed (Session 2026-04-21 — security hardening on `main`):**
- [x] **Next.js upgraded 16.1.6 → 16.2.4** — patches 6 high-severity CVEs; most important is **GHSA-mq59-m269-xvcx** (null-origin bypass of Server Actions CSRF), which directly undercut our origin-allowlist middleware on `/api/*` POSTs. Also fixes HTTP request smuggling, DoS via Server Components, unbounded next/image cache, HMR websocket CSRF bypass. `npm audit --omit=dev` now reports **0 vulnerabilities**. Build passes. Commit `92111d6`.
- [x] **Content-Security-Policy header added to middleware** — pragmatic allowlist CSP. Still permits `'unsafe-inline' 'unsafe-eval'` for script/style (needed by Next.js runtime, JSON-LD, framer-motion, Tailwind JIT) but locks down `frame-ancestors 'self'`, `base-uri 'self'`, `object-src 'none'`, `form-action` allowlist, and `upgrade-insecure-requests`. External hosts allowlisted: Razorpay (checkout+cdn+api+lumberjack), YouTube + youtube-nocookie, Google Tag Manager + GA4, Google Maps, GoFundMe. Verified via preview: homepage, /donate (Razorpay embed loads 3 scripts + iframe), /all-that-breathes (YouTube iframe) all render with zero CSP violations. Commit `7976ab1`.
- [x] **Abandoned `claude/focused-northcutt` branch** — photo-wiring work there was superseded by main (main already has the `image?` interface fields, wired-up clinical photos, different filenames). No rebase, no merge. Branch stays for historical reference. The 94 MB `cse-1.png` never made it to main — good.
- [x] **Live-site audit completed against `b4fe52b`** (commit just before this session). Full findings above; summary: CSP was the main gap, now closed.

**Production security posture as of this session:**
| Control | Status |
|---|---|
| HSTS (1y, includeSubDomains) | ✅ |
| X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy | ✅ |
| **Content-Security-Policy** | ✅ **NEW** |
| CSRF (origin-allowlist middleware) | ✅ |
| Rate limiting (Upstash Redis on chat/contact/newsletter) | ✅ |
| Message/length caps on chat API | ✅ |
| Razorpay sandboxed iframe (not dangerouslySetInnerHTML) | ✅ |
| `.env` / `.git` / source maps | 404 ✅ |
| `npm audit --omit=dev` | 0 vulns ✅ |

**Still pending (NOT security-blocking):**
- [ ] **Wire raptorrescue.org → Vercel** — still a GoDaddy parking page (`Server: DPS/2.0.0`). Until this, HSTS `preload` can't be submitted and the custom domain doesn't benefit from any of this hardening.
- [ ] **Rename `src/middleware.ts` → `src/proxy.ts`** — Next.js 16 deprecated the `middleware` file convention in favor of `proxy`. Build emits a warning only, not broken. Low priority.
- [ ] **Enable Vercel Firewall rules in dashboard** — free, ~10 min of UI clicks. Adds bot protection on top of what's there.
- [ ] **Verify GitHub Dependabot + Secret Scanning are on** — repo Settings → Security.

**Third-party security services — DO NOT BUY** for this site:
- ❌ Sucuri / Wordfence / SiteLock / MalCare — WordPress-era, useless for Next.js/Vercel
- ❌ Dedicated DDoS services — Vercel edge already handles this at current traffic
- ❌ Pentest agencies on Upwork/Fiverr — templated `npm audit` output, no value
- ❌ A professional pentest ($3-5k) — only worth it at 6-figure monthly donations. Site stores no cards, no passwords, no donor PII; Razorpay + R3 handle all payment data
- ✅ **Free tier of Cloudflare** is worth sitting in front of Vercel if ever needed (extra WAF + bot fight)
- ✅ **Sentry free tier** — error monitoring is more valuable than "security tools" for surfacing probing attempts

**Key files touched this session:**
- `package.json`, `package-lock.json` — Next.js 16.2.4
- `src/middleware.ts` — CSP header added

**Uncommitted local state:**
- `.claude/settings.local.json` — workstation-specific, untracked
- `.claude/worktrees/` — contains several stale worktrees; `focused-northcutt` worktree middleware.ts was synced locally to match main (for preview testing) but not committed there

---

**Previously completed (Session 2026-04-17 late — small polish pass):**
- [x] **Founding date corrected site-wide** — "late 1990s" → "early 1990s" in 4 places: Nadeem's team bio (`constants.ts` line 39, shown on /about), TIMELINE first entry (`constants.ts` line 202, /about), homepage origin story paragraph (`src/app/page.tsx`), and Wingman chatbot knowledge (`src/lib/wingman-prompt.ts`). Commit `744cfb3`.
- [x] **Brochure cover replaces document icon on /about** — "Download Our Brochure" CSR card now shows the real brochure first-page image (`/brochure-cover.jpg`, 194 KB, compressed from `C:\Users\maxra\Pictures\Website Pics\BrochureP1.png`) as a 3:4 rounded cover preview with shadow/ring, replacing the FileText lucide icon. Commit `ae29482`.
- [x] **Facility stats bar corrected** (`/facility`) — removed "50+ Enclosures & Aviaries" count and replaced "2 Operating Theaters" (factually incorrect — only one) with "Advanced — Modern Operation Theater with latest machines"; Enclosures entry now reads "Purpose-Built — Enclosures & Aviaries" (no number). Metadata description also updated. Commit `a31a6f3`.

**New public assets (this session):**
- `public/brochure-cover.jpg` (194 KB) — CSR brochure cover preview

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-17 — Annual Report archive overhaul):**
- [x] **Annual Report 2025 PDF published** — `public/wr-annual-report.pdf` (2.95 MB), wired into `/blog` (featured post retitled "Wildlife Rescue Annual Report 2025"), homepage "From Our Blog" section, `/blog/wr-annual-report-2025` detail page, and `/annual-reports`
- [x] **New Annual Report archive on `/annual-reports`** — complete redesign of download section
  - Per-year card: teal gradient header with pulled-out key stats, two-column body with clickable infographic + cover previews and prominent Download CTAs
  - Handles both portrait (9:16) and landscape (16:9) infographic orientations via `infographicOrientation` field
  - Graceful "Coming soon" placeholder when infographic is not yet produced
  - Data-driven: new `src/lib/annual-reports-data.ts` module — add a year = one entry + 4 files in `public/annual-reports/`
- [x] **4 years live in archive** (newest first):
  - **2025** — "A Second Chance at Flight" — infographic + detailed PDF (both)
  - **2022** — "Annual Intake Analysis — 3,385 Rescues" — landscape infographic + detailed PDF
  - **2021** — "2021 In Numbers" — detailed PDF (infographic coming)
  - **2020** — "Resilient Operations in a Year of Global Crisis" — landscape infographic + detailed PDF
- [x] **New Barn Owl video** — `barn-owl-release.mp4` (33 MB) added as lead entry in Barn Owl species videos list
- [x] **PDF→JPG toolchain established** — `C:/Users/maxra/AppData/Local/Temp/pdfconv/convert2.mjs` uses `pdfjs-dist` + `@napi-rs/canvas` + wasm URL for JPX decoding; sharp-cli compresses output to JPEG

**New public assets (this session):**
- `public/wr-annual-report.pdf` (2.95 MB) — 2025 detailed report
- `public/annual-reports/wr-annual-infographic-2025.pdf` (455 KB)
- `public/annual-reports/infographic-2025.jpg` (422 KB, portrait)
- `public/annual-reports/cover-2025.jpg` (210 KB)
- `public/annual-reports/infographic-2022.jpg` (330 KB, landscape)
- `public/annual-reports/cover-2022.jpg` (389 KB)
- `public/annual-reports/wr-annual-report-2022.pdf` (12.5 MB)
- `public/annual-reports/cover-2021.jpg` (255 KB)
- `public/annual-reports/wr-annual-report-2021.pdf` (4.2 MB)
- `public/annual-reports/infographic-2020.jpg` (400 KB, landscape)
- `public/annual-reports/cover-2020.jpg` (154 KB)
- `public/annual-reports/wr-annual-report-2020.pdf` (2.2 MB)
- `public/species/barn-owl-release.mp4` (33 MB)

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-16 — NWRA page, tagged-bird reporting, hero attribution):**
- [x] **NWRA Symposium 2025 page** — NEW `/nwra-2025` dedicated page covering Nadeem Shehzad & Mohammad Saud's presentation "Advanced Propatagium Surgery" at NWRA Symposium, Bellevue, WA (Seattle), Feb 18-22, 2025
  - 7 photos compressed with sharp-cli (~170-265KB each) from original 7-8 MB JPGs
  - Sections: Hero (gradient with speakers backdrop), Why This Matters, Three Stages (alternating image/text layout), Scenes Gallery, NWRA+R3 info cards, Cross-links to /about and /treatments, Donate CTA
  - Wired into `/media` page 2025 awards entry with `link: "/nwra-2025"` (conditional Link render)
- [x] **NWRA blog post** — Added "Advanced Propatagium Surgery — Presented at NWRA 2025" to `BLOG_POSTS` in `src/lib/blog-data.ts`
  - Slug: `nwra-seattle-2025`, Category: Conference, Author: Mohammad Saud, Date: 2025-02-20
  - Featured on homepage "From Our Blog" section (top 3) and on `/blog` listing
- [x] **Blog image support** — All blog card placeholders now conditionally render `post.image` via `next/image` with proper aspect-ratio + sizes; fallback gradient placeholder retained
  - Updated: `src/app/page.tsx` (homepage grid), `src/app/blog/page.tsx` (featured + grid), `src/app/blog/[slug]/page.tsx` (hero image between header and PDF banner)
- [x] **Report A Tagged Bird page** — NEW `/report-tagged-bird` interactive form page
  - Client component with 5 fieldsets: Your Details, Tag Details, Bird Details (species + condition), When & Where (date + city + location description), Photos (upload up to 5, 10 MB each)
  - Photo preview via `URL.createObjectURL`, per-photo remove, photo count indicator
  - FormData POST to NEW `/api/report-tagged-bird` route with rate limiting (reuses contact 5/hr limiter), field length caps, header injection blocking, email regex, 10 MB photo cap
  - Success state with "Submit Another Report" reset; emergency callout card linking to phone + WhatsApp
  - Header nav: added "Report A Tagged Bird" after "Contact Us" in both desktop NAV_ITEMS and MOBILE_LINKS
  - Added to sitemap
  - **Note:** Only photo metadata (name, size, type) is stored currently. Actual blob storage would need Vercel Blob integration.
- [x] **Hero quote attribution changed** — Homepage `<h1>` quote *"Life itself a kinship, we're all a community of air."* now attributed to **"— Nadeem and Saud, Wildlife Rescue"** (was "— All That Breathes")

**All commits pushed to `main`, auto-deployed to Vercel.**

---

**Previously completed (Session 2026-04-15 — Homepage polish, Instagram feed, brochure):**
- [x] **Third homepage hero image** — Avian Pox Black Kite added below Barn Owl hero (`/hero-avian-pox.jpg`, 174KB, 1920px)
- [x] **Hero tagline replaced with ATB quote** — Homepage hero H1 now reads *"Life itself a kinship, we're all a community of air."* with "— All That Breathes" attribution (italic Poppins, amber "community of air" accent)
- [x] **Instagram feed activated (Option C — manual curation)** — replaced dead Instagram Basic Display API with hand-curated `INSTAGRAM_POSTS` in `src/lib/constants.ts`
  - Deleted `src/app/api/instagram/route.ts`
  - Rewrote `src/components/InstagramFeed.tsx` as a server component (no more useState/useEffect/loading state)
  - Removed unused Instagram CDN `remotePatterns` from `next.config.ts`
  - 6 posts with image/caption/permalink; swap manually whenever a refresh is wanted
- [x] **Rescue Stories cards refreshed on homepage**:
  - "Noor the Barn Owl" → **"Six Barn Owls, Ready for Release"** with real photo (`/rescues/barn-owl-group.jpg`, 283KB)
  - "Kiran the Black Kite" → **"Black Kite Under Surgery"** reusing `/species/black-kite-anesthesia.jpg`
  - Extended `FeaturedRescue` interface with optional `image`/`imageAlt`; cards conditionally render real photo vs placeholder
- [x] **Wildlife Rescue CSR Brochure (PDF, 17 MB)** — added `/wr-brochure.pdf`
  - "Download Our Brochure" card on `/about` (teal gradient, FileText icon, aimed at corporate/CSR donors) positioned before the final Support CTA
  - Footer Quick Links now includes "CSR Brochure (PDF)" with external-link handling (target=\_blank)

**All commits pushed to `main`, auto-deployed to Vercel.**

**Previously completed (Session 2026-04-11 #2 — Bulk Photo Additions):**
- [x] **Avian Pox photo** — Black Kite with pox lesions added to `/conditions/avian-pox` (83KB)
- [x] **Black Eared Kite** — Portrait photo added as hero to `/species/black-kite` (135KB)
- [x] **Black Kite 01** — Juvenile on exam table added to Black Kite gallery (92KB)
- [x] **Black Kite Anesthesia** — Under gas anesthesia with face mask added to Black Kite gallery (86KB)
- [x] **Spotted Owlet 04** — Profile close-up added to Spotted Owlet gallery (118KB)
- [x] **Cattle Egret 01** — Bandaged wing on exam table added to Wetland Birds gallery (89KB)
- [x] **Painted Stork 01** — Surgery close-up with endotracheal tube added to Wetland Birds gallery (121KB)
- [x] **Facility enclosure photos (EN01–03)** — 3 aviary photos showing dozens of raptors (Black Kites, Egyptian Vultures) added as "Inside Our Aviaries" gallery on `/facility`
- [x] **Laser Therapy Big** — Wide shot of laser therapy added to `/treatments` Laser Wound Management (110KB)
- [x] **Facility clinic photos** — 3 photos added to Surgical Suite Equipment gallery on `/facility`:
  - Lab02: diagnostic lab with centrifuge & microscope
  - Laser Surgery: precision laser procedure on raptor
  - OT Table: full operating theater setup
- [x] **Treatment photos** — 2 photos added to Post-Treatment Recovery on `/treatments`:
  - Black Kite Drip: IV fluid therapy
  - Painkiller Drops: oral medication administration

**All commits pushed to `main`, auto-deployed to Vercel.**

**Previously completed (Session 2026-04-11 #1 — New Species, Treatments Page & Videos):**
- [x] **Indian Scops Owl** — NEW species page `/species/scops-owl` (15th species)
  - 5 photos + 1 video; nocturnal, bark-mimicking camouflage, ~20 cases/year
- [x] **Steppe Eagle** — NEW species page `/species/steppe-eagle` (Endangered)
  - 4 clinic photos; Central Asian Flyway migration, ~12 cases/year
- [x] **Oriental Honey Buzzard** — NEW species page `/species/oriental-honey-buzzard`
  - 2 photos + 1 video; bee/wasp nest specialist, ~10 cases/year
- [x] **Peregrine Falcon** — NEW species page `/species/peregrine-falcon`
  - 4 clinic photos; fastest animal on Earth (390 km/h), ~8 cases/year
- [x] **Treatments page** — NEW `/treatments` page with 5 treatment entries (gas anesthesia, ultrasonic bone cutter, laser wound management, post-treatment care, orphan chick care)
  - Data-driven with `TreatmentMedia` supporting photos + videos
  - Added to "Our Work" nav dropdown + sitemap
- [x] **Facility page upgrades** — Clinic photo replaced placeholder, 4-photo surgical equipment gallery, aviaries video replaced placeholder
- [x] **Species videos** — Added videos to Black Kite, Barn Owl, Wetland Birds, Scops Owl, Eagles, OHB
- [x] **Spotted Owlet** — Added 3 photos + chick photo to gallery
- [x] **Video compression** — ffmpeg installed, 176MB → 8.2MB (95% reduction)
- [x] **Barn Owl hero** — Added to homepage below Steppe Eagle hero
- [x] **Conditions video** — Laser therapy video added to cut-wounds condition

**Species count: 11 → 15** (added Scops Owl, Steppe Eagle, Oriental Honey Buzzard, Peregrine Falcon)

**Previously completed (Session 2026-04-10 #3 — Species & Conditions Photos):**
- [x] Added Shikra photos to `/species/shikra` — face close-up (91KB) + profile (108KB)
  - Species data was already wired up from previous session — just needed the actual photo files
- [x] Added Barn Owl treatment photo to `/species/barn-owl` (91KB)
  - Owl lying on examination table during treatment
  - Added `imagePosition: "left center"` to prevent head cropping
  - Added `imagePosition` optional field to Species interface for per-species focal point control
- [x] Added Cattle Egret photo to `/species/wetland-birds` (67KB)
  - Egret perched on examination table at clinic
- [x] Added 2 Crested Serpent Eagle photos to `/species/eagles` (150KB + 106KB)
  - Face close-up with yellow face/piercing eye + examination table treatment shot
  - Both appear in Eagles Gallery on detail page

**Previously completed (Session 2026-04-10 #2 — Conditions Photos):**
- [x] Added image support to conditions pages (listing + detail) — commit `2578592`
  - Listing page: shows 2-up photo gallery when `condition.images` has 2+ entries, single image for 1, gradient placeholder fallback
  - Detail page: hero photo when `condition.image` set, full photo gallery section with all images, case study photo support
  - Extended `Condition` interface with `image?`, `images?`, `caseStudy.image?` fields
- [x] Added 5 Barn Owl septicemia photos — commit `c69ec7f`
  - `public/conditions/septicemia-owl-face.jpg` (81KB), `septicemia-eye-closeup.jpg` (160KB), `septicemia-feet-both.jpg` (80KB), `septicemia-foot-closeup.jpg` (79KB), `septicemia-feet-held.jpg` (156KB)
  - Wired into septicemia entry in `conditions-data.ts` with descriptive alt text
  - Verified rendering on both listing page (2-up gallery) and detail page (hero + 5-photo gallery)

**Previously completed (Session 2026-04-10 #1 — Security Audit & Hardening):**
- [x] Full security audit of entire codebase (API routes, client components, config, dependencies)
- [x] **Wingman URL validation** — `isSafeUrl()` blocks `javascript:`, `data:`, `vbscript:`, `blob:`, `file:` protocols in AI-generated links; only allows `http:`, `https:`, `mailto:`, and relative paths
- [x] **Security headers middleware** — new `src/middleware.ts` adds X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, Strict-Transport-Security to all responses
- [x] **CSRF origin checking** — middleware validates `Origin` header on all POST `/api/*` requests; blocks cross-origin requests from unauthorized domains
- [x] **Input hardening on contact API** — type checks, length limits (name: 200, email: 254, phone: 30, subject: 300, message: 5000 chars), email header injection blocking (rejects `\r\n` in fields)
- [x] **Input hardening on newsletter API** — type check + email length limit (254 chars)
- [x] **Input hardening on chat API** — max 50 messages per conversation, max 2000 chars per message, try/catch error handling
- [x] **GoFundMe XSS fix** — replaced `dangerouslySetInnerHTML` with sandboxed `<iframe>` (`allow-same-origin allow-scripts allow-popups allow-forms`)
- [x] **Instagram API info leak fix** — removed `detail: err` from error responses; returns generic "temporarily unavailable" message; uses 502 for upstream failures
- [x] Switched GitHub CLI active account from NadZadR3 → Maxray77 (`gh auth switch`), configured `gh auth setup-git` for push access

- [x] **Rate limiting** — Upstash Redis via `@upstash/ratelimit`: contact 5/hr, newsletter 3/hr, chat 30/hr per IP
- [x] **Persistent storage** — contact submissions + newsletter signups stored in Redis; newsletter dedup via Redis set; graceful fallback to console.log if Redis not configured
- [x] **Razorpay button ID to env var** — reads `NEXT_PUBLIC_RAZORPAY_BUTTON_ID`, falls back to hardcoded ID

**To activate rate limiting + persistent storage (env vars needed):**
- `UPSTASH_REDIS_REST_URL` — from Upstash console or Vercel Marketplace integration
- `UPSTASH_REDIS_REST_TOKEN` — from Upstash console
- `NEXT_PUBLIC_RAZORPAY_BUTTON_ID` — optional, currently falls back to `pl_H4Jwn7xLqMgktI`

**Previously completed (Session 2026-04-07):**
- [x] Added OpenAI API key to Vercel environment variables for Wingman chatbot
- [x] Created `.env.local` in main project root with `OPENAI_API_KEY` for local development
- [x] Added Steppe Eagle hero image to homepage
- [x] Added Black Eared Kite photos to `/special-cases` page
- [x] Cleaned up special cases cards
- [x] Removed "How can I volunteer?" from Wingman suggested questions

**Previously completed (Session 2026-04-06 #4):**
- [x] Replaced "Watch on Max" → "Watch on JioHotstar" on `/all-that-breathes` page
  - Button now links to `https://www.hotstar.com/in/1971000720` (opens new tab)
  - Hero "Streaming on Max" → "Streaming on JioHotstar"
  - FILM_DETAILS.streaming updated to "JioHotstar (India) / Max (US)"
  - Wingman prompt updated with correct streaming info
- [x] Added "WR Annual Report" blog post as featured post on `/blog`
  - PDF-style red gradient placeholder with FileText icon (not generic photo placeholder)
  - Blog detail page shows PDF download banner when `pdfUrl` is set
  - Added `pdfUrl` and `image` optional fields to BlogPost interface
  - **Pending:** Need actual PDF file at `public/wr-annual-report.pdf`
- [x] Removed waving hand emoji (👋) from Wingman callout bubble — now just "Hi! I'm Wingman!"
- [x] Added registered address: "2970, Shah Ganj, Ajmeri Gate, Delhi - 110006, India"
  - Added `registeredAddress` field to `CONTACT` in constants.ts
  - Displayed as "Regd: ..." below Wazirabad address in Footer and Contact page

**Previously completed (Session 2026-04-06 #2):**
- [x] Created `/facility` page — dedicated facility showcase split into two halves:
  - **Clinic & Surgical Suite:** Hero, stats bar (11+ birds/day, 2 theaters, 50+ enclosures, Since 2003), photo placeholder + intro text, 6 equipment/room cards (X-Ray & Imaging, Surgical Theater, Diagnostic Lab, ICU, Pharmacy, Intake & Triage)
  - **Enclosures & Aviary Complex:** Reversed two-column intro, 6 housing type cards (Recovery Cages, Flight Aviaries, Chick Nursery, Raptor Enclosures, Open-Air Conditioning Pens, Permanent Residents)
  - **A Bird's Journey:** 6-step vertical timeline (Arrival → Triage → Treatment → ICU → Rehab → Release)
  - CTA: "Help Us Expand Our Facility" with DonateButton
  - Added to "Our Work" nav dropdown + mobile menu (after "Our Specialty")
  - Added to sitemap.ts
  - Server component, no client-side JS needed
  - Committed and pushed to `main`, auto-deploying to Vercel

**Previously completed (Session 2026-04-06 #1):**
- [x] Replaced homepage founders photo — now Cannes Film Festival tuxedo shot (was two separate rooftop photos stitched together)
  - Source: `C:\Users\maxra\Pictures\N and S\IMG_20220523_175707.jpg`
  - Resized to 1600x1200, saved as `public/founders-combined.jpg`
- [x] Added species image support — `image` and `images` optional fields on Species interface
  - Species listing page shows real photos on cards when available
  - Species detail page shows real photo hero + gallery section when images provided
  - All species without images gracefully fall back to gradient placeholder
  - Shikra data wired up with image paths (awaiting user to save the 2 Shikra photos to `public/species/`)

**Previously completed (Session 2026-04-05):**
- [x] Created `/bird-brothers` page — "Bird Brothers, A Delhi Story" children's illustrated book by Rina Singh & Barkha Lohia
  - Hero with book cover, details grid, Amazon/Publisher CTAs
  - Full synopsis, 4-image illustration gallery with lightbox
  - Awards section (JLG Gold, CCBC Choices, PADIBA, SLJ Starred Review)
  - Reviews (SLJ, Shaunak Sen endorsement, Goodreads)
  - Author & illustrator bios, 6 buy links (Amazon USA/UK, Orca, Indigo, Blackwell's, Target)
  - Connection to Wildlife Rescue section with links to About, Documentary, Donate
  - Added to Media dropdown nav + mobile menu
  - 5 book images copied to `public/bird-brothers/`
- [x] Added "From Our Blog" section on homepage — 3 latest posts with category badges, dates, read times, above Instagram feed
- [x] Added "Connect With Us" social media section below Instagram — branded buttons for Instagram, Facebook, YouTube
- [x] Updated footer 80(G) line: now reads "India: 80(G) Tax Exempt Reg. No. AAATW2352B25DL02" (was "India: 80(G) Tax Exempt | PAN: AAATW2352B")
- [x] Fixed newsletter email input contrast — white background + border so it doesn't blend into teal gradient
- [x] PR open: `claude/hardcore-shirley` → `main`

**Previously completed (Session 2026-04-01 #3):**
- [x] Fixed Wingman callout bubble — now persistent (stays until dismissed or chat opens), no bird icon, sessionStorage dedup so it shows once per browser session, speech bubble tail pointing to button
- [x] Created `Wildlife_Rescue_NotebookLM_Source.md` — comprehensive donor-facing source document for NotebookLM infographic creation

**Previously completed (Session 2026-04-01 #2):**
- [x] Wingman callout bubble — "Hi! I'm Wingman! 👋 / Ask me anything!" appears 1.5s after page load, auto-dismisses after 5s, has × to close, hides when chat opens
- [x] Homepage donation section — ₹ INR / 🇺🇸 USD toggle pill above amount grid
- [x] INR amount buttons now link to `/donate?tab=online` (previously linked to `/donate`, landing on UPI tab)
- [x] USD teaser row (dimmed $10–$100) with "Switch to US$ / 501(c)(3)" link
- [x] Online tab on /donate page — ₹ INR / 🇺🇸 USD toggle; USD view shows $10–$100 amounts + two payment options:
  - "Donate via R3 — Tax-Deductible (501c3)" → raptorrescueusa.org/donate (Recommended badge)
  - "Donate via GoFundMe" → gofund.me/d9df0362
- [x] `/donate?tab=us` deep-link pre-selects the US Donors tab (useSearchParams)
- [x] `DONATION_AMOUNTS_USD` already existed in constants.ts — wired up across homepage + donate page

**Previously completed (Session 2026-04-01 #1):**
- [x] Redesigned "As Featured In" homepage section — dark charcoal background, strong contrast
- [x] Made all 12 media outlet names clickable links to real articles (extracted from CSR PDF)
- [x] Rebuilt /media page with 53 real media articles, interactive filters, Early Years timeline
- [x] Expanded awards to 8 (added Jackson Wild, Peabody, Gotham)
- [x] Deployed to Vercel — live at https://wildlife-rescue-website.vercel.app
- [x] Updated MEDIA_LOGOS in constants.ts from string[] to { name, url }[] with typed links

**Previously completed (Session 2026-03-27):**
- [x] Removed duplicate red "Contact Us" button, removed "24/7 emergency care" mentions
- [x] Added Razorpay payment button, UPI QR code, updated bank/R3 details
- [x] GitHub remote: https://github.com/Maxray77/WR-Website.git
- [x] Vultures conservation page, conditions section (6 pages), species (11 total)
- [x] GoFundMe embed widget + US Donors tab with R3 501(c)(3)
- [x] Netlify auto-deploy: https://wildlife-rescue-preview.netlify.app/

**What's in progress / next step:**
- [ ] Place actual WR Annual Report PDF at `public/wr-annual-report.pdf`
- [x] ~~Place WR CSR Brochure PDF~~ — added `public/wr-brochure.pdf` (17 MB), wired into /about card + Footer Quick Links
- [x] ~~Add real photos to `/facility` page~~ — clinic photos, surgical equipment gallery (7 photos), enclosure gallery (3 photos), aviaries video all added
- [ ] Add real vulture photos to replace 10 placeholders on /vultures page
- [ ] Replace other placeholder images with real photos
- [x] ~~Build dedicated conditions pages with pictures~~ — image support added, septicemia (5 photos) + avian pox (1 photo) wired up
- [ ] Domain setup (raptorrescue.org → Vercel)
- [ ] Add photos for remaining species without images: Blue Rock Pigeon, Indian Grey Hornbill, Rose-ringed Parakeet, Egyptian Vulture
- [ ] Add photos for remaining conditions: cut-wounds, fractures, orphans, other-conditions
- [ ] Refresh `INSTAGRAM_POSTS` in `src/lib/constants.ts` periodically (hand-curated; swap image/caption/permalink + drop photo into `/public`)
- [ ] Update captions for 4 early-days archive photos on `/history` — `early-days-01–04.jpg` currently have generic descriptions; user to advise what each photo shows
- [ ] **Merge `claude/xenodochial-mendeleev-ef9de2` → `main` and deploy** — all 2026-04-22 session commits are on this worktree branch

**Open questions or blockers:**
- [x] ~~Need `OPENAI_API_KEY` in Vercel env vars for Wingman chatbot to work in production~~ — added 2026-04-07
- [ ] Need `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` in Vercel env vars to activate rate limiting + persistent storage (code deployed, just needs env vars)
- [ ] Need WR Annual Report PDF for the blog post download link
- [ ] Need 10 vulture photos for the conservation page
- [ ] Need photos for remaining species without images: Blue Rock Pigeon, Indian Grey Hornbill, Rose-ringed Parakeet, Egyptian Vulture
- [ ] Need photos for remaining 4 condition pages (cut-wounds, fractures, orphans, other-conditions)
- [ ] Facility stats (50+ enclosures, 2 operating theaters) are illustrative — confirm with org
- [ ] What are the 4 early-days photos (IMG_2500, 2572, 2613, 2615) showing? Captions are placeholders pending the user's descriptions.

**Key files touched this session (2026-04-17):**
- `src/app/annual-reports/page.tsx` — replaced simple download section with new Annual Report Archive listing; per-year card with teal header stats, infographic + cover previews, landscape/portrait aspect support, placeholder UI for missing infographics
- `src/lib/annual-reports-data.ts` — **NEW**: data module for archive (`AnnualReport` interface, `ANNUAL_REPORTS` array; fields: `year`, `headline`, `summary`, `infographicImage?`, `infographicPdf?`, `infographicOrientation?`, `coverImage`, `fullReportPdf`, `keyStats?`)
- `src/lib/blog-data.ts` — retitled annual report post to "Wildlife Rescue Annual Report 2025", slug `wr-annual-report-2025`
- `src/lib/species-data.ts` — added `barn-owl-release.mp4` to Barn Owl videos list
- `public/wr-annual-report.pdf` — **NEW**: 2025 detailed report (2.95 MB)
- `public/annual-reports/*` — **NEW directory**: 3 infographics (2020/2022/2025), 4 covers, 4 full report PDFs
- `public/species/barn-owl-release.mp4` — **NEW**: Barn Owl video (33 MB)

**Pending for future sessions:**
- ~~2021 infographic — only the detailed PDF is wired up~~ — DONE (infographic-2021.jpg shipped, wired into data file, live on /annual-reports as of 2026-05-18).
- Earlier years (2019 and before) — append new entries to `ANNUAL_REPORTS` array as they become available
- Barn Owl video (33 MB) is larger than other species videos — compress with ffmpeg when available

**Key files touched previous session (2026-04-16):**
- `src/app/nwra-2025/page.tsx` — **NEW**: NWRA Symposium 2025 presentation page (~441 lines)
- `src/app/report-tagged-bird/page.tsx` — **NEW**: interactive tagged bird reporting form (~500 lines, "use client")
- `src/app/api/report-tagged-bird/route.ts` — **NEW**: API route with FormData handling, validation, rate limiting
- `src/app/page.tsx` — blog card conditional image rendering; hero quote attribution changed to "Nadeem and Saud, Wildlife Rescue"
- `src/app/blog/page.tsx` — conditional image rendering on featured post + grid cards
- `src/app/blog/[slug]/page.tsx` — hero image section between header and PDF download banner
- `src/app/media/page.tsx` — 2025 NWRA entry with title, location, and `link: "/nwra-2025"`
- `src/lib/blog-data.ts` — NEW NWRA blog post (slug `nwra-seattle-2025`), featured
- `src/components/Header.tsx` — added "Report A Tagged Bird" to NAV_ITEMS + MOBILE_LINKS after Contact Us
- `src/app/sitemap.ts` — added `/nwra-2025` (yearly) and `/report-tagged-bird` (monthly)
- `public/nwra-2025/` — **NEW**: 7 compressed photos (speakers-backdrop, stage1-skin-suture, stage1-tplt-emr-sutured, the-fusion-day32, thank-you-01, thank-you-02, networking)

**Key files touched previous session (2026-04-15):**
- `src/app/page.tsx` — added 3rd hero (Avian Pox), replaced hero H1 with ATB quote, rescue cards conditional image rendering
- `src/lib/constants.ts` — extended `FeaturedRescue` with `image`/`imageAlt`, updated 2 rescue cards, added `InstagramPost` interface + `INSTAGRAM_POSTS` array (6 entries)
- `src/components/InstagramFeed.tsx` — rewrote as server component sourcing `INSTAGRAM_POSTS` from constants (no client state, no API)
- `src/app/api/instagram/route.ts` — **DELETED** (API deprecated Dec 2024)
- `next.config.ts` — removed unused Instagram CDN remote patterns
- `src/app/about/page.tsx` — **NEW section**: "Download Our Brochure" CSR card with FileText icon, before final CTA
- `src/components/Footer.tsx` — Quick Links now supports `external` flag; added "CSR Brochure (PDF)" entry opening in new tab
- `public/hero-avian-pox.jpg` — **NEW**: 3rd hero image (174KB, 1920px)
- `public/rescues/barn-owl-group.jpg` — **NEW**: 6 barn owls ready for release (283KB)
- `public/wr-brochure.pdf` — **NEW**: CSR brochure PDF (17 MB)

**Key files touched previous session (2026-04-11 #2):**
- `src/lib/species-data.ts` — added Black Kite photos (hero + 2 gallery), Spotted Owlet gallery photo, Cattle Egret + Painted Stork to Wetland Birds gallery
- `src/lib/conditions-data.ts` — added avian pox photo (image + images fields)
- `src/lib/treatments-data.ts` — added laser therapy big photo, Black Kite drip + painkiller drops to post-treatment care
- `src/app/facility/page.tsx` — added 3 photos to Surgical Suite Equipment gallery (lab, laser surgery, OT table); added "Inside Our Aviaries" 3-photo gallery
- `public/species/black-eared-kite.jpg`, `black-kite-01.jpg`, `black-kite-anesthesia.jpg` — **NEW**: 3 Black Kite photos
- `public/species/spotted-owlet-04.jpg` — **NEW**: Spotted Owlet profile
- `public/species/cattle-egret-01.jpg` — **NEW**: Cattle Egret bandaged
- `public/species/painted-stork-01.jpg` — **NEW**: Painted Stork surgery
- `public/conditions/avian-pox-kite.jpg` — **NEW**: Avian pox lesions
- `public/facility/enclosure-01.jpg`, `enclosure-02.jpg`, `enclosure-03.jpg` — **NEW**: Aviary photos
- `public/facility/lab-02.jpg`, `laser-surgery.jpg`, `ot-table.jpg` — **NEW**: Clinic equipment photos
- `public/treatments/laser-therapy-big.jpg`, `black-kite-drip.jpg`, `painkiller-drops.jpg` — **NEW**: Treatment photos

**Key files touched previous session (2026-04-11 #1):**
- `src/lib/species-data.ts` — added 4 new species (Scops Owl, Steppe Eagle, OHB, Peregrine Falcon); added photos to Spotted Owlet; added `video?` field to Species interface; added Pond Heron video to Wetland Birds
- `src/lib/treatments-data.ts` — **NEW**: treatment data with 5 entries
- `src/app/treatments/page.tsx` — **NEW**: treatments page
- `src/app/species/[slug]/page.tsx` — added video section (muted autoplay loop) between gallery and fun fact
- `src/app/facility/page.tsx` — clinic photo, surgical equipment gallery, aviaries video
- `src/app/page.tsx` — Barn Owl hero image section
- `src/components/Header.tsx` — added /treatments to nav
- `src/app/sitemap.ts` — added /treatments
- `public/species/` — 20+ new photos and videos for species
- `public/treatments/` — 6 treatment photos and videos
- `public/facility/aviaries.mp4` — aviaries video

**Key files touched previous session (2026-04-10 #3):**
- `src/lib/species-data.ts` — added `imagePosition?` to Species interface; added image data for Barn Owl, Wetland Birds, Eagles; position fix for Barn Owl
- `src/app/species/page.tsx` — `imagePosition` style support on listing cards
- `src/app/species/[slug]/page.tsx` — `imagePosition` style support on detail hero
- `public/species/shikra-face.jpg`, `shikra-profile.jpg` — **NEW**: Shikra photos
- `public/species/barn-owl-treatment.jpg` — **NEW**: Barn Owl on exam table
- `public/species/cattle-egret.jpg` — **NEW**: Cattle Egret at clinic
- `public/species/cse-face.jpg`, `cse-treatment.jpg` — **NEW**: Crested Serpent Eagle photos

**Key files touched this session (2026-04-10 #2):**
- `src/lib/conditions-data.ts` — added `image`, `images[]` to septicemia entry
- `src/app/conditions/page.tsx` — real photo gallery support on listing cards
- `src/app/conditions/[slug]/page.tsx` — hero photo, gallery section, case study photo
- `public/conditions/*.jpg` — **NEW**: 5 Barn Owl septicemia photos (77-160KB each)

**Key files touched this session (2026-04-10 #1):**
- `src/middleware.ts` — **NEW**: Security headers + CSRF origin checking middleware
- `src/lib/redis.ts` — **NEW**: Upstash Redis client, rate limiters, storeSubmission helper
- `src/components/Wingman.tsx` — added `isSafeUrl()` URL validation for AI-generated links
- `src/app/api/chat/route.ts` — rate limiting, message count/length limits, error handling
- `src/app/api/contact/route.ts` — rate limiting, Redis storage, type checks, length limits, header injection blocking
- `src/app/api/newsletter/route.ts` — rate limiting, Redis storage + dedup, type check, email length limit
- `src/app/api/instagram/route.ts` — removed error detail exposure, generic error messages
- `src/app/donate/page.tsx` — GoFundMe sandboxed iframe, Razorpay button ID from env var

**Pending assets needed:**
- `public/wr-annual-report.pdf` — WR Annual Report PDF for blog download

---

## Handoff Checklist

Before stopping work:
1. Update the **Current Status** section above
2. Commit and push your branch (`git push`)
3. Share your Claude Code session link with your teammate
4. Note any open PRs in the Current Status above
