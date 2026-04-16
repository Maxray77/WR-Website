/**
 * Annual Reports archive — infographic + full PDF per year.
 *
 * To add a new year:
 * 1. Drop the full PDF at `public/wr-annual-report.pdf` (current year)
 *    or `public/annual-reports/wr-annual-report-YYYY.pdf` (prior years).
 * 2. Drop the infographic PDF at `public/annual-reports/wr-annual-infographic-YYYY.pdf`.
 * 3. Export a JPG of the infographic (page 1) to `public/annual-reports/infographic-YYYY.jpg`.
 * 4. Export a JPG of the detailed report's cover page to `public/annual-reports/cover-YYYY.jpg`.
 * 5. Prepend a new entry to ANNUAL_REPORTS below.
 */

export interface AnnualReport {
  year: number;
  /** One-line headline for this year */
  headline: string;
  /** Short paragraph describing the year's milestones */
  summary: string;
  /** Preview image of the one-page infographic (JPG) */
  infographicImage: string;
  /** Download URL for the infographic PDF (one-page impact summary) */
  infographicPdf: string;
  /** Preview image of the detailed report's cover / first page (JPG) */
  coverImage: string;
  /** Download URL for the full detailed report PDF */
  fullReportPdf: string;
  /** Key stats pulled out for quick display */
  keyStats: { label: string; value: string }[];
}

export const ANNUAL_REPORTS: AnnualReport[] = [
  {
    year: 2025,
    headline: "A Second Chance at Flight",
    summary:
      "A landmark year — 4,214 birds rescued across 53 species, new high-tech equipment (digital X-ray, ICU incubators, ultrasonic scalpel), and the launch of our EV ambulance for greener rescue logistics.",
    infographicImage: "/annual-reports/infographic-2025.jpg",
    infographicPdf: "/annual-reports/wr-annual-infographic-2025.pdf",
    coverImage: "/annual-reports/cover-2025.jpg",
    fullReportPdf: "/wr-annual-report.pdf",
    keyStats: [
      { label: "Birds Rescued", value: "4,214" },
      { label: "Species", value: "53" },
      { label: "Black Kites", value: "3,341" },
      { label: "Egyptian Vultures", value: "8" },
    ],
  },
];
