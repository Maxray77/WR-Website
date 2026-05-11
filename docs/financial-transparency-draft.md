# Financial Transparency — 5-Year Summary Draft

**Status:** Drafted from scanned PDFs on 2026-05-11. **Awaiting user verification** of ⚠️ flagged figures before locking in.

**Source documents:** `C:\Users\maxra\Documents\Wildlife Rescue\Accounts\5 Year FD\`
- `Financial Statments Consolidated 2020-21.pdf`
- `WR Consolidated 21-22.pdf`
- `WR Consolidated 2022-23.pdf`
- `Consolidated 2023-24.pdf`
- `FY 2024-25 Consolidated.pdf`

**Render cache (Python pypdfium2 @ 4× scale):** `%TEMP%\wr-fd-pages-hi\` — regenerate with the snippet at the bottom of this file if cache is gone.

---

## 5-Year Summary Table (All figures in INR)

| Line item | FY 2020-21 | FY 2021-22 | FY 2022-23 | FY 2023-24 | FY 2024-25 |
|---|---:|---:|---:|---:|---:|
| **Income** | | | | | |
| Donations Received (cash) | 21,03,611.98 | 24,64,672.00 ⚠️ | 28,86,686.24 | 28,90,765.59 | 39,61,392.84 |
| Donations Received in Kind | — | — | 2,07,068.00 | 60,465.27 | 1,56,016.06 |
| Other Income / Job Work | — | — | — | 37,654.00 | 1,26,730.00 |
| Interest Received | 14,247.00 | 7,432.00 ⚠️ | 12,543.00 | 19,247.00 | 22,548.00 |
| **Total Income** | **21,17,858.98** | **24,72,104.00** | **31,06,297.24** | **30,08,131.86** | **42,66,646.90** |
| | | | | | |
| **Expenditure** | | | | | |
| Direct Expenses | 6,38,868.11 | 6,06,185.47 ⚠️ | 13,46,398.00 | 28,15,232.84 | 38,72,559.06 |
| Indirect Expenses | 9,60,559.25 | 16,16,859.16 ⚠️ | 12,65,312.96 | 1,24,487.94 | 3,71,771.63 |
| Fixed Asset Purchased (on I&E) | 2,80,435.00 | 33,860.00 | — | — | — |
| **Total Expenditure** | **18,79,862.36** | **22,56,904.63** | **26,11,710.96** | **29,39,720.78** | **42,44,330.69** |
| **Surplus / (Deficit)** | **2,31,996.62** | **1,55,179.37** | **3,00,590.58** | **68,411.08** | **4,22,304.51** ⚠️ |
| | | | | | |
| **Balance Sheet (closing)** | | | | | |
| Fixed Assets (WDV) | 1,90,448.00 | 2,93,098.19 | 3,17,701.19 | 4,67,208.42 | 15,56,532.99 |
| Cash & Bank balances | 2,19,588.68 | 3,49,272.86 | 5,98,437.64 | 4,46,409.49 | 1,16,374.75 |
| Security Deposit | 40,000.00 | 40,000.00 | 40,000.00 | 40,000.00 | 40,000.00 |
| **Total Assets** | **4,50,836.68** | **6,82,361.25** | **9,55,848.83** | **9,76,565.91** | **19,14,374.22** |
| | | | | | |
| Capital Fund (closing) | 2,31,512.68 | 3,86,692.25 | 6,87,282.83 | 7,55,693.91 | 11,77,998.42 |
| Unsecured Loans (closing) | 1,32,844.00 | 1,32,444.00 | 1,32,444.00 | 1,01,942.00 | 44,122.00 |

---

## ⚠️ OCR-uncertain figures — verify against PDFs

- **FY 21-22 Donations Received** — could be `22,64,672` instead of `24,64,672`
- **FY 21-22 Interest Received** — digit not clear (`7,432` is best guess)
- **FY 21-22 Direct/Indirect split** — categorization for this year was hard to read; total expenditure of ₹22,56,904 should be reliable
- **FY 24-25 Surplus** — Balance Sheet shows `4,22,304.51`, I&E page shows `4,22,304.31` (20-paise mismatch)
- **FY 24-25 Total Interest** — best read is ₹22,511 + ₹37 (Interest on Refund) = ₹22,548; verify the second figure

---

## Categorization caveat

The Direct vs Indirect classification **shifts year-on-year** in the source statements:

- FY 23-24: Salaries & Honorarium (₹18,04,232) sits under **Direct Expenses**
- FY 24-25: Same items split as Honorarium ₹9,00,000 + Salaries ₹10,27,332 + Wages ₹3,54,728, all under **Direct Expenses**
- FY 22-23: Salaries (₹5,93,090) sits under **Indirect Expenses**

For a public-facing transparency page, **collapse to a single Total Expenditure** rather than showing a meaningless year-on-year split. If a programme-vs-admin breakdown is desired, it must be **manually re-categorized** by an accountant since the source statements don't do it consistently.

---

## Suggested deliverables

1. **Excel file** — one sheet, columnar 5-year summary, INR formatting (Indian lakh-crore style), teal headers + amber surplus row. Target path: `public/annual-reports/wr-financials-5yr.xlsx` (so it's downloadable).
2. **PDF version** — generated from the Excel for static rendering. Target path: `public/annual-reports/wr-financials-5yr.pdf`.
3. **HTML version** — embedded on `/annual-reports` as a "Financial Transparency" section (above the per-year cards), so the data is SEO-indexable and accessible. Should match the Excel exactly.

---

## Helper: regenerate page-image cache

```python
import pypdfium2 as pdfium
import os

src = r'C:\Users\maxra\Documents\Wildlife Rescue\Accounts\5 Year FD'
out = r'C:\Users\maxra\AppData\Local\Temp\wr-fd-pages-hi'
os.makedirs(out, exist_ok=True)

files = {
    '2020-21': 'Financial Statments Consolidated 2020-21.pdf',
    '2021-22': 'WR Consolidated 21-22.pdf',
    '2022-23': 'WR Consolidated 2022-23.pdf',
    '2023-24': 'Consolidated 2023-24.pdf',
    '2024-25': 'FY 2024-25 Consolidated.pdf',
}

for yr, fname in files.items():
    pdf = pdfium.PdfDocument(os.path.join(src, fname))
    for i in range(len(pdf)):
        page = pdf[i]
        img = page.render(scale=4.0).to_pil()
        img.save(os.path.join(out, f'{yr}_p{i+1}.png'))
    pdf.close()
```

**Page mapping per year:**
| Year | p1 | p2 | p3 | p4 |
|---|---|---|---|---|
| 2020-21 | Balance Sheet | Income & Exp | Receipts & Pay | Fixed Assets |
| 2021-22 | Balance Sheet | Income & Exp | Receipts & Pay | Fixed Assets |
| 2022-23 | Balance Sheet | **Receipts & Pay** | **Income & Exp** | Fixed Assets |
| 2023-24 | Balance Sheet | Income & Exp | Receipts & Pay | Fixed Assets |
| 2024-25 | Balance Sheet | Income & Exp | Receipts & Pay | Fixed Assets |

Note: **FY 2022-23 has p2 and p3 swapped** vs the other years.
