import type { Metadata } from "next";
import { ORG } from "./constants";

export const SITE_URL = ORG.url;

const DEFAULT_OG_IMAGE = {
  url: "/img/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "A Steppe Eagle in care at our partner's clinic in Delhi",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Raptor Rescue and Research Inc. — Funding raptor rescue around the world",
    template: "%s | Raptor Rescue and Research Inc.",
  },
  description:
    "A US 501(c)(3) charity funding the rescue, treatment and release of birds of prey. We are the American partner of Wildlife Rescue in Delhi — the world's largest raptor rescue facility, and the subject of the Oscar-nominated documentary All That Breathes.",
  keywords: [
    "raptor rescue",
    "bird of prey rehabilitation",
    "raptor conservation charity",
    "All That Breathes",
    "Wildlife Rescue Delhi",
    "black kite rescue",
    "Egyptian vulture conservation",
    "501c3 wildlife charity",
    "donate to raptor rescue",
    "Nadeem Shehzad",
    "Mohammad Saud",
    "New York registered charity",
  ],
  authors: [{ name: ORG.name }],
  creator: ORG.name,
  publisher: ORG.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: ORG.name,
    locale: "en_US",
    url: SITE_URL,
    title: "Raptor Rescue and Research Inc.",
    description:
      "Funding the rescue, treatment and release of birds of prey — and the people who do that work.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raptor Rescue and Research Inc.",
    description:
      "Funding the rescue, treatment and release of birds of prey around the world.",
    images: [DEFAULT_OG_IMAGE.url],
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
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

/** Build page-level metadata with a canonical URL and page-specific OG image. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const og = image
    ? [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }]
    : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}${path}`,
      images: og,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og[0].url],
    },
  };
}
