# Wildlife Rescue Website — Handoff Guide

**Last updated:** April 29, 2026 (evening)
**Status:** Phases 1–4 complete + Wingman AI chatbot + security hardening + content corrections (31+ routes, all working). All 2026-04-29 session commits live on Vercel.
**Live site:** https://wildlife-rescue-website.vercel.app
**Repository:** `C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website`
**Branch:** `main`

---

## 🆕 What changed on 2026-04-29 evening (content corrections)

- **Antigravity design brief** drafted at `docs/ANTIGRAVITY-DESIGN-BRIEF.md` (commit `19eb598`). Self-contained doc the user is sharing with Google Antigravity to get cosmetic redesign proposals. Covers org context, tech stack + hard constraints, brand tokens, full site map, page-by-page layouts, 3-direction proposal request.
- **Avian Pox** (`/conditions/avian-pox`) corrected — commits `f09fbce`, `5cb4768`:
  - Removed all wet-form / dry-form distinction (we don't see wet form in our caseload)
  - Now framed as juvenile-only, ~60 cases/year (was ~300/year, ~8% of intake)
  - Listing card headline reads "Juveniles only"; description rewritten to explain adult immunity
  - Added optional `percentageLabel` field on `Condition` interface so future conditions can override the default "of cases" label
- **Recovery-rate scrubbed site-wide** (commit `6e596d0`):
  - Field removed from `Condition` interface
  - All 6 condition entries no longer carry a `recoveryRate`
  - Listing card and detail page hero — recovery-rate stat blocks removed; `avgRecoveryTime` is the third stat now
  - `/treatments` highlights bar — "Recovery Rate ~65%" replaced with "Birds Treated Since 2010 — 38,500+"
  - NWRA blog post bullet rewritten to drop the "60% → 80%" stat
  - Plan doc updated to note no-public-rate policy
  - Verified zero `recovery rate` / `recoveryRate` matches in `src/` or `docs/`
- **Methane & Chemical Burns** (`/conditions/methane-burns`) — `~2%` → `<1%`, `~75/year` → `~30/year`
- **Septicemia** (`/conditions/septicemia`):
  - Renamed from "Septicemia & Infections" → just "Septicemia" (commit `e6435b7`)
  - Percentage corrected through two iterations: ~10% → ~4% → **~2.5%** (final, commit `876b957`)
  - annualCases: ~370 → ~150 → **~95/year** (final)
  - Slug retained for link stability

---

## 🕰️ What changed on 2026-04-29 morning (facility split + planning)

- **`/facility` split into two independent pages: `/clinic` and `/enclosures`** (commit `14481fe`)
  - Both pages get heavily expanded promotional content reflecting them as core organisational strengths.
  - **`/clinic`** — "South Asia's Most Advanced Avian Clinic". 9 equipment cards (X-Ray, Modern OT, Ultrasonic Bone Cutter, Surgical Laser, Diagnostic Lab, ICU, Pharmacy, Triage, Surgical Microscopy), 11-image equipment gallery, 5-step clinical journey ending with handoff to aviaries.
  - **`/enclosures`** — "Where Rescued Birds Become Wild Again". 6 housing types, NEW design-principles section (Low-Stress Design / Hygiene / Behavioural Enrichment), aviary photo gallery, 6-step rehab journey.
  - **Wiring:** Header dropdown ("Our Work") replaces "Our Facility" with "Our Clinic" + "Bird Enclosures" (desktop + mobile). `next.config.ts` adds 301 redirect `/facility → /clinic` for SEO + old inbound links. Sitemap updated. `/history` and `/treatments` inbound links repointed.
  - Image folder `/public/facility/*` retained — only the route changed, not the assets.
- **Plan saved for `/our-specialty` expansion + new `/our-specialty/wing-repair` page** at `docs/PLAN-our-specialty-expansion.md` (commit `dcc454b`). Awaiting user to collect: X-rays, NWRA presentation slides, anatomy diagrams. Decision logged: do **not** use Blender for anatomy diagrams — use NWRA slides + Wikimedia CC-licensed diagrams instead.

**Active pending tasks:**
- `/our-specialty` expansion + `/our-specialty/wing-repair` page — see `docs/PLAN-our-specialty-expansion.md`. Waiting on assets.
- "How We Prepare for Kite-Flying Season" post body still describes monsoon electrocutions — content rewrite needed if topic is meant to actually shift.

---

## 🕰️ What changed on 2026-04-28

- **Scaling Avian Impact 2025 report** wired into the existing "2025: Our Biggest Year Ever — 4,184 Birds Rescued" blog post (slug `record-breaking-2025`).
  - Source PDF: `C:/Users/maxra/Downloads/Scaling_Avian_Impact.pdf` → `public/scaling-avian-impact.pdf` (13.5 MB)
  - Cover image: page 1 rendered to JPG → `public/scaling-avian-impact-cover.jpg` (158 KB, 1800px)
  - Surfaces on: homepage "From Our Blog" card, `/blog` listing card, `/blog/record-breaking-2025` (hero + PDF download banner)
  - Commit `e171a74`
- **Blog title retitled** — "How We Prepared for Monsoon Season 2025" → "How We Prepare for Kite-Flying Season"
  - Slug retained (`monsoon-2025-preparedness`) so existing links don't break
  - **Body content unchanged** — still describes monsoon electrocutions; needs rewrite if the topic is meant to actually shift to kite-flying-season manja injuries
  - Commit `9235da4`

**PDF→JPG toolchain refresher:**
- Workspace: `C:/Users/maxra/AppData/Local/Temp/pdfconv2/` (`pdfjs-dist` + `@napi-rs/canvas`)
- Script: `convert.mjs` — `node convert.mjs IN.pdf OUT.jpg [pageNum] [scale]`
- Compress with `npx sharp-cli -i raw.jpg -o out.jpg -q 86 -f jpeg resize 1800 --withoutEnlargement`
- Wires wasmUrl correctly to handle JPEG2000-encoded PDF images

---

## 🔒 Security Snapshot — April 21, 2026

All major headers are set, dependency CVEs patched, API routes have CSRF + rate-limiting. See `CLAUDE.md` "Current Status" for the full table.

**Latest security commits on `main`:**
- `7976ab1` — add Content-Security-Policy header
- `92111d6` — upgrade Next.js 16.1.6 → 16.2.4 (patches 6 high CVEs incl. null-origin CSRF bypass)

**Next security-adjacent tasks (all free, none urgent):**
1. Wire raptorrescue.org → Vercel (still GoDaddy parking page)
2. Rename `src/middleware.ts` → `src/proxy.ts` (Next.js 16 convention; warning only)
3. Enable Vercel Firewall + verify GitHub Dependabot in Settings → Security
4. After custom domain is live: add `preload` to HSTS and submit to hstspreload.org

**Do NOT buy** WordPress-era security products (Sucuri, Wordfence, SiteLock). They don't apply to this stack. Vercel's built-ins + free tier of Cloudflare cover everything at this traffic level. See CLAUDE.md for the full rationale.

---

## Quick Start

```bash
cd "C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website"
npm install
npm run dev
# → http://localhost:3000
```

**Environment variables:**
```
OPENAI_API_KEY=sk-...            # Required for Wingman chatbot (OpenAI GPT-4o-mini)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Optional — Google Analytics 4 Measurement ID
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage — hero, stats, rescues, Instagram, newsletter
│   ├── layout.tsx            # Root layout — fonts, header, footer, GA4, JSON-LD, skip nav
│   ├── globals.css           # Tailwind v4 theme (@theme inline) + custom utilities + bird animation
│   ├── loading.tsx           # Root loading skeleton
│   ├── robots.ts             # robots.txt generation
│   ├── sitemap.ts            # Dynamic sitemap (static pages + blog + species)
│   ├── about/page.tsx        # About — origin story, mission, team bios
│   ├── donate/page.tsx       # Donate — 8-tab interface (UPI, bank, US 501c3, GoFundMe, cheque, 80G cert, 501c3 cert)
│   ├── contact/page.tsx      # Contact — uses ContactForm component, map, office hours, getting here
│   ├── all-that-breathes/    # Documentary page — trailer, accolades, streaming
│   ├── our-specialty/        # Surgical techniques, equipment, medical conditions
│   ├── special-cases/        # 6 rescue stories with case numbers
│   ├── videos/               # Featured HBO trailer + 8 categorized video cards
│   ├── gallery/              # 16-photo masonry grid, category filter, lightbox
│   ├── species/
│   │   ├── page.tsx          # Species listing — 8 cards
│   │   ├── loading.tsx       # Species loading skeleton
│   │   └── [slug]/page.tsx   # Dynamic species profiles (habitat, diet, threats, etc.)
│   ├── annual-reports/       # Intake chart, financial tables, growth phases
│   ├── media/                # Awards timeline, press coverage, press kit
│   ├── conditions/           # Medical conditions pages
│   ├── blog/
│   │   ├── page.tsx          # Blog listing — featured post + grid
│   │   └── [slug]/page.tsx   # Dynamic blog posts with markdown-like rendering
│   └── api/
│       ├── chat/route.ts     # POST — Wingman AI chatbot streaming endpoint (AI SDK v6 + OpenAI)
│       ├── contact/route.ts  # POST — validates & logs contact form submissions
│       └── newsletter/route.ts # POST — validates & logs email subscriptions
├── components/
│   ├── Header.tsx            # Sticky header with dropdown nav ("Our Work", "Media")
│   ├── Footer.tsx            # 4-column footer with newsletter, PAN number in bottom bar
│   ├── Wingman.tsx           # Floating AI chatbot widget (bottom-RIGHT corner, bird faces left, animated)
│   ├── DonateButton.tsx      # Reusable CTA button
│   ├── SectionHeading.tsx    # Consistent section titles
│   ├── ImpactCounter.tsx     # Animated stat counters (client component)
│   ├── NewsletterSignup.tsx  # Banner + inline variants, wired to /api/newsletter
│   ├── InstagramFeed.tsx     # 6-post grid with hover overlays (@wildliferescueindia)
│   ├── ContactForm.tsx       # Contact form, wired to /api/contact
│   ├── JsonLd.tsx            # Organization + WebSite structured data
│   └── SkipNav.tsx           # Accessibility skip-to-content link
├── lib/
│   ├── constants.ts          # IMPACT_STATS, RESCUE_BY_YEAR, CONTACT, social links, BANK_DETAILS
│   ├── metadata.ts           # Site-wide SEO metadata
│   ├── wingman-prompt.ts     # Wingman system prompt — full WR knowledge base
│   ├── species-data.ts       # 8 species with full profile data
│   ├── conditions-data.ts    # Medical conditions data
│   └── blog-data.ts          # 5 blog posts (static — replace with CMS)
└── public/
    ├── 80g-certificate.pdf   # 80(G) tax exemption certificate
    └── 501c3-certificate.pdf # 501(c)(3) determination letter
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16 (App Router) | `next@canary` — uses async `params` in dynamic routes |
| Styling | Tailwind CSS v4 | CSS-based config via `@theme inline` in `globals.css`. NO `tailwind.config.ts` |
| Icons | lucide-react | Tree-shakeable, consistent with design |
| Animations | framer-motion + CSS | framer-motion for ImpactCounter; CSS keyframes for Wingman bird animation |
| AI Chatbot | AI SDK v6 + OpenAI | `ai@^6`, `@ai-sdk/react@^3`, `@ai-sdk/openai@^3`. GPT-4o-mini |
| Analytics | GA4 | Set `NEXT_PUBLIC_GA_ID` env var. Script in layout.tsx |
| Fonts | Inter (body) + Poppins (headings) | Google Fonts via `next/font` |
| Deployment | Vercel | Production deploy via `npx vercel --prod` |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-teal` | `#0A6E5C` | Primary brand, buttons, links |
| `--color-teal-dark` | `#064E41` | Dark backgrounds, gradients |
| `--color-teal-light` | `#E8F5F1` | Light backgrounds, hover states |
| `--color-amber` | `#E8A317` | CTA buttons, accents, awards |
| `--color-amber-light` | `#F5D060` | Hover state for amber |
| `--color-charcoal` | `#1A1A2E` | Text, dark sections |
| `--color-danger` | `#DC2626` | Emergency, warnings |
| `--color-success` | `#16A34A` | Released status, positive |

---

## Recent Changes (April 22, 2026 — Evening Session)

### Photo additions ✅
- **Black Naped Ibis** → Wetland Birds gallery (`public/species/black-naped-ibis-01.jpg`, 129KB)
- **Black Kite recovery** → Black Kite gallery — post-anesthesia recovery after manja wing repair (`black-kite-recovery.jpg`, 149KB)
- **Black Kite clinic** → Black Kite gallery (`black-kite-02.jpg`, 141KB)
- **Spotted Owlet 05** → Spotted Owlet gallery (`spotted-owlet-05.jpg`, 107KB)
- **Crane** → Wetland Birds gallery (`crane-01.jpg`, 124KB)
- **Baby Spotted Owlet** → lead photo in "Orphan & Chick Rehabilitation" on `/treatments` (`baby-spotted-owlet.jpg`, 119KB)
- **Sultan the Egyptian Vulture** (`egyptian-vulture-01.jpg`, 157KB) → three locations: homepage Featured Rescues card, `/species/egyptian-vulture` hero + gallery, `/conditions/septicemia` gallery. Sultan's summary updated to mention septicemia.

### Bug fixes ✅
- **"Wetland Birdss" double-s** — species CTA heading pluralisation fixed in `species/[slug]/page.tsx` (names ending in 's' no longer get extra 's')
- **Black Eared Kite hero rotated** — `public/species/black-eared-kite.jpg` rotated 90° CCW
- **Methane burns condition** — wrong Black Eared Kite image removed as hero; `IMG_4635.JPG` compressed to `methane-burn-hero.jpg` (160KB) set as correct hero; `methane-burn-02.jpg` rotated 90° CCW; duplicate hero removed from gallery

### All merged & deployed ✅
- Worktree `claude/xenodochial-mendeleev-ef9de2` merged to `main` — all changes live on Vercel

### Still pending
- Update captions for `early-days-01–04.jpg` on `/history` — user to describe what each photo shows
- Add vulture photos (10 placeholders on `/vultures`)
- Add photos for: Indian Grey Hornbill, Rose-ringed Parakeet (no images yet)

---

## Recent Changes (April 22, 2026 — Morning Session)

### Nest Entanglement Special Case ✅
- New rescue case #37,958 added as first entry on `/special-cases` — Black Kite juvenile trapped in manja thread woven into its own nest by parents
- 2 photos (`public/cases/nest-entangled-01.jpg`, `nest-entangled-02.jpg`, ~102KB each), converted from Canon RAW (CR2)

### Founder Photos on /about ✅
- Real portraits of Mohammad Saud (`public/team/saud.jpg`) and Nadeem Shehzad (`public/team/nadeem.jpg`) now appear on team cards
- `TEAM` entries in `constants.ts` have `image` field; about page renders real photo or initials fallback

### /history Page — "Our Early Days" ✅ (NEW)
- New route at `/history` — archive page for the founding story and early operations
- Centrepiece: motorbike ambulance photo with prose about the pre-clinic years
- 4-photo archive grid from early CR2 camera roll
- Added to **Media** nav dropdown, mobile menu, and sitemap

### Peregrine Falcon Gallery ✅
- Added `public/species/peregrine-falcon-04.jpg` (224KB) as 5th gallery image on `/species/peregrine-falcon`

---

## Recent Changes (April 6, 2026 Session)

### Founders Photo ✅
- Replaced homepage founders photo with **Cannes Film Festival tuxedo shot** of Nadeem & Saud
- Source: `C:\Users\maxra\Pictures\N and S\IMG_20220523_175707.jpg`, resized to 1600x1200

### Species Image Support ✅
- Added optional `image` and `images` fields to `Species` interface in `species-data.ts`
- Species listing page and detail page now show real photos when available (fallback to gradient placeholder)
- Shikra data wired up — **pending:** user needs to save 2 Shikra photos to `public/species/`

---

## Recent Changes (April 5, 2026 Session)

### Bird Brothers Book Page ✅ (NEW)
- **New route:** `/bird-brothers` — dedicated page for "Bird Brothers, A Delhi Story" children's illustrated book
- **Author:** Rina Singh | **Illustrator:** Barkha Lohia | **Publisher:** Orca Book Publishers (Aug 2025)
- **8 sections:** Hero with cover, Synopsis, Illustration gallery (4 images + lightbox), Awards (JLG Gold, CCBC Choices, PADIBA, SLJ Starred Review), Reviews (SLJ, Shaunak Sen, Goodreads), Author/Illustrator bios, Buy links (Amazon USA/UK, Orca, Indigo, Blackwell's, Target), Connection to Wildlife Rescue
- **5 images** in `public/bird-brothers/` (cover, delhi-skyline, hospital-scene, injured-kite, caring-for-bird)
- Added to **Media** dropdown nav + mobile menu

### Homepage Enhancements ✅
- **Blog preview section** — 3 latest posts with category badges, dates, read times (above Instagram feed)
- **Social media section** — "Connect With Us" with branded Instagram, Facebook, YouTube buttons (below Instagram)
- **Newsletter email input** — fixed contrast (white background + border against teal gradient)

### Footer Update ✅
- 80(G) line now reads: "India: 80(G) Tax Exempt Reg. No. AAATW2352B25DL02"

---

## Recent Changes (March 31, 2026 Session)

### Vercel Production Deployment ✅
- Moved from Netlify static preview to **Vercel production** deployment
- All API routes, SSR, streaming, and Wingman chatbot now fully functional
- Auto-deploy enabled from GitHub `main` branch
- Live at: https://wildlife-rescue-website.vercel.app

### 80(G) and 501(c)(3) Certificate Pages ✅
- **Two new tabs** added to donate page: "80(G) Certificate" and "501(c)(3) Certificate"
- Each tab shows: key details table, embedded PDF viewer (80vh height), download button
- PDFs added to `public/` directory: `80g-certificate.pdf`, `501c3-certificate.pdf`
- **"Your Trust Matters" cards** made clickable — 80(G) and 501(c)(3) cards scroll to and activate their respective certificate tabs

### Footer Update ✅
- Added **PAN: AAATW2352B** next to "India: 80(G) Tax Exempt" in footer bottom bar

### Contact Page Updates ✅
- **Google Maps** — Updated embed URL from hardcoded coordinates to address-based query pointing to correct Wazirabad Village location
- **Getting Here** — Updated directions: Nearest Metro changed to "Jagatpur - Wazirabad (Pink Line)", landmark changed to "Signature Bridge"
- **Office Hours** — Updated to **10:00 AM – 8:00 PM** (was 6:00 PM)

### Wingman Chatbot Updates ✅
- **Positioned bottom-right**, bird icon **faces left** (flipped via `-scale-x-100`)
- **Bird animation** — 4 bird-like CSS animation movements on 3.5s loop: head tilt left, head tilt right, hop up, quick peck
- **Office hours** updated in `wingman-prompt.ts` to match (10 AM – 8 PM)

---

## Key Gotchas

1. **Tailwind v4** uses `@theme inline` in `globals.css`, NOT `tailwind.config.ts`. All custom colors/spacing defined there.
2. **Server Components** can't have `onClick`, `onSubmit`, etc. Use `"use client"` directive. Interactive forms are extracted to client components.
3. **Next.js 16** dynamic route `params` are async — must `await params` in page components.
4. **No real images yet** — all pages use gradient placeholders with descriptive text. Replace with actual photos using Next.js `<Image>` component.
5. **API routes are dev-only** — `/api/contact`, `/api/newsletter` log to console and store in memory.
6. **Wingman chatbot** — Requires `OPENAI_API_KEY` env var. Widget renders on every page but chat won't work without the key.
7. **Wingman knowledge base** — If site content changes, update `src/lib/wingman-prompt.ts` to keep the chatbot accurate.
8. **Bird animation** — Defined in `globals.css` as `@keyframes bird-idle`, applied via `.animate-bird-idle` class in `Wingman.tsx`.
9. **Certificate PDFs** — Stored in `public/` directory. If certificates are renewed, replace the PDF files (keep same filenames).

---

## What's Done (All Phases)

### Phase 1 — Core Pages ✅
- Home, About, Donate, Contact, All That Breathes

### Phase 2 — Content Pages ✅
- Our Specialty, Special Cases, Videos, Gallery, Species, Annual Reports

### Phase 3 — Enhancements ✅
- Media & Press, Newsletter, Instagram feed, GA4, Header redesign

### Phase 4 — Backends, Blog, SEO ✅
- API routes, Blog, Sitemap, JSON-LD, Loading skeletons, Accessibility

### Wingman AI Chatbot ✅
- Floating chat widget (bottom-right, bird faces left, animated)
- AI SDK v6 + OpenAI GPT-4o-mini streaming
- Comprehensive knowledge base, suggested questions, conversation reset

### Website Updates ✅ (March 25, 2026)
- Logo, team bios, 106+ species, 2026 intake data, office hours, nav updates

### Donate & Certificate Updates ✅ (March 31, 2026)
- Bank details (HDFC), UPI QR code, Razorpay button
- 80(G) and 501(c)(3) certificate viewer tabs with PDF embeds
- Trust cards linked to certificate tabs
- PAN number in footer

### Contact & Wingman Updates ✅ (March 31, 2026)
- Correct Google Maps location (address-based query for Wazirabad Village)
- Updated directions (Pink Line metro, Signature Bridge)
- Office hours: 10 AM – 8 PM
- Wingman moved to left, bird animation added

---

## What's Left (Phase 5 — Production Readiness)

### High Priority
1. **Real photo/video assets** — Replace gradient placeholders with actual images
2. **Production form backends** — Replace in-memory API routes with real services (Formspree, SendGrid, Mailchimp)
3. **Custom domain** — Point raptorrescue.org to Vercel deployment
4. **YouTube channel URL** — Currently placeholder `#` in constants.ts
5. **Team member bios & photos** — 6 of 9 team slots are placeholders

### Medium Priority
6. **CMS (Sanity.io)** — For staff-managed content: blog posts, rescue stories, gallery
7. **Instagram API** — Replace placeholder InstagramFeed with live API data
8. **Switch chatbot to AI Gateway** — Use Vercel AI Gateway for cost tracking + failover instead of direct OpenAI key

### Lower Priority
9. **i18n** — Hindi translation
10. **Email templates** — HTML email for form confirmations
11. **Custom error pages** — 404 and 500 matching site design

---

## Deployment

### Current: Vercel (production)
- **URL:** https://wildlife-rescue-website.vercel.app
- **Method:** `npx vercel --prod` or auto-deploy from GitHub
- **All features work:** API routes, SSR, streaming, Wingman chatbot

### To redeploy manually:
```bash
cd "C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website"
npx vercel --prod --yes
```

---

## Git History (Recent)

```
(pending)  feat: add certificate pages, update contact/footer/wingman, deploy to Vercel
05a3040  chore: disable Netlify auto-deploy to save free-tier credits
52021fc  docs: update CLAUDE.md with current session status
cce63f6  fix: update R3 address to 351 E 50th St, New York, NY 10022
8f31940  fix: update UPI tip to include Name, Address, PAN for 80(G) receipt
1415ff1  feat: generate UPI QR code for wildliferescue@hdfcbank
cbe8fbf  fix: revert UPI ID back to wildliferescue@hdfcbank
3f582a3  feat: add UPI QR code, fix Razorpay button, remove USD toggle
d2820e7  fix: update bank details to correct HDFC account
2ef46b7  feat: add Razorpay payment button to Online donation tab
487fa3d  fix: remove 24/7 emergency care mentions, clean up emergency hotline refs
```

---

## For New Team Members / Claude Sessions

If picking this up in a new Claude session, say:

> "I'm continuing the Wildlife Rescue website project. Read HANDOFF.md in the project root. The site is deployed on Vercel at https://wildlife-rescue-website.vercel.app. The code is in `C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website` on the `main` branch. Set OPENAI_API_KEY in .env.local to test the Wingman chatbot."

This gives full context to continue seamlessly.
