# Wildlife Rescue Website — Project Guide

This file is read automatically by Claude Code at the start of every session.
**Update the "Current Status" section before handing off work to a teammate.**

---

## Project Overview

**Site:** Wildlife Rescue — raptorrescue.org
**Organization:** Wildlife Rescue, Delhi, India — the world's largest raptor rescue facility
**Purpose:** Public-facing website for Wildlife Rescue. Covers the organization's mission, team, the Oscar-nominated documentary "All That Breathes", and donation options for Indian and international donors.
**US Sponsor:** Raptor Rescue and Research Inc. (EIN: 87-3289299), 63 Mountain View Drive, Waynesboro, VA 22980

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
    sitemap.ts              # Dynamic sitemap (pages + blog + species)
    about/page.tsx          # About — origin story, mission, team bios
    donate/page.tsx         # Donate — 6-tab interface (UPI, Razorpay, bank, US 501c3, GoFundMe, cheque)
    contact/page.tsx        # Contact — form, map, emergency hotline
    all-that-breathes/      # Documentary — trailer, accolades, streaming, fan art gallery
    our-specialty/          # Surgical techniques, equipment, medical conditions
    special-cases/          # 6 rescue stories with case numbers
    videos/                 # Featured HBO trailer + 8 categorized video cards
    gallery/                # 16-photo masonry grid, category filter, lightbox
    species/
      page.tsx              # Species listing — 8 cards
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
    species-data.ts         # 8 species with full profile data
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
- **No remote** is configured yet — set one up before collaborating:
  ```bash
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

---

## Key Organization Details

- **Website:** raptorrescue.org
- **Address:** C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village, Delhi – 110084, India
- **Phone:** +91 98100 29698
- **Email:** nadeem@raptorrescue.org
- **WhatsApp:** https://wa.me/919810029698
- **Social:** @wildliferescueindia (Instagram), @wildliferescue.in (Facebook)
- **Bank:** HDFC Bank, A/C: Wildlife Rescue, 50200065825498, IFSC: HDFC0001241
- **UPI:** wildliferescue@hdfcbank
- **Razorpay Button ID:** pl_H4Jwn7xLqMgktI
- **GoFundMe:** https://gofund.me/d9df0362
- **Registered:** March 2010, Indian Trusts Act; FCRA 2020
- **80(G) Reg:** AAATW2352B25DL02 | PAN: AAATW2352B

---

## What's Been Built (Phases 1–4 Complete)

- **20 routes**, all working (home, about, donate, contact, documentary, our-specialty, special-cases, videos, gallery, species × 8, annual-reports, media, blog, API endpoints)
- **Wingman AI chatbot** — floating widget, streams responses via AI SDK v6 + OpenAI
- **Razorpay payment button** — embedded HTML on donate page
- **GoFundMe integration** — linked for US$ donors
- **SEO** — meta tags, OG/Twitter cards, JSON-LD, sitemap, robots.txt
- **Accessibility** — skip nav, semantic HTML, loading skeletons

---

## What's Left (Future Work)

- [ ] CMS integration (Sanity.io) to replace static blog/species data
- [ ] Real payment processing (Stripe/Razorpay backend for receipts)
- [ ] Real Instagram API feed (currently placeholder)
- [ ] Newsletter backend (Mailchimp/Resend — currently logs to console)
- [ ] Real photo/video assets to replace placeholders
- [ ] Deploy to Vercel (production)
- [ ] Set up GitHub remote for team collaboration
- [ ] Domain setup (raptorrescue.org)

---

## Current Status

**Last updated by:** Max — 2026-03-27

**What was just completed:**
- [x] Consolidated all work from scattered worktree branches into single `main` branch
- [x] Cleaned up 14 old `claude/*` worktree branches
- [x] Updated CLAUDE.md with comprehensive project guide

**What's in progress / next step:**
- [ ] Set up GitHub remote and push `main` so team can clone
- [ ] Replace placeholder images with real photos
- [ ] Set up Vercel deployment

**Open questions or blockers:**
- [ ] Need GitHub repo URL to set as remote
- [ ] Need `OPENAI_API_KEY` in `.env.local` for Wingman chatbot to work
- [ ] Razorpay button ID (`pl_H4Jwn7xLqMgktI`) — confirm this is the correct production button

**Key files touched recently:**
- `CLAUDE.md` — created comprehensive project guide
- Branch consolidation: all work now on `main`

---

## Handoff Checklist

Before stopping work:
1. Update the **Current Status** section above
2. Commit and push your branch (`git push`)
3. Share your Claude Code session link with your teammate
4. Note any open PRs in the Current Status above
