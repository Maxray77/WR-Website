/**
 * Annual Reports archive — infographic + full PDF per year.
 *
 * To add a new year:
 * 1. Drop the full PDF at `public/annual-reports/wr-annual-report-YYYY.pdf`
 *    (or `public/wr-annual-report.pdf` for the current-year featured one).
 * 2. (Optional) Drop the infographic PDF at `public/annual-reports/wr-annual-infographic-YYYY.pdf`.
 * 3. (Optional) Export a JPG of the infographic page 1 to `public/annual-reports/infographic-YYYY.jpg`.
 * 4. Export a JPG of the detailed report's cover page to `public/annual-reports/cover-YYYY.jpg`.
 * 5. Prepend a new entry to ANNUAL_REPORTS below.
 *
 * Years without an infographic render a "Coming soon" placeholder in the
 * infographic slot while still showing the detailed cover + PDF download.
 */

export interface AnnualReport {
  year: number;
  /** One-line headline for this year */
  headline: string;
  /** Short paragraph describing the year's milestones */
  summary: string;
  /** Preview image of the one-page infographic (JPG). Omit if not yet produced. */
  infographicImage?: string;
  /** Download URL for the infographic (PDF or image). Omit if not yet produced. */
  infographicPdf?: string;
  /** Orientation of the infographic — controls preview card aspect ratio. Defaults to 'portrait'. */
  infographicOrientation?: "portrait" | "landscape";
  /** Preview image of the detailed report's cover / first page (JPG) */
  coverImage: string;
  /** Download URL for the full detailed report PDF */
  fullReportPdf: string;
  /** Key stats pulled out for quick display */
  keyStats?: { label: string; value: string }[];
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
  {
    year: 2022,
    headline: "Annual Intake Analysis — 3,385 Rescues",
    summary:
      "The Oscar-nominated documentary All That Breathes brought global attention to our work. Black Kites dominated intake at 85% of all rescues, while 39 unique species were treated — including 13 rare single-instance rescues.",
    infographicImage: "/annual-reports/infographic-2022.jpg",
    infographicPdf: "/annual-reports/infographic-2022.jpg",
    infographicOrientation: "landscape",
    coverImage: "/annual-reports/cover-2022.jpg",
    fullReportPdf: "/annual-reports/wr-annual-report-2022.pdf",
    keyStats: [
      { label: "Total Rescues", value: "3,385" },
      { label: "Black Kites", value: "2,872" },
      { label: "Species", value: "39" },
      { label: "Rare Species", value: "13" },
    ],
  },
  {
    year: 2021,
    headline: "2021 In Numbers",
    summary:
      "A year of steady recovery from the pandemic slowdown — expanded intake, more volunteer capacity, and broader species coverage documented in our visual annual review.",
    coverImage: "/annual-reports/cover-2021.jpg",
    fullReportPdf: "/annual-reports/wr-annual-report-2021.pdf",
  },
  {
    year: 2020,
    headline: "Annual Report 2020",
    summary:
      "Despite the COVID-19 pandemic, Wildlife Rescue stayed operational throughout 2020, continuing to rescue and rehabilitate birds across Delhi through lockdowns and restrictions.",
    coverImage: "/annual-reports/cover-2020.jpg",
    fullReportPdf: "/annual-reports/wr-annual-report-2020.pdf",
  },
];
