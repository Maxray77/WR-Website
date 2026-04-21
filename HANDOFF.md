# Wildlife Rescue Website — Handoff Guide

**Last updated:** April 21, 2026
**Status:** Phases 1–4 complete + Wingman AI chatbot + security hardening (Next.js 16.2.4, CSP, CSRF, rate limiting). 30+ routes, all working.
**Live site:** https://wildlife-rescue-website.vercel.app
**Repository:** `C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website`
**Branch:** `main`

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
