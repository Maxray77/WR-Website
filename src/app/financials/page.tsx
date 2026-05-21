import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, FileText, FileSpreadsheet, BarChart3, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ExpenditureBreakdown from "@/components/ExpenditureBreakdown";

export const metadata: Metadata = {
  title: "Financial Transparency",
  description:
    "Wildlife Rescue financial transparency — 5 years of audited income, expenditure, capital investment and balance sheet figures with downloadable PDF and Excel.",
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
      { label: "Direct Expenses",            values: ["₹6,38,868",  "₹4,66,185",  "₹15,40,394", "₹28,15,233", "₹34,72,571"] },
      { label: "Indirect Expenses",          values: ["₹9,60,559",  "₹16,16,859", "₹12,65,313", "₹1,24,488",  "₹3,71,772"] },
      { label: "Fixed Asset Purchased — FCRA (on I&E)¹", values: ["₹2,80,435", "₹33,900", null, null, null] },
      { label: "Total Expenditure",          values: ["₹18,79,862", "₹21,16,944", "₹28,05,707", "₹29,39,721", "₹38,44,343"], usd: ["~$25,335", "~$28,415", "~$34,984", "~$35,504", "~$45,495"], bold: true },
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

export default function FinancialsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Financial Transparency
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Every rupee accounted for. Five years of audited income, expenditure, and capital investment.
          </p>
        </div>
      </section>

      {/* ─── Key Financial Metrics ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "₹42.7L", label: "Annual budget (2024-25)", sub: "~US$ 50,493" },
              { stat: "5x", label: "Budget growth", sub: "FY 2020-21 → FY 2024-25" },
              { stat: "₹4.22L", label: "FY 2024-25 surplus", sub: "Reinvested into operations" },
              { stat: "₹12.7L", label: "FY 2024-25 capex", sub: "Ambulance + clinic equipment" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                  {m.stat}
                </div>
                <p className="text-charcoal font-semibold text-sm mt-1">{m.label}</p>
                <p className="text-slate text-xs mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Financial Table ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="5-Year Audited Financials"
            subtitle="Complete income, expenditure, capital investment and balance sheet data."
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
          <ExpenditureBreakdown />
        </div>
      </section>

      {/* ─── Cross-link to Rescue Reports ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BarChart3 size={36} className="text-teal mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Looking for our rescue data?
          </h2>
          <p className="mt-3 text-slate max-w-2xl mx-auto">
            See 16 years of intake statistics, growth phases, and our complete archive of
            yearly rescue reports.
          </p>
          <Link
            href="/annual-reports"
            className="mt-6 inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Annual Rescue Reports
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
