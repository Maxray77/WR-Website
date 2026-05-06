import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import ImpactCounter from "@/components/ImpactCounter";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import InstagramFeed from "@/components/InstagramFeed";
import UsdAmountGrid from "@/components/UsdAmountGrid";
import {
  IMPACT_STATS,
  FEATURED_RESCUES,
  MEDIA_LOGOS,
  DONATION_AMOUNTS_INR,
  CONTACT,
} from "@/lib/constants";
import { getBlogPosts } from "@/lib/blog";
import { Facebook, Instagram, Youtube, Calendar, Clock, ArrowUpRight } from "lucide-react";

export default async function Home() {
  const recentPosts = (await getBlogPosts()).slice(0, 3);
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
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight italic font-[family-name:var(--font-poppins)]">
              &ldquo;Life itself a kinship, we&apos;re all a{" "}
              <span className="text-amber not-italic">community of air</span>.&rdquo;
            </h1>
            <p className="mt-6 text-lg text-white/80 font-medium tracking-wide">
              &mdash; <span className="italic">Nadeem and Saud, Wildlife Rescue</span>
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

      {/* ─── Hero Bird Image ─── */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/hero-steppe-eagle.jpg"
          alt="Close-up of a Steppe Eagle with open beak, showing its powerful yellow gape and piercing brown eye"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/90 text-sm sm:text-base font-semibold tracking-wide uppercase">
            Steppe Eagle — One of 39,000+ Birds Rescued
          </p>
        </div>
      </section>

      {/* ─── Barn Owl Hero Image ─── */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/hero-barn-owl.jpg"
          alt="Barn Owl lying on examination table with bandaged wing, showing its distinctive heart-shaped face during treatment at Wildlife Rescue"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/90 text-sm sm:text-base font-semibold tracking-wide uppercase">
            Barn Owl — Silent Guardian of Delhi&apos;s Night Skies
          </p>
        </div>
      </section>

      {/* ─── Black Kite (Avian Pox) Hero Image ─── */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/hero-avian-pox.jpg"
          alt="Black Kite close-up showing avian pox lesions around the beak and cere — one of the viral diseases treated at Wildlife Rescue"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/90 text-sm sm:text-base font-semibold tracking-wide uppercase">
            Black Kite — Fighting Avian Pox &amp; Urban Hazards
          </p>
        </div>
      </section>

      {/* ─── About Teaser ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg">
              <Image
                src="/founders-combined.jpg"
                alt="Founders Nadeem Shehzad and Mohammad Saud in tuxedos at the Cannes Film Festival for the premiere of All That Breathes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
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
                In the early 1990s, brothers Nadeem and Saud found an injured
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
                {rescue.image ? (
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={rescue.image}
                      alt={rescue.imageAlt ?? rescue.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/2] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                    <span className="text-slate text-sm">Photo Placeholder</span>
                  </div>
                )}
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
            {/* Currency toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                <Link
                  href="#donate-inr"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-teal text-white"
                >
                  ₹ INR
                </Link>
                <Link
                  href="/donate?tab=us"
                  className="px-5 py-2 rounded-full text-sm font-semibold text-slate hover:text-teal transition-colors"
                >
                  🇺🇸 USD
                </Link>
              </div>
            </div>

            {/* INR amounts */}
            <div id="donate-inr" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {DONATION_AMOUNTS_INR.map((item) => (
                <Link
                  href="/donate?tab=online"
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

            {/* USD amount row — click any amount to choose R3 (501c3) or GoFundMe */}
            <div className="mt-4">
              <UsdAmountGrid variant="teaser" />
            </div>
            <p className="text-center text-xs text-slate mt-2">
              🇺🇸 Click any USD amount to choose 501(c)(3) tax-deductible (R3) or GoFundMe
            </p>

            <div className="text-center mt-8">
              <DonateButton size="lg" />
              <p className="mt-3 text-sm text-slate">
                Tax-deductible in India (80G) · Tax-deductible in the USA (501(c)(3))
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured In Logo Bar ─── */}
      <section className="bg-charcoal py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/60 font-semibold uppercase tracking-wider mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {MEDIA_LOGOS.map((media) => (
              <a
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white hover:underline underline-offset-4 font-bold text-sm sm:text-base transition-colors"
              >
                {media.name}
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 text-amber hover:text-amber-light text-sm font-semibold transition-colors"
            >
              View all 50+ media features <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── From Our Blog ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="From Our Blog"
            subtitle="Stories from the field — rescue updates, conservation insights, and volunteer experiences."
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                {post.imageUrl ? (
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/2] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                    <span className="text-slate text-sm">Blog Photo</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-light text-teal rounded-full font-semibold">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors text-sm"
            >
              Read All Posts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Instagram Feed ─── */}
      <InstagramFeed />

      {/* ─── Follow Us / Social Media ─── */}
      <section className="bg-charcoal py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Connect With Us
          </h2>
          <p className="mt-3 text-white/60 max-w-lg mx-auto">
            Follow our journey across social media — daily rescues, release celebrations, and conservation updates.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              <span>@wildliferescueindia</span>
              <ArrowUpRight size={14} className="opacity-60" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-[#1877F2] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <Facebook size={20} />
              <span>@wildliferescue.in</span>
              <ArrowUpRight size={14} className="opacity-60" />
            </a>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-[#FF0000] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <Youtube size={20} />
              <span>YouTube</span>
              <ArrowUpRight size={14} className="opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Newsletter Signup ─── */}
      <NewsletterSignup />
    </>
  );
}
