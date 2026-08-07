/**
 * News and updates.
 *
 * These are static for now — there is no CMS behind them. To publish a new
 * post, add an entry to the top of NEWS_POSTS. Every factual claim in these
 * posts is drawn from a public record or from our partner's published figures.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; attribution?: string };

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date — used for sorting, display and sitemap lastModified. */
  date: string;
  category: string;
  image: string;
  imageAlt: string;
  readTime: string;
  featured?: boolean;
  body: Block[];
};

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "forty-thousand-birds",
    title: "Forty thousand birds",
    excerpt:
      "In June 2026 our partner in Delhi admitted its forty-thousandth patient — a Shikra with an injured shoulder. Here is what that number actually represents.",
    date: "2026-06-18",
    category: "Milestone",
    image: "/img/black-kite-recovery.jpg",
    imageAlt: "A Black Kite recovering from anaesthesia after wing surgery",
    readTime: "4 min read",
    featured: true,
    body: [
      {
        type: "p",
        text: "On 13 June 2026, a Shikra arrived at the Wildlife Rescue clinic in Wazirabad with an injured shoulder, most likely from striking a pane of glass. It was logged as case number forty thousand.",
      },
      {
        type: "p",
        text: "Numbers like that are easy to print and hard to feel. So it is worth saying plainly what forty thousand means here. It means forty thousand individual examinations. Forty thousand birds carried in by strangers, by schoolchildren, by traffic police, by people who did not know what else to do. It means a case file opened, a species identified, a weight taken, a body score recorded, and a treatment plan written — forty thousand times, by hand, since 2010.",
      },
      {
        type: "p",
        text: "Roughly eight in ten of those birds are Black Kites, the raptor that wheels above Delhi in numbers found almost nowhere else on earth. The rest span some one hundred and thirty-eight species: barn owls, scops owls, spotted owlets, serpent eagles, steppe eagles, peregrine falcons, and the Endangered Egyptian Vulture.",
      },
      { type: "h2", text: "What brings them in" },
      {
        type: "p",
        text: "About four in ten documented injuries come from manja — the glass-coated kite string flown across the city. Manja does not simply cut skin. It severs the propatagium, the leading edge of the wing, taking muscle, tendon and nerve with it. A bird with a cut propatagium cannot fly, and for most of the history of raptor rehabilitation that was the end of the conversation.",
      },
      {
        type: "p",
        text: "It is not the end of the conversation at Wildlife Rescue, because the clinic spent years working out how to rebuild that structure in layers and get birds flying again. That surgical work is the single most important reason to fund this clinic rather than simply admire it.",
      },
      {
        type: "quote",
        text: "Forty thousand is not a finish line. It is a measure of how much need there is, and how much of it two brothers and a small team have absorbed.",
      },
      {
        type: "p",
        text: "Raptor Rescue and Research exists to make sure the American people who were moved by this work have a straightforward, tax-deductible way to sustain it. The birds keep arriving. The clinic keeps opening.",
      },
    ],
  },
  {
    slug: "wing-repair-at-nwra",
    title: "A surgical technique, presented to the field",
    excerpt:
      "At the National Wildlife Rehabilitators Association symposium, Nadeem Shehzad and Mohammad Saud presented the staged propatagium repair they developed in Delhi.",
    date: "2025-02-20",
    category: "Research",
    image: "/img/nwra-speakers.jpg",
    imageAlt:
      "Mohammad Saud and Nadeem Shehzad wearing speaker badges at the NWRA Annual Symposium",
    readTime: "3 min read",
    body: [
      {
        type: "p",
        text: "In February 2025, at the National Wildlife Rehabilitators Association symposium in Bellevue, Washington, Nadeem Shehzad and Mohammad Saud stood up in front of a room of American rehabilitators and explained how to rebuild a raptor's wing.",
      },
      {
        type: "p",
        text: "The injury they were describing is specific and brutal. Manja — kite string coated in powdered glass — wraps around the leading edge of a bird's wing in flight and cuts inward. It takes the skin, then the propatagial tendon, then muscle and nerve, and in bad cases it reaches bone. Every one of those layers has to be restored for the wing to work again.",
      },
      { type: "h2", text: "Why this matters beyond Delhi" },
      {
        type: "p",
        text: "Techniques developed in a high-volume clinic travel. A facility that sees this injury thousands of times learns things a facility that sees it twice a year never will. Presenting that knowledge to the wider field — rather than keeping it in-house — is how a local practice becomes a contribution to veterinary medicine.",
      },
      {
        type: "p",
        text: "It is also, bluntly, why this organisation is called Raptor Rescue and Research. The rescue is visible and moving. The research is what compounds.",
      },
      {
        type: "quote",
        text: "A bird that cannot fly is not a bird you have saved. Restoring flight is the whole job.",
      },
    ],
  },
  {
    slug: "fy2024-in-review",
    title: "Our first full year, in numbers",
    excerpt:
      "Raptor Rescue and Research filed its Form 990-EZ for the fiscal year ending December 2024. Here is what came in, what went out, and where it went.",
    date: "2025-11-04",
    category: "Transparency",
    image: "/img/egyptian-vulture-care.jpg",
    imageAlt: "A young Egyptian Vulture in an enclosure at the clinic",
    readTime: "3 min read",
    body: [
      {
        type: "p",
        text: "We received our IRS determination in 2024 and have now filed our first full-year Form 990-EZ, for the fiscal year ending 31 December 2024. We would rather you read it than take our word for anything, and it is public: the filing is mirrored on ProPublica's Nonprofit Explorer.",
      },
      {
        type: "p",
        text: "In that year we took in $83,509 in revenue and spent $56,370, closing the year with $54,125 in net assets. Every dollar of revenue came from contributions and grants. We hold no investments, run no fee-charging programs, and sell nothing.",
      },
      { type: "h2", text: "Small on purpose" },
      {
        type: "p",
        text: "We are a three-person board and we intend to stay lean. There is no office to rent in the United States and no fundraising staff to pay. That is not modesty for its own sake — it is the mechanism by which a gift made in Virginia turns into antibiotics, sutures and aviary feed in Wazirabad.",
      },
      {
        type: "p",
        text: "Holding a reserve matters too. A clinic that has to stop admitting birds because a grant arrived late is a clinic that fails at exactly the wrong moment. Carrying net assets into the next year is what lets us commit to our partner in advance rather than in arrears.",
      },
    ],
  },
  {
    slug: "all-that-breathes",
    title: "The film that brought people here",
    excerpt:
      "Shaunak Sen's All That Breathes took the Grand Jury Prize at Sundance, the Golden Eye at Cannes, and a 2023 Academy Award nomination. Most of our donors found us through it.",
    date: "2023-03-12",
    category: "The Film",
    image: "/img/atb-poster.jpg",
    imageAlt: "The All That Breathes poster",
    readTime: "3 min read",
    body: [
      {
        type: "p",
        text: "Almost everyone who supports this organisation arrived by the same route. They watched a documentary about two brothers in Delhi who spend their days treating birds that fall out of a poisoned sky, and they wanted to know how to help.",
      },
      {
        type: "p",
        text: "All That Breathes, directed by Shaunak Sen, won the Grand Jury Prize for World Cinema Documentary at Sundance in 2022 and the Golden Eye at Cannes the same year. It won a Peabody, was nominated for a BAFTA, and in March 2023 was nominated for the Academy Award for Best Documentary Feature. It has collected more than twenty-six international awards.",
      },
      { type: "h2", text: "After the credits" },
      {
        type: "p",
        text: "The difficulty with a film this good is that it ends. The clinic does not. Birds arrived the morning after the Oscars ceremony in the same numbers as the morning before, and the costs of treating them did not fall because the story had been told well.",
      },
      {
        type: "p",
        text: "That gap — between the attention a film generates and the funding a clinic actually needs — is the reason Raptor Rescue and Research was formed. If the film moved you, this is the practical thing to do about it.",
      },
    ],
  },
];

export function getPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}

export function sortedPosts(): NewsPost[] {
  return [...NEWS_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
