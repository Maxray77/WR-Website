"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Tv,
  Mic,
  Award,
  Download,
  ExternalLink,
  ArrowRight,
  Filter,
  Globe,
  Calendar,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

/* ─── Awards Data ─── */
const AWARDS = [
  {
    year: "2022",
    title: "Academy Award Nomination — Best Documentary Feature",
    event: "95th Academy Awards",
    detail:
      '"All That Breathes" directed by Shaunak Sen, featuring Wildlife Rescue\'s work.',
  },
  {
    year: "2022",
    title: "Grand Jury Prize — World Cinema Documentary",
    event: "Sundance Film Festival",
    detail:
      "The film premiered at Sundance and won the top documentary prize.",
  },
  {
    year: "2022",
    title: "Golden Eye Award — Best Documentary",
    event: "Cannes Film Festival",
    detail:
      "Recognized at Cannes as one of the year's most powerful documentaries.",
  },
  {
    year: "2022",
    title: "Jackson Wild Media Award",
    event: "Jackson Wild",
    detail:
      "Honored at the premier nature media festival for excellence in wildlife storytelling.",
  },
  {
    year: "2022",
    title: "Peabody Award",
    event: "Peabody Awards",
    detail:
      "Recognized for excellence in storytelling that reflects the spirit and values of public life.",
  },
  {
    year: "2022",
    title: "Gotham Award — Best Documentary Feature",
    event: "Gotham Awards",
    detail:
      "Won the top documentary prize at one of independent cinema's most prestigious ceremonies.",
  },
  {
    year: "2025",
    title: "NWRA Symposium Presentation — Refined Surgical Technique",
    event: "National Wildlife Rehabilitators Association, Seattle",
    detail:
      "Presented updated novel wing repair technique to international audience of rehabilitators and veterinarians.",
  },
  {
    year: "2018",
    title: "NWRA Symposium Presentation — Novel Wing Repair Surgery",
    event: "National Wildlife Rehabilitators Association, Los Angeles",
    detail:
      "First international presentation of Wildlife Rescue's self-developed surgical technique for manja-injured raptors.",
  },
];

/* ─── Full Media Coverage Data ─── */
type MediaCategory = "International" | "Indian" | "Film & Culture" | "Niche & Specialist";

interface MediaItem {
  outlet: string;
  year: number;
  title: string;
  url?: string;
  category: MediaCategory;
}

const MEDIA_COVERAGE: MediaItem[] = [
  // International
  { outlet: "The New York Times", year: 2020, title: "In India, Two Brothers Try to Save Kites From a Surprising Foe: Paper Kites", url: "https://www.nytimes.com/2020/02/07/science/kites-birds-conservation-india.html", category: "International" },
  { outlet: "BBC World News", year: 2022, title: "The Delhi Brothers Saving Birds of Prey", url: "https://www.bbc.com/news/world-asia-india-60329561", category: "International" },
  { outlet: "CNN", year: 2022, title: "All That Breathes: How Brothers Save Black Kites in Delhi", url: "https://edition.cnn.com/2022/10/14/asia/all-that-breathes-black-kites-new-delhi-spc-intl-c2e", category: "International" },
  { outlet: "NPR", year: 2023, title: "Whatever Happened to the Bird-Saving Brothers of 'All That Breathes'", url: "https://www.npr.org/sections/goatsandsoda/2023/08/27/1196079582/whatever-happened-to-the-bird-saving-brothers-of-oscar-nommed-doc-all-that-breat", category: "International" },
  { outlet: "The Guardian", year: 2023, title: "Stricken by Smog: Oscar-Tipped Delhi's Bird Hospital", url: "https://www.theguardian.com/culture/2023/feb/06/stricken-smog-oscar-tipped-delhis-bird-hospital-all-that-breathes", category: "International" },
  { outlet: "The Washington Post", year: 2022, title: "'All That Breathes' Movie Review", url: "https://www.washingtonpost.com/movies/2022/11/14/all-that-breathes-movie-review/", category: "International" },
  { outlet: "Al Jazeera", year: 2014, title: "In Pictures: Treating Delhi's Birds of Prey", url: "https://www.aljazeera.com/gallery/2014/6/6/in-pictures-treating-delhis-birds-of-prey", category: "International" },
  { outlet: "South China Morning Post", year: 2022, title: "Bird Men of Delhi: Saving Sparrows and Black Kites", url: "https://www.scmp.com/week-asia/people/article/3167554/bird-men-delhi-saving-sparrows-black-kites-and-all-breathes-one", category: "International" },
  { outlet: "Arab News", year: 2022, title: "Delhi Brothers' Bird Rescue Mission", url: "https://www.arabnews.com/node/2065061/world", category: "International" },
  { outlet: "Gulf News", year: 2023, title: "How 2 Brothers Helped Save the Lives of 27,000 Birds", url: "https://gulfnews.com/friday/art-people/how-2-brothers-helped-save-the-lives-of-around-27000-birds-1.94313522", category: "International" },
  { outlet: "The World (PRX)", year: 2024, title: "The Brothers Helping to Heal Delhi's Most Hated Birds", url: "https://theworld.org/segments/2024/04/04/the-brothers-helping-to-heal-new-delhis-most-hated-birds", category: "International" },
  { outlet: "KUOW (NPR)", year: 2022, title: "Birds Fall From Delhi's Toxic Skies — These Brothers Save Them", url: "https://www.kuow.org/stories/birds-fall-to-earth-from-delhi-s-toxic-skies-these-brothers-are-there-to-save-them", category: "International" },
  { outlet: "KISU (NPR)", year: 2025, title: "Black Kites — Birds of India", url: "https://www.kisu.org/show/idaho-matters/2025-02-20/black-kites-birds-india", category: "International" },
  { outlet: "Pulse (Uganda)", year: 2020, title: "Meet the Bird Medics of New Delhi", url: "https://www.pulse.ug/story/meet-the-bird-medics-of-new-delhi-2024082321563572991", category: "International" },
  { outlet: "DW (Deutsche Welle)", year: 2023, title: "'All That Breathes' Vies for Best Documentary at Oscars", category: "International" },

  // Indian
  { outlet: "The Hindu", year: 2014, title: "Mending Broken Wings", url: "https://www.thehindu.com/news/cities/Delhi/mending-broken-wings/article6211516.ece", category: "Indian" },
  { outlet: "Hindustan Times", year: 2022, title: "Fight for the Flight of Black Kites", url: "https://www.hindustantimes.com/cities/delhi-news/fight-for-the-flight-of-black-kites-101643882432209.html", category: "Indian" },
  { outlet: "Hindustan Times", year: 2012, title: "Helping Birds Fly Again", url: "https://www.hindustantimes.com/delhi/helping-birds-fly-again/story-8rc28RMUDIjVCaurYjrjKJ.html", category: "Indian" },
  { outlet: "NDTV", year: 2022, title: "All That Breathes — The Story of Two Brothers", url: "https://swachhindia.ndtv.com/album-detail/all-that-breathes-shaunak-sens-film-that-won-at-cannes-is-a-story-of-these-two-brothers-from-delhi-102581/", category: "Indian" },
  { outlet: "Times of India", year: 2022, title: "All Feather Friends: Brothers on Mission to Save Avian Kind", url: "https://timesofindia.indiatimes.com/city/delhi/all-feather-friends-meet-brothers-on-mission-to-save-avian-kind/articleshow/89331475.cms", category: "Indian" },
  { outlet: "Times of India", year: 2010, title: "A Rooftop Hospital for Injured Birds of Prey", url: "https://timesofindia.indiatimes.com/city/delhi/a-rooftop-hospital-for-injured-birds-of-prey/articleshow/5655711.cms", category: "Indian" },
  { outlet: "Times of India", year: 2020, title: "Birds Bear Brunt of Human Boredom", url: "https://timesofindia.indiatimes.com/city/delhi/birds-bear-brunt-of-human-boredom/articleshow/75524639.cms", category: "Indian" },
  { outlet: "The Indian Express", year: 2017, title: "Meet the Men Trying to Keep Birds Alive", url: "https://indianexpress.com/article/india/in-season-of-kite-flying-meet-the-men-trying-to-keep-birds-alive-4798661/", category: "Indian" },
  { outlet: "New Indian Express", year: 2021, title: "Saving Delhi's Raptors", url: "https://www.newindianexpress.com/cities/delhi/2021/Oct/06/savingdelhis-raptors-2368217.html", category: "Indian" },
  { outlet: "ThePrint", year: 2023, title: "Delhi Brothers' Efforts to Save 26,000 Birds Reach Oscars", url: "https://theprint.in/feature/delhi-brothers-efforts-to-save-26000-birds-reach-oscars-but-theyre-struggling-for-funds/1431799/", category: "Indian" },
  { outlet: "Scroll.in", year: 2022, title: "Brothers Who Rescue Birds and a Struggle for Human Survival", url: "https://scroll.in/reel/1015815/in-all-that-breathes-brothers-who-rescue-birds-and-a-struggle-for-human-survival", category: "Indian" },
  { outlet: "Down To Earth", year: 2010, title: "Helpline for Birds", url: "https://www.downtoearth.org.in/environment/helpline-for-birds-2010", category: "Indian" },
  { outlet: "The Better India", year: 2022, title: "Delhi Brothers Rescue 23,000 Injured Birds from Kite Strings", url: "https://thebetterindia.com/484809/delhi-brothers-rescue-23000-injured-birds-kite-strings/", category: "Indian" },
  { outlet: "Aaj Tak", year: 2023, title: "Who Are Delhi Brothers Nadeem & Saud Saving Delhi's Birds", url: "https://www.aajtak.in/entertainment/bollywood-news/story/all-that-breathes-who-is-delhi-brothers-nadeem-shehzad-mohammad-saud-saving-delhi-predatory-birds-tmovb-1623081-2023-01-25", category: "Indian" },
  { outlet: "Rediff", year: 2014, title: "The Brothers Who Are Saving Delhi's Birds of Prey", url: "https://www.rediff.com/news/report/the-brothers-who-are-saving-delhis-birds-of-prey/20141028.htm", category: "Indian" },
  { outlet: "Awaz The Voice", year: 2022, title: "Brothers Who Nurse Delhi's Injured Raptors", url: "https://www.awazthevoice.in/youth-news/shehzad-and-saud-brothers-who-nurse-delhi-s-injured-raptors-10143.html", category: "Indian" },
  { outlet: "Indiatimes.com", year: 2022, title: "How Two Delhi Brothers Are Saving Predatory Birds", url: "https://www.indiatimes.com/news/india/how-two-delhi-brothers-are-saving-delhis-predatory-birds-560792.html", category: "Indian" },
  { outlet: "The Patriot", year: 2023, title: "Healing Under Their Wings", url: "https://thepatriot.in/delhi-ncr/healing-under-their-wings-35935", category: "Indian" },
  { outlet: "Clarion India", year: 2024, title: "Friends of Fowl: Muslim Brothers Set Up World's Largest Bird Clinic", url: "https://clarionindia.net/friends-of-fowl-muslim-brothers-set-up-the-worlds-largest-bird-clinic-in-delhi/", category: "Indian" },
  { outlet: "Bharat Speaks", year: 2025, title: "Two Brothers Rescued Over 23,000 Birds from Deadly Kite Strings", url: "https://bharatspeaks.com/in-delhi-two-brothers-have-rescued-over-23000-birds-from-deadly-kite-strings/", category: "Indian" },

  // Film & Culture
  { outlet: "The Caravan", year: 2023, title: "All That Breathes, The Elephant Whisperers — Oscar Nominations", url: "https://caravanmagazine.in/film/all-that-breathes-the-elephant-whisperers-oscar-nominations", category: "Film & Culture" },
  { outlet: "Huck Magazine", year: 2022, title: "The Brothers Rescuing Delhi's Birds Falling from the Sky", url: "https://www.huckmag.com/article/the-brothers-rescuing-delhis-birds-falling-from-the-sky", category: "Film & Culture" },
  { outlet: "Screen Anarchy", year: 2024, title: "All That Breathes Blu-ray Review", url: "https://screenanarchy.com/2024/05/all-that-breathes-blu-ray-review-sitting-gently-with-the-end-of-the-world.html", category: "Film & Culture" },
  { outlet: "Senses of Cinema", year: 2022, title: "MIFF at 70 — All That Breathes", url: "https://www.sensesofcinema.com/2022/miff-at-70/alicia-byrnes/", category: "Film & Culture" },
  { outlet: "DMTalkies", year: 2022, title: "All That Breathes — Review & Explained", url: "https://dmtalkies.com/all-that-breathes-review-explained-2022-indian-documentary-shaunak-sen/", category: "Film & Culture" },
  { outlet: "Spirituality & Practice", year: 2022, title: "All That Breathes — Film Review", url: "https://www.spiritualityandpractice.com/films/reviews/view/29186/all-that-breathes", category: "Film & Culture" },
  { outlet: "MNaushad.com", year: 2024, title: "All That Breathes: A Visual Poem on Delhi's Kites", url: "https://mnoushad.com/all-that-breathes-a-visual-poem-on-delhis-kites-and-much-more/", category: "Film & Culture" },
  { outlet: "Temple News", year: 2024, title: "Temple Hosts Oscar-Nominated Documentary Showing", url: "https://temple-news.com/temple-hosts-oscar-nominated-documentary-showing-and-discussion/", category: "Film & Culture" },
  { outlet: "ASAP Art", year: 2022, title: "Tending to Birds of Prey", url: "https://asapconnect.in/post/495/singleevents/tending-to-birds-of-prey?post%2F495%2Fsingleevents%2Ftending-to-birds-of-prey=", category: "Film & Culture" },

  // Niche & Specialist
  { outlet: "Audubon Society", year: 2017, title: "Two Brothers Are Saving Black Kites from a Surprising Foe", url: "https://www.audubon.org/magazine/india-two-brothers-are-saving-black-kites-surprising-foe-paper-kites", category: "Niche & Specialist" },
  { outlet: "Audubon Society", year: 2022, title: "Poetic New Film Follows Dedicated Brothers Saving Delhi's Kites", url: "https://www.audubon.org/magazine/poetic-new-film-follows-two-dedicated-brothers-saving-delhis-black-kites", category: "Niche & Specialist" },
  { outlet: "Earth Island Journal", year: 2023, title: "Brothers Saving Delhi's Kites Brings Fame but Not Financial Support", url: "https://www.earthisland.org/journal/index.php/magazine/entry/brothers-saving-delhis-kites-brings-fame-but-not-financial-support/", category: "Niche & Specialist" },
  { outlet: "Mongabay", year: 2022, title: "A Film Explores Human and Non-Human Relations in Delhi", url: "https://india.mongabay.com/2022/05/delhi-is-a-gaping-woundwere-a-tiny-band-aid-a-film-explores-human-and-non-human-relations-in-delhi/", category: "Niche & Specialist" },
  { outlet: "10,000 Birds", year: 2015, title: "India's Raptor Rescuers", url: "https://www.10000birds.com/indias-raptor-rescuers-2.htm", category: "Niche & Specialist" },
  { outlet: "BirdSpot", year: 2022, title: "All That Breathes: Two Brothers on a Mission", url: "https://www.birdspot.co.uk/a-little-bird/events/all-that-breathes-two-brothers-on-a-mission-to-save-the-black-kite", category: "Niche & Specialist" },
  { outlet: "Book of Achievers", year: 2021, title: "Trio Urge Safer Skies for Birds", url: "https://bookofachievers.com/articles/trio-urge-safer-skies-for-birds-stop-the-kite-glass-thread-or-maanja-to-save-birds", category: "Niche & Specialist" },
  { outlet: "ZDNet", year: 2013, title: "In Delhi, Two Brothers Become Saviors of Wild Birds", url: "https://www.zdnet.com/article/in-delhi-two-brothers-become-saviors-of-wild-birds/", category: "Niche & Specialist" },
  { outlet: "BBC Wildlife Magazine", year: 2017, title: "Delhi's Raptor Rescuers — Print Feature", category: "Niche & Specialist" },
];

const CATEGORIES: ("All" | MediaCategory)[] = [
  "All",
  "International",
  "Indian",
  "Film & Culture",
  "Niche & Specialist",
];

const CATEGORY_ICONS: Record<MediaCategory, React.ReactNode> = {
  International: <Globe size={14} />,
  Indian: <Newspaper size={14} />,
  "Film & Culture": <Tv size={14} />,
  "Niche & Specialist": <Mic size={14} />,
};

const CATEGORY_COLORS: Record<MediaCategory, string> = {
  International: "bg-blue-50 text-blue-700 border-blue-200",
  Indian: "bg-teal-light text-teal border-teal/20",
  "Film & Culture": "bg-purple-50 text-purple-700 border-purple-200",
  "Niche & Specialist": "bg-amber-light/30 text-amber-800 border-amber/20",
};

const FILTER_COLORS: Record<string, string> = {
  All: "bg-charcoal text-white",
  International: "bg-blue-600 text-white",
  Indian: "bg-teal text-white",
  "Film & Culture": "bg-purple-600 text-white",
  "Niche & Specialist": "bg-amber text-charcoal",
};

/* ─── Early Years Timeline Data (from PDF pages 37-38) ─── */
interface EarlyPress {
  date: string;
  outlet: string;
  type: "print" | "online";
  note?: string;
}

const EARLY_YEARS: { year: number; items: EarlyPress[] }[] = [
  {
    year: 2008,
    items: [
      { date: "3 Jun 2008", outlet: "Hindustan Times", type: "print", note: "First ever newspaper feature on the brothers' rescue work" },
    ],
  },
  {
    year: 2010,
    items: [
      { date: "8 Mar 2010", outlet: "Times of India", type: "print" },
      { date: "10 Mar 2010", outlet: "The Hindu", type: "print" },
      { date: "11 Mar 2010", outlet: "DNA India", type: "online" },
      { date: "12 Mar 2010", outlet: "NDTV", type: "online" },
      { date: "14 Mar 2010", outlet: "India Today", type: "online" },
      { date: "16 Mar 2010", outlet: "Zee News", type: "online" },
      { date: "16 May 2010", outlet: "Sunday Guardian", type: "print" },
      { date: "14 Aug 2010", outlet: "The Pioneer", type: "print" },
      { date: "16 Aug 2010", outlet: "Mid-Day", type: "online" },
      { date: "10 Aug 2010", outlet: "The Indian Express", type: "print" },
      { date: "11 Aug 2010", outlet: "Deccan Herald", type: "print" },
      { date: "1 Oct 2010", outlet: "Down To Earth", type: "print", note: "Full-page feature on raptor rescue in Delhi" },
      { date: "24 Oct 2010", outlet: "Sunday Express", type: "print" },
    ],
  },
  {
    year: 2011,
    items: [
      { date: "19 Mar 2011", outlet: "The Pioneer", type: "print" },
      { date: "22 Mar 2011", outlet: "Hindustan Times", type: "print" },
    ],
  },
  {
    year: 2012,
    items: [
      { date: "15 Jul 2012", outlet: "Times of India", type: "print" },
      { date: "1 Aug 2012", outlet: "NDTV", type: "online" },
      { date: "13 Aug 2012", outlet: "The Hindu", type: "print" },
      { date: "14 Aug 2012", outlet: "Indian Express", type: "print" },
      { date: "16 Aug 2012", outlet: "Hindustan Times", type: "print" },
      { date: "21 Aug 2012", outlet: "Deccan Chronicle", type: "online" },
      { date: "2 Sep 2012", outlet: "Sunday Pioneer", type: "print" },
      { date: "10 Oct 2012", outlet: "Business Standard", type: "online" },
      { date: "11 Nov 2012", outlet: "The Week", type: "print", note: "Cover story on Delhi's wildlife rescue movement" },
    ],
  },
  {
    year: 2013,
    items: [
      { date: "25 Mar 2013", outlet: "ZDNet", type: "online", note: "International tech media picks up the story" },
      { date: "Aug 2013", outlet: "Discovery Channel India", type: "online", note: "TV feature segment on Wildlife Rescue" },
    ],
  },
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | MediaCategory>("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? MEDIA_COVERAGE
      : MEDIA_COVERAGE.filter((m) => m.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => b.year - a.year);

  const counts = MEDIA_COVERAGE.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-charcoal to-gray-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Oscar-Nominated &bull; 50+ Features Worldwide
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Media & Press
          </h1>
          <p className="mt-4 text-xl text-white/70 max-w-2xl mx-auto">
            From a home rescue operation to an Academy Award nomination — our
            story in the world&apos;s press.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                {MEDIA_COVERAGE.length}+
              </p>
              <p className="text-sm text-white/50 mt-1">Media Features</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                {AWARDS.length}
              </p>
              <p className="text-sm text-white/50 mt-1">Awards & Honors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                15+
              </p>
              <p className="text-sm text-white/50 mt-1">Years of Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Awards & Recognition ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Awards & Recognition"
            subtitle="Milestones that brought global attention to raptor conservation in Delhi."
          />

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber/30 hidden sm:block" />

            <div className="space-y-6">
              {AWARDS.map((award, i) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="shrink-0 relative">
                    <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center text-charcoal font-bold text-xs font-[family-name:var(--font-poppins)] z-10 relative">
                      {award.year}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 flex-1 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Award
                        size={20}
                        className="text-amber shrink-0 mt-0.5"
                      />
                      <div>
                        <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                          {award.title}
                        </h3>
                        <p className="text-sm text-teal font-semibold mt-0.5">
                          {award.event}
                        </p>
                        <p className="text-sm text-slate mt-1">
                          {award.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Media Coverage ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Media Coverage"
            subtitle={`${MEDIA_COVERAGE.length} features across international and Indian media — click any article to read it.`}
          />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All" ? MEDIA_COVERAGE.length : counts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? FILTER_COLORS[cat]
                      : "bg-white text-slate border border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat !== "All" && CATEGORY_ICONS[cat as MediaCategory]}
                  <Filter size={14} className={cat === "All" && !isActive ? "text-slate" : cat === "All" ? "text-white" : "hidden"} />
                  {cat}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20" : "bg-gray-100"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Coverage Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return item.url ? (
                <a
                  key={`${item.outlet}-${item.year}-${i}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group bg-white rounded-xl p-5 border transition-all duration-200 flex flex-col ${
                    isHovered
                      ? "shadow-lg border-teal/30 -translate-y-0.5"
                      : "border-gray-100 hover:shadow-lg hover:border-teal/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        CATEGORY_COLORS[item.category]
                      }`}
                    >
                      {CATEGORY_ICONS[item.category]}
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate">
                      <Calendar size={12} />
                      {item.year}
                    </span>
                  </div>

                  <p className="text-xs text-teal font-bold uppercase tracking-wider">
                    {item.outlet}
                  </p>
                  <h3 className="text-sm font-bold text-charcoal mt-1.5 leading-snug font-[family-name:var(--font-poppins)] flex-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-teal group-hover:text-teal-dark transition-colors">
                    Read article <ExternalLink size={12} />
                  </div>
                </a>
              ) : (
                <div
                  key={`${item.outlet}-${item.year}-${i}`}
                  className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col opacity-80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        CATEGORY_COLORS[item.category]
                      }`}
                    >
                      {CATEGORY_ICONS[item.category]}
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate">
                      <Calendar size={12} />
                      {item.year}
                    </span>
                  </div>

                  <p className="text-xs text-teal font-bold uppercase tracking-wider">
                    {item.outlet}
                  </p>
                  <h3 className="text-sm font-bold text-charcoal mt-1.5 leading-snug font-[family-name:var(--font-poppins)] flex-1">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate italic">
                    Print edition
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Early Press Timeline ─── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Early Years"
            subtitle="Before the Oscar nomination, the press was already taking notice. A timeline of our founding-era coverage."
          />

          {/* Year navigation */}
          <div className="flex justify-center gap-2 mb-12">
            {EARLY_YEARS.map((yr) => (
              <button
                key={yr.year}
                onClick={() => setActiveYear(activeYear === yr.year ? null : yr.year)}
                className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeYear === yr.year
                    ? "bg-charcoal text-white shadow-lg"
                    : "bg-white text-charcoal border border-gray-200 hover:border-charcoal"
                }`}
              >
                {yr.year}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  activeYear === yr.year ? "bg-amber text-charcoal" : "bg-gray-100 text-slate"
                }`}>
                  {yr.items.length}
                </span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal via-amber to-teal" />

            <div className="space-y-4">
              {(activeYear
                ? EARLY_YEARS.filter((y) => y.year === activeYear)
                : EARLY_YEARS
              ).map((yearGroup) =>
                yearGroup.items.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={`${yearGroup.year}-${i}`}
                      className={`relative flex items-start gap-4 sm:gap-0 ${
                        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      {/* Dot on timeline */}
                      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-teal z-10 mt-5" />

                      {/* Spacer for mobile */}
                      <div className="w-8 sm:hidden shrink-0" />

                      {/* Card */}
                      <div className={`flex-1 sm:w-[calc(50%-2rem)] ${isLeft ? "sm:pr-10" : "sm:pl-10"}`}>
                        <div className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${
                              item.type === "print" ? "bg-amber" : "bg-teal"
                            }`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate">
                              {item.date}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              item.type === "print"
                                ? "bg-amber-light/30 text-amber-800"
                                : "bg-teal-light text-teal"
                            }`}>
                              {item.type === "print" ? "Print" : "Online / TV"}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-charcoal font-[family-name:var(--font-poppins)] leading-snug">
                            {item.outlet}
                          </p>
                          {item.note && (
                            <p className="text-xs text-slate mt-1">{item.note}</p>
                          )}
                        </div>
                      </div>

                      {/* Other side spacer */}
                      <div className="hidden sm:block flex-1 sm:w-[calc(50%-2rem)]" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-xs text-slate">
              <span className="w-2.5 h-2.5 rounded-full bg-amber" />
              Print (Newspaper / Magazine)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate">
              <span className="w-2.5 h-2.5 rounded-full bg-teal" />
              Online / TV
            </div>
          </div>
        </div>
      </section>

      {/* ─── Press Kit ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-light to-teal/5 rounded-2xl p-8 lg:p-12 border border-teal/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Download size={32} className="text-teal mb-3" />
                <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Press Kit
                </h2>
                <p className="mt-3 text-slate text-sm leading-relaxed">
                  For media inquiries, interview requests, or hi-res photos,
                  contact us directly. We&apos;re happy to provide logos, team
                  photos, rescue footage, and background materials.
                </p>
                <a
                  href="mailto:nadeem@raptorrescue.org?subject=Press%20Inquiry"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
                >
                  nadeem@raptorrescue.org <ExternalLink size={14} />
                </a>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Hi-Res Photos
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    Rescue operations, team portraits, species close-ups
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Logo & Branding
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    SVG and PNG formats, usage guidelines
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Fact Sheet
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    Key stats, timeline, and organization background
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-12 lg:py-16 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Watch the Documentary
          </h2>
          <p className="mt-2 text-white/60 text-sm">
            See how it all started — the Oscar-nominated film that brought our
            story to the world.
          </p>
          <Link
            href="/all-that-breathes"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-amber text-charcoal font-bold rounded-full hover:bg-amber-light transition-colors text-sm"
          >
            All That Breathes <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
