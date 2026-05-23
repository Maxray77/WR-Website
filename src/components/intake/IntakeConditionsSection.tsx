import { Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  CLINICAL_CONDITIONS,
  CLINICAL_CASES_WITH_CONDITION,
  CLINICAL_COVERAGE_PCT,
  CLINICAL_TOTAL_CASES,
} from "@/lib/case-records-data";

// Colour assignments — Manja gets the signature amber (WR specialty),
// External-Exam-Normal gets a muted accent (it's not a clinical condition),
// the rest get a teal gradient by rank.
const ACCENT: Record<string, string> = {
  "Manja Injuries": "bg-amber",
  "Septicemia / Infection": "bg-teal-dark",
  "Fractures": "bg-teal",
  "Dehydration / Emaciation": "bg-teal",
  "External Examination Normal": "bg-slate",
  "Orphan / Chick-related": "bg-amber-light",
  "Metabolic Bone Disease": "bg-danger/70",
  "Avian Pox": "bg-teal/60",
};
const DEFAULT_BAR = "bg-teal/60";

// Categories worth showing on the bar chart. Below ~50 cases the bar is
// invisible at this scale; we keep the data exported but trim for display.
const MIN_DISPLAY = 50;

export default function IntakeConditionsSection() {
  // Filter out very rare conditions for visual clarity
  const displayed = CLINICAL_CONDITIONS.filter((c) => c.cases >= MIN_DISPLAY);
  // External-Exam-Normal sorts to the bottom — it's a triage state, not a condition
  const sorted = [...displayed].sort((a, b) => {
    const aPark = a.name === "External Examination Normal";
    const bPark = b.name === "External Examination Normal";
    if (aPark !== bPark) return aPark ? 1 : -1;
    return b.cases - a.cases;
  });

  const top = sorted[0];
  const topPct = ((top.cases / CLINICAL_CASES_WITH_CONDITION) * 100).toFixed(1);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why They Come In"
          subtitle="The clinical patterns we see across 14,092 detailed case records."
        />

        {/* Headline */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-8">
          Across{" "}
          <strong className="text-charcoal">
            {CLINICAL_CASES_WITH_CONDITION.toLocaleString()}
          </strong>{" "}
          clinical case records,{" "}
          <strong className="text-amber">manja injuries</strong> account for{" "}
          <strong className="text-charcoal">{topPct}%</strong> of intake — the
          single largest driver of birds arriving at our facility, and the
          signature pattern our surgical team has spent fifteen years
          perfecting techniques for.
        </p>

        {/* Data-source caveat + overlap warning */}
        <div className="max-w-3xl mx-auto mb-12 bg-amber-light/30 border border-amber/30 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-amber-700 mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed space-y-2">
            <p>
              <strong>About this data:</strong> Based on{" "}
              {CLINICAL_TOTAL_CASES.toLocaleString()} detailed clinical case
              records from 2019–2025 ({CLINICAL_COVERAGE_PCT}% of our total
              intake). Each record is a per-case form with full exam findings,
              condition diagnosis, treatment, and outcome.
            </p>
            <p>
              <strong>These categories overlap.</strong> A dehydrated nestling
              with a fractured wing appears in three buckets — we don&apos;t
              aggregate them as mutually exclusive. For example, 67% of
              Dehydration / Emaciation cases are juveniles, not adults.
            </p>
          </div>
        </div>

        {/* Bars */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 lg:p-10 shadow-sm">
          <div className="space-y-4">
            {sorted.map((cond) => {
              const p = (cond.cases / CLINICAL_CASES_WITH_CONDITION) * 100;
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
          Conditions classified from free-text clinical notes. Categories below
          50 cases (Maggot Wound, Eye Injury, Internal Toxicosis, Dislocation,
          Methane Burn) are tracked but not shown for visual clarity.
        </p>
      </div>
    </section>
  );
}
