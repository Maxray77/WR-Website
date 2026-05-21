import { Building2, Network } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PARTNER_BREAKDOWN } from "@/lib/intake-data";

// Short blurbs for the largest partners — surface their identity rather than
// just a name in a list. Keyed by canonical display name.
const PARTNER_BLURB: Record<string, string> = {
  "Charity Birds Hospital":
    "Jain charitable hospital in Chandni Chowk, Old Delhi. Historically the largest source of bird transfers to Wildlife Rescue, particularly for cases requiring surgical care beyond their facility.",
  "S.V.S.J. Sewa Trust":
    "Also known as Shri Vijaynand Surishwar Jain Sewa Trust / Shahdra Bird Hospital. Long-standing partner organization with their own avian care facility.",
  "Sanjay Gandhi Animal Care Center":
    "Government-affiliated animal welfare centre in Tis Hazari, Delhi. Refers complex avian cases requiring specialised surgical or rehabilitation care.",
  "Prem Bhawan":
    "Bird care institution with growing transfer volume since 2019. A key partner in our expanded network.",
};

export default function IntakePartnersSection() {
  const top10 = PARTNER_BREAKDOWN.slice(0, 10);
  const featured = PARTNER_BREAKDOWN.slice(0, 4);
  const everyone = PARTNER_BREAKDOWN.length;
  const top4Sum = featured.reduce((s, p) => s + p.cases, 0);
  const totalKnown = PARTNER_BREAKDOWN.reduce((s, p) => s + p.cases, 0);
  const top4Pct = ((top4Sum / totalKnown) * 100).toFixed(1);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Where They Are Transferred From"
          subtitle="A network of partner organisations brings injured birds to our facility every day."
        />

        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-12">
          Across the 17 years of data,{" "}
          <strong className="text-teal-dark">{everyone.toLocaleString()}</strong>{" "}
          distinct partner organisations have transferred birds to us — from
          large hospitals to neighbourhood rescue collectives. Our top four
          partners alone account for{" "}
          <strong className="text-teal-dark">{top4Pct}%</strong> of all
          transfers.
        </p>

        {/* Featured top 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {featured.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center shrink-0">
                  <Building2 size={22} className="text-teal-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-charcoal text-lg leading-tight font-[family-name:var(--font-poppins)]">
                    {p.name}
                  </h4>
                  <p className="text-3xl font-bold text-teal-dark mt-1 font-mono">
                    {p.cases.toLocaleString()}
                    <span className="text-sm font-normal text-slate ml-2">
                      cases transferred
                    </span>
                  </p>
                </div>
              </div>
              {PARTNER_BLURB[p.name] && (
                <p className="text-sm text-slate mt-4 leading-relaxed border-t border-gray-100 pt-4">
                  {PARTNER_BLURB[p.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Rest of top 10 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Network size={18} className="text-teal" />
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wide">
              Additional Key Partners
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 text-sm">
            {top10.slice(4).map((p) => (
              <div
                key={p.name}
                className="flex justify-between items-baseline gap-2 border-b border-gray-100 py-1.5"
              >
                <span className="text-charcoal truncate">{p.name}</span>
                <span className="text-slate font-mono text-xs shrink-0">
                  {p.cases.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate max-w-3xl mx-auto leading-relaxed">
          Plus {(everyone - 10).toLocaleString()} other organisations,
          individuals (not shown), and self-arrivals contributing the remaining
          rescues. Individual rescuers and Wildlife Rescue staff are recorded
          per-case but excluded from this organisational summary.
        </p>
      </div>
    </section>
  );
}
