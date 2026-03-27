# Wildlife Rescue Website — Handoff Guide

**Last updated:** March 23, 2026
**Status:** Phases 1–4 complete + Wingman AI chatbot. 21 routes, all working. 45+ source files.
**Live preview:** https://wildlife-rescue-preview.netlify.app
**Branches:** `claude/stoic-shirley` (Phases 1–4), `claude/clever-khayyam` (+ Wingman chatbot)
**Backup:** `C:\Users\maxra\Documents\Code\WR Website\`

---

## Quick Start

```bash
cd "C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website\.claude\worktrees\stoic-shirley"
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
│   ├── globals.css           # Tailwind v4 theme (@theme inline) + custom utilities
│   ├── loading.tsx           # Root loading skeleton
│   ├── robots.ts             # robots.txt generation
│   ├── sitemap.ts            # Dynamic sitemap (static pages + blog + species)
│   ├── about/page.tsx        # About — origin story, mission, team bios
│   ├── donate/page.tsx       # Donate — 6-tab interface (UPI, bank, US 501c3, etc.)
│   ├── contact/page.tsx      # Contact — uses ContactForm component, map, emergency hotline
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
│   ├── volunteer/            # 6 role cards, application form wired to API, FAQ
│   ├── blog/
│   │   ├── page.tsx          # Blog listing — featured post + grid
│   │   └── [slug]/page.tsx   # Dynamic blog posts with markdown-like rendering
│   └── api/
│       ├── chat/route.ts     # POST — Wingman AI chatbot streaming endpoint (AI SDK v6 + OpenAI)
│       ├── contact/route.ts  # POST — validates & logs contact form submissions
│       ├── volunteer/route.ts # POST — validates & logs volunteer applications
│       └── newsletter/route.ts # POST — validates & logs email subscriptions
├── components/
│   ├── Header.tsx            # Sticky header with dropdown nav ("Our Work", "Media")
│   ├── Footer.tsx            # 4-column footer with newsletter inline
│   ├── Wingman.tsx           # Floating AI chatbot widget (bottom-right corner)
│   ├── DonateButton.tsx      # Reusable CTA button
│   ├── SectionHeading.tsx    # Consistent section titles
│   ├── ImpactCounter.tsx     # Animated stat counters (client component)
│   ├── NewsletterSignup.tsx  # Banner + inline variants, wired to /api/newsletter
│   ├── InstagramFeed.tsx     # 6-post grid with hover overlays (@wildliferescueindia)
│   ├── ContactForm.tsx       # Contact form, wired to /api/contact
│   ├── JsonLd.tsx            # Organization + WebSite structured data
│   └── SkipNav.tsx           # Accessibility skip-to-content link
└── lib/
    ├── constants.ts          # IMPACT_STATS, RESCUE_BY_YEAR, CONTACT, social links
    ├── metadata.ts           # Site-wide SEO metadata
    ├── wingman-prompt.ts     # Wingman system prompt — full WR knowledge base
    ├── species-data.ts       # 8 species with full profile data
    └── blog-data.ts          # 5 blog posts (static — replace with CMS)
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16 (App Router) | `next@canary` — uses async `params` in dynamic routes |
| Styling | Tailwind CSS v4 | CSS-based config via `@theme inline` in `globals.css`. NO `tailwind.config.ts` |
| Icons | lucide-react | Tree-shakeable, consistent with design |
| Animations | framer-motion | Installed but used sparingly (ImpactCounter) |
| AI Chatbot | AI SDK v6 + OpenAI | `ai@^6`, `@ai-sdk/react@^3`, `@ai-sdk/openai@^3`. GPT-4o-mini |
| Analytics | GA4 | Set `NEXT_PUBLIC_GA_ID` env var. Script in layout.tsx |
| Fonts | Inter (body) + Poppins (headings) | Google Fonts via `next/font` |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-teal` | `#0A6E5C` | Primary brand, buttons, links |
| `--color-teal-dark` | `#084D40` | Dark backgrounds, gradients |
| `--color-teal-light` | `#E8F5F0` | Light backgrounds, hover states |
| `--color-amber` | `#E8A317` | CTA buttons, accents, awards |
| `--color-amber-light` | `#F0B429` | Hover state for amber |
| `--color-charcoal` | `#1A1A2E` | Text, dark sections |
| `--color-danger` | `#DC2626` | Emergency, warnings |
| `--color-success` | `#16A34A` | Released status, positive |

---

## Key Gotchas

1. **Tailwind v4** uses `@theme inline` in `globals.css`, NOT `tailwind.config.ts`. All custom colors/spacing defined there.
2. **Server Components** can't have `onClick`, `onSubmit`, etc. Use `"use client"` directive. Interactive forms are extracted to client components (`ContactForm.tsx`, `NewsletterSignup.tsx`).
3. **Next.js 16** dynamic route `params` are async — must `await params` in page components (see `species/[slug]/page.tsx`, `blog/[slug]/page.tsx`).
4. **No real images yet** — all pages use gradient placeholders with descriptive text. Replace with actual photos using Next.js `<Image>` component.
5. **Video trailers are live** — The official HBO "All That Breathes" trailer (`GoTlULspDyY`) is embedded on the homepage, All That Breathes page, and Videos page.
6. **API routes are dev-only** — `/api/contact`, `/api/volunteer`, `/api/newsletter` log to console and store in memory. Each has TODO comments showing how to wire to Formspree, Mailchimp, etc.
7. **Instagram** — Currently shows placeholder grid. Account is `@wildliferescueindia`. Needs real Instagram API integration for live feed.
8. **Donate page** shows payment info but has no payment processing (Stripe/Razorpay not integrated yet).
9. **Blog posts are static** — stored in `lib/blog-data.ts`. Replace with CMS (Sanity.io) queries when ready.
10. **Static export for Netlify** — API routes (including `/api/chat`) must be temporarily disabled for Netlify deploys. See Deployment section below.
11. **Wingman chatbot** — Requires `OPENAI_API_KEY` env var. The widget renders on every page but chat won't work without the key. For Netlify static deploys, the chatbot API route won't work — it needs a server runtime (Vercel or self-hosted).
12. **Wingman knowledge base** — If site content changes (new species, updated stats, new team members), update `src/lib/wingman-prompt.ts` to keep the chatbot accurate.

---

## Social Links (Current)

| Platform | URL | File |
|----------|-----|------|
| Instagram | https://www.instagram.com/wildliferescueindia | `constants.ts`, `InstagramFeed.tsx`, `JsonLd.tsx` |
| Facebook | https://facebook.com/wildliferescue.in | `constants.ts` |
| YouTube | `#` (placeholder) | `constants.ts` |
| WhatsApp | https://wa.me/919810029698 | `constants.ts` |

---

## What's Done (Phases 1–4)

### Phase 1 — Core Pages ✅
- Home (hero, stats, featured rescues, documentary section, Instagram feed, newsletter)
- About (origin story, mission, 6 team bios, values)
- Donate (6-tab interface: UPI, bank transfer, US donors, GoFundMe, monthly, corporate)
- Contact (form wired to API, Google Maps embed, emergency hotline, visiting hours)
- All That Breathes (trailer embed, accolades, streaming links)

### Phase 2 — Content Pages ✅
- Our Specialty (5 technique/equipment cards, medical conditions breakdown)
- Special Cases (6 detailed rescue stories with case numbers)
- Video Clips (featured HBO trailer + 8 categorized videos)
- Photo Gallery (16 photos, masonry grid, category filter, lightbox)
- Species (8 species listing + dynamic profile pages with habitat/diet/threats/fun facts)
- Annual Reports (intake bar chart 2010–2025, financial tables, expenditure breakdown, 5 growth phases)

### Phase 3 — Enhancements ✅
- Media & Press (awards timeline, 8 press cards, press kit section)
- Volunteer (6 roles with requirements, application form wired to API, 5 FAQs)
- Newsletter component (reusable, banner + inline variants, wired to API)
- Instagram feed component (6-post grid, homepage integration, @wildliferescueindia)
- GA4 analytics + Open Graph + Twitter Card meta tags
- Header redesign (dropdown menus for "Our Work" and "Media")

### Wingman AI Chatbot ✅ (added March 23, 2026)
- **Floating chat widget** — bird icon in bottom-right corner, opens chat panel
- **Powered by AI SDK v6 + OpenAI GPT-4o-mini** — streaming responses via `/api/chat`
- **Comprehensive knowledge base** in `src/lib/wingman-prompt.ts` — knows about the organization, all 8 species, donation methods (INR + USD), volunteering, the documentary, contact info, and emergency bird rescue instructions
- **UI features:** suggested quick questions, typing indicator, conversation reset, keyboard support (Enter to send), inline bold/link formatting
- **Branded:** uses teal/amber color scheme matching the site design
- **Requires:** `OPENAI_API_KEY` in `.env.local` — without it the chatbot widget appears but responses will fail
- **Future:** Can switch from direct OpenAI to Vercel AI Gateway for cost tracking + failover when deploying to Vercel

### Phase 4 — Backends, Blog, SEO, Performance, Accessibility ✅
- **API routes:** `/api/contact`, `/api/volunteer`, `/api/newsletter` — validation, error handling, dev logging
- **Frontend wiring:** ContactForm, Volunteer form, and NewsletterSignup all POST to API with loading/error/success states
- **Blog:** `/blog` listing (featured + grid) + `/blog/[slug]` detail pages. 5 starter posts. "More Posts" related section.
- **SEO:** `sitemap.ts` (all pages + blog + species), `robots.ts`, JSON-LD Organization + WebSite schemas
- **Performance:** Loading skeletons for root and species pages
- **Accessibility:** SkipNav component, `id="main-content"`, `role="main"`

---

## What's Left (Phase 5 — Production Readiness)

### High Priority
1. **Real photo/video assets** — Replace all gradient placeholders with actual images. Use Next.js `<Image>` component for optimization. See CONTENT-GUIDE.md for step-by-step instructions.
2. **Stripe + Razorpay integration** — Wire up the Donate page. Stripe for international, Razorpay for India. The 6-tab UI is built and ready.
3. **Production form backends** — Replace in-memory API routes with real services:
   - Contact form → Formspree or SendGrid
   - Newsletter → Mailchimp or Resend (see TODO in `/api/newsletter/route.ts`)
   - Volunteer form → same as contact, or a Google Sheets integration
4. **Production deployment** — Currently on Netlify (static preview). For full-featured deploy with API routes, use Vercel (free for nonprofits). Set `NEXT_PUBLIC_GA_ID` env var. Domain: raptorrescue.org.
5. **YouTube channel URL** — Currently placeholder `#` in constants.ts. Update when confirmed.

### Medium Priority
6. **CMS (Sanity.io)** — For staff-managed content: blog posts, rescue stories, gallery, team bios, impact stats. Replace static data in `lib/blog-data.ts` and `lib/species-data.ts`. The Overhaul Plan has full schema recommendations.
7. **Instagram API** — Replace placeholder `InstagramFeed` with live API data from `@wildliferescueindia`.
8. **Full image alt text** — When real images are added, ensure every `<Image>` has descriptive alt text.

### Lower Priority
9. **i18n** — Hindi translation (organization works in Delhi).
10. **Category filtering** — Videos and Gallery pages have category pills rendered but not interactive yet (static "All" selected). Wire up with `useState` filtering or URL params. (Gallery already has working filter.)
11. **Email templates** — Design HTML email templates for form submission confirmations.
12. **Error pages** — Custom 404 and 500 pages matching the site design.

---

## Reference Documents

All in `C:\Users\maxra\Documents\Claude\WR website\`:

| File | What it contains |
|------|-----------------|
| `Claude-Code-Quick-Start-Brief.docx.js` | Original project brief and requirements |
| `Wildlife-Rescue-Website-Overhaul-Plan.md` | Full overhaul plan with sitemap, CMS schemas, SEO strategy |
| `Intake-Data-Analysis-Findings.md` | Detailed analysis of 16 years of intake data |
| `Wildlife-Rescue-Impact-Data-2010-2026.md` | Raw impact statistics used throughout the site |
| `CONTENT-GUIDE.md` | Step-by-step guide for adding real photos, videos, and data corrections |

---

## Git History

```
6822db0 Add Wingman AI chatbot — floating assistant for Wildlife Rescue  ← claude/clever-khayyam
9af2b3b Update HANDOFF.md — Instagram fix, social links table, deploy instructions
fc01099 Update Instagram handle to @wildliferescueindia
6a7175d Add CONTENT-GUIDE.md — step-by-step guide for adding photos, videos, and data
3ff706b Update HANDOFF.md — add trailer info and latest git history
1d6d039 Fix homepage trailer — embed actual HBO YouTube video
f7f1942 Update trailer to official HBO version (All That Breathes)
42abd9b Update HANDOFF.md — add live preview URL and deployment instructions
f15f75d Deploy to Netlify — fix sitemap/robots for static export compatibility
be4edd2 Update HANDOFF.md — reflect Phase 4 completion
cce8372 Phase 4: Form backends, blog, SEO, loading skeletons, accessibility
f698a04 Add HANDOFF.md — continuation guide for team members
0c8f955 Phase 3: Enhancement pages — media, volunteer, newsletter, Instagram, analytics
604a19a Build Wildlife Rescue website — Phase 1 & 2 complete
d0dcd61 Initial commit from Create Next App
```

Branches: `claude/stoic-shirley` (Phases 1–4), `claude/clever-khayyam` (+ Wingman chatbot)

---

## Deployment

### Current: Netlify static preview
- **URL:** https://wildlife-rescue-preview.netlify.app
- **Method:** Static export (`output: "export"` in next.config.ts) deployed via `netlify deploy --prod --dir=out --no-build`
- **Limitation:** API routes (`/api/*`) don't work in static mode. Forms show UI but don't submit.
- **Netlify site ID:** `bfcd9eba-fc68-4cc2-a001-0517a55ce612`

### To redeploy after changes:
```bash
# 1. Temporarily enable static export — in next.config.ts, set: output: "export"
# 2. Move API routes out (they break static export)
mv src/app/api src/app/_api-disabled
# 3. Clear cache and build
rm -rf .next out
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 npx next build
# 4. Deploy
npx netlify deploy --prod --dir=out --no-build
# 5. Restore API routes and remove output: "export" from next.config.ts
mv src/app/_api-disabled src/app/api
```

### For production: Vercel (recommended)
- Vercel natively supports Next.js API routes, SSR, and ISR
- Free tier for nonprofits
- Just `vercel deploy` — no config changes needed
- Set env var: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

---

## For New Team Members / Claude Sessions

If picking this up in a new Claude session, say:

> "I'm continuing the Wildlife Rescue website project. Read HANDOFF.md and CONTENT-GUIDE.md in the project root. The latest code is on branch `claude/clever-khayyam` (includes Wingman chatbot). Phase 5 (production readiness) is next. Set OPENAI_API_KEY in .env.local to test the chatbot."

This gives full context to continue seamlessly.
