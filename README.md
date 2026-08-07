# Raptor Rescue and Research Inc. — website

The website for **Raptor Rescue and Research Inc.** (EIN 87-3289299), a US
501(c)(3) that funds the rescue, treatment and release of birds of prey. It
replaces the previous six-page Squarespace site at raptorrescueusa.org.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the values you have
npm run dev                    # http://localhost:3000
```

The site is designed to run with **no environment variables at all**. Card
donations and contact-form delivery switch themselves off gracefully and tell
the visitor what to do instead, so you can develop and preview everything
before any accounts exist.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also runs a full typecheck) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck on its own |

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — case for support, partner stats, film, giving, transparency |
| `/mission` | What we do, how we choose partners, operating principles |
| `/wildlife-rescue` | The Delhi partnership: origin, manja, the facility, species |
| `/all-that-breathes` | The Oscar-nominated documentary, trailer and awards |
| `/impact` | FY2024 financials as filed, accountability links, governance |
| `/about` | Board bios and organisation details |
| `/donate` | Card giving via Stripe, plus DAF, stock, matching, IRA, bequest, check |
| `/donate/thank-you` | Post-payment page (noindex) |
| `/news`, `/news/[slug]` | Updates |
| `/contact` | Contact form |
| `/privacy-policy`, `/terms` | Legal |

Plus `/api/checkout` (Stripe Checkout session) and `/api/contact`.

---

## Where the content lives

**Change data, not components.** Almost every fact on the site comes from one
of these three files:

- **`src/lib/constants.ts`** — organisation details, EIN, board bios,
  financial figures, partner statistics, film awards, giving tiers, the "other
  ways to give" list, navigation. Each figure carries a comment saying where it
  came from.
- **`src/lib/news.ts`** — news posts, as arrays of typed blocks.
- **`src/lib/metadata.ts`** — SEO defaults and the `pageMetadata()` helper.

Sources for the numbers currently on the site:

- Financials — IRS Form 990-EZ for FY ending 31 Dec 2024, filed 4 Nov 2025.
  Mirrored at ProPublica Nonprofit Explorer.
- Board names and titles — the same filing.
- Partner caseload figures — published by Wildlife Rescue at raptorrescue.org.
- Film awards — public award records.

If you change a figure, update the comment beside it too.

---

## Design system

Tailwind v4 keeps theme tokens in CSS, **not** in a `tailwind.config` file.
Colours are defined in `src/app/globals.css` under `@theme inline`:

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0d1b26` | Dark sections, footer, headings |
| `ink-2` / `ink-3` | `#16303f` / `#1f4053` | Raised dark surfaces |
| `ember` | `#b5501c` | Primary action, links, accents |
| `ember-dark` | `#8f3e14` | Hover |
| `ember-light` | `#f6ece5` | Accent backgrounds |
| `gold` | `#dfa23c` | Accent on dark backgrounds |
| `bone` | `#fbf9f5` | Page background |
| `sand` | `#f0e9de` | Alternating sections |
| `line` | `#e4dcd0` | Borders |
| `ash` | `#5f7180` | Secondary text |
| `graphite` | `#1c2a33` | Body text |

To add a colour, add it to `@theme inline` and use it as `text-*`, `bg-*` etc.

**Type:** Source Serif 4 for headings (`font-display`), Inter for everything
else. Both via `next/font`.

**Shared components** live in `src/components/ui.tsx` (`Section`, `Container`,
`SectionHeading`, `ButtonLink`, `Card`, `Stat`, `PullQuote`). Prefer composing
these over new one-off markup.

---

## Donations

Card giving uses **Stripe Checkout**, created server-side in
`src/app/api/checkout/route.ts`. One-time gifts use `payment` mode; monthly
gifts use `subscription` mode with an inline recurring price, so no Stripe
Products or Prices need to be configured in the dashboard.

Amounts are validated server-side (`src/lib/stripe.ts`): minimum $5, maximum
$50,000. The maximum exists so that a mistyped amount cannot go through
unnoticed; larger gifts are routed to a conversation instead.

Set `STRIPE_SECRET_KEY` to switch it on. Apply for Stripe's discounted
nonprofit processing rate before going live.

### Before launch

- [ ] Apply for the Stripe nonprofit rate and add `STRIPE_SECRET_KEY`
- [ ] Verify the sending domain in Resend, add `RESEND_API_KEY` and
      `CONTACT_FROM_EMAIL`
- [ ] Make one real $5 donation end to end, then refund it
- [ ] Confirm the acknowledgement process for gifts of $250 or more —
      the IRS requires a written acknowledgement, and `/donate/thank-you`
      currently promises one
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the live domain
- [ ] Submit the sitemap in Google Search Console

---

## Photography

Images are in `public/img/`, compressed to a maximum 2000px on the long edge
at JPEG quality 82 (roughly 4.4 MB for the whole set). They are supplied by our
partner Wildlife Rescue.

**Two rules, learned the hard way:**

1. **Check what a photo actually shows before writing its caption.** Two files
   named for a wing repair turned out to be photographs of the surgeons
   presenting slides at a conference. They are now named `nwra-*-slide.jpg`.
2. **Filenames should describe the photograph, not the story you want to tell
   with it.**

Missing and worth adding: portraits of Suzie Gilbert and Linda McDaniel (the
About page currently shows elegant initial monograms in their place).

---

## Deployment

Designed for Vercel: import the repository, add the environment variables, and
deploy. `next build` runs a full typecheck, so a build failure is usually a
type error rather than an infrastructure problem.

Any Node host works — nothing here depends on Vercel-specific APIs.

---

## Notes and known gaps

- **News posts are static.** There is no CMS. To publish, add an entry to the
  top of `NEWS_POSTS` in `src/lib/news.ts`. The existing four are accurate but
  were drafted during the build and should be reviewed in the board's own
  voice before launch.
- **Two addresses exist for the organisation.** The live Squarespace site and
  this build use the Waynesboro, Virginia address; the IRS filing lists New
  York. Confirm which is correct and update `ORG.address` in
  `src/lib/constants.ts`.
- **Two email addresses exist.** `info@raptorrescueusa.org` is used as primary
  throughout; the long-standing `raptorrescueusa@gmail.com` appears as a
  secondary on the contact page. Both are in `ORG` in `constants.ts`.
- **Giving tier descriptions deliberately avoid per-bird cost claims.** They
  describe what a gift supports rather than asserting a unit price we cannot
  substantiate from the partner's audited accounts. If real unit costs become
  available, `GIVING_TIERS` is where they go.
