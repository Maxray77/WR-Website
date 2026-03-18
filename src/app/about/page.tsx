import type { Metadata } from "next";
import { Heart, GraduationCap, Eye, Users, Award, BookOpen } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import { TEAM, TIMELINE, VALUES } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.about;

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart: <Heart size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  Eye: <Eye size={28} />,
  Users: <Users size={28} />,
};

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Our Story
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Two brothers, one injured kite, and a mission that changed
            everything.
          </p>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Journey"
            subtitle="From a home in Old Delhi to the world's largest raptor rescue."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-teal-light lg:-translate-x-0.5" />

            <div className="space-y-8 lg:space-y-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 lg:gap-12 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-teal rounded-full border-4 border-white shadow -translate-x-2 lg:-translate-x-2 mt-1.5 z-10" />

                  {/* Content */}
                  <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8"}`}>
                    <span className="text-amber font-bold text-lg font-[family-name:var(--font-poppins)]">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-charcoal mt-1 font-[family-name:var(--font-poppins)]">
                      {item.title}
                    </h3>
                    <p className="text-slate mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Values ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Mission & Values"
            subtitle="Guided by compassion, driven by expertise, committed to transparency."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                <div className="w-14 h-14 bg-teal-light rounded-full mx-auto flex items-center justify-center text-teal mb-4">
                  {ICON_MAP[value.icon]}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {value.title}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Team"
            subtitle="The people behind every rescue."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Photo placeholder */}
                <div className="aspect-square bg-gradient-to-br from-teal-light to-teal/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-teal/20 rounded-full flex items-center justify-center">
                    <span className="text-teal text-3xl font-bold font-[family-name:var(--font-poppins)]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {member.name}
                  </h3>
                  <p className="text-amber font-semibold text-sm mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-slate text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Awards & Affiliations ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Awards & Affiliations"
            subtitle="Recognized locally and internationally for our conservation work."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Sparrow Award", org: "Wipro Nature Forever Society", year: "2014", icon: <Award size={24} /> },
              { title: "FIAPO Special Award", org: "Federation of Indian Animal Protection Organisations", year: "2014", icon: <Award size={24} /> },
              { title: "Limca Book of Records", org: "National Achievement", year: "2014", icon: <BookOpen size={24} /> },
              { title: "IWRC Member", org: "International Wildlife Rehabilitation Council, USA", year: "Active", icon: <Users size={24} /> },
              { title: "NWRA Member", org: "National Wildlife Rehabilitators Association, USA", year: "Active", icon: <Users size={24} /> },
              { title: "Wildlife Warden", org: "Govt. of NCT of Delhi (Nadeem)", year: "2006–2010", icon: <Award size={24} /> },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4 items-start"
              >
                <div className="w-12 h-12 bg-amber-bg rounded-lg flex items-center justify-center text-amber shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-charcoal">{item.title}</h3>
                  <p className="text-sm text-slate mt-0.5">{item.org}</p>
                  <p className="text-xs text-amber font-semibold mt-1">
                    {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bird Brothers Book ─── */}
      <section className="py-16 lg:py-20 bg-teal-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen size={48} className="text-teal mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            &quot;Bird Brothers: A Delhi Story&quot;
          </h2>
          <p className="mt-3 text-slate max-w-lg mx-auto">
            A children&apos;s illustration book by Rina Singh, illustrated by
            Barkha Lohia, telling the story of Nadeem and Saud&apos;s first
            rescue — the injured Black Kite that started it all.
          </p>
          <p className="mt-4 text-sm text-slate">
            Available on Amazon USA, UK, and Australia
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Support Our Mission
          </h2>
          <p className="mt-3 text-white/80">
            Help us continue rescuing and rehabilitating Delhi&apos;s injured
            raptors.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
