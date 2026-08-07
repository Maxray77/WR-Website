# R3 Website — project guide for Claude Code

Read `README.md` first; it covers the stack, routes, design tokens and the
launch checklist. This file records the conventions and the traps.

## What this project is

The website for **Raptor Rescue and Research Inc.** — a US 501(c)(3)
(EIN 87-3289299) that raises money in America and grants it to raptor
rehabilitation abroad, currently **Wildlife Rescue** in Wazirabad, Delhi.

This is a **sibling project, not a copy**, of the Wildlife Rescue site at
raptorrescue.org. R3 is the American fundraising entity; Wildlife Rescue is the
clinic. Keep the two identities distinct — different palette, different voice,
different job. R3's page is the case for support; the clinic's page is the
work.

## Hard rules

1. **Never invent a figure.** Every number on this site traces to the IRS
   filing, the partner's published data, or a public award record. If you
   cannot source it, do not publish it. Add the source as a comment next to
   the value in `src/lib/constants.ts`.

2. **Look at an image before you caption it.** Read the file with the Read
   tool. Two images named `wing-repair-*.jpg` were photographs of a conference
   presentation, and the captions asserting "day thirty-two after surgery"
   were wrong until caught in review. Filenames lie; pixels do not.

3. **Data lives in `src/lib/`, not in components.** `constants.ts` for org
   facts, `news.ts` for posts, `metadata.ts` for SEO.

4. **Tailwind v4 has no config file.** Colours are `@theme inline` tokens in
   `src/app/globals.css`.

5. **The site must build and run with zero environment variables.** Stripe and
   Resend are both optional at runtime and degrade with a clear message to the
   visitor. Do not introduce a hard dependency on a secret.

## Conventions

- Server components by default. `"use client"` only for real interactivity —
  currently just `Header`, `DonateForm` and `ContactForm`.
- Compose from `src/components/ui.tsx` rather than writing new one-off markup.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Before committing: `npm run build` (typechecks) and `npx eslint .`.

## Traps already hit

- **`grid-cols-[auto_1fr]` collapses to zero** around a `w-full` child, which
  silently hides an image at 0×0 with no error. Use an explicit track width
  (`grid-cols-[340px_1fr]`). This hid the homepage film poster.
- **`lucide-react` has removed its brand icons.** Instagram, Facebook and
  YouTube glyphs are hand-drawn in `src/components/SocialIcons.tsx`.
- **`setState` inside a `useEffect`** is an ESLint error under the React hooks
  rules here. To reset state on navigation, compare against the previous value
  during render instead (see `Header.tsx`).
- **Full-page Playwright screenshots show lazy images as blank.** They are
  loading fine. Verify with an element screenshot at a normal viewport, or by
  reading `img.complete` and `naturalWidth`, before "fixing" anything.
- **`.gitignore` ignores `.env*`,** so `.env.example` needs its explicit
  negation (already present).

## Governance facts that are easy to get wrong

- **The current board differs from the last IRS filing.** Current officers:
  Julie Collins (President), Nadeem Shehzad (Secretary), Luis Perez (Treasurer
  & Acting Secretary). The FY2024 Form 990-EZ still lists Suzie Gilbert and
  Linda McDaniel, because it covers a year they served. Both `/about` and
  `/impact` say this explicitly — do not delete those sentences, they are what
  stops a donor thinking the site contradicts the filing.
- **Julie's and Luis's bios describe their offices, not their lives.** No
  biographical detail has been invented. Do not add any without a source.
- **The organisation is in New York, not Virginia.** The VA address is gone;
  do not reintroduce it. Governing law in the terms is New York.
- **NY charity registration No. 51-02-33**, Dual registrant, CHAR500 annually,
  registered 8 Sept 2025. In `NY_CHARITY` in `constants.ts`. The
  `disclosure` string is a NY legal requirement — keep it verbatim.
- **28 Liberty Street is the Attorney General's address, not ours.** It
  appears only inside the required disclosure sentence.

## Open questions for the client

- Portraits and real bios for Julie Collins and Luis Perez.
- Should Nadeem stay titled "Secretary" alongside Luis as "Acting Secretary",
  or become a Director?
- Confirm the apartment number on the New York address.
- Which email should be primary — `info@` or the long-standing gmail?
- Should the four drafted news posts be rewritten in the board's own voice?
- Real per-gift unit costs, if the partner's accounts can substantiate them.

## Current status

**2026-08-07 — initial build complete, then updated for the board change and
the New York registration.** 22 routes, production build and typecheck clean,
ESLint clean, pages visually verified at 1440px and 390px. Not yet deployed;
no Stripe or Resend credentials configured.
