import { Info, Bird } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  SPECIES_OUTCOMES,
  AGE_OUTCOMES,
  YEARLY_OUTCOMES,
  CLINICAL_TOTAL_CASES,
} from "@/lib/case-records-data";

// 2019-2022 is the clean trend; 2023+ flagged provisional pending review
// (some cases still in active treatment + possible data lag).
const PROVISIONAL_FROM = 2023;

export default function IntakeOutcomesSection() {
  const blackKite = SPECIES_OUTCOMES.find((s) => s.species === "Black Kite");
  const adult = AGE_OUTCOMES.find((a) => a.cohort === "Adult");
  const juvenile = AGE_OUTCOMES.find((a) => a.cohort === "Juvenile-stage");

  // Year chart: scale released bar to longest bar
  const maxYearN = Math.max(...YEARLY_OUTCOMES.map((y) => y.n));

  // Top 6 species for the outcome table — drop Blue Rock Pigeon because it's
  // 84% transferred (handled by partner orgs, not rehabbed at WR), so its
  // release rate isn't comparable. We note this in a footnote.
  const speciesTable = SPECIES_OUTCOMES.filter(
    (s) => s.species !== "Blue Rock Pigeon"
  ).slice(0, 6);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Happens Next"
          subtitle="Outcomes — released, died, or transferred — across years of clinical care."
        />

        {/* Hero stat */}
        {blackKite && (
          <div className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-teal-dark to-teal rounded-2xl p-8 lg:p-10 text-center text-white shadow-lg">
            <Bird size={36} className="text-amber mx-auto mb-3" />
            <p className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)]">
              {blackKite.releasedPct}%
            </p>
            <p className="text-lg mt-2 text-amber-light font-semibold">
              of Black Kites released back to the wild
            </p>
            <p className="text-sm text-white/80 mt-3">
              {blackKite.released.toLocaleString()} successful releases out of{" "}
              {blackKite.n.toLocaleString()} Black Kite cases since 2019 —
              the species that accounts for over 80% of our intake.
            </p>
          </div>
        )}

        {/* Caveat */}
        <div className="max-w-3xl mx-auto mb-12 bg-teal-light border border-teal/20 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-teal-dark mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed">
            <strong>About this data:</strong> Outcomes drawn from{" "}
            {CLINICAL_TOTAL_CASES.toLocaleString()} per-case clinical records
            (2019–2025), with the final status — Released, Died, or
            Transferred — recorded by the attending vet on each form.
          </div>
        </div>

        {/* Species outcome table */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-lg font-bold text-charcoal text-center mb-4 font-[family-name:var(--font-poppins)]">
            Release rate by species
          </h3>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-slate">
                  <th className="text-left py-2 pr-3">Species</th>
                  <th className="text-right py-2 px-2">Cases</th>
                  <th className="text-right py-2 px-2">Released</th>
                  <th className="text-right py-2 pl-2 hidden sm:table-cell">
                    Died
                  </th>
                </tr>
              </thead>
              <tbody>
                {speciesTable.map((s) => (
                  <tr key={s.species} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-3 text-charcoal font-semibold">
                      {s.species}
                    </td>
                    <td className="py-3 px-2 text-right text-slate font-mono">
                      {s.n.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`font-mono font-bold ${
                          s.releasedPct >= 70
                            ? "text-teal-dark"
                            : s.releasedPct >= 35
                            ? "text-amber"
                            : "text-slate"
                        }`}
                      >
                        {s.releasedPct}%
                      </span>
                    </td>
                    <td className="py-3 pl-2 text-right text-slate font-mono hidden sm:table-cell">
                      {s.diedPct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-slate max-w-2xl mx-auto leading-relaxed">
            Smaller raptors (Shikra, Spotted Owlet) and birds often arriving in
            advanced injury (Barn Owl, Cattle Egret) have lower release rates
            — these species typically reach us in worse condition than the
            Black Kites our network is built around. Blue Rock Pigeon excluded
            because 84% are transferred to specialist pigeon rehabbers
            elsewhere, not rehabbed at our facility.
          </p>
        </div>

        {/* Adult vs Juvenile */}
        {adult && juvenile && (
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-lg font-bold text-charcoal text-center mb-4 font-[family-name:var(--font-poppins)]">
              Adults vs juveniles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <p className="text-xs uppercase tracking-wide text-slate font-semibold">
                  Adults
                </p>
                <p className="text-4xl font-bold text-teal-dark mt-2 font-mono">
                  {adult.releasedPct}%
                </p>
                <p className="text-sm text-slate mt-1">released</p>
                <p className="text-xs text-slate mt-3 border-t border-gray-100 pt-3">
                  {adult.released.toLocaleString()} of{" "}
                  {adult.n.toLocaleString()} cases
                </p>
              </div>
              <div className="bg-white rounded-xl border-2 border-amber/40 p-6 text-center relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  HIGHER
                </span>
                <p className="text-xs uppercase tracking-wide text-slate font-semibold">
                  Juveniles
                </p>
                <p className="text-4xl font-bold text-amber mt-2 font-mono">
                  {juvenile.releasedPct}%
                </p>
                <p className="text-sm text-slate mt-1">released</p>
                <p className="text-xs text-slate mt-3 border-t border-gray-100 pt-3">
                  {juvenile.released.toLocaleString()} of{" "}
                  {juvenile.n.toLocaleString()} cases
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate max-w-2xl mx-auto leading-relaxed">
              Counterintuitive but consistent: juveniles fare slightly better.
              Their cases skew toward &quot;dehydrated or fallen-from-nest&quot;
              — recoverable with food, hydration, and time. Adult cases skew
              toward catastrophic manja injuries, where outcomes depend on
              surgical complexity.
            </p>
          </div>
        )}

        {/* Year-over-year release rate */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-charcoal text-center mb-4 font-[family-name:var(--font-poppins)]">
            Release rate by year
          </h3>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
            <div className="space-y-3">
              {YEARLY_OUTCOMES.map((y) => {
                const isProvisional = y.year >= PROVISIONAL_FROM;
                return (
                  <div key={y.year} className="flex items-center gap-3">
                    <span className="text-sm text-slate font-mono w-14 shrink-0">
                      {y.year}
                      {isProvisional && (
                        <sup className="text-amber">*</sup>
                      )}
                    </span>
                    <div className="flex-1 bg-offwhite rounded-full h-7 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500 ${
                          isProvisional
                            ? "bg-slate/60"
                            : "bg-gradient-to-r from-teal to-teal-dark"
                        }`}
                        style={{
                          width: `${Math.max((y.releasedPct / 100) * 100, 20)}%`,
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {y.releasedPct}%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate font-mono w-16 shrink-0 text-right">
                      n={y.n.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate max-w-3xl mx-auto leading-relaxed">
            <sup className="text-amber">*</sup> 2023 onwards is{" "}
            <strong>provisional</strong> — many of these cases are still in
            active care (especially long-term rehab cases that haven&apos;t
            yet been released or marked &quot;Died&quot;). The clean 2019–2022
            trend climbing from {YEARLY_OUTCOMES[0].releasedPct}% to{" "}
            {YEARLY_OUTCOMES[3].releasedPct}% reflects the maturity of our
            surgical and rehabilitation programmes. Final outcomes for 2023+
            will be published as cases close.
          </p>
        </div>
      </div>
    </section>
  );
}
