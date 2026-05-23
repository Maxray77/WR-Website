# Case Records Integration — Planning Doc

**Status:** Data extracted, build pending.
**Created:** 2026-05-23
**Related:** Master Intake Database (`build_master_intake.py`), `intake-data.ts`, patient-records research database (Phase 2 from 2026-05-22 session)

---

## What's Available Now

The Wildlife Rescue clinical case records exist as individual `.xlsx` files at:
```
C:/Users/maxra/Documents/Wildlife Rescue/Data/Case Records Excel/Case Records/
```

Each file is a single Case Record form. **Layout is 100% identical across 2019–2025** (verified by sampling) — same row/column positions for every field.

### Extractor

`C:/Users/maxra/Documents/Wildlife Rescue/Data/Master Data/extract_case_records.py`

- Fixed-position parser using `openpyxl`
- Handles multi-line blocks (Condition, Treatment, Remarks, Final Status)
- Canonicalises species via alias map (Black Kite suffixes, OHB, typo merges from build_master_intake.py)
- Normalises Final Status → {Released, Died, Transferred, Escaped, Euthanised, In Treatment, Permanent Resident}
- Extracts outcome date from Final Status free text via regex
- Deduplicates by Case No. (first-occurrence wins; "Complete" folders + month folders contain overlapping copies)
- Performance: **~91 files/sec, full 16,450 in ~3 minutes**, zero parse errors

### Outputs (regeneratable any time)

| File | Format | Use |
|---|---|---|
| `case_records.csv` | CSV with UTF-8 BOM | Flat analysis, Excel/Sheets import |
| `case_records.db` | SQLite + indexes (species/date/outcome/year) | Query layer for website + future admin UI |

### Re-running

```bash
cd "C:/Users/maxra/Documents/Wildlife Rescue/Data/Master Data/"
python extract_case_records.py              # Full
python extract_case_records.py --year 2024  # Single year
python extract_case_records.py --sample 200 # First N (testing)
```

---

## Headline Findings

**Coverage:** 14,092 unique cases extracted (~35.5% of total 39,681 intake — vs prior 7,230 documented register cases at 18.2%).

### Condition Breakdown (CORRECTED — cases can hit multiple categories)

Base = 13,941 records with condition text. Cases hitting zero categories: 1,556 (11.2% Unclassified).

| Category | n | % of 13,941 | Notes |
|---|---|---|---|
| **Manja Injuries** | **5,916** | **42.4%** | Up from 39.1% in prior sample. Confirmed signature pattern. |
| Septicemia / Infection | 2,326 | 16.7% | Up from 2.5% — register data dramatically understated |
| Fractures | 2,231 | 16.0% | Stable |
| Dehydration / Emaciation | 1,957 | 14.0% | NEW visibility |
| External Examination Normal | 1,769 | 12.7% | Triage / observation cases |
| Orphan / Chick | 1,495 | 10.7% | Down from 18.5% (cleaner definition) |
| **Avian Pox** | **185** | **1.3%** | Verified against ~60/year prior estimate; matches "juveniles only" framing on `/conditions/avian-pox` |
| Maggot Wound (Myiasis) | 115 | 0.8% | NEW |
| Eye Injury | 22 | 0.2% | |
| Internal Issue / Toxicosis | 18 | 0.1% | |
| Dislocation / Joint Issue | 14 | 0.1% | |
| Methane Burn / Burn | 13 | 0.1% | |
| Electrocution / Electric Shock | 1 | 0.0% | |

**Avian Pox false-positive resolved (2026-05-23):** Earlier 29.6% figure was from bare `"ap"` substring matching "perpapagium" (anatomical term in 4,003 manja-injury cases). Classifier corrected; true count is 185 cases, ~26/year average, almost entirely Black Kite + Blue Rock Pigeon nestlings/fledglings — accepted by user.

**"Beyond Recovery / Critical" excluded (2026-05-23):** User decision — it's a prognosis descriptor, not a condition. Not classified, not published.

**Juvenile undercount resolved (2026-05-23 — per Saud's vet review):** The "Orphan/Chick" condition-keyword bucket (10.7%) was undercounting because it only read condition text. The structured `age` column reveals the true juvenile-stage population: **4,763 cases = 33.8% of intake** (Nestling 13.5%, Fledgling 13.0%, Juvenile 6.5%, Hatchling 0.8%). Saud also flagged the Dehydration/Emaciation overlap: **67% of dehydrated/emaciated cases are juveniles**, not adults — young birds commonly present in poor condition at intake. Implication: conditions and age must be presented as orthogonal views, with caveat about overlap.

CSV at `Master Data/condition_breakdown_corrected.csv` for next session.

### Juvenile-stage cohort findings (4,763 cases)

| Primary condition | n | % of juveniles |
|---|---|---|
| Dehydrated / Emaciated | 1,312 | 27.5% |
| External Exam Normal (pure orphan / fallen-from-nest) | 926 | 19.4% |
| Manja-pattern injuries | 933 | 19.6% |
| Fractures | 500 | 10.5% |
| **Metabolic Bone Disease (MBD)** | **382** | **8.0%** — NEW finding, worth surfacing |
| Septicemia / Infection | 217 | 4.6% |
| Avian Pox | 84 | 1.8% |
| Maggot Wound | 27 | 0.6% |

### Outcomes by age (NEW — counterintuitive)

| Cohort | n | Released | Died |
|---|---|---|---|
| Adults | 9,253 | 67.9% | 23.5% |
| **Juvenile-stage** | 4,774 | **74.8%** | 20.1% |

Juveniles fare BETTER than adults — likely because juvenile cases skew toward "dehydrated/fallen" rather than catastrophic manja wounds.

### Outcome Rates by Species (NEW — never published)

| Species | n | Released | Died | Transferred |
|---|---|---|---|---|
| **Black Kite** | 11,848 | **77.1%** | 18.8% | <1% |
| Black Eared Kite | 348 | 75.3% | 18.4% | 0 |
| Barn Owl | 385 | 36.6% | 57.7% | 0 |
| Shikra | 184 | 22.8% | 74.5% | 0 |
| Cattle Egret | 131 | 26.0% | 67.2% | 0 |
| Spotted Owlet | 60 | 35.0% | 61.7% | 0 |
| Indian Grey Hornbill | 47 | 25.5% | 48.9% | 0 |
| Blue Rock Pigeon | 511 | 5.7% | 9.2% | **84% (Transferred)** |

### Year-over-Year Release Rate

| Year | n | Released | Died |
|---|---|---|---|
| 2019 | 2,168 | 81.5% | 16.6% |
| 2020 | 2,263 | 82.5% | 16.1% |
| 2021 | 887 | 31.3% | 19.5% | *(partial coverage — only 900 Excel files exist; "In Treatment" likely inflated)* |
| 2022 | 2,873 | **84.2%** | 9.3% | *(peak year)* |
| 2023 | 2,180 | 54.5% | 38.2% |
| 2024 | 2,177 | 65.5% | 30.8% |
| 2025 | 1,544 | 62.2% | 30.9% |

**Note on 2023+ dip:** Likely a mix of (a) still-open cases not yet marked Released at extraction time, (b) tougher caseload, (c) possible data-entry lag. Investigate before publishing year-over-year trend.

### Top 15 Species (by case count in extracted records)

1. Black Kite — 13,818 (98% of intake)
2. Blue Rock Pigeon — 689
3. Barn Owl — 438
4. Black Eared Kite — 369
5. Shikra — 215
6. Cattle Egret — 157
7. Spotted Owlet — 68
8. Indian Grey Hornbill — 57
9. Common Crow — 34
10. White Breasted Kingfisher — 31
11. Red Wattled Lapwing — 25
12. Crested Serpent Eagle — 25
13. Egyptian Vulture — 24
14. Black Headed Ibis — 23
15. Red Naped Ibis — 23

(Total 142 distinct species in canonical names.)

---

## Build Plan — Ranked by Impact

### **Tier 1: Refresh `/annual-reports` "Why They Come In"**
**Effort:** Small (1–2 hours)
**Impact:** Stronger credibility, more accurate stats

**Work:**
- Update `src/lib/intake-data.ts` `CONDITION_BREAKDOWN` with refreshed numbers from the 14k extraction
- Update the caveat banner in `IntakeConditionsSection.tsx`: "based on 7,230 documented register cases (18.2%)" → "based on **14,092 detailed clinical records (35.5%)**"
- Re-evaluate Avian Pox visibility — currently buried; should be promoted given 29.6% finding
- Decide whether "Beyond Recovery" deserves its own bar or merges into another category

**Pending decision:** "Beyond Recovery" is more a *prognosis* than a condition — exclude or rename? It overlaps heavily with Manja + Fractures categories.

---

### **Tier 2: Three new orthogonal sections on `/annual-reports`** *(revised after Saud's review)*
**Effort:** Medium (1 focused session)
**Impact:** **Highest narrative impact** — first time WR can publish release rates + age + clinical patterns publicly

The previous "one outcomes section" plan was too flat. After Saud's catch on the dehydration/juvenile overlap, the right design is **three orthogonal cuts** of the 14,092-case dataset, with a single shared caveat banner.

**Section A: "Who Arrives — Who We Rescue by Age"** (NEW)
- Age breakdown using structured `age` field, not condition keywords
- Adults 64.7% · Nestling 13.5% · Fledgling 13.0% · Juvenile 6.5% · Hatchling 0.8%
- Headline: *"1 in 3 birds we rescue is a juvenile."*
- Sub-narrative: 8% of juveniles arrive with **Metabolic Bone Disease** — pattern indicating improper hand-rearing before transfer to WR

**Section B: "Why They Come In — Conditions"** (refresh of existing)
- Refreshed condition breakdown (Manja 42.4%, Septicemia 16.7%, Fractures 16.0%, Dehydration 14.0%, etc.)
- **Banner caveat**: *"These views overlap — a dehydrated nestling with a fracture appears in all three buckets. We don't aggregate them as mutually exclusive."*
- Explicit note: 67% of Dehydration/Emaciation cases are juveniles, not adults

**Section C: "What Happens — Outcomes"** (NEW)
- Hero stat: **"77.1% of Black Kites released since 2019"**
- Outcome rates by species (top 8 with n ≥ 50)
- Outcome rates by age — counterintuitive finding: **juveniles fare slightly better (74.8% released vs 67.9% adult)**
- Year-over-year release rate chart 2019–2025
- Honest caveats on lower-release species (Shikra, Barn Owl) and 2023+ dip

**Pending decision:** Whether to publish the 2023+ release-rate dip (84.2% → 54.5%) or hold it pending Saud's review of data-completeness. Recommendation: include the 2019–2022 trend (clean, climbing) and footnote that 2023+ data is provisional / in-progress.

---

### **Tier 3: Species page outcome stats**
**Effort:** Small (per species, scales linearly)
**Impact:** Real clinical credibility per species page

**Work:**
- Add `outcomeStats?: { since: number, released: number, died: number, transferred: number, total: number }` to `Species` interface in `species-data.ts`
- Generate stats from `case_records.db` for each species with n ≥ 50 (probably top 8 species qualify)
- Render on each species detail page as a "Clinical Outcomes" mini-section between gallery and Fun Fact

**Pending decision:** Threshold for "enough data to publish" — n ≥ 30? n ≥ 50? Affects which species get the section.

---

### **Tier 4: Treatment-usage stats on `/treatments`**
**Effort:** Medium (data exploration + per-treatment counts)
**Impact:** Showcases scale + capability investment

**Work:**
- Aggregate top drugs/procedures appearing in `treatment` field across all 14k records
- Stats like:
  - *"X,XXX surgeries performed using Ultrasonic Bone Cutter since 2019"*
  - *"X,XXX cases treated with gas anesthesia"*
  - *"X,XXX laser wound-management procedures"*
- Add stat strip to each treatment entry on `/treatments`

**Pending exploration:** Need to see how clean/categorisable the `treatment` field is — drug names, procedure names, doses. Likely needs a `TREATMENT_KEYWORDS` map similar to the condition classifier.

---

### **Tier 5: Patient Records Research Database — Admin Search/Filter UI**
**Effort:** Large (multi-session project)
**Impact:** Foundation for clinical research; staff productivity tool

**Work:**
- Build internal staff-only UI (auth-gated like `/api/admin/donations`)
- Query layer over `case_records.db`
- Search by Case No., species, date range, condition keyword, outcome
- Per-case detail view (all 40+ fields)
- Export filtered subsets as CSV for ad-hoc analysis
- Possibly integrate with the future Raptor Lab App (shared infrastructure, shared auth, single source of truth for Case No.)

**Pending decisions:**
- Standalone repo or part of WR website? (Likely part of WR website — same Vercel project, same auth, lower complexity)
- Sync mechanism: re-extract from .xlsx on schedule (cron) or one-time + manual re-runs?
- Permissions model — Saud full access, Samia view-only, Nadeem admin

---

### **Tier 6: Deep Clinical Research Outputs**
**Effort:** Per analysis — varies
**Impact:** Publishable research

Possibilities once the DB exists:
- Body Score × Outcome correlation analysis
- Length-of-Stay distribution by species + condition (intake date → outcome date)
- Treatment regimen efficacy by condition (Manja-injured Black Kites: surgical-suture cohort vs. medical-only cohort)
- Manja injury severity trends over time
- Avian Pox seasonality + age distribution
- Vulture rehab outcomes (currently sparse but data is captured)

---

## Open Questions / Pending Decisions Before Building

### DECIDED (2026-05-23)

- ✅ **"Beyond Recovery / Beyond Repair" → DO NOT PUBLISH.** User decision. This is a prognosis descriptor, not a condition, and is misleading sitting next to actual conditions like Manja Injuries. Remove from the classifier keyword set entirely so it doesn't contaminate the bar chart. The cases themselves still get classified by their other keywords (Manja, Fracture, etc.).

- 🔍 **Avian Pox finding (29.6%) → PARKED PENDING SAUD'S REVIEW.** User flagged it as suspicious (matches our prior expectation that it's a juveniles-only condition seen ~60 cases/year per the existing `/conditions/avian-pox` page). **Likely cause of false positive: the classifier keyword `"ap"` is a 2-char match that fires on countless unrelated words** (cap, lap, gap, application, appear, etc.). Fix in classifier: drop the bare `"ap"` keyword; keep only `"pox"` and `"avian pox"`. Re-run after fix to get the true Avian Pox count, then Saud reviews.

### STILL OPEN

1. **2023+ release-rate dip** — data completeness issue or real clinical pattern? Need Saud's input before publishing year-over-year trend chart.

2. **Treatment field categorisation** — needs a keyword map similar to conditions. Probably do this with a fresh `export_treatments.py` if/when Tier 4 is built.

3. **Body Score / Hydration fields** — currently stored as "8/10" string format. For clinical analysis, parse to numeric. Trivial fix when Tier 6 is built.

4. **2021 partial coverage** — only 900 .xlsx files for 2021 (vs 2,000+ for adjacent years). Either missing files or different storage in that year. Worth investigating before publishing 2021 stats.

### Fixes to apply before next build session

In `extract_case_records.py` `CATEGORIES` dict:
- Drop `"Beyond Recovery / Critical"` category entirely (don't classify, don't publish)
- In `"Avian Pox"`: change `["pox", "avian pox", "ap"]` → `["pox", "avian pox"]` (remove bare `"ap"`)
- Re-run extraction → updated condition percentages will be accurate

---

## Files Touched / Created

- `extract_case_records.py` — NEW, in `Master Data/`
- `case_records.csv` — NEW output
- `case_records.db` — NEW output

**Not yet touched** (will be touched when Tier 1+2 build kicks off):
- `src/lib/intake-data.ts` — refresh CONDITION_BREAKDOWN
- `src/components/intake/IntakeConditionsSection.tsx` — update caveat
- `src/components/intake/IntakeOutcomesSection.tsx` — NEW component
- `src/app/annual-reports/page.tsx` — wire new section
- `export_intake_data.py` (in Master Data) — extend to pull from `case_records.db` too

---

## Next Session Pickup

1. **Decision check-in with Saud** on the open questions above (especially Avian Pox finding and 2023+ dip)
2. Then **build Tier 1 + Tier 2 together** in one focused session — they share data pipeline + caveats + visual language
3. Tier 3 (species page outcomes) is a follow-up iteration after Tier 1+2 land

**Estimated session time for Tier 1+2:** ~2 hours of focused build + verification.
