/**
 * Single source of truth for organisation facts, people and figures.
 *
 * Every number in here is traceable to a public record or to our partner's
 * published data. If you change a figure, change it here — never inline it
 * in a component. Sources are noted alongside the values.
 */

/* -------------------------------------------------------------------------- */
/*  Organisation                                                              */
/* -------------------------------------------------------------------------- */

export const ORG = {
  name: "Raptor Rescue and Research Inc.",
  shortName: "Raptor Rescue and Research",
  initials: "R3",
  tagline: "Your partner in helping raptors around the world.",
  ein: "87-3289299",
  /** IRS determination — tax-exempt ruling year (Form 990-EZ, ProPublica). */
  rulingYear: 2024,
  status: "501(c)(3) nonprofit organization",
  url: "https://www.raptorrescueusa.org",

  address: {
    street: "63 Mountain View Dr.",
    city: "Waynesboro",
    state: "VA",
    zip: "22980",
    country: "USA",
  },

  /** Primary inbox on the organisation's own domain. */
  email: "info@raptorrescueusa.org",
  /** Long-standing public address, kept for continuity with the old site. */
  altEmail: "raptorrescueusa@gmail.com",
  phone: "(773) 536-9698",
  phoneHref: "+17735369698",
} as const;

export const ORG_ADDRESS_ONE_LINE = `${ORG.address.street}, ${ORG.address.city}, ${ORG.address.state} ${ORG.address.zip}`;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Mission", href: "/mission" },
  {
    label: "Our Work",
    children: [
      {
        label: "The Wildlife Rescue Partnership",
        href: "/wildlife-rescue",
        blurb: "Where your gift lands: Delhi, India",
      },
      {
        label: "All That Breathes",
        href: "/all-that-breathes",
        blurb: "The Oscar-nominated documentary",
      },
    ],
  },
  { label: "Impact", href: "/impact" },
  {
    label: "About",
    children: [
      { label: "Who We Are", href: "/about", blurb: "Board and governance" },
      { label: "News & Updates", href: "/news", blurb: "The latest from the field" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/*  Financials — FY2024 Form 990-EZ                                            */
/*  Filed 4 November 2025 for the fiscal year ending 31 December 2024.         */
/*  Source: IRS filing, mirrored at ProPublica Nonprofit Explorer.             */
/* -------------------------------------------------------------------------- */

export const FINANCIALS = {
  fiscalYear: 2024,
  fiscalYearEnd: "December 31, 2024",
  formType: "990-EZ",
  filedOn: "November 4, 2025",
  totalRevenue: 83509,
  totalExpenses: 56370,
  totalAssets: 54125,
  netAssets: 54125,
  /** 100% of FY2024 revenue came from contributions and grants. */
  contributionShare: 1,
  propublicaUrl:
    "https://projects.propublica.org/nonprofits/organizations/873289299",
  candidUrl: "https://www.guidestar.org/profile/87-3289299",
} as const;

export const FINANCE_NOTES = [
  "Every dollar of our FY2024 revenue came from individual contributions and grants — we hold no investments and run no fee-based programs.",
  "We are a small, volunteer-led board. Our overhead is deliberately minimal so that the overwhelming majority of what we raise reaches birds in care.",
  "Our filings are public. The complete Form 990-EZ is available from the IRS and mirrored on ProPublica's Nonprofit Explorer.",
];

/* -------------------------------------------------------------------------- */
/*  Board of Directors                                                        */
/*  Names and titles as reported on the FY2024 Form 990-EZ.                   */
/* -------------------------------------------------------------------------- */

export type BoardMember = {
  name: string;
  role: string;
  image?: string;
  bio: string[];
  links?: { label: string; href: string }[];
};

export const BOARD: BoardMember[] = [
  {
    name: "Suzie Gilbert",
    role: "President",
    bio: [
      "Suzie Gilbert has been a wild bird rehabilitator for more than thirty years. After a decade at the Hudson Valley Raptor Center she founded Flyaway, Inc., her own 501(c)(3) wild bird rehabilitation organization, and ran it for fifteen years.",
      "She is the author of Flyaway: How a Wild Bird Rehabber Sought Adventure and Found Her Wings (HarperCollins), the children's book Hawk Hill (Chronicle Books), and the novel Unflappable (Perch Press). She writes and speaks widely on wildlife rehabilitation and the people who do it.",
      "She leads Raptor Rescue and Research because she has spent a career watching what a handful of determined rehabilitators can accomplish — and because she believes the work happening in Delhi deserves an American partner.",
    ],
    links: [{ label: "suziegilbert.com", href: "https://suziegilbert.com" }],
  },
  {
    name: "Nadeem Shehzad",
    role: "Secretary",
    image: "/img/nadeem.jpg",
    bio: [
      "Nadeem Shehzad co-founded Wildlife Rescue in Delhi with his brother Mohammad Saud after the two began treating injured Black Kites out of their family home in the early 1990s. What started with a single refused bird became the largest raptor rescue facility in the world.",
      "He is one of the two subjects of All That Breathes, the documentary that took the Sundance Grand Jury Prize, the Golden Eye at Cannes, a Peabody Award, and a 2023 Academy Award nomination for Best Documentary Feature.",
      "As Secretary he keeps Raptor Rescue and Research anchored to the clinic floor, ensuring that what we fund in the United States matches what is actually needed in Delhi.",
    ],
  },
  {
    name: "Linda McDaniel",
    role: "Treasurer",
    bio: [
      "Linda McDaniel serves as Treasurer, with responsibility for the organization's financial controls, recordkeeping and annual IRS filing.",
      "She oversees the stewardship of every contribution we receive and ensures our grants to partner organizations are documented, restricted where donors intend, and reported accurately.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Partner: Wildlife Rescue, Delhi                                           */
/*  Figures published by Wildlife Rescue at raptorrescue.org.                 */
/* -------------------------------------------------------------------------- */

export const PARTNER = {
  name: "Wildlife Rescue",
  location: "Wazirabad, Delhi, India",
  url: "https://www.raptorrescue.org",
  founders: "Nadeem Shehzad and Mohammad Saud",
  registered: "Registered under the Indian Trusts Act, 2010; FCRA 2020",
  /** Cumulative cases received; Wildlife Rescue crossed 40,000 in June 2026. */
  totalBirds: "40,000+",
  totalBirdsNumeric: 40000,
  /** Wildlife Rescue's own published annual intake for calendar year 2025. */
  birdsIn2025: 4184,
  /** Black Kites as a share of all intake across the 2010–2026 case register. */
  blackKiteShare: "82%",
  /** Manja (glass-coated kite string) injuries as a share of documented cases. */
  manjaShare: "40%",
  speciesCount: "138",
} as const;

export const PARTNER_STATS = [
  {
    value: PARTNER.totalBirds,
    label: "Birds received since 2010",
    detail: "Wildlife Rescue crossed forty thousand cases in June 2026.",
  },
  {
    value: PARTNER.birdsIn2025.toLocaleString("en-US"),
    label: "Birds treated in 2025 alone",
    detail: "Their busiest year on record, and the numbers keep climbing.",
  },
  {
    value: PARTNER.speciesCount,
    label: "Distinct species treated",
    detail: "From Black Kites to Endangered Egyptian Vultures.",
  },
  {
    value: PARTNER.manjaShare,
    label: "Of documented injuries are from manja",
    detail: "Glass-coated kite string that cuts wings to the bone.",
  },
];

/* -------------------------------------------------------------------------- */
/*  All That Breathes                                                         */
/* -------------------------------------------------------------------------- */

export const FILM = {
  title: "All That Breathes",
  director: "Shaunak Sen",
  year: 2022,
  /** "All That Breathes | Official Trailer | HBO" */
  trailerId: "GoTlULspDyY",
  hboPremiere: "February 7, 2023",
  synopsis:
    "Two brothers in Delhi devote their lives to the black kites falling from the city's polluted sky. Shaunak Sen's film follows Nadeem Shehzad and Mohammad Saud through a basement clinic, a crowded city and a fraying sky, and finds in their work an argument about what we owe the living world.",
  awards: [
    { name: "Academy Award Nomination", detail: "Best Documentary Feature", year: 2023 },
    { name: "BAFTA Nomination", detail: "Best Documentary", year: 2023 },
    { name: "Grand Jury Prize", detail: "Sundance Film Festival, World Cinema Documentary", year: 2022 },
    { name: "Golden Eye", detail: "Cannes Film Festival, Best Documentary", year: 2022 },
    { name: "Peabody Award", detail: "Documentary", year: 2023 },
    { name: "Jackson Wild Media Award", detail: "Best Conservation Film", year: 2023 },
  ],
  awardCount: "26+",
  distributors: "HBO Documentary Films and Sideshow / Submarine Deluxe",
} as const;

/* -------------------------------------------------------------------------- */
/*  Giving                                                                    */
/* -------------------------------------------------------------------------- */

export type GivingTier = {
  amount: number;
  title: string;
  description: string;
  featured?: boolean;
};

/**
 * Preset one-time amounts. Descriptions deliberately describe what a gift
 * *supports* rather than claiming an exact per-bird unit cost — we do not
 * publish figures we cannot substantiate from our partner's audited accounts.
 */
export const GIVING_TIERS: GivingTier[] = [
  {
    amount: 35,
    title: "Intake and triage",
    description:
      "Supports the first hours of care for a bird arriving at the clinic — examination, fluids, pain relief and stabilisation.",
  },
  {
    amount: 100,
    title: "Wound care",
    description:
      "Helps fund the sutures, dressings, antibiotics and daily bandage changes that a manja-cut wing needs over weeks of healing.",
    featured: true,
  },
  {
    amount: 250,
    title: "Surgical support",
    description:
      "Contributes to the anaesthesia, imaging and surgical consumables behind a wing repair — the procedure our partner pioneered.",
  },
  {
    amount: 500,
    title: "Flight and release",
    description:
      "Supports the aviary time, feeding and conditioning a raptor needs between surgery and the day it is released back over Delhi.",
  },
];

export const MONTHLY_TIERS: GivingTier[] = [
  {
    amount: 10,
    title: "Sustaining supporter",
    description: "Steady, predictable funding the clinic can plan around.",
  },
  {
    amount: 25,
    title: "Flight crew",
    description: "Underwrites a share of the clinic's month-to-month running costs.",
    featured: true,
  },
  {
    amount: 50,
    title: "Guardian",
    description: "Meaningful monthly capacity for medicines and surgical supplies.",
  },
  {
    amount: 100,
    title: "Benefactor",
    description: "Helps fund equipment and the research that improves outcomes.",
  },
];

export const OTHER_WAYS_TO_GIVE = [
  {
    title: "Donor-advised fund",
    body: "Recommend a grant to Raptor Rescue and Research Inc., EIN 87-3289299. Most sponsors — Fidelity Charitable, Schwab Charitable, Vanguard Charitable and community foundations — let you do this online in a few minutes.",
    icon: "landmark",
  },
  {
    title: "Appreciated stock or securities",
    body: "Giving appreciated shares you have held for more than a year can let you deduct the full market value and avoid capital gains tax. Write to us and we will send transfer instructions.",
    icon: "trending-up",
  },
  {
    title: "Employer matching",
    body: "Thousands of employers will match your gift dollar for dollar, and some match at two or three times. Check your company's matching-gift portal and enter our EIN.",
    icon: "handshake",
  },
  {
    title: "Qualified charitable distribution",
    body: "If you are 70½ or older you can give directly from an IRA. A QCD counts toward your required minimum distribution and is excluded from your taxable income.",
    icon: "piggy-bank",
  },
  {
    title: "A gift in your will",
    body: "A bequest costs you nothing today and can be written in a single sentence. Naming us in your estate plan sustains this work far beyond any one of us.",
    icon: "scroll",
  },
  {
    title: "By check",
    body: `Make checks payable to Raptor Rescue and Research Inc. and mail to ${ORG_ADDRESS_ONE_LINE}. Please include an email address and we will send your acknowledgement letter.`,
    icon: "mail",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Social                                                                    */
/* -------------------------------------------------------------------------- */

export const SOCIAL = {
  instagram: "https://www.instagram.com/wildliferescueindia",
  facebook: "https://www.facebook.com/wildliferescue.india/",
  youtube: "https://www.youtube.com/@wildliferescue341",
} as const;
