# Wildlife Rescue Website — Handoff & Design Brief

**Last updated:** 2026-05-04  
**Live site:** https://wildlife-rescue-website.vercel.app  
**GitHub:** https://github.com/Maxray77/WR-Website  
**Target domain:** raptorrescue.org (not yet pointed to Vercel)

---

## What This Site Is

Public-facing website for **Wildlife Rescue**, Delhi, India — the world's largest raptor rescue facility by annual intake. Founded by Mohammad Saud and Nadeem Shehzad in the early 1990s. Registered 2010. Subject of the Oscar-nominated documentary *All That Breathes* (2022, Sundance Grand Jury Prize + Cannes Golden Eye).

The site covers:
- The organization's mission, story, and team
- 30+ pages of content: species profiles, medical conditions, treatments, clinic, enclosures, vulture conservation, annual reports, blog, gallery, videos
- Donation flows for Indian donors (UPI, Razorpay, bank transfer) and US donors (501c3 via R3, GoFundMe)
- The documentary *All That Breathes*
- The children's book *Bird Brothers*
- An AI chatbot (Wingman) powered by OpenAI GPT-4o-mini

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.4, App Router, Turbopack |
| Language | TypeScript 5.x (strict) |
| Styling | Tailwind CSS v4 — tokens in `globals.css` via `@theme inline` (NOT `tailwind.config.ts`) |
| Animation | Framer Motion 12.x |
| AI Chatbot | Vercel AI SDK v6 + OpenAI GPT-4o-mini |
| Hosting | Vercel (auto-deploy from `main`) |
| Icons | lucide-react |

---

## Brand Tokens (Tailwind v4)

All defined in `src/app/globals.css`:

| Token | Hex | Usage |
|-------|-----|-------|
| `teal` | `#0A6E5C` | Primary — buttons, headers, links |
| `teal-dark` | `#064E41` | Hover states |
| `teal-light` | `#E8F5F1` | Light teal backgrounds |
| `amber` | `#E8A317` | Accent — CTAs, role labels, highlights |
| `amber-light` | `#F5D060` | Secondary accent |
| `charcoal` | `#1A1A2E` | Body text |
| `slate` | `#6B7280` | Secondary / muted text |
| `offwhite` | `#F9FAFB` | Alternating section backgrounds |

**Fonts:** Inter (body) + Poppins (headings)  
**Favicon:** Round white Wildlife Rescue logo on teal circle (`src/app/icon.png`, 512×512)

---

## Site Map (All Live Routes)

```
/                         Homepage — hero, stats, rescue stories, blog, Instagram, newsletter
/about                    Our story, timeline, team bios, awards, brochure download
/donate                   6-tab: UPI QR / Razorpay / Bank / US 501c3 / GoFundMe / Cheque
/contact                  Form, map, emergency hotline
/all-that-breathes        Documentary — trailer, awards, streaming, fan art gallery
/our-specialty            Surgical specialties (propatagium, manja wound repair)
/clinic                   Clinic & surgical suite — equipment, gallery, patient journey
/enclosures               Aviaries & enclosures — housing types, rehab journey
/treatments               5 treatment types with photos and videos
/special-cases            6 named rescue case studies
/vultures                 Vulture conservation — 9 species, crisis timeline, intake data
/species                  Species listing (15 cards)
/species/[slug]           Individual species profiles (15 total)
/conditions               Medical conditions listing (6 cards)
/conditions/[slug]        Individual condition pages (6 total)
/gallery                  16-photo masonry grid with lightbox
/videos                   Featured trailer + 8 categorised video cards
/annual-reports           Annual report archive (2020, 2021, 2022, 2025)
/media                    Awards timeline, 53 press articles, press kit
/blog                     Blog listing — featured post + grid
/blog/[slug]              Blog post detail (5 posts)
/bird-brothers            Children's book page
/nwra-2025                NWRA Symposium 2025 presentation page
/report-tagged-bird       Interactive tagged bird reporting form
/history                  Origin story with archival photos
/api/chat                 POST — Wingman AI chatbot (streaming)
/api/contact              POST — contact form
/api/newsletter           POST — newsletter signup
/api/volunteer            POST — volunteer applications
/api/report-tagged-bird   POST — tagged bird reports
```

---

## Current Visual Design

The site uses a clean, nature-conservation aesthetic:
- **Teal + amber** colour palette — professional, environmental, warm
- **Section alternation** — white and `offwhite` backgrounds
- **Hero sections** — full-width teal-to-teal-dark gradients with white text
- **Cards** — white, rounded-xl, subtle shadow, hover lift
- **CTAs** — teal pill buttons (primary) and amber for accent
- **Typography** — Poppins bold for headings, Inter for body
- **Animations** — Framer Motion fade/slide reveals on scroll
- **Wingman chatbot** — floating bottom-right, teal circle with eagle icon

---

## Key Files for Design Reference

| File | What it contains |
|------|-----------------|
| `src/app/globals.css` | All brand color tokens, font declarations |
| `src/app/layout.tsx` | Root layout — Header, Footer, fonts |
| `src/components/Header.tsx` | Navigation structure (desktop dropdown + mobile) |
| `src/components/Footer.tsx` | 4-column footer |
| `src/app/page.tsx` | Homepage — all sections |
| `src/app/about/page.tsx` | About page — team grid, timeline, awards |
| `src/app/donate/page.tsx` | Donate page — 6-tab interface |
| `public/` | All images, videos, PDFs |

---

## Design Notes & Known Gaps

- **No formal design system** — the site was built code-first. No Figma file exists.
- **Placeholder images** remain on some pages (some species, some conditions).
- **Typography scale** is ad-hoc — heading sizes vary across pages and are not systematically defined.
- **Mobile nav** is functional but basic — a hamburger toggle with a stacked link list.
- **The donate page** has 6 tabs and is complex — a cleaner visual hierarchy here would help conversion.
- **The homepage hero** cycles through 3 full-bleed images — transition could be smoother.
- **The blog** uses static data — no CMS yet.
- **Wingman** (AI chatbot) floats bottom-right and works well; the design is intentionally minimal.
- **A full cosmetic redesign brief** exists at `docs/ANTIGRAVITY-DESIGN-BRIEF.md` — written for Google Antigravity.

---

## What the Organisation Does (for Design Context)

Wildlife Rescue operates from a facility in Wazirabad Village, Delhi. They rescue injured raptors and wetland birds from across the city, treat them in a fully-equipped avian clinic (X-ray, surgical laser, ultrasonic bone cutter, ICU, diagnostic lab), rehabilitate them in purpose-built aviaries, and release them back into the wild.

- **4,184 birds rescued in 2025** (record year)
- **39,000+ birds since 2010**
- **106+ species treated**
- **10+ partner rescue organisations across Delhi**
- Featured in *The New York Times*, *BBC*, *CNN*, *The Guardian*, *NPR*

The visual language should feel: **urgent but hopeful**, **scientific but accessible**, **Indian but internationally legible**.

---

## Contacts

| Role | Name | Contact |
|------|------|---------|
| Co-Founder / Secretary | Nadeem Shehzad | nadeem@raptorrescue.org / +91 98100 29698 |
| Co-Founder / President | Mohammad Saud | (via Nadeem) |
| US Fiscal Sponsor | Raptor Rescue and Research Inc. | EIN: 87-3289299 |
