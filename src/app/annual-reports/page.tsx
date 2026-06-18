import type { Metadata } from "next";
import Link from "next/link";
import { FileText, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnnualReportCard from "@/components/AnnualReportCard";
import IntakeSpeciesSection from "@/components/intake/IntakeSpeciesSection";
import IntakeAgeSection from "@/components/intake/IntakeAgeSection";
import IntakeConditionsSection from "@/components/intake/IntakeConditionsSection";
// IntakeOutcomesSection is built but unwired pending Saud's review of release-rate data.
// Re-enable when ready: import IntakeOutcomesSection from "@/components/intake/IntakeOutcomesSection";
import { RESCUE_BY_YEAR } from "@/lib/constants";
import { ANNUAL_REPORTS } from "@/lib/annual-reports-data";

export const metadata: Metadata = {
  title: "Annual Rescue Reports",
  description:
    "Wildlife Rescue's annual rescue reports — 16 years of intake data, growth phases, and downloadable yearly reports. From 362 birds in 2010 to 4,184 in 2025.",
};

export default function AnnualReportsPage() {
  const maxRescue = Math.max(...RESCUE_BY_YEAR.map((r) => r.total));

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Annual Rescue Reports
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            16 years of rescue data. Intake statistics, growth phases, and our
            complete archive of yearly reports.
          </p>
        </div>
      </section>

      {/* ─── Key Metrics ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <TrendingUp size={24} />, stat: "12x", label: "Growth in 15 years", sub: "362 → 4,184 birds/year" },
              { icon: <Users size={24} />, stat: "40,000+", label: "Total birds rescued", sub: "Crossed 40,000 on 13 June 2026" },
              { icon: <TrendingUp size={24} />, stat: "17.7%", label: "Compound annual growth", sub: "Consistent acceleration" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-teal-light rounded-xl mx-auto flex items-center justify-center text-teal mb-3">
                  {m.icon}
                </div>
                <div className="text-3xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                  {m.stat}
                </div>
                <p className="text-charcoal font-semibold text-sm mt-1">{m.label}</p>
                {m.sub && <p className="text-slate text-xs mt-0.5">{m.sub}</p>}
              </div>
            ))}
          </div>

          {/* ─── Intake Chart ─── */}
          <SectionHeading
            title="Annual Intake: Since 2010"
            subtitle="Birds rescued per year — from founding to today."
          />

          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-10">
            <div className="space-y-3">
              {RESCUE_BY_YEAR.map((item) => (
                <div key={item.year} className="flex items-center gap-4">
                  <span className="text-sm text-slate font-mono w-12 shrink-0">
                    {item.year}
                  </span>
                  <div className="flex-1 bg-offwhite rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-teal-dark rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{
                        width: `${(item.total / maxRescue) * 100}%`,
                        minWidth: "60px",
                      }}
                    >
                      <span className="text-white text-xs font-bold">
                        {item.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who We Rescue ─── */}
      <IntakeSpeciesSection />

      {/* ─── Who Arrives (Age) ─── */}
      <IntakeAgeSection />

      {/* ─── Why They Come In (Conditions) ─── */}
      <IntakeConditionsSection />

      {/* "What Happens (Outcomes)" section temporarily removed pending Saud's
          review of release-rate data. Component file retained at
          src/components/intake/IntakeOutcomesSection.tsx for later revival. */}

      {/* ─── Five Growth Phases ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Five Growth Phases"
            subtitle="The story of Wildlife Rescue told through data."
          />

          <div className="space-y-6">
            {[
              { phase: "Phase 1", period: "2010", title: "Home Operations", birds: "362/year", description: "Two brothers rescuing birds from their home in Old Delhi's Walled City. Birds literally 'delivered at home.' Case #317 marks the beginning." },
              { phase: "Phase 2", period: "2011–2014", title: "Explosive Growth", birds: "1,011–1,974/year", description: "The Charity Birds Hospital partnership ignites. Volume nearly triples in 3 years. In 2013, the rescue moves from Old Delhi to a dedicated facility in Wazirabad Village. Species diversity grows from 9 to 42." },
              { phase: "Phase 3", period: "2015–2018", title: "Consolidation", birds: "~2,083–2,365/year", description: "Operations stabilize and professionalize. Partner network solidifies around 5 core organizations." },
              { phase: "Phase 4", period: "2019–2021", title: "Renewed Growth", birds: "2,489–2,815/year", description: "COVID barely dents operations (−3% in 2020). New partners emerge. Prem Bhawan grows 5x." },
              { phase: "Phase 5", period: "2022–2025", title: "Documentary Era", birds: "3,398–4,184/year", description: "All That Breathes brings global attention. Intake jumps 24% in 2022. 2025 is the highest year ever. 10+ partner organizations active." },
            ].map((phase) => (
              <div key={phase.phase} className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="shrink-0 sm:w-40">
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-bg text-amber rounded-full">
                    {phase.phase}
                  </span>
                  <p className="text-sm font-semibold text-charcoal mt-2">
                    {phase.period}
                  </p>
                  <p className="text-xs text-teal font-bold mt-0.5">
                    {phase.birds}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Report Archive (Infographic + Full PDF per year) ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Annual Report Archive"
            subtitle="Quick-look infographics and full detailed PDFs for every year."
          />

          <div className="mt-12 space-y-16">
            {ANNUAL_REPORTS.map((report) => (
              <AnnualReportCard key={report.year} report={report} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate">
            For earlier reports or specific data requests, please contact{" "}
            <a
              href="mailto:nadeem@raptorrescue.org"
              className="text-teal font-semibold hover:underline"
            >
              nadeem@raptorrescue.org
            </a>
          </p>
        </div>
      </section>

      {/* ─── Cross-link to Financials ─── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign size={36} className="text-teal mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Looking for our financials?
          </h2>
          <p className="mt-3 text-slate max-w-2xl mx-auto">
            Five years of audited income, expenditure, capital investment and
            balance sheet data — with a year-by-year expenditure breakdown.
          </p>
          <Link
            href="/financials"
            className="mt-6 inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Financial Transparency
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
