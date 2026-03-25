import type { Metadata } from "next";

const BASE_URL = "https://raptorrescue.org";

export const siteMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Wildlife Rescue — Every Wing Deserves a Second Chance",
    template: "%s | Wildlife Rescue",
  },
  description:
    "Wildlife Rescue is the world's largest raptor rescue facility, based in Delhi, India. Featured in the Oscar-nominated documentary 'All That Breathes.' 38,500+ birds rescued since 2010.",
  keywords: [
    "wildlife rescue delhi",
    "bird rescue delhi",
    "raptor rescue india",
    "black kite rescue",
    "all that breathes organization",
    "injured bird help delhi",
    "donate wildlife rescue india",
    "raptor rehabilitation india",
  ],
  openGraph: {
    type: "website",
    siteName: "Wildlife Rescue",
    title: "Wildlife Rescue — Every Wing Deserves a Second Chance",
    description:
      "The world's largest raptor rescue facility. 38,500+ birds rescued since 2010. Featured in the Oscar-nominated documentary 'All That Breathes.'",
    url: BASE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildlife Rescue — Every Wing Deserves a Second Chance",
    description:
      "The world's largest raptor rescue facility. 38,500+ birds rescued since 2010.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const pageMetadata = {
  about: {
    title: "About Us",
    description:
      "The story of two brothers who transformed raptor rescue in India. Learn about our mission, team, and 20+ years of wildlife conservation in Delhi.",
  },
  donate: {
    title: "Donate",
    description:
      "Help Wildlife Rescue save more lives. Your donation feeds, heals, and rehabilitates injured raptors in Delhi. 80(G) and 501(c)(3) tax-deductible.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Report an injured bird or get in touch with Wildlife Rescue. Emergency hotline: +91 98100 29698. Located in Wazirabad Village, Delhi.",
  },
  allThatBreathes: {
    title: "All That Breathes — Oscar-Nominated Documentary",
    description:
      "All That Breathes follows the founders of Wildlife Rescue. Winner of 26 international awards including Sundance Grand Jury Prize and Cannes Golden Eye. Nominated for the Academy Award.",
  },
};
