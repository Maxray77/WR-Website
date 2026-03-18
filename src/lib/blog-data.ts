export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
}

/**
 * Static blog posts for now.
 * When CMS (Sanity.io) is integrated, replace this with CMS queries.
 */
export const BLOG_POSTS: BlogPost[] = [
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
    title: "Presenting Our Refined Surgical Technique at NWRA Seattle",
    excerpt:
      "Seven years after our first NWRA presentation in LA, we returned to share our refined wing repair technique with rehabilitators worldwide.",
    date: "2025-11-20",
    author: "Saud",
    category: "Conference",
    readTime: "4 min",
    content: `In November 2025, we presented at the National Wildlife Rehabilitators Association (NWRA) Annual Symposium in Seattle — our second time on this international stage.

Our first presentation was in Los Angeles in 2018, where we introduced our novel surgical technique for repairing wings damaged by manja (glass-coated kite string). Seven years later, we returned with a refined version.

**What's changed since 2018:**
- The technique has been tested on 2,000+ birds
- Recovery rates have improved from 60% to over 80%
- Three other rehabilitation centers in India have adopted our method
- A veterinary clinic in Pakistan has begun using a modified version

**The response:** The Seattle audience included rehabilitators from 15 countries. Several approached us afterward to discuss implementing the technique at their facilities.

This validates what Nadeem and Saud have always believed — that solutions developed in the field, through years of hands-on experience, can advance the global practice of wildlife rehabilitation.`,
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
