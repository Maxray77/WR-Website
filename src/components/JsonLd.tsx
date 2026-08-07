import { BOARD, FILM, ORG, PARTNER, SOCIAL } from "@/lib/constants";
import { SITE_URL } from "@/lib/metadata";

/**
 * Structured data for the organisation and site. Everything asserted here is
 * verifiable from a public record — IRS filings, the partner's own site, or
 * published award records. Do not add claims that cannot be substantiated.
 */
export default function JsonLd() {
  const graph = [
    {
      "@type": ["NGO", "NonprofitOrganization"],
      "@id": `${SITE_URL}/#organization`,
      name: ORG.name,
      alternateName: ORG.initials,
      url: SITE_URL,
      description:
        "A United States 501(c)(3) charity funding the rescue, treatment and release of birds of prey worldwide, and the American partner of Wildlife Rescue in Delhi, India.",
      slogan: ORG.tagline,
      taxID: ORG.ein,
      nonprofitStatus: "Nonprofit501c3",
      foundingDate: String(ORG.rulingYear),
      email: ORG.email,
      telephone: ORG.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: ORG.address.street,
        addressLocality: ORG.address.city,
        addressRegion: ORG.address.state,
        postalCode: ORG.address.zip,
        addressCountry: "US",
      },
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
      employee: BOARD.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
      })),
      knowsAbout: [
        "Raptor rehabilitation",
        "Bird of prey veterinary care",
        "Propatagium (wing) repair surgery",
        "Vulture conservation",
        "Wildlife rescue funding",
      ],
      sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.youtube],
      funding: {
        "@type": "Organization",
        name: PARTNER.name,
        url: PARTNER.url,
      },
      subjectOf: {
        "@type": "Movie",
        name: FILM.title,
        director: { "@type": "Person", name: FILM.director },
        datePublished: String(FILM.year),
        award: FILM.awards.map((a) => `${a.name} — ${a.detail} (${a.year})`),
      },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "EIN",
        value: ORG.ein,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: ORG.name,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Structured data is generated from our own constants, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
