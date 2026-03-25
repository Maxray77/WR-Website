/**
 * JSON-LD structured data components for SEO.
 * These render <script type="application/ld+json"> tags.
 */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Wildlife Rescue",
    alternateName: "Raptor Rescue & Rehab",
    url: "https://www.raptorrescue.org",
    logo: "https://www.raptorrescue.org/logo.png",
    description:
      "The world's largest raptor rescue facility. Based in Delhi, India. Featured in the Oscar-nominated documentary 'All That Breathes.' 38,500+ birds rescued since 2010.",
    foundingDate: "2003",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Street Number 9, Wazirabad Village",
      addressLocality: "Delhi",
      addressCountry: "IN",
      postalCode: "110084",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9810029698",
        contactType: "emergency",
        availableLanguage: ["English", "Hindi", "Urdu"],
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
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=100064413298498",
      "https://www.instagram.com/wildliferescueindia",
      "https://www.youtube.com/@WildlifeRescueDelhi",
    ],
    nonprofitStatus: "Nonprofit501c3",
    taxID: "47-5731705",
    areaServed: {
      "@type": "City",
      name: "Delhi",
      containedInPlace: {
        "@type": "Country",
        name: "India",
      },
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
    name: "Wildlife Rescue",
    url: "https://www.raptorrescue.org",
    description:
      "Wildlife Rescue — the world's largest raptor rescue. Rescuing, rehabilitating, and releasing birds of prey in Delhi since 2003.",
    publisher: {
      "@type": "NGO",
      name: "Wildlife Rescue",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
