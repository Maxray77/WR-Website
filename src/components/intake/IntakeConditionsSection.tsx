import { Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CONDITION_BREAKDOWN, INTAKE_CASES_WITH_CONDITION, INTAKE_TOTAL } from "@/lib/intake-data";

// Bars are coloured by category — Manja gets amber (signature WR specialty),
// orphan-care and burns get distinctive accents, the rest use teal gradient.
const ACCENT: Record<string, string> = {
  "Manja Injuries & Cut Wounds": "bg-amber",
  "Orphans, Chicks & Juveniles": "bg-teal",
  "Fractures": "bg-teal-dark",
  "Burns": "bg-danger",
  "Dead On Arrival": "bg-slate",
  "External Examination Normal": "bg-success",
};
const DEFAULT_BAR = "bg-teal/70";

export default function IntakeConditionsSection() {
  const totalCategorised = CONDITION_BREAKDOWN.reduce((sum, c) => sum + c.cases, 0);
  // Sort descending by cases; "External Examination Normal" + "Other" stay at bottom.
  const sorted = [...CONDITION_BREAKDOWN].sort((a, b) => {
    const aPark =
      a.name === "External Examination Normal" || a.name === "Other / Various";
    const bPark =
      b.name === "External Examination Normal" || b.name === "Other / Various";
    if (aPark !== bPark) return aPark ? 1 : -1;
    return b.cases - a.cases;
  });
  const top = sorted[0];
  const topPct = ((top.cases / totalCategorised) * 100).toFixed(1);
  const coveragePct = ((INTAKE_CASES_WITH_CONDITION / INTAKE_TOTAL) * 100).toFixed(1);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why They Come In"
          subtitle="The injuries and illnesses we treat — patterns across years of clinical records."
        />

        {/* Headline */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-8">
          Across {INTAKE_CASES_WITH_CONDITION.toLocaleString()} documented clinical
          cases,{" "}
          <strong className="text-amber">
            {top.name.toLowerCase().includes("manja")
              ? "manja injuries"
              : top.name}
          </strong>{" "}
          account for nearly{" "}
          <strong className="text-charcoal">{topPct}%</strong> of intake — the
          single largest driver of birds arriving at our facility.
        </p>

        {/* Data-source caveat */}
        <div className="max-w-3xl mx-auto mb-12 bg-amber-light/30 border border-amber/30 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-amber-700 mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed">
            <strong>About this data:</strong> Clinical condition is formally
            recorded for {INTAKE_CASES_WITH_CONDITION.toLocaleString()} cases
            ({coveragePct}% of our total intake) — primarily for scheduled
            species requiring documentation under Indian wildlife laws. The
            patterns shown broadly extend to our wider intake, but the
            percentages here reflect the documented subset.
          </div>
        </div>

        {/* Bars */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 lg:p-10 shadow-sm">
          <div className="space-y-4">
            {sorted.map((cond) => {
              const p = (cond.cases / totalCategorised) * 100;
              const colour = ACCENT[cond.name] ?? DEFAULT_BAR;
              return (
                <div key={cond.name}>
                  <div className="flex justify-between items-baseline gap-3 mb-1.5">
                    <span className="text-sm font-semibold text-charcoal">
                      {cond.name}
                    </span>
                    <span className="text-xs text-slate font-mono shrink-0">
                      {cond.cases.toLocaleString()}{" "}
                      <span className="text-charcoal font-bold">
                        ({p.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-offwhite rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full ${colour} rounded-full transition-all`}
                      style={{ width: `${Math.max(p, 0.3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate max-w-2xl mx-auto">
          Conditions categorised from free-text clinical records; some cases
          present multiple conditions and are assigned to their most clinically
          significant category.
        </p>
      </div>
    </section>
  );
}
