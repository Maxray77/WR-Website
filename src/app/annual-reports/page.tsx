import React from "react";
import type { Metadata } from "next";
import { FileText, TrendingUp, DollarSign, Users, FileSpreadsheet } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnnualReportCard from "@/components/AnnualReportCard";
import YearlyExpenditureBreakdown from "@/components/YearlyExpenditureBreakdown";
import { RESCUE_BY_YEAR } from "@/lib/constants";
import { ANNUAL_REPORTS } from "@/lib/annual-reports-data";

export const metadata: Metadata = {
  title: "Annual Reports",
  description:
    "Wildlife Rescue's annual reports — 16 years of data-backed impact. Intake statistics, financial transparency, and growth from 362 birds in 2010 to 4,184 in 2025.",
};

const FINANCIAL_YEARS = ["FY 2020-21", "FY 2021-22", "FY 2022-23", "FY 2023-24", "FY 2024-25"];

type FinRow = { label: string; values: (string | null)[]; usd?: (string | null)[]; bold?: boolean; surplus?: boolean };
type FinSection = { heading: string; rows: FinRow[] };

const FINANCIAL_TABLE: FinSection[] = [
  {
    heading: "Income",
    rows: [
      { label: "Donations Received (cash)",  values: ["₹21,03,612", "₹22,64,673", "₹28,86,686", "₹28,90,766", "₹39,61,353"] },
      { label: "Donations Received in Kind", values: [null,         null,         "₹2,07,068",  "₹60,465",    "₹1,56,016"] },
      { label: "Other Income / Job Work",    values: [null,         null,         null,         "₹37,654",    "₹1,26,730"] },
      { label: "Interest Received",          values: ["₹14,247",    "₹7,432",     "₹12,543",    "₹19,247",    "₹22,548"] },
      { label: "Total Income",               values: ["₹21,17,859", "₹22,72,105", "₹31,06,297", "₹30,08,132", "₹42,66,647"], usd: ["~$28,543", "~$30,498", "~$38,732", "~$36,330", "~$50,493"], bold: true },
    ],
  },
  {
    heading: "Expenditure (per Income & Expenditure A/c)",
    rows: [
      { label: "Direct Expenses",            values: ["₹6,38,868",  "₹4,66,185",  "₹13,46,398", "₹28,15,233", "₹34,72,571"] },
      { label: "Indirect Expenses",          values: ["₹9,60,559",  "₹16,16,859", "₹12,65,313", "₹1,24,488",  "₹3,71,772"] },
      { label: "Fixed Asset Purchased — FCRA (on I&E)¹", values: ["₹2,80,435", "₹33,900", null, null, null] },
      { label: "Total Expenditure",          values: ["₹18,79,862", "₹21,16,945", "₹26,11,711", "₹29,39,721", "₹42,44,343"], usd: ["~$25,335", "~$28,415", "~$32,565", "~$35,504", "~$50,229"], bold: true },
      { label: "Surplus / (Deficit)",        values: ["₹2,31,997",  "₹1,55,180",  "₹3,00,591",  "₹68,411",    "₹4,22,304"],   usd: ["~$3,127", "~$2,083", "~$3,748", "~$826", "~$4,997"], surplus: true },
    ],
  },
  {
    heading: "Capital Investment (per Fixed Assets Schedule)",
    rows: [
      { label: "Fixed Asset Additions during year²", values: ["₹1,32,924", "₹1,51,826", "₹80,160", "₹2,17,510", "₹12,70,749"] },
    ],
  },
  {
    heading: "Balance Sheet (closing position as at 31 March)",
    rows: [
      { label: "Fixed Assets — Net Book Value (WDV)", values: ["₹1,90,448", "₹2,93,098", "₹3,17,701", "₹4,67,208", "₹15,56,533"] },
      { label: "Cash & Bank balances",       values: ["₹2,19,589", "₹3,49,273", "₹5,98,438", "₹4,46,409", "₹1,16,375"] },
      { label: "Security Deposit",           values: ["₹40,000",   "₹40,000",   "₹40,000",   "₹40,000",   "₹40,000"] },
      { label: "Total Assets",               values: ["₹4,50,837", "₹6,82,361", "₹9,55,849", "₹9,76,566", "₹19,14,374"], usd: ["~$6,076", "~$9,159", "~$11,919", "~$11,794", "~$22,655"], bold: true },
      { label: "Capital Fund (closing)",     values: ["₹2,31,513", "₹3,86,692", "₹6,87,283", "₹7,55,694", "₹11,77,998"] },
      { label: "Unsecured Loans (closing)",  values: ["₹1,32,844", "₹1,32,444", "₹1,32,444", "₹1,01,942", "₹44,122"] },
    ],
  },
];


export default function AnnualReportsPage() {
  const maxRescue = Math.max(...RESCUE_BY_YEAR.map((r) => r.total));
  const totalRescued = RESCUE_BY_YEAR.reduce((sum, r) => sum + r.total, 0);

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
              { icon: <Users size={24} />, stat: "39,000+", label: "Total birds rescued", sub: "" },
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

      {/* ─── Financial Transparency ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Financial Transparency"
            subtitle="Every rupee accounted for. Complete income and expenditure data."
          />

          {/* 5-Year Income/Expenditure/Capital/Balance Sheet Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-dark text-white">
                    <th className="px-5 py-4 text-left font-semibold sticky left-0 bg-teal-dark z-10 min-w-[260px]">
                      Line item
                    </th>
                    {FINANCIAL_YEARS.map((y) => (
                      <th key={y} className="px-4 py-4 text-right font-semibold whitespace-nowrap">
                        {y}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FINANCIAL_TABLE.map((section) => (
                    <React.Fragment key={section.heading}>
                      <tr className="bg-teal-light">
                        <td
                          colSpan={6}
                          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-teal-dark"
                        >
                          {section.heading}
                        </td>
                      </tr>
                      {section.rows.map((row) => {
                        const rowCls = row.surplus
                          ? "bg-amber-light/40 border-y border-amber/30"
                          : row.bold
                          ? "bg-offwhite border-t border-teal-dark/30"
                          : "border-b border-gray-100";
                        const labelCls = row.surplus
                          ? "font-bold text-charcoal"
                          : row.bold
                          ? "font-semibold text-teal-dark"
                          : "text-charcoal";
                        const valueCls = row.surplus
                          ? "font-bold text-charcoal"
                          : row.bold
                          ? "font-semibold text-teal-dark"
                          : "text-charcoal";
                        return (
                          <tr key={`${section.heading}-${row.label}`} className={rowCls}>
                            <td className={`px-5 py-2.5 ${labelCls} sticky left-0 ${row.surplus ? "bg-amber-light/40" : row.bold ? "bg-offwhite" : "bg-white"}`}>
                              {row.label}
                            </td>
                            {row.values.map((v, idx) => (
                              <td
                                key={idx}
                                className={`px-4 py-2.5 text-right font-mono whitespace-nowrap ${valueCls}`}
                              >
                                {v ?? <span className="text-slate">—</span>}
                                {row.usd?.[idx] && (
                                  <span className="block text-xs font-normal text-slate/80 mt-0.5">
                                    {row.usd[idx]}
                                  </span>
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footnotes */}
          <div className="text-xs text-slate space-y-1.5 mb-6 max-w-5xl">
            <p>
              <sup>1</sup> In FY 2020-21 and FY 2021-22, certain FCRA-funded fixed asset purchases were recorded directly on the Income & Expenditure A/c (₹2,80,435 and ₹33,900 respectively) rather than being capitalised. From FY 2022-23 onwards all fixed asset purchases are capitalised on the Balance Sheet.
            </p>
            <p>
              <sup>2</sup> Total 5-year Fixed Asset Additions: ₹18,53,170. The major FY 2024-25 capex (₹12,70,749) reflects the purchase of an Ambulance (₹10,15,000), Anaesthesia Machine (₹1,41,116), Oxygen Concentrator (₹57,000) and other clinic equipment.
            </p>
            <p>
              Figures compiled from audited consolidated financial statements (A. Rehman & Associates, Chartered Accountants). Direct vs Indirect Expense classification varies year-on-year in the source statements; Total Expenditure is the directly comparable measure.
            </p>
            <p>
              US$ figures are translated from the audited INR figures at the FY-average RBI reference rate for each financial year (FY 2020-21: ₹74.2/$, FY 2021-22: ₹74.5/$, FY 2022-23: ₹80.2/$, FY 2023-24: ₹82.8/$, FY 2024-25: ₹84.5/$). Audited figures are in INR; USD shown for international donors and is indicative only.
            </p>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="/annual-reports/wr-financials-5yr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href="/annual-reports/wr-financials-5yr.xlsx"
              className="inline-flex items-center gap-2 bg-white hover:bg-offwhite text-teal-dark border border-teal-dark/30 hover:border-teal-dark px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Download Excel
            </a>
          </div>

          {/* Per-Year Expenditure Breakdown — interactive year tabs */}
          <h3 className="text-2xl font-bold text-charcoal text-center mb-2 font-[family-name:var(--font-poppins)]">
            Where Your Money Goes
          </h3>
          <p className="text-center text-sm text-slate mb-6">
            Select a financial year to see how funds were spent
          </p>

          <YearlyExpenditureBreakdown />
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
      <section className="bg-offwhite py-16 lg:py-24">
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
    </>
  );
}
