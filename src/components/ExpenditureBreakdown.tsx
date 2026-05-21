"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  EXPENDITURE_BY_YEAR,
  formatINR,
  formatUSD,
  type YearExpenditure,
} from "@/lib/expenditure-data";

export default function ExpenditureBreakdown() {
  const [selectedFY, setSelectedFY] = useState(EXPENDITURE_BY_YEAR[0].fy);
  const selected =
    EXPENDITURE_BY_YEAR.find((y) => y.fy === selectedFY) ??
    EXPENDITURE_BY_YEAR[0];

  return (
    <div>
      <h3 className="text-3xl font-bold text-charcoal text-center font-[family-name:var(--font-poppins)]">
        Where Your Money Goes
      </h3>
      <p className="mt-2 text-center text-slate">
        Select a financial year to see how funds were spent
      </p>

      {/* Year tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {EXPENDITURE_BY_YEAR.map((y) => {
          const active = y.fy === selectedFY;
          return (
            <button
              key={y.fy}
              type="button"
              onClick={() => setSelectedFY(y.fy)}
              aria-pressed={active}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                active
                  ? "bg-teal-dark text-white border-teal-dark"
                  : "bg-white text-charcoal border-gray-200 hover:border-teal hover:text-teal"
              }`}
            >
              {y.label}
            </button>
          );
        })}
      </div>

      {/* Total expenditure headline */}
      <p className="mt-8 text-center text-slate">
        Total Expenditure ({selected.label}):{" "}
        <span className="font-bold text-charcoal">
          {formatINR(selected.totalExpenditure)}
        </span>{" "}
        <span className="text-slate">·</span>{" "}
        <span className="text-slate">
          {formatUSD(selected.totalExpenditure)}
        </span>
      </p>

      {/* Breakdown */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        {selected.heads ? (
          <BreakdownDetails year={selected} />
        ) : (
          <BreakdownPending year={selected} />
        )}
      </div>

      <p className="mt-6 text-center text-xs text-slate max-w-2xl mx-auto">
        Figures compiled from audited consolidated financial statements
        (A. Rehman &amp; Associates, Chartered Accountants). USD conversion
        at ₹84.5 / US$ for indicative purposes.
      </p>
    </div>
  );
}

function BreakdownDetails({ year }: { year: YearExpenditure }) {
  const heads = year.heads ?? [];
  const total = year.totalExpenditure;

  return (
    <div className="space-y-5">
      {heads.map((head) => {
        const pct = (head.amount / total) * 100;
        return (
          <div key={head.name}>
            <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1 mb-2">
              <span className="text-sm sm:text-base font-semibold text-charcoal">
                {head.name}
              </span>
              <span className="text-sm text-slate font-mono">
                {formatINR(head.amount)}{" "}
                <span className="text-charcoal font-semibold">
                  ({pct.toFixed(1)}%)
                </span>
              </span>
            </div>
            <div className="w-full bg-offwhite rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${head.color} rounded-full transition-all`}
                style={{ width: `${pct}%` }}
              />
            </div>

          </div>
        );
      })}

      {year.capex !== undefined && year.capex > 0 && (
        <div className="mt-2 pt-5 border-t border-gray-100">
          <div className="flex flex-wrap justify-between items-baseline gap-x-3">
            <span className="text-sm sm:text-base font-semibold text-charcoal">
              Capital Investment (Equipment & Fixed Assets)
            </span>
            <span className="text-sm text-slate font-mono">
              {formatINR(year.capex)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate">
            One-time purchases of equipment and fixed assets in this financial
            year — capitalised on the Balance Sheet rather than charged to the
            I&amp;E A/c.
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-slate flex items-start gap-2">
        <Info size={14} className="text-teal mt-0.5 shrink-0" />
        <span>
          Top-level heads shown for clarity. For a detailed line-item
          breakdown of any head, please write to{" "}
          <a
            href="mailto:saud@raptorrescue.org"
            className="text-teal hover:text-teal-dark underline"
          >
            saud@raptorrescue.org
          </a>
          .
        </span>
      </p>

      <div className="mt-4 pt-5 border-t border-gray-100 grid sm:grid-cols-3 gap-4 text-sm">
        <Stat label="Total Income" value={formatINR(year.totalIncome)} />
        <Stat
          label="Total Expenditure"
          value={formatINR(year.totalExpenditure)}
        />
        <Stat
          label="Surplus (reinvested)"
          value={formatINR(year.surplus)}
          accent
        />
      </div>
    </div>
  );
}

function BreakdownPending({ year }: { year: YearExpenditure }) {
  return (
    <div className="text-center py-8">
      <Info size={32} className="text-amber mx-auto mb-3" />
      <h4 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
        Detailed breakdown coming soon
      </h4>
      <p className="mt-2 text-sm text-slate max-w-md mx-auto">
        Line-item figures for {year.label} are being prepared from the audited
        I&amp;E A/c. Top-level totals are shown below — full sub-line
        transparency will be published shortly.
      </p>

      <div className="mt-8 max-w-md mx-auto grid sm:grid-cols-3 gap-4 text-sm">
        <Stat label="Total Income" value={formatINR(year.totalIncome)} />
        <Stat
          label="Total Expenditure"
          value={formatINR(year.totalExpenditure)}
        />
        <Stat
          label="Surplus (reinvested)"
          value={formatINR(year.surplus)}
          accent
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-offwhite rounded-lg p-3 text-center">
      <p className="text-xs text-slate uppercase tracking-wide">{label}</p>
      <p
        className={`mt-1 font-mono text-sm font-bold ${
          accent ? "text-teal" : "text-charcoal"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
