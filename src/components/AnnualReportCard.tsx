import Image from "next/image";
import { FileText, Download, Image as ImageIcon } from "lucide-react";
import type { AnnualReport } from "@/lib/annual-reports-data";

interface AnnualReportCardProps {
  report: AnnualReport;
  /**
   * "full" — teal-gradient header + stats + two-up preview + CTAs (archive style).
   * "compact" — simpler card with just previews + download CTAs, no header bar.
   */
  variant?: "full" | "compact";
}

/**
 * Reusable card that renders an annual report with its infographic and
 * detailed-cover previews side-by-side plus download CTAs. Shared between
 * /annual-reports, /blog (featured), and /blog/[slug] detail pages so the
 * presentation stays consistent.
 */
export default function AnnualReportCard({
  report,
  variant = "full",
}: AnnualReportCardProps) {
  const isLandscape = report.infographicOrientation === "landscape";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {variant === "full" && (
        <div className="bg-gradient-to-r from-teal-dark to-teal px-6 py-5 lg:px-10 lg:py-6">
          <div className="flex flex-wrap items-baseline gap-3 justify-between">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
                {report.year} Annual Report
              </h3>
              <p className="text-sm text-white/80 italic mt-1">
                {report.headline}
              </p>
            </div>
            {report.keyStats && report.keyStats.length > 0 && (
              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                {report.keyStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-bold text-lg lg:text-xl text-amber-light">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/70 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-6 lg:p-10 grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
        {/* Left: infographic + cover preview */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
          {report.infographicImage && report.infographicPdf ? (
            <a
              href={report.infographicPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className={`relative rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-50 group-hover:shadow-xl transition-shadow ${
                  isLandscape ? "aspect-[16/9]" : "aspect-[9/16]"
                }`}
              >
                <Image
                  src={report.infographicImage}
                  alt={`${report.year} Annual Report infographic — one-page visual summary`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 288px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-teal/0 group-hover:bg-teal/10 transition-colors flex items-end justify-center opacity-0 group-hover:opacity-100 pb-4">
                  <span className="bg-white text-teal-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                    Open infographic
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate mt-2 text-center font-medium">
                One-Page Infographic
              </p>
            </a>
          ) : (
            <div className="block">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md border border-dashed border-gray-300 bg-gradient-to-br from-teal-light/50 to-offwhite flex flex-col items-center justify-center text-center px-6">
                <ImageIcon size={40} className="text-teal/50 mb-3" />
                <p className="text-sm font-semibold text-charcoal/70">
                  Infographic
                </p>
                <p className="text-xs text-slate mt-1">Coming soon</p>
              </div>
              <p className="text-xs text-slate mt-2 text-center font-medium">
                One-Page Infographic
              </p>
            </div>
          )}

          <a
            href={report.fullReportPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-50 group-hover:shadow-xl transition-shadow">
              <Image
                src={report.coverImage}
                alt={`${report.year} Annual Report — detailed PDF cover preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 288px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-teal/0 group-hover:bg-teal/10 transition-colors flex items-end justify-center opacity-0 group-hover:opacity-100 pb-4">
                <span className="bg-white text-teal-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                  Open detailed report
                </span>
              </div>
            </div>
            <p className="text-xs text-slate mt-2 text-center font-medium">
              Detailed Report — Cover
            </p>
          </a>
        </div>

        {/* Right: summary + download CTAs */}
        <div className="lg:col-span-2">
          <p className="text-slate leading-relaxed">{report.summary}</p>

          <div className="mt-6 space-y-3">
            <a
              href={report.fullReportPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-teal hover:bg-teal-dark text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg group"
            >
              <span className="flex items-center gap-3">
                <FileText size={18} />
                Download Detailed Report
              </span>
              <Download size={16} className="opacity-70 group-hover:opacity-100" />
            </a>

            {report.infographicPdf ? (
              <a
                href={report.infographicPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-white hover:bg-teal-light text-charcoal font-semibold px-5 py-3.5 rounded-xl text-sm transition-all border border-gray-200 hover:border-teal/30 group"
              >
                <span className="flex items-center gap-3">
                  <ImageIcon size={18} className="text-teal" />
                  Download Infographic
                </span>
                <Download size={16} className="text-slate group-hover:text-teal" />
              </a>
            ) : (
              <div className="flex items-center justify-between gap-3 bg-gray-50 text-slate/60 font-semibold px-5 py-3.5 rounded-xl text-sm border border-dashed border-gray-200 cursor-not-allowed">
                <span className="flex items-center gap-3">
                  <ImageIcon size={18} />
                  Infographic — Coming Soon
                </span>
              </div>
            )}
          </div>

          <p className="mt-6 text-xs text-slate">
            Reports are released annually and include audited financial
            statements, intake data, and program details.
          </p>
        </div>
      </div>
    </div>
  );
}
