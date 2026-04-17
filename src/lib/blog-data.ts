export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
  image?: string;
  pdfUrl?: string;
  /**
   * If set, the blog post is backed by an entry in ANNUAL_REPORTS with this
   * year. The listing + detail pages then render the archive-style card
   * (infographic + cover previews + download CTAs) instead of the plain
   * PDF banner.
   */
  annualReportYear?: number;
}

/**
 * Static blog posts for now.
 * When CMS (Sanity.io) is integrated, replace this with CMS queries.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "wr-annual-report-2025",
    title: "Wildlife Rescue Annual Report 2025",
    excerpt:
      "Our 2025 annual report — a record year with 4,214 birds rescued across 53 species. Download the infographic or the full detailed PDF below.",
    date: "2026-04-16",
    author: "Wildlife Rescue",
    category: "Annual Update",
    readTime: "PDF",
    image: "/annual-reports/infographic-2025.jpg",
    pdfUrl: "/wr-annual-report.pdf",
    annualReportYear: 2025,
    content: `Wildlife Rescue's 2025 Annual Report provides a comprehensive overview of a record-breaking year — our biggest ever, with 4,184 birds rescued.

**What's inside:**
- Total birds rescued and treated across 34+ species
- Species breakdown and long-term trends
- Financial statements and donor acknowledgments
- Facility upgrades, new equipment, and surgical advances
- Team growth and volunteer contributions
- Conservation impact, partner network, and future goals

Download the full 2025 report using the link above.`,
  },
  {
    slug: "record-breaking-2025",
    title: "2025: Our Biggest Year Ever — 4,184 Birds Rescued",
    excerpt:
      "We shattered our previous record with 4,184 birds rescued in 2025. Here's how our team, partners, and supporters made it happen.",
    date: "2026-01-15",
    author: "Nadeem Shehzad",
    category: "Annual Update",
    readTime: "5 min",
    content: `2025 was a landmark year for Wildlife Rescue. For the first time, we crossed the 4,000-bird threshold — treating 4,184 birds across 34+ species.

This represents a 24% increase over 2024 and marks our 12x growth since 2010, when we treated just 362 birds from our home in Old Delhi's Walled City.

**What drove the record:**
- Expanded partner network: 10+ organizations now send us injured birds
- Our rescue vehicle enabled faster response times across Delhi
- The "All That Breathes" documentary continued to drive public awareness
- Community reporting increased significantly through WhatsApp

**The busiest month:** May 2025, with 720 birds in a single month — an average of 23 birds per day. Our team worked around the clock.

**Looking ahead:** We're preparing for an even bigger 2026 with facility upgrades, new equipment, and expanded team capacity. Thank you to every donor and volunteer who made 2025 possible.`,
  },
  {
    slug: "nwra-seattle-2025",
    title: "Advanced Propatagium Surgery — Presented at NWRA 2025",
    excerpt:
      "Nadeem Shehzad and Mohammad Saud presented Wildlife Rescue's refined technique for surgical repair of the avian propatagium at the NWRA Symposium in Bellevue, WA (Seattle), February 2025.",
    date: "2025-02-20",
    author: "Mohammad Saud",
    category: "Conference",
    readTime: "4 min",
    image: "/nwra-2025/speakers-backdrop.jpg",
    content: `In February 2025, Nadeem Shehzad and Mohammad Saud presented at the National Wildlife Rehabilitators Association (NWRA) Annual Symposium in Bellevue, WA (Seattle area) — our second time on this international stage.

The presentation focused on our refined surgical technique for repairing the **propatagium** — the triangular membrane along the leading edge of the wing that is critical to flight. This is the single most common injury we see from manja (glass-coated kite string), which slices through both skin and the underlying TPLT and EMR tendons.

Our first NWRA presentation was in Los Angeles in 2018, where we introduced the novel technique. Seven years later, we returned with the refined, staged version.

**What's changed since 2018:**
- The technique has been tested on 2,000+ birds
- Recovery rates have improved from 60% to over 80%
- Three other rehabilitation centers in India have adopted our method
- A veterinary clinic in Pakistan has begun using a modified version

**The response:** The audience included rehabilitators from 15 countries. Several approached us afterward to discuss implementing the technique at their facilities.

**See the full presentation with surgical-stage photos and symposium gallery:** [View the NWRA 2025 Presentation Page →](/nwra-2025)

This trip was made possible by **Raptor Rescue and Research Inc.** — Wildlife Rescue's U.S. fiscal sponsor, a 501(c)(3) nonprofit based in New York.`,
  },
  {
    slug: "monsoon-2025-preparedness",
    title: "How We Prepared for Monsoon Season 2025",
    excerpt:
      "Monsoon season means wet-wire electrocutions surge. Here's how we geared up for Delhi's deadliest season for raptors.",
    date: "2025-06-01",
    author: "Wildlife Rescue Team",
    category: "Operations",
    readTime: "3 min",
    content: `Every year, Delhi's monsoon season (June–September) brings a surge in raptor injuries. Wet power lines become lethal conductors, and birds perching on them suffer severe electrical burns.

**By the numbers:** In 2024, electrocution cases jumped 300% during monsoon months compared to dry season. We treated 180 electrocution cases between June and September alone.

**Our 2025 preparations:**
- Pre-positioned emergency supplies at 3 partner locations across Delhi
- Trained 5 new community responders in safe bird handling
- Upgraded our laser treatment equipment for burn cases
- Stocked extra medication for the anticipated surge
- Created a WhatsApp rapid-response group with 50+ volunteers

**The challenge:** Every monsoon, we face the same impossible math — more birds need help than we have capacity. But each year, we're better prepared. This year, we're ready.`,
  },
  {
    slug: "species-diversity-growing",
    title: "Beyond Black Kites: Our Growing Species Diversity",
    excerpt:
      "While Black Kites remain 80% of our intake, we're treating more species than ever — from Egyptian Vultures to Indian Grey Hornbills.",
    date: "2025-04-10",
    author: "Nadeem Shehzad",
    category: "Conservation",
    readTime: "4 min",
    content: `When Wildlife Rescue started, we were primarily a Black Kite rescue operation. Black Kites still make up about 80% of our intake — but the remaining 20% tells an important story.

**Species diversity has grown from 9 species in 2010 to 34+ species in 2025.**

**Notable additions in recent years:**
- Egyptian Vulture (IUCN Endangered) — ~7 per year, every individual is critical
- Crested Serpent Eagle — rare in urban Delhi, mostly from Ridge forests
- Indian Grey Hornbill — barometer of urban tree health
- Blue Rock Pigeon — now our #2 species at 6.3% of intake

**Why diversity matters:** Each new species we treat represents expanding trust from Delhi's communities. People are learning that we help all birds, not just kites. It also means we're building expertise across more species — making us a more complete wildlife rescue facility.

**The goal:** To be Delhi's comprehensive avian rescue center, capable of treating any bird species that needs help.`,
  },
  {
    slug: "volunteer-spotlight-maria",
    title: "Volunteer Spotlight: Maria's Month at Wildlife Rescue",
    excerpt:
      "Maria traveled from Portugal to spend a month volunteering. She shares her experience of early mornings, emergency calls, and life-changing moments.",
    date: "2025-03-05",
    author: "Maria Silva",
    category: "Volunteer Stories",
    readTime: "5 min",
    content: `When I saw "All That Breathes" in a cinema in Lisbon, I knew I had to visit Wildlife Rescue. Six months later, I was on a flight to Delhi.

**Week 1: Culture shock and early mornings.** The alarm goes off at 5:30 AM. By 6, I'm helping prepare food for 40+ birds. The first thing that strikes you is the scale — this isn't a small operation. It's an entire ecosystem of care.

**Week 2: My first emergency call.** A Black Kite tangled in manja string near India Gate. We drove across Delhi in rush hour, gently freed the bird, and brought it back. The wing was badly cut. Watching Nadeem assess the injury and decide on treatment — in seconds — was remarkable.

**Week 3: Surgery day.** I assisted during a wing repair surgery. Nadeem's hands are incredibly steady. The bird was under anesthesia for 45 minutes. When it woke up, we all held our breath. It moved its wing. We exhaled.

**Week 4: Release day.** The best day. We released 8 birds at the Yamuna. Watching them fly — really fly, strongly — after weeks of recovery... there's nothing like it.

**What I learned:** That expertise doesn't always come from universities. That dedication is the most powerful medicine. And that two brothers from Old Delhi can change the world, one bird at a time.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
