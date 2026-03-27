"use client";

import Link from "next/link";
import { ArrowRight, Play, Heart } from "lucide-react";
import ImpactCounter from "@/components/ImpactCounter";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import InstagramFeed from "@/components/InstagramFeed";
import {
  IMPACT_STATS,
  FEATURED_RESCUES,
  MEDIA_LOGOS,
  DONATION_AMOUNTS_INR,
} from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-teal-dark via-teal to-teal-dark min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 to-teal/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Oscar-Nominated &bull; World&apos;s Largest Raptor Rescue
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-poppins)]">
              Every Wing Deserves a{" "}
              <span className="text-amber">Second Chance</span>
            </h1>
            <p className="mt-6 text-xl text-white/80 max-w-xl">
              38,500+ birds rescued since 2010. From a home in Old Delhi to the
              world&apos;s largest raptor rescue facility.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <DonateButton size="lg" />
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all"
              >
                Our Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-amber/10 to-transparent" />
      </section>

      {/* ─── Impact Counter Bar ─── */}
      <section className="bg-offwhite py-12 lg:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <ImpactCounter
                  number={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                />
                {stat.label === "International Awards" && (
                  <p className="text-xs text-slate mt-1 italic">
                    All That Breathes
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Teaser ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gradient-to-br from-teal-light to-offwhite rounded-2xl flex items-center justify-center border border-gray-200">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-teal/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart size={40} className="text-teal" />
                </div>
                <p className="text-slate text-sm">Founders Photo Placeholder</p>
              </div>
            </div>

            <div>
              <span className="text-amber font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Two Brothers. One Mission.{" "}
                <span className="text-teal">20+ Years.</span>
              </h2>
              <p className="mt-4 text-lg text-slate leading-relaxed">
                In the late 1990s, brothers Nadeem and Saud found an injured
                Black Kite in Old Delhi. When hospitals refused to treat it —
                &quot;we do not treat carnivorous birds&quot; — they decided to
                learn themselves. What started at home has grown into the
                world&apos;s largest raptor rescue operation.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                As featured in the Oscar-nominated documentary{" "}
                <Link
                  href="/all-that-breathes"
                  className="text-teal font-semibold hover:underline"
                >
                  &quot;All That Breathes&quot;
                </Link>
                , winner of 26 international awards including the Sundance Grand
                Jury Prize and the Cannes Golden Eye.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-6 text-teal font-semibold hover:gap-3 transition-all"
              >
                Read Our Full Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Rescue Stories ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Rescue Stories"
            subtitle="Every bird has a story. Here are a few of the thousands we've helped."
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURED_RESCUES.map((rescue) => (
              <div
                key={rescue.title}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                  <span className="text-slate text-sm">Photo Placeholder</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-light text-teal rounded-full">
                      {rescue.species}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        rescue.outcome === "Released"
                          ? "bg-green-50 text-success"
                          : "bg-amber-bg text-amber"
                      }`}
                    >
                      {rescue.outcome}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {rescue.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate leading-relaxed">
                    {rescue.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Documentary Spotlight ─── */}
      <section className="py-16 lg:py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/GoTlULspDyY"
                title="All That Breathes | Official Trailer | HBO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div>
              <span className="text-amber font-semibold text-sm uppercase tracking-wider">
                Oscar-Nominated Documentary
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
                All That Breathes
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                The first documentary in history to win both the Sundance and
                Cannes top awards. This film follows Nadeem and Saud as they
                rescue raptors against the backdrop of a rapidly changing Delhi.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Sundance Winner",
                  "Cannes Winner",
                  "Oscar Nominated",
                  "Peabody Winner",
                  "Gotham Winner",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-semibold border border-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Link
                href="/all-that-breathes"
                className="inline-flex items-center gap-2 mt-6 text-amber font-semibold hover:gap-3 transition-all"
              >
                Explore the Film <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Donation Appeal ─── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-amber-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Help Us Save More Lives"
            subtitle="Every donation directly funds the rescue, treatment, and rehabilitation of injured birds."
          />

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {DONATION_AMOUNTS_INR.map((item) => (
                <Link
                  href="/donate"
                  key={item.amount}
                  className="bg-white rounded-xl p-5 text-center border-2 border-gray-100 hover:border-amber hover:shadow-lg transition-all group"
                >
                  <div className="text-2xl font-bold text-teal font-[family-name:var(--font-poppins)] group-hover:text-amber transition-colors">
                    ₹{item.amount.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate mt-1">{item.label}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <DonateButton size="lg" />
              <p className="mt-3 text-sm text-slate">
                Tax-deductible in India (80G) and the USA (501(c)(3))
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured In Logo Bar ─── */}
      <section className="py-12 lg:py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate font-semibold uppercase tracking-wider mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {MEDIA_LOGOS.map((name) => (
              <span
                key={name}
                className="text-slate/40 hover:text-charcoal font-bold text-sm sm:text-base transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Instagram Feed ─── */}
      <InstagramFeed />

      {/* ─── Newsletter Signup ─── */}
      <NewsletterSignup />
    </>
  );
}
