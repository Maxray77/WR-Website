import type { Metadata } from "next";

const BASE_URL = "https://www.raptorrescue.org";
const OG_IMAGE = "/og-steppe-eagle-landscape.jpg";

export const siteMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Wildlife Rescue",
  authors: [{ name: "Wildlife Rescue", url: BASE_URL }],
  creator: "Wildlife Rescue",
  publisher: "Wildlife Rescue",
  category: "Nonprofit",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  title: {
    default:
      "Wildlife Rescue — World's Largest Raptor Rescue | Delhi, India",
    template: "%s | Wildlife Rescue",
  },
  description:
    "Wildlife Rescue is the world's largest raptor rescue facility, treating 40,000+ birds since 2010 in Delhi, India. Founded by Nadeem Shehzad and Mohammad Saud, subjects of the Oscar-nominated documentary 'All That Breathes' (Sundance Grand Jury Prize, Cannes Golden Eye, Peabody Award). Donations are 80(G) tax-deductible in India and 501(c)(3) tax-deductible in the US via R3.",
  keywords: [
    "wildlife rescue",
    "raptor rescue",
    "bird rescue Delhi",
    "raptor rehabilitation India",
    "black kite rescue",
    "vulture conservation India",
    "injured bird Delhi",
    "All That Breathes",
    "All That Breathes documentary",
    "Nadeem Shehzad",
    "Mohammad Saud",
    "Oscar nominated documentary",
    "Sundance Grand Jury Prize",
    "Cannes Golden Eye",
    "Peabody Award",
    "Jackson Wild Award",
    "donate wildlife India",
    "80G tax deductible donation",
    "501c3 raptor rescue",
    "raptorrescue.org",
    "Wazirabad bird hospital",
    "avian veterinary care India",
    "kite flying season manja injury",
    "wildlife NGO Delhi",
  ],
  openGraph: {
    type: "website",
    siteName: "Wildlife Rescue",
    title:
      "Wildlife Rescue — World's Largest Raptor Rescue | Delhi, India",
    description:
      "40,000+ birds rescued since 2010. Subjects of the Oscar-nominated 'All That Breathes' (Sundance, Cannes, Peabody). Help us heal Delhi's birds of prey.",
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Steppe Eagle — Wildlife Rescue, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wildlife Rescue — World's Largest Raptor Rescue | Delhi, India",
    description:
      "40,000+ birds rescued since 2010. Subjects of Oscar-nominated 'All That Breathes' (Sundance Grand Jury Prize, Cannes Golden Eye, Peabody).",
    site: "@wildliferescueindia",
    creator: "@wildliferescueindia",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "yQ44vNizfUcYDK9HBb45hiZYgBlpefC0wu8QAYuA710",
  },
};

export const pageMetadata = {
  about: {
    title: "About Us — The Story of Two Brothers Who Built a Bird Hospital",
    description:
      "Wildlife Rescue was founded by Nadeem Shehzad and Mohammad Saud, two brothers from Old Delhi whose work treating injured birds of prey became the subject of the Oscar-nominated documentary 'All That Breathes'. Learn about our team, mission, and 30+ years of avian rescue.",
    alternates: { canonical: "/about" },
  },
  donate: {
    title: "Donate — 80(G) & 501(c)(3) Tax-Deductible Giving",
    description:
      "Support the world's largest raptor rescue. Indian donors get 80(G) tax exemption (Reg. AAATW2352B25DL02). US donors give via Raptor Rescue & Research Inc. (EIN 87-3289299, 501(c)(3)). Pay via Razorpay, UPI, GoFundMe, bank transfer, or cheque.",
    alternates: { canonical: "/donate" },
  },
  contact: {
    title: "Contact Us — Report an Injured Bird in Delhi",
    description:
      "Found an injured bird in Delhi? Call our rescue hotline +91 98100 29698 or WhatsApp us. Wildlife Rescue clinic — Wazirabad Village, North Delhi. Email: nadeem@raptorrescue.org.",
    alternates: { canonical: "/contact" },
  },
  allThatBreathes: {
    title:
      "All That Breathes — The Oscar-Nominated Documentary About Wildlife Rescue",
    description:
      "All That Breathes (dir. Shaunak Sen) follows Nadeem Shehzad and Mohammad Saud as they treat Delhi's falling black kites. Winner of the Sundance Grand Jury Prize, Cannes L'Œil d'Or (Golden Eye), Peabody Award, Gotham, Jackson Wild — 26 international awards. Academy Award and BAFTA nominee for Best Documentary Feature.",
    alternates: { canonical: "/all-that-breathes" },
  },
  gallery: {
    title: "Photo Gallery — Rescued Birds of Delhi",
    description:
      "Photographs from the world's largest raptor rescue: black kites, owls, vultures and other birds of prey in treatment, surgery, recovery, and release at our Delhi clinic.",
    alternates: { canonical: "/gallery" },
  },
  media: {
    title: "Media & Press — Wildlife Rescue in the News",
    description:
      "Wildlife Rescue and founders Nadeem Shehzad & Mohammad Saud in the press — 50+ articles and broadcasts, the Oscar-nominated 'All That Breathes', and international awards coverage. Press kit and media enquiries.",
    alternates: { canonical: "/media" },
  },
  birdBrothers: {
    title: "Bird Brothers, A Delhi Story — Children's Picture Book",
    description:
      "'Bird Brothers, A Delhi Story' by Rina Singh, illustrated by Barkha Lohia — an award-winning children's picture book inspired by Wildlife Rescue's Nadeem Shehzad and Mohammad Saud and their work saving Delhi's black kites.",
    alternates: { canonical: "/bird-brothers" },
  },
  reportTaggedBird: {
    title: "Report a Tagged Bird",
    description:
      "Spotted a Wildlife Rescue tagged or ringed bird in Delhi? Report the tag number, location, and photos to help us track the survival and movement of birds released back into the wild.",
    alternates: { canonical: "/report-tagged-bird" },
  },
};
