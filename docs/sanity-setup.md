# Sanity Blog Setup — Wildlife Rescue

This guide gets the Sanity-powered blog live and explains how staff publish posts. Two parts:

1. **One-time setup** — done by an admin (you, this once). ~30 minutes.
2. **Daily publishing** — what staff do every time they want to add a post. ~5 minutes per post.

---

## Part 1 — One-Time Setup (admin)

### Step 1: Create a Sanity account & project

1. Go to **https://www.sanity.io/login** and sign in with Google or GitHub. Free.
2. After login, click **"+ Create new project"**.
   - **Project name:** `Wildlife Rescue Blog`
   - **Dataset:** Accept the default `production`. Public visibility is fine — published posts are public anyway.
   - **CLI plan:** Free.
3. On the next screen, copy these two values somewhere safe — you'll paste them into a `.env` file:
   - **Project ID** — looks like `a1b2c3d4`
   - **Dataset name** — `production`

### Step 2: Generate an API write token

This token lets the migration script and the website write to Sanity.

1. From the project page, click **API** (left sidebar) → **Tokens**.
2. Click **+ Add API token**.
   - **Label:** `Migration + Webhook`
   - **Permissions:** **Editor**
3. Copy the token. **You won't be able to see it again** — paste it into your `.env.local` immediately.

### Step 3: Add env vars to `.env.local`

Open `.env.local` in the project root and add these lines:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<paste your project ID here>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=<paste your token here>
SANITY_REVALIDATE_SECRET=<run: openssl rand -hex 32>
```

For the revalidate secret, run this in PowerShell or a terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output as the value.

### Step 4: Migrate the existing 7 blog posts

```bash
npm run blog:snapshot   # Regenerate snapshot from blog-data.ts (one-off)
npm run blog:migrate    # Upload all 7 posts + images + authors + categories to Sanity
```

You should see output like:
```
[author]   Nadeem Shehzad
[author]   Wildlife Rescue
...
[post]     Bird Number 39,000 — A Shikra Finds Her Way Home
           image uploaded: /blog/39000-shikra.jpg
           saved
...
Done.
```

### Step 5: Open the Studio and verify

1. Run `npm run dev`.
2. Open **http://localhost:3000/studio** in a browser.
3. Sign in with the same Sanity account.
4. You should see all 7 posts under **Blog Posts**. Click any post to verify the body, image, author, and category came through.

If anything looks wrong, edit it directly in the Studio — your changes save immediately.

### Step 6: Add the env vars to Vercel

The site is hosted on Vercel and needs the same env vars there.

1. Go to **https://vercel.com/dashboard** → click your `wildlife-rescue-website` project.
2. **Settings** → **Environment Variables**.
3. Add each of the five env vars (same names + values as `.env.local`). Apply to **Production, Preview, and Development**.
4. Trigger a redeploy: Deployments tab → latest → ⋯ → **Redeploy**.

Once redeployed, the live site at https://wildlife-rescue-website.vercel.app/blog will be reading from Sanity.

### Step 7: Set up the publish webhook (instant updates)

Without this, posts can take up to 5 minutes to appear after publishing. With it, they appear in seconds.

1. Sanity Manage → API → **Webhooks** → **+ Create webhook**.
   - **Name:** `Vercel revalidate`
   - **URL:** `https://wildlife-rescue-website.vercel.app/api/revalidate`
   - **Trigger on:** Create, Update, Delete (check all 3)
   - **Filter:** `_type in ["post", "author", "category"]`
   - **Projection:**
     ```
     { _type, slug }
     ```
   - **HTTP method:** POST
   - **Secret:** paste the same value as `SANITY_REVALIDATE_SECRET`
2. Save. Test by editing any post — within ~5 seconds the live site should reflect the change.

### Step 8: Invite staff

Sanity Manage → **Members** → **+ Invite members**.

Recommended roles:
- **Mohammad Afeef** (Social Media & Outreach) — Editor
- **Samia Shafiq** (Conservation Educator) — Editor
- **Nadeem Shehzad** (Co-Founder) — Administrator
- **Mohammad Saud** (Co-Founder) — Administrator

They get an email invite. They click → sign in with Google/GitHub → done.

---

## Part 2 — How to Publish a Blog Post (for staff)

Once the admin completes Part 1, here's the everyday workflow.

### Open the Studio

Go to **https://wildlife-rescue-website.vercel.app/studio** and sign in.

### Create a new post

1. Click **Blog Posts** in the sidebar.
2. Click the **+** (top-right).
3. Fill in the **Content** tab:
   - **Title** — the post's headline.
   - **Slug** — auto-generated from the title. Don't change unless you have a reason.
   - **Excerpt** — 1-2 sentence summary. Shows on the listing page and in social previews.
   - **Featured image** — drag-drop or click to upload. Add **alt text** describing what's in the photo (important for blind readers and SEO).
   - **Body** — write the post. The toolbar lets you add headings, bold, italics, lists, links, and inline images.
4. Switch to the **Metadata** tab:
   - **Publish date** — defaults to now. Set a future date to schedule.
   - **Author** — pick from the dropdown, or click the link icon to create a new author.
   - **Category** — pick from the dropdown.
   - **Read time** — e.g. `3 min`, `5 min`.
5. Click **Publish** (bottom-right).

The post appears on the live site within 5 seconds (or 5 minutes if the webhook isn't set up yet).

### Edit an existing post

Find it in **Blog Posts**, change anything, click **Publish**. The change goes live within seconds.

### Save a draft (don't publish yet)

Make changes — they auto-save as a draft. The draft is only visible to you and other Editors in the Studio. The live site keeps showing the last published version. When you're ready, click **Publish**.

### Add a new author

In the post's **Author** field, click the link icon → **Create new** → fill in name + role. Save. The new author is now available in the dropdown for future posts.

### Add a new category

Same workflow but in the **Category** field. Try to reuse existing categories where possible to keep the listing page tidy.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| New post doesn't appear on the live site | Wait up to 5 min, or check the webhook is active in Sanity Manage → API → Webhooks. Try editing and republishing once. |
| `/studio` shows "Configuration error" | Env vars not set on Vercel. See Part 1 → Step 6. |
| Migration script fails with `Missing env vars` | `.env.local` is missing one of the 5 Sanity vars. See Part 1 → Step 3. |
| Image won't upload | Check file size — Sanity free tier accepts up to 100 MB per asset. Compress with tinypng.com if needed. |
| Forgot Sanity password | Sign in uses Google/GitHub OAuth — there's no separate password. Reset on the OAuth provider. |

---

## Useful links

- **Sanity Manage:** https://www.sanity.io/manage
- **Studio (live):** https://wildlife-rescue-website.vercel.app/studio
- **Sanity docs — Studio basics:** https://www.sanity.io/docs/studio
- **Sanity docs — Portable Text editing:** https://www.sanity.io/docs/portable-text-editor

---

## Reverting to static blog (if Sanity ever has an outage)

The site is built with a fallback: if Sanity is unreachable, it falls back to the static posts in `src/lib/blog-data.ts`. So an outage at Sanity will not take the blog offline — visitors will see the most recently migrated posts until Sanity comes back.

To force the fallback even when Sanity is up, remove `NEXT_PUBLIC_SANITY_PROJECT_ID` from Vercel env vars and redeploy.
