# Plan: `/our-specialty` Expansion + New Wing-Repair Page

**Status:** Awaiting assets from user (X-rays, NWRA slide deck, anatomy diagrams).
**Created:** 2026-04-29
**Owner:** Claude Code

---

## Phase 1 — Expand `/our-specialty`

### 1.1 Expand "Techniques & Equipment" grid (3 → 8 cards)

Reuse photos already in `/public/treatments/` and `/public/facility/` so each card is real, not iconified:

| Card | Photo | Notes |
|---|---|---|
| Novel Wing Repair Surgery | `nwra-2025/stage1-tplt-emr-sutured.jpg` | Becomes the link to `/our-specialty/wing-repair` |
| X-Ray & Diagnostic Imaging | (X-ray hero from user folder) | Links down to new X-Ray section |
| Ultrasonic Bone Cutter (USBC) | `treatments/usbc-full-setup.jpg` | All 4 USBC photos already on disk |
| Surgical Laser | `facility/laser-surgery.jpg` / `treatments/laser-therapy-big.jpg` | Burns, wound debridement |
| Isoflurane Anesthesia | `treatments/barn-owl-anesthesia.jpg` | Gas anesthesia rig |
| Operating Theater | `facility/ot-table.jpg` | Full surgical setup |
| Diagnostic Lab | `facility/lab-02.jpg` | Centrifuge, microscope, blood work |
| IV / Fluid Therapy | `treatments/black-kite-drip.jpg` | Post-op support |

### 1.2 NEW dedicated X-Ray Imaging section

- Lives between the equipment grid and "What We Treat"
- 2-column intro (text + first X-ray)
- Gallery: 4–8 X-rays in a responsive grid, click-to-zoom (modal lightbox, client component)
- Each X-ray pairs with caption (species + diagnosis + pre/post-op)

### 1.3 Tighten Innovation Highlight section

- Replace "Surgery in Progress — Photo Placeholder" with `nwra-2025/stage1-skin-suture.jpg` or `the-fusion-day32.jpg`
- Add prominent "Read the full technique →" CTA → `/our-specialty/wing-repair`

---

## Phase 2 — NEW page `/our-specialty/wing-repair`

Server component, fully data-driven so it's easy to extend.

### Sections (top → bottom)

1. **Hero** — teal gradient + tagline "Novel Wing Repair: Restoring Flight to Birds Cut by Manja"
2. **The Problem** — 2-col: text on what manja does + close-up of a fresh laceration
3. **Anatomy of a Raptor Wing** — labeled diagrams (NWRA slides or CC-licensed). Calls out propatagium, TPLT, EMR, brachial muscles
4. **The Technique, Stage by Stage** — 4-step alternating image/text:
   - Stage 1: Skin & superficial muscle suture
   - Stage 2: TPLT + EMR tendon repair
   - Stage 3: Propatagium membrane reconstruction
   - Stage 4: Splinting & post-op recovery
5. **Outcomes & Data** — stat block: "2,000+ birds operated on", "Adopted by 4+ international facilities", "Refined across 7 years (2018 LA → 2025 Seattle)" — note: per project policy we do not cite recovery-rate percentages publicly.
6. **Case Studies** — 3 deep cases with: case #, intake X-ray, intra-op photo, post-op X-ray, release photo, narrative
7. **Presented at NWRA Symposiums** — 2 cards (LA 2018 / Seattle 2025) with slide thumbnails and key takeaways
8. **CTA** — "Fund This Work" donate button

### File structure

```
src/app/our-specialty/
  page.tsx                  ← edited
  wing-repair/
    page.tsx                ← NEW server component
src/lib/
  wing-repair-data.ts       ← NEW: stages, cases, slide refs
public/
  xrays/                    ← NEW folder, X-rays from user
  wing-repair/
    anatomy-*.jpg           ← anatomy diagrams (Blender, Wikimedia, or scanned)
    stage-1.jpg ... stage-4.jpg
    case-*-pre.jpg, *-intraop.jpg, *-post.jpg
  nwra-slides/              ← NEW: rendered slides from NWRA decks
```

### Routing / nav

- Add `/our-specialty/wing-repair` to header dropdown ("Our Work" → "Wing Repair Technique")
- Add to `sitemap.ts` (yearly)
- JSON-LD `MedicalProcedure` schema for SEO

---

## Phase 3 — Execution sequencing

Once user sends assets, execute in this order so nothing is half-finished:

1. Add asset folders + compress/convert all media in one pass (PDF→JPG for slides, sharp resize for X-rays — use existing `pdfconv2` toolchain at `C:/Users/maxra/AppData/Local/Temp/pdfconv2/`)
2. Build `wing-repair-data.ts`
3. Build `/our-specialty/wing-repair/page.tsx`
4. Edit `/our-specialty/page.tsx` (expand cards + add X-ray section + link to new page)
5. Update header nav + sitemap
6. Single commit, push to `main`

---

## Blender + Claude for wing anatomy diagrams — decision

**Decision: do NOT use Blender for anatomy.**

Reasoning:
- Blender MCP can technically drive Blender from Claude Code, but a medically accurate raptor wing 3D model is days of expert work to build from scratch
- Anatomical diagrams are typically 2D vector illustrations with labeled callouts — wrong output style for a 3D render
- The NWRA slides are already peer-reviewed and authoritative

**Better options, ranked:**
1. Use actual slides from NWRA presentation deck (already medically vetted)
2. Wikimedia Commons CC-licensed bird wing anatomy diagrams (free, accurate, attribution required)
3. Hire medical illustrator on Fiverr/Upwork ($50–200 for 2–3 labeled diagrams)
4. Skip stylized AI image generation for medical content

**Plan adopted:** NWRA slides (primary) + Wikimedia CC-licensed diagrams (supplement for basic anatomy intro).

---

## Asset checklist (waiting on user)

- [ ] **X-ray images** — folder of actual X-rays (DICOM exports as JPG/PNG fine). 4–8 minimum. One-line caption per image (species + diagnosis + pre/post-op)
- [ ] **NWRA presentation deck(s)** — PowerPoint or PDF for LA 2018 and/or Seattle 2025
- [ ] **Wing anatomy diagrams** — either user-provided or confirm "use Wikimedia CC-licensed"
- [ ] **Intra-op photos** (optional) — beyond what's in `/public/nwra-2025/`, photos showing each surgical stage
- [ ] **Equipment list confirmation** — confirm/extend the 8-card list above; flag anything missing

---

## Notes on existing assets (already on disk)

**`/public/nwra-2025/`** (already wired into `/nwra-2025` page):
- `stage1-skin-suture.jpg`, `stage1-tplt-emr-sutured.jpg`, `the-fusion-day32.jpg`
- `speakers-backdrop.jpg`, `thank-you-01.jpg`, `thank-you-02.jpg`, `networking.jpg`

**`/public/treatments/`:**
- `usbc-full-setup.jpg`, `usbc-control-unit.jpg`, `usbc-handpiece.jpg`, `usbc-tip-sets.jpg`
- `barn-owl-anesthesia.jpg`, `black-kite-drip.jpg`, `painkiller-drops.jpg`
- `laser-therapy.jpg`, `laser-therapy-big.jpg`, `laser-wound-management.mp4`
- `kite-post-treatment.mp4`, `raptor-chick.mp4`, `baby-spotted-owlet.jpg`

**`/public/facility/`:**
- `lab-02.jpg`, `laser-surgery.jpg`, `ot-table.jpg`
- `enclosure-01.jpg`, `enclosure-02.jpg`, `enclosure-03.jpg`, `aviaries.mp4`

These cover ~80% of the equipment grid; only X-rays + slides + anatomy diagrams are still needed.
