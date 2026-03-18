# Wildlife Rescue Website — Content Update Guide

**For:** WR staff, volunteers, and collaborators adding real photos, videos, and corrections.
**Skill needed:** Basic text editing. No coding knowledge required — just edit the text between quotes.

---

## How It Works

All content lives in simple text files. You edit the text between `"quotes"`, save, and the site updates. There are two types of files:

1. **Data files** (`src/lib/*.ts`) — Central databases of stats, team info, species data, etc.
2. **Page files** (`src/app/*/page.tsx`) — Individual pages with their own content.

---

## 🖼️ ADDING PHOTOS

### Where photos are needed (14 locations):

| Page | What's needed | File to edit |
|------|--------------|-------------|
| **Homepage** | Founders photo (Nadeem & Saud) | `src/app/page.tsx` — line ~77 |
| **Homepage** | 3 featured rescue photos | `src/app/page.tsx` — line ~133 |
| **About** | Team member headshots (3+) | Currently uses initials. Add `image` field to `src/lib/constants.ts` → `TEAM` array |
| **Our Specialty** | Surgery in progress photo | `src/app/our-specialty/page.tsx` — line ~136 |
| **Our Specialty** | Rescue vehicle photo | `src/app/our-specialty/page.tsx` — line ~223 |
| **Special Cases** | 6 individual bird photos | `src/app/special-cases/page.tsx` — line ~114 |
| **Gallery** | 16 gallery photos | `src/app/gallery/page.tsx` — `PHOTOS` array |
| **Species** | 8 species photos | `src/app/species/page.tsx` + `src/app/species/[slug]/page.tsx` |
| **Blog** | Post header images | `src/app/blog/page.tsx` |
| **Donate** | UPI QR code image | `src/app/donate/page.tsx` — line ~189 |

### How to add a photo:

**Step 1:** Put your image file in the `public/images/` folder. Create it if it doesn't exist:
```
public/
  images/
    team/
      nadeem.jpg
      saud.jpg
    species/
      black-kite.jpg
      barn-owl.jpg
    rescues/
      kiran.jpg
    gallery/
      photo-01.jpg
```

**Step 2:** In the page file, find the placeholder div (looks like this):
```html
<div className="aspect-square bg-gradient-to-br from-teal-light to-teal/10 flex items-center justify-center">
  <p className="text-slate text-sm">Photo Placeholder</p>
</div>
```

**Step 3:** Replace it with an image tag:
```html
<img src="/images/species/black-kite.jpg" alt="Black Kite in flight over Delhi" className="w-full h-full object-cover" />
```

> **Important:** Always include a descriptive `alt` text for accessibility and SEO.

---

## 🎬 ADDING/CHANGING VIDEOS

### Current video locations:

| Page | What | File |
|------|------|------|
| **Homepage** | HBO trailer embed | `src/app/page.tsx` — line ~168 |
| **All That Breathes** | HBO trailer embed | Uses `FILM_DETAILS.trailerUrl` from `src/lib/constants.ts` |
| **Videos page** | Featured trailer + 8 video cards | `src/app/videos/page.tsx` |

### To change the trailer:
Edit `src/lib/constants.ts`, find:
```
trailerUrl: "https://www.youtube.com/embed/GoTlULspDyY",
```
Replace `GoTlULspDyY` with a different YouTube video ID.

### To add a new video to the Videos page:
Edit `src/app/videos/page.tsx`, find the `VIDEOS` array, and add a new entry:
```javascript
{
  title: "Your Video Title",
  source: "Wildlife Rescue",
  duration: "3:45",
  description: "A short description of what the video shows.",
  category: "Field Rescue",  // Options: Media Feature, Documentary, Field Rescue, Medical, Release, Behind the Scenes, Interview
},
```

### To embed a YouTube video (anywhere):
Use this HTML block, replacing `VIDEO_ID` with the YouTube ID:
```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video description"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full h-full"
/>
```

> **How to get a YouTube video ID:** From a URL like `https://www.youtube.com/watch?v=GoTlULspDyY`, the ID is `GoTlULspDyY` (everything after `v=`).

---

## ✏️ CORRECTING TEXT & DATA

### Impact Statistics
**File:** `src/lib/constants.ts` → `IMPACT_STATS`
```javascript
export const IMPACT_STATS = [
  { number: "38,000+", label: "Birds Rescued", description: "Since 2010" },
  { number: "4,184", label: "Birds in 2025", description: "Record year" },
  // Change the numbers and text here
];
```

### Contact Information
**File:** `src/lib/constants.ts` → `CONTACT`
```javascript
export const CONTACT = {
  phone: "+91 98100 29698",
  email: "nadeem@raptorrescue.org",
  address: "Street Number 9, Wazirabad Village, Delhi 110084",
  whatsapp: "https://wa.me/919810029698",
  // Change any of these values
};
```

### Team Members
**File:** `src/lib/constants.ts` → `TEAM`
```javascript
export const TEAM = [
  {
    name: "Nadeem Shehzad",
    role: "Co-Founder & Lead Rescue Surgeon",
    bio: "Started rescuing black kites from his home in Old Delhi...",
    // Edit the bio text, add new team members by copying this block
  },
  // ... more team members
];
```

### Annual Intake Data (the bar chart)
**File:** `src/lib/constants.ts` → `RESCUE_BY_YEAR`
```javascript
export const RESCUE_BY_YEAR = [
  { year: "2010", total: 362 },
  { year: "2011", total: 1017 },
  // Add new years or correct numbers here
];
```

### Financial Data
**File:** `src/app/annual-reports/page.tsx` → `FINANCIAL_DATA`
```javascript
const FINANCIAL_DATA = [
  { year: "2024-25", income: "₹42,66,646", expenditure: "₹42,66,646" },
  // Add new years or correct amounts
];
```

### Bank Details (Donate page)
**File:** `src/lib/constants.ts` → `BANK_DETAILS`
```javascript
export const BANK_DETAILS = {
  bankName: "HDFC Bank",
  accountName: "Wildlife Rescue",
  accountNumber: "...",
  ifsc: "...",
  branch: "...",
};
```

---

## 📝 CORRECTING PAGE-SPECIFIC CONTENT

### Rescue Stories (Special Cases page)
**File:** `src/app/special-cases/page.tsx` → `CASES` array

Each story looks like:
```javascript
{
  name: "Kiran",
  species: "Black Kite",
  caseNo: "#35,412",
  date: "May 2024",
  condition: "Severe manja string laceration — wing tendons severed",
  treatment: "Emergency surgery using our novel wing repair technique...",
  outcome: "Released",   // or "In Care"
  story: "Kiran arrived during the busiest month on record...",
},
```
Edit any field. Add new stories by copying the block and changing the values.

### Species Profiles
**File:** `src/lib/species-data.ts` → `SPECIES_LIST`

Each species has:
```javascript
{
  slug: "black-kite",           // URL-friendly name (don't change)
  name: "Black Kite",
  scientificName: "Milvus migrans",
  conservationStatus: "Least Concern",  // or "Endangered"
  percentage: "~80%",           // of total intake
  annualCases: "~3,200/year",
  habitat: "Urban areas, open country near water...",
  diet: "Opportunistic scavenger and predator...",
  threatsInDelhi: "Manja is the #1 threat...",
  funFact: "Delhi has one of the highest densities...",
  // Edit any text field
},
```

### Blog Posts
**File:** `src/lib/blog-data.ts` → `BLOG_POSTS`

Each post:
```javascript
{
  slug: "record-breaking-2025",  // URL-friendly (use-dashes-like-this)
  title: "2025: Our Biggest Year Ever",
  excerpt: "Short summary for listing page...",
  date: "2026-01-15",           // Format: YYYY-MM-DD
  author: "Nadeem Shehzad",
  category: "Annual Update",    // Options: Annual Update, Conference, Operations, Conservation, Volunteer Stories
  readTime: "5 min",
  content: `Full article text here...

Use **double asterisks** for bold text.

Separate paragraphs with blank lines.`,
},
```

### Award Badges
**File:** `src/lib/constants.ts` → `AWARDS_WON` and `NOMINATIONS`

### Film Festival Selections
**File:** `src/lib/constants.ts` → `FESTIVAL_SELECTIONS`

### Media & Press Coverage
**File:** `src/app/media/page.tsx` → `AWARDS` and `PRESS_COVERAGE` arrays

### Volunteer Roles
**File:** `src/app/volunteer/page.tsx` → `ROLES` array

### Volunteer FAQ
**File:** `src/app/volunteer/page.tsx` → `FAQ` array

---

## 🔄 AFTER MAKING CHANGES

### To see changes locally:
```bash
cd "C:\Users\maxra\Documents\Claude\WR website\wildlife-rescue-website\.claude\worktrees\stoic-shirley"
npm run dev
# Open http://localhost:3000 in your browser
# Changes appear automatically as you save files
```

### To redeploy to Netlify:
```bash
# 1. Enable static export in next.config.ts (set output: "export")
# 2. Move API routes temporarily
mkdir -p src/app/_api-disabled && cp -r src/app/api/* src/app/_api-disabled/ && rm -rf src/app/api
# 3. Build and deploy
npm run build
netlify deploy --prod --dir=out --no-build
# 4. Restore API routes
mkdir -p src/app/api && cp -r src/app/_api-disabled/* src/app/api/ && rm -rf src/app/_api-disabled
# 5. Revert next.config.ts (remove output: "export")
```

### Or just ask Claude:
Tell Claude Code: *"I updated the team bios and added 3 new photos. Rebuild and redeploy."*

---

## 📁 FILE QUICK REFERENCE

| What to change | File to edit |
|----------------|-------------|
| Stats (38,000+ birds, etc.) | `src/lib/constants.ts` → `IMPACT_STATS` |
| Contact info (phone, email, address) | `src/lib/constants.ts` → `CONTACT` |
| Team bios | `src/lib/constants.ts` → `TEAM` |
| Annual intake numbers | `src/lib/constants.ts` → `RESCUE_BY_YEAR` |
| Bank details | `src/lib/constants.ts` → `BANK_DETAILS` |
| Trailer video | `src/lib/constants.ts` → `FILM_DETAILS.trailerUrl` |
| Documentary awards | `src/lib/constants.ts` → `AWARDS_WON` |
| Species profiles | `src/lib/species-data.ts` → `SPECIES_LIST` |
| Blog posts | `src/lib/blog-data.ts` → `BLOG_POSTS` |
| Rescue stories | `src/app/special-cases/page.tsx` → `CASES` |
| Gallery photos | `src/app/gallery/page.tsx` → `PHOTOS` |
| Video clips | `src/app/videos/page.tsx` → `VIDEOS` |
| Volunteer roles | `src/app/volunteer/page.tsx` → `ROLES` |
| Volunteer FAQ | `src/app/volunteer/page.tsx` → `FAQ` |
| Financial data | `src/app/annual-reports/page.tsx` → `FINANCIAL_DATA` |
| Press coverage | `src/app/media/page.tsx` → `PRESS_COVERAGE` |
| Awards timeline | `src/app/media/page.tsx` → `AWARDS` |
