import type { Metadata } from "next";
import { FileText, TrendingUp, DollarSign, Users, Download } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { RESCUE_BY_YEAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Annual Reports",
  description:
    "Wildlife Rescue's annual reports — 16 years of data-backed impact. Intake statistics, financial transparency, and growth from 362 birds in 2010 to 4,184 in 2025.",
};

const FINANCIAL_DATA = [
  { year: "2019-20", income: "₹8,27,567", expenditure: "₹8,27,567" },
  { year: "2020-21", income: "₹21,17,858", expenditure: "₹21,17,858" },
  { year: "2021-22", income: "₹22,72,104", expenditure: "₹22,72,104" },
  { year: "2022-23", income: "₹31,06,297", expenditure: "₹31,06,852" },
  { year: "2023-24", income: "₹30,08,131", expenditure: "₹30,08,131" },
  { year: "2024-25", income: "₹42,66,646", expenditure: "₹42,66,646" },
];

const EXPENDITURE_BREAKDOWN = [
  { category: "Salaries & Wages", amount: "₹22,88,060", percentage: "53.6%", color: "bg-teal" },
  { category: "Food for Birds", amount: "₹2,00,903", percentage: "4.7%", color: "bg-amber" },
  { category: "Rescue & Release", amount: "₹1,28,208", percentage: "3.0%", color: "bg-success" },
  { category: "Medicine for Birds", amount: "₹63,044", percentage: "1.5%", color: "bg-danger" },
  { category: "Other Expenses", amount: "₹15,86,431", percentage: "37.2%", color: "bg-slate" },
];

export default function AnnualReportsPage() {
  const maxRescue = Math.max(...RESCUE_BY_YEAR.map((r) => r.total));
  const totalRescued = RESCUE_BY_YEAR
    .filter((r) => r.year <= 2025)
    .reduce((sum, r) => sum + r.total, 0);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Annual Reports
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            16 years of data-backed impact. Complete transparency on our growth,
            intake, and finances.
          </p>
        </div>
      </section>

      {/* ─── Key Metrics ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: <TrendingUp size={24} />, stat: "12x", label: "Growth in 15 years", sub: "362 → 4,184 birds/year" },
              { icon: <Users size={24} />, stat: totalRescued.toLocaleString(), label: "Total birds rescued (2010–2025)", sub: `Case #317 to #${(316 + totalRescued).toLocaleString()}` },
              { icon: <TrendingUp size={24} />, stat: "17.7%", label: "Compound annual growth", sub: "Consistent acceleration" },
              { icon: <DollarSign size={24} />, stat: "₹42.7L", label: "Annual budget (2024-25)", sub: "5x growth in 5 years" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-teal-light rounded-xl mx-auto flex items-center justify-center text-teal mb-3">
                  {m.icon}
                </div>
                <div className="text-3xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                  {m.stat}
                </div>
                <p className="text-charcoal font-semibold text-sm mt-1">{m.label}</p>
                <p className="text-slate text-xs mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* ─── Intake Chart ─── */}
          <SectionHeading
            title="Annual Intake: 2010–2025"
            subtitle="Birds rescued per year — from founding to record-breaking 2025."
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

      {/* ─── Financial Transparency ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Financial Transparency"
            subtitle="Every rupee accounted for. Complete income and expenditure data."
          />

          {/* Income/Expenditure Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-dark text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Financial Year
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Total Income
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Total Expenditure
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FINANCIAL_DATA.map((row, i) => (
                    <tr
                      key={row.year}
                      className={i % 2 === 0 ? "bg-white" : "bg-offwhite"}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                        {row.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-charcoal font-mono">
                        {row.income}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-charcoal font-mono">
                        {row.expenditure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expenditure Breakdown */}
          <h3 className="text-2xl font-bold text-charcoal text-center mb-8 font-[family-name:var(--font-poppins)]">
            Where Your Money Goes (2024-25)
          </h3>

          <div className="max-w-2xl mx-auto space-y-4">
            {EXPENDITURE_BREAKDOWN.map((item) => (
              <div key={item.category} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-charcoal">
                    {item.category}
                  </span>
                  <span className="text-sm text-slate font-mono">
                    {item.amount} ({item.percentage})
                  </span>
                </div>
                <div className="w-full bg-offwhite rounded-full h-3">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Five Growth Phases ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Five Growth Phases"
            subtitle="The story of Wildlife Rescue told through data."
          />

          <div className="space-y-6">
            {[
              { phase: "Phase 1", period: "2010", title: "Home Operations", birds: "362/year", description: "Two brothers rescuing birds from their home in Old Delhi's Walled City. Birds literally 'delivered at home.' Case #317 marks the beginning." },
              { phase: "Phase 2", period: "2011–2014", title: "Explosive Growth", birds: "1,017–1,926/year", description: "The Charity Birds Hospital partnership ignites. Volume nearly triples in 3 years. Species diversity grows from 9 to 42." },
              { phase: "Phase 3", period: "2015–2018", title: "Consolidation", birds: "~2,100–2,460/year", description: "Operations stabilize and professionalize. Partner network solidifies around 5 core organizations." },
              { phase: "Phase 4", period: "2019–2021", title: "Renewed Growth", birds: "2,532–2,815/year", description: "COVID barely dents operations (−1% in 2020). New partners emerge. Prem Bhawan grows 5x." },
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

      {/* ─── Download Section ─── */}
      <section className="bg-teal-light py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Download size={32} className="text-teal mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Download Full Reports
          </h2>
          <p className="mt-3 text-slate">
            Detailed annual reports with complete financial statements, auditor
            certifications, and program details will be available for download
            here soon.
          </p>
          <p className="mt-2 text-sm text-slate">
            For immediate requests, please contact us at{" "}
            <a
              href="mailto:nadeem@raptorrescue.org"
              className="text-teal font-semibold hover:underline"
            >
              nadeem@raptorrescue.org
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
