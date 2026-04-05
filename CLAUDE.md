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
OPENAI_API_KEY=sk-...            # Required for Wingman chatbot
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Optional — Google Analytics 4
```

---

## Git Workflow

- **`main`** — canonical branch with all work (Phases 1–4 + Wingman + latest updates)
- **`master`** — initial Create Next App commit only (legacy, do not use)
- All old `claude/*` worktree branches have been cleaned up
- **Remote:** https://github.com/Maxray77/WR-Website.git
- **Vercel:** https://wildlife-rescue-website.vercel.app (auto-deploys from `main`)

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

- **30+ routes**, all working (home, about, donate, contact, documentary, our-specialty, **vultures**, special-cases, **conditions × 6**, videos, gallery, **species × 11**, annual-reports, media, blog, API endpoints)
- **Wingman AI chatbot** — floating widget, streams responses via AI SDK v6 + OpenAI
- **Razorpay payment button** — embedded HTML on donate page
- **GoFundMe integration** — linked for US$ donors
- **SEO** — meta tags, OG/Twitter cards, JSON-LD, sitemap, robots.txt
- **Accessibility** — skip nav, semantic HTML, loading skeletons

---

## What's Left (Future Work)

- [ ] CMS integration (Sanity.io) to replace static blog/species data
- [ ] Real Instagram API feed (currently placeholder)
- [ ] Newsletter backend (Mailchimp/Resend — currently logs to console)
- [ ] Real photo/video assets to replace placeholders
- [x] ~~Deploy to Vercel (production)~~ — live at wildlife-rescue-website.vercel.app
- [ ] Add real vulture photos (10 placeholders on /vultures page)
- [ ] Domain setup (raptorrescue.org → Vercel)
- [ ] CMS integration (Sanity.io) to replace static blog/species data

---

## Current Status

**Last updated by:** Claude Code — 2026-04-05

**What was just completed (Session 2026-04-05):**
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
- [ ] Add real vulture photos to replace 10 placeholders on /vultures page
- [ ] Replace other placeholder images with real photos
- [ ] Correct Google Maps location to F239-92E2
- [ ] Build dedicated conditions page with pictures for each condition
- [ ] Domain setup (raptorrescue.org → Vercel)

**Open questions or blockers:**
- [ ] Need `OPENAI_API_KEY` in Vercel env vars for Wingman chatbot to work in production
- [ ] Need 10 vulture photos for the conservation page
- [ ] Need real photos for species and condition pages

**Key files touched this session:**
- `src/app/page.tsx` — blog preview section, social media section, new imports (blog-data, CONTACT, icons)
- `src/components/Footer.tsx` — 80(G) registration number update
- `src/components/NewsletterSignup.tsx` — email input contrast fix (white bg + border)

---

## Handoff Checklist

Before stopping work:
1. Update the **Current Status** section above
2. Commit and push your branch (`git push`)
3. Share your Claude Code session link with your teammate
4. Note any open PRs in the Current Status above
