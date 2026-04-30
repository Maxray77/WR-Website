"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Star,
  ShoppingCart,
  ExternalLink,
  Quote,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const BOOK_DETAILS = {
  title: "Bird Brothers, A Delhi Story",
  author: "Rina Singh",
  illustrator: "Barkha Lohia",
  publisher: "Orca Book Publishers",
  publishDate: "August 19, 2025",
  pages: 32,
  ageRange: "6-8 years",
  isbn: "978-1-4598-3856-7",
  format: "Hardcover Picture Book",
};

const BUY_LINKS = [
  {
    store: "Amazon USA",
    url: "https://www.amazon.com/Bird-Brothers-Delhi-Story-Singh/dp/1459838564",
    price: "$15.08",
    flag: "🇺🇸",
  },
  {
    store: "Amazon UK",
    url: "https://www.amazon.co.uk/Bird-Brothers-Delhi-Story-Singh/dp/1459838564",
    price: "GBP",
    flag: "🇬🇧",
  },
  {
    store: "Orca Book Publishers",
    url: "https://www.orcabook.com/Bird-Brothers-A-Delhi-Story",
    price: "CAD $21.95",
    flag: "🇨🇦",
  },
  {
    store: "Indigo (Canada)",
    url: "https://www.indigo.ca/en-ca/bird-brothers-a-delhi-story/9781459838567.html",
    price: "CAD $21.95",
    flag: "🇨🇦",
  },
  {
    store: "Blackwell's (UK)",
    url: "https://blackwells.co.uk/bookshop/product/Bird-Brothers-A-Delhi-Story-by-Rina-Singh-author-Barkha-Lohia-illustrator/9781459838567",
    price: "GBP",
    flag: "🇬🇧",
  },
  {
    store: "Target (USA)",
    url: "https://www.target.com/p/bird-brothers-a-delhi-story-by-rina-singh-hardcover/-/A-1002864568",
    price: "$15.08",
    flag: "🇺🇸",
  },
];

const AWARDS = [
  {
    name: "Junior Library Guild Gold Standard Selection",
    year: "2025",
    icon: "gold",
  },
  {
    name: "CCBC Choices",
    year: "2026",
    icon: "blue",
  },
  {
    name: "PADIBA (Pan Asian Diverse Illustrator/Book Award)",
    year: "2026",
    icon: "purple",
  },
  {
    name: "School Library Journal — Starred Review",
    year: "2025",
    icon: "star",
  },
];

const ILLUSTRATIONS = [
  {
    src: "/bird-brothers/delhi-skyline.jpg",
    alt: "A black kite soars over the colorful rooftops and historic monuments of Old Delhi",
    caption: "The majestic black kites soar over Old Delhi's skyline",
  },
  {
    src: "/bird-brothers/hospital-scene.jpg",
    alt: "The brothers rush a hurt bird to the local hospital, only to be turned away",
    caption: "\"Because this bird is a carnivore — it eats meat,\" they said",
  },
  {
    src: "/bird-brothers/injured-kite.jpg",
    alt: "A brother holds an injured black kite with spread wings",
    caption: "The brothers could no longer stand the suffering of the birds",
  },
  {
    src: "/bird-brothers/caring-for-bird.jpg",
    alt: "The brothers learn to care for an injured kite at home, feeding and nursing it",
    caption: "They took the bird home and did their best to look after it",
  },
];

export default function BirdBrothersPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-b from-amber-bg via-white to-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative w-[320px] sm:w-[380px] lg:w-[420px] aspect-[1/1.1] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/bird-brothers/cover.jpg"
                  alt="Bird Brothers, A Delhi Story — Book Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-amber/15 text-amber-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <BookOpen size={14} />
                Children&apos;s Illustrated Book
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-[family-name:var(--font-poppins)] leading-tight">
                Bird Brothers
                <span className="block text-teal text-2xl sm:text-3xl lg:text-4xl mt-1">
                  A Delhi Story
                </span>
              </h1>
              <p className="mt-3 text-lg text-slate">
                Written by <strong className="text-charcoal">Rina Singh</strong>{" "}
                &middot; Illustrated by{" "}
                <strong className="text-charcoal">Barkha Lohia</strong>
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                The true story of brothers Nadeem and Saud, who grew up in Old
                Delhi watching majestic black kites circle the sky — and
                dedicated their lives to saving them. Based on the founders of{" "}
                <Link
                  href="/about"
                  className="text-teal font-semibold hover:underline"
                >
                  Wildlife Rescue
                </Link>
                , as featured in the Oscar-nominated documentary{" "}
                <Link
                  href="/all-that-breathes"
                  className="text-teal font-semibold hover:underline"
                >
                  &quot;All That Breathes&quot;
                </Link>
                .
              </p>

              {/* Quick details */}
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <span className="text-slate">Publisher:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.publisher}
                  </span>
                </div>
                <div>
                  <span className="text-slate">Pages:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.pages}
                  </span>
                </div>
                <div>
                  <span className="text-slate">Published:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.publishDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate">Ages:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.ageRange}
                  </span>
                </div>
                <div>
                  <span className="text-slate">Format:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.format}
                  </span>
                </div>
                <div>
                  <span className="text-slate">ISBN:</span>{" "}
                  <span className="font-semibold text-charcoal">
                    {BOOK_DETAILS.isbn}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.amazon.com/Bird-Brothers-Delhi-Story-Singh/dp/1459838564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-charcoal font-bold rounded-full hover:bg-amber-light transition-colors"
                >
                  <ShoppingCart size={18} />
                  Buy on Amazon
                  <ExternalLink size={14} />
                </a>
                <a
                  href="https://www.orcabook.com/Bird-Brothers-A-Delhi-Story"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal text-teal font-semibold rounded-full hover:bg-teal hover:text-white transition-colors"
                >
                  Publisher&apos;s Page
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Synopsis ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Story"
            subtitle="A picture book about compassion, determination, and two brothers who changed the world — one bird at a time."
          />

          <div className="prose prose-lg max-w-none text-slate leading-relaxed space-y-4">
            <p>
              Brothers Nadeem and Saud grew up in Delhi watching the majestic
              raptors called black kites — known locally as{" "}
              <em>&quot;cheel&quot;</em> — circle in the sky above their heads.
              But every year, when paper-kite-flying season came and people
              brought out their glass-coated kite strings called{" "}
              <em>manja</em>, the beautiful birds faced dangerous skies.
            </p>
            <p>
              One day, the brothers found a black kite tangled in manja. They
              rushed it to a local bird hospital, but were turned away —
              &quot;we do not treat carnivorous birds,&quot; they were told. The
              bird died in their arms. As they got older, the brothers never
              forgot that day.
            </p>
            <p>
              Learning from a local vet who taught them how to mend a bird&apos;s
              wing, and a neighbour who trained pigeons, they began to rescue and
              rehabilitate injured black kites from their own home in Old
              Delhi&apos;s Walled City. Over the years, they treated more than
              26,000 injured birds — with 80% of birds that underwent wing
              surgery returning to the skies.
            </p>
            <p className="text-charcoal font-semibold">
              Today, Wildlife Rescue has grown into the world&apos;s largest
              raptor rescue facility, with over 39,000 birds rescued since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Illustrations Gallery ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Inside the Book"
            subtitle="Barkha Lohia's breathtaking watercolor illustrations bring Old Delhi and its kites to life."
          />

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {ILLUSTRATIONS.map((illust, index) => (
              <button
                key={illust.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white cursor-pointer text-left"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={illust.src}
                    alt={illust.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <p className="p-4 text-sm text-slate italic">
                  {illust.caption}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + ILLUSTRATIONS.length) %
                  ILLUSTRATIONS.length
              );
            }}
            className="absolute left-4 text-white/80 hover:text-white z-10"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex + 1) % ILLUSTRATIONS.length
              );
            }}
            className="absolute right-4 text-white/80 hover:text-white z-10"
          >
            <ChevronRight size={36} />
          </button>
          <div
            className="relative max-w-5xl w-full aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ILLUSTRATIONS[lightboxIndex].src}
              alt={ILLUSTRATIONS[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center text-white/80 text-sm py-3 bg-black/40">
              {ILLUSTRATIONS[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}

      {/* ─── Awards ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Awards & Recognition"
            subtitle="Bird Brothers has been recognized by leading children's literature organizations."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AWARDS.map((award) => (
              <div
                key={award.name}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    award.icon === "gold"
                      ? "bg-amber/15"
                      : award.icon === "blue"
                        ? "bg-blue-50"
                        : award.icon === "purple"
                          ? "bg-purple-50"
                          : "bg-amber/15"
                  }`}
                >
                  {award.icon === "star" ? (
                    <Star
                      size={24}
                      className="text-amber"
                      fill="currentColor"
                    />
                  ) : (
                    <Award
                      size={24}
                      className={
                        award.icon === "gold"
                          ? "text-amber"
                          : award.icon === "blue"
                            ? "text-blue-600"
                            : "text-purple-600"
                      }
                    />
                  )}
                </div>
                <h3 className="font-bold text-charcoal text-sm leading-snug">
                  {award.name}
                </h3>
                <p className="text-xs text-slate mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="bg-teal-dark py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center font-[family-name:var(--font-poppins)] mb-12">
            What People Are Saying
          </h2>

          <div className="space-y-8">
            {/* SLJ Starred Review */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 lg:p-8 border border-white/10">
              <Quote size={24} className="text-amber mb-3" />
              <p className="text-white/90 text-lg leading-relaxed italic">
                &quot;Themes of environmental protection, determination, helping
                others, and following one&apos;s passions... The artwork and the
                story are inspiring and beautiful.&quot;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Star size={14} className="text-amber" fill="currentColor" />
                <span className="text-amber font-semibold text-sm">
                  Starred Review
                </span>
                <span className="text-white/50 text-sm">
                  &mdash; School Library Journal
                </span>
              </div>
            </div>

            {/* Shaunak Sen */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 lg:p-8 border border-white/10">
              <Quote size={24} className="text-amber mb-3" />
              <p className="text-white/90 text-lg leading-relaxed italic">
                &quot;Captures the singular and stoic brilliance... of radical
                compassion and care.&quot;
              </p>
              <p className="mt-4 text-white/50 text-sm">
                &mdash;{" "}
                <strong className="text-white/70">Shaunak Sen</strong>,
                Director of &quot;All That Breathes&quot; (Oscar-nominated)
              </p>
            </div>

            {/* Reader reviews */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-amber"
                      fill="currentColor"
                    />
                  ))}
                  <Star size={14} className="text-amber/30" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">
                  &quot;A narrative nonfiction text well suited to upper
                  preschool and early elementary school-aged readers... uses
                  straightforward language and emotional details to show how two
                  untrained young men protected their community&apos;s black
                  kites.&quot;
                </p>
                <p className="mt-3 text-white/40 text-xs">&mdash; Goodreads</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-amber"
                      fill="currentColor"
                    />
                  ))}
                  <Star size={14} className="text-amber/30" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">
                  &quot;The true story of two brothers who felt a calling early
                  on to help the black kites falling from the sky in Delhi...
                  demonstrates we really can make a difference through community
                  action and personal dedication.&quot;
                </p>
                <p className="mt-3 text-white/40 text-xs">&mdash; Goodreads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Author & Illustrator ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About the Creators"
            subtitle="The talented duo behind Bird Brothers."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-offwhite rounded-xl p-8 border border-gray-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber">
                Author
              </span>
              <h3 className="mt-2 text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Rina Singh
              </h3>
              <p className="mt-3 text-slate leading-relaxed text-sm">
                Award-winning Canadian children&apos;s author and spoken word
                coach. Her previous books include{" "}
                <em>Grandmother School</em> (winner, Christie Harris Illustrated
                Children&apos;s Literature Prize), <em>Diwali: A Festival of
                Lights</em>, <em>111 Trees</em> (Social Justice Literature
                Award), and <em>Once, a Bird</em>. Rina is drawn to real-life
                stories about social justice and the environment. She spoke
                directly with Nadeem and Saud to craft this story respectfully.
              </p>
            </div>
            <div className="bg-offwhite rounded-xl p-8 border border-gray-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber">
                Illustrator
              </span>
              <h3 className="mt-2 text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Barkha Lohia
              </h3>
              <p className="mt-3 text-slate leading-relaxed text-sm">
                Indian illustrator and visual artist based in Toronto. Recipient
                of the Binod Kanoria Illustration Award for{" "}
                <em>A Tree of My Own</em>. Her other works include{" "}
                <em>So Many Leaves</em> and <em>Let&apos;s Talk About Trees</em>
                . Her art explores the connections between humans and nature —
                using personal photos provided by the brothers to bring their
                world to vivid, watercolor life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Where to Buy ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Get Your Copy"
            subtitle="Available worldwide in hardcover and eBook."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUY_LINKS.map((link) => (
              <a
                key={link.store}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-amber hover:shadow-lg transition-all group"
              >
                <span className="text-2xl">{link.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-charcoal group-hover:text-teal transition-colors">
                    {link.store}
                  </p>
                  <p className="text-sm text-slate">{link.price}</p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-slate group-hover:text-teal transition-colors"
                />
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-slate mt-6">
            ISBN: {BOOK_DETAILS.isbn} &middot; Also available as eBook (ISBN:
            978-1-4598-3927-4)
          </p>
        </div>
      </section>

      {/* ─── Connection to Wildlife Rescue ─── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
            The Real Bird Brothers
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto leading-relaxed">
            This book tells the origin story of Wildlife Rescue — now the
            world&apos;s largest raptor rescue facility with over 39,000 birds
            rescued since 2010. Nadeem and Saud continue their work every day in
            Delhi, and every purchase helps raise awareness for raptor
            conservation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal font-bold rounded-full hover:bg-offwhite transition-colors"
            >
              Meet Nadeem & Saud <ArrowRight size={16} />
            </Link>
            <Link
              href="/all-that-breathes"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Watch the Documentary <ArrowRight size={16} />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-charcoal font-bold rounded-full hover:bg-amber-light transition-colors"
            >
              Support Our Work <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
