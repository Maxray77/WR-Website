/**
 * JSON-LD structured data components for SEO.
 * These render <script type="application/ld+json"> tags.
 */

const SITE_URL = "https://www.raptorrescue.org";
const LOGO_URL = `${SITE_URL}/logo-black.png`;

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["NGO", "AnimalShelter"],
    "@id": `${SITE_URL}/#organization`,
    name: "Wildlife Rescue",
    alternateName: ["Raptor Rescue & Rehabilitation", "Wildlife Rescue Delhi"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/founders-combined.jpg`,
    description:
      "Wildlife Rescue is the world's largest raptor rescue and rehabilitation facility. Based in Delhi, India, we have treated 39,000+ injured birds since 2010 across 106+ species. Featured in the Oscar-nominated documentary 'All That Breathes'.",
    slogan: "Every Wing Deserves a Second Chance",
    foundingDate: "1990",
    foundingLocation: {
      "@type": "Place",
      name: "Old Delhi, India",
    },
    founders: [
      {
        "@type": "Person",
        name: "Nadeem Shehzad",
        jobTitle: "Co-Founder",
        url: SITE_URL + "/about",
      },
      {
        "@type": "Person",
        name: "Mohammad Saud",
        jobTitle: "Co-Founder",
        url: SITE_URL + "/about",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
      postalCode: "110084",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9810029698",
        contactType: "emergency",
        availableLanguage: ["English", "Hindi", "Urdu"],
        areaServed: "IN",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        email: "nadeem@raptorrescue.org",
        contactType: "general",
        areaServed: "Worldwide",
      },
    ],
    sameAs: [
      "https://www.facebook.com/wildliferescue.in",
      "https://www.instagram.com/wildliferescueindia",
      "https://www.youtube.com/@WildlifeRescueDelhi",
      "https://en.wikipedia.org/wiki/All_That_Breathes",
    ],
    nonprofitStatus: "NonprofitANBI",
    taxID: "AAATW2352B",
    naics: "813312",
    knowsAbout: [
      "Raptor rehabilitation",
      "Avian veterinary medicine",
      "Black kite (Milvus migrans)",
      "Vulture conservation",
      "Wildlife trauma surgery",
      "Propatagium repair",
      "Manja (kite-string) injury treatment",
      "Wildlife rescue in urban India",
    ],
    areaServed: [
      { "@type": "City", name: "Delhi" },
      { "@type": "Country", name: "India" },
    ],
    award: [
      "Subject of Academy Award nominee 'All That Breathes' (2023)",
      "Subject of Sundance Grand Jury Prize winner 'All That Breathes' (2022)",
      "Subject of Cannes L'Œil d'Or (Golden Eye) winner 'All That Breathes' (2022)",
      "Subject of Peabody Award winner 'All That Breathes'",
      "Subject of Jackson Wild Media Award winner",
      "Subject of Gotham Award winner",
    ],
    funder: {
      "@type": "Organization",
      name: "Raptor Rescue and Research Inc.",
      alternateName: "R3",
      url: "https://raptorrescueusa.org",
      taxID: "87-3289299",
      address: {
        "@type": "PostalAddress",
        streetAddress: "351 E, 50th St. Apt. # 2",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10022",
        addressCountry: "US",
      },
      description:
        "US 501(c)(3) fiscal sponsor enabling tax-deductible donations from US donors to Wildlife Rescue.",
    },
    subjectOf: {
      "@type": "Movie",
      name: "All That Breathes",
      url: `${SITE_URL}/all-that-breathes`,
      director: {
        "@type": "Person",
        name: "Shaunak Sen",
      },
      datePublished: "2022-01-21",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Wildlife Rescue",
    alternateName: "Raptor Rescue Delhi",
    url: SITE_URL,
    description:
      "Wildlife Rescue — the world's largest raptor rescue. Rescuing, rehabilitating, and releasing birds of prey in Delhi since the early 1990s.",
    inLanguage: "en",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
