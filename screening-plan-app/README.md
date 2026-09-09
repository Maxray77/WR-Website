# Screening Plan App

Registration, waiting list and door management for community screenings of
**All That Breathes** — the Oscar-nominated documentary about Wildlife Rescue,
Delhi.

People pick a city, reserve a free seat and get an emailed confirmation. When a
screening fills up, further registrations join a waiting list and are confirmed
**automatically** — oldest first — the moment someone cancels. Staff can add
people by hand, cancel on their behalf, check attendees in at the door, print a
door list and export a CSV.

---

## What it does

**For the public**

| Page | What happens there |
|---|---|
| `/` | Upcoming screenings, grouped by city, with live seat counts |
| `/screenings/[slug]` | Full details + the registration form |
| `/booking/[reference]` | Booking pass: reference, QR code, and self-service cancel |
| `/booking` | Look a booking up by reference + email |

**For staff (`/admin`, password protected)**

| Page | What happens there |
|---|---|
| `/admin` | Every screening, seats taken, waiting-list size |
| `/admin/screenings/new` | Create a screening (save as draft, publish when ready) |
| `/admin/screenings/[id]` | Attendees, manual add, cancel, check-in, edit, cancel the whole screening |
| `/admin/screenings/[id]/door-list` | Printable A4 check-in sheet |
| `/api/admin/export?screeningId=…` | CSV of every registration |

**Emails sent automatically** (all branded, plain-text fallback included):
booking confirmed · added to waiting list · promoted off the waiting list ·
booking cancelled · whole screening cancelled.

---

## Tech stack

| Piece | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Server Actions) | Same stack as the main WR site |
| Language | TypeScript, strict | |
| Styling | Tailwind CSS v4 (`@theme inline`) | WR brand tokens: teal, amber, charcoal |
| Database | **Postgres** via Drizzle ORM | Seats and waiting lists need real transactions |
| Email | **Resend** | `raptorrescue.org` is already a verified sending domain |
| Hosting | Vercel | Already in use for the main site |

### Why Postgres and not Vercel KV / Redis

Seat allocation is the whole product. Two people clicking "reserve" on the last
seat at the same instant must not both get it. Every booking runs inside a
transaction that takes a row lock on the screening (`SELECT … FOR UPDATE`), so
allocations for one screening are strictly serialised. Redis can't express that
safely; Postgres can, and it also gives you real queries for the CSV export.

**Recommended:** Neon Postgres through the Vercel Marketplace (free tier is
ample — this is thousands of rows, not millions). Vercel sets `DATABASE_URL` for
you. Supabase or any other Postgres works identically; just set `DATABASE_URL`.

---

## Setup

### 1. Install

```bash
npm install
cp .env.example .env.local
```

### 2. Create a database

**Vercel (recommended):** Project → Storage → Marketplace → **Neon** → create.
Vercel injects `DATABASE_URL` into every environment. Copy the *pooled*
connection string (the host ends in `-pooler`) into `.env.local` for local work.

**Local Postgres:** `createdb screening` and set
`DATABASE_URL="postgresql://postgres@localhost:5432/screening"`.

### 3. Create the tables

```bash
npm run db:push      # applies the schema in src/lib/db/schema.ts
npm run db:seed      # optional: three sample screenings to click around
```

### 4. Set the admin password

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Put that in `AUTH_SECRET`, and pick an `ADMIN_PASSWORD`. Without both, `/admin`
shows a "not configured" notice and stays locked.

### 5. Run it

```bash
npm run dev          # http://localhost:3000
```

Sign in at `/admin` with your `ADMIN_PASSWORD`.

---

## Email

Set `RESEND_API_KEY` and you're done — `raptorrescue.org` is already verified in
Resend, so `screenings@raptorrescue.org` will send immediately.

**Without an API key the app still works end to end**: bookings are made, the
confirmation page shows the reference and QR, and each email that *would* have
gone out is logged to the server console instead. Useful for local development.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Enables sending |
| `SCREENING_FROM_EMAIL` | e.g. `All That Breathes Screenings <screenings@raptorrescue.org>` |
| `SCREENING_REPLY_TO` | Where replies land (default `nadeem@raptorrescue.org`) |
| `SCREENING_BCC` | Optional internal archive copy |

Every send attempt — success or failure — is recorded in the `email_log` table.

---

## Deploying to Vercel

1. Push this folder to its own GitHub repo (see *Using this outside the monorepo*
   below), or set **Root Directory** to `screening-plan-app` if you deploy it
   from inside `WR-Website`.
2. Add the Neon integration (creates `DATABASE_URL`).
3. Add the other environment variables from `.env.example` under
   Settings → Environment Variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the live URL — booking links in emails are built
   from it.
5. Deploy, then run `npm run db:push` once locally against the production
   `DATABASE_URL` to create the tables.

---

## How the waiting list works

- A booking is **confirmed** if its seats fit in what's left, otherwise
  **waitlisted** (unless the waiting list is switched off, in which case
  registration simply closes).
- Cancelling a confirmed booking releases its seats and immediately promotes the
  waiting list, oldest booking first, emailing everyone who moves up.
- A party larger than the seats just freed is **skipped, not blocking** — freeing
  two seats promotes the next party of one or two, and a party of four keeps its
  place in the queue for a bigger release later.
- **Raising a screening's capacity** runs the same promotion pass automatically.
- Admins can also promote by hand, confirm a specific waitlisted person, or
  overbook past capacity with the "confirm even if the room is full" option.
- One live booking per email address per screening; cancelling frees the address
  to register again.

---

## Security notes

- `/booking/[reference]` needs the secret `manageToken` from the confirmation
  email. A guessed reference on its own reveals nothing.
- Booking lookup gives the same answer for "wrong reference" and "wrong email",
  so it can't be used to test whether an address is registered.
- Admin sessions are HMAC-signed cookies (12 h), the password check is
  constant-time, and login attempts are throttled per IP.
- `src/proxy.ts` sets baseline security headers and rejects cross-origin POSTs.
- Admin pages are `noindex`, and the CSV export escapes spreadsheet formulas.

---

## Verifying changes

```bash
npm run typecheck                # tsc --noEmit
npm run lint
npm run build
npx tsx scripts/smoke-test.ts    # 22 assertions against a LOCAL database
```

`smoke-test.ts` wipes every row, so it refuses to run unless `DATABASE_URL`
points at localhost. It covers overflow to the waiting list, FIFO promotion, the
skip-a-large-party rule, capacity increases, duplicate emails, token-guarded
cancellation, and a ten-way concurrent booking race that must never oversell.

### About `npm audit`

`npm audit` reports four **moderate** advisories, all the same one: an esbuild
dev-server issue reaching us through `drizzle-kit`'s old `@esbuild-kit/*`
dependencies.

**Do not run `npm audit fix --force` here.** Its "fix" is to downgrade
`drizzle-kit` from 0.31 to 0.18, which is years old and would break
`npm run db:push`. The advisory only affects esbuild's own dev server, which
this project never starts, and `drizzle-kit` is a devDependency that never ships
to production. It clears itself when drizzle-kit drops the old loader upstream.

There should be **no high-severity** findings — `drizzle-orm` is pinned at
0.45.2 or later, which closes the SQL-identifier injection advisory
(GHSA-gpj5-g38j-94v9).

---

## Using this outside the monorepo

The folder is self-contained. To move it to
`C:\Users\maxra\Documents\Code\Screening Plan App`:

```powershell
git clone -b claude/screening-plan-app-jmq51m https://github.com/Maxray77/WR-Website.git temp-wr
Move-Item temp-wr\screening-plan-app "C:\Users\maxra\Documents\Code\Screening Plan App"
Remove-Item -Recurse -Force temp-wr
cd "C:\Users\maxra\Documents\Code\Screening Plan App"
npm install
```

Then `git init` it as its own repository if you want it separate from the
website.

---

## Ideas for later

- Reminder email 24 hours before a screening (a Vercel Cron hitting a route that
  emails confirmed attendees) — the `email_log` table already prevents doubles.
- QR scanning at the door instead of typing the reference.
- Per-city organiser logins rather than one shared admin password.
- Post-screening thank-you email with a donation link.
