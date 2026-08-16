interface ArticleData {
  title: string;
  excerpt: string;
  featured_image?: string;
  author: string;
  date: string;
  slug: string;
}

interface ServiceData {
  title: string;
  description: string;
}

interface StructuredDataProps {
  type: 'localBusiness' | 'article' | 'service';
  data?: ArticleData | ServiceData;
}

const SERVICE_CITIES = ['Deer Park', 'Pasadena', 'La Porte'];

const AREA_SERVED = SERVICE_CITIES.map((name) => ({
  "@type": "City",
  "name": name,
  "containedInPlace": {
    "@type": "State",
    "name": "Texas"
  }
}));

// City and state only — no streetAddress, postalCode or geo. This is a
// service-area business and the street address is not published anywhere.
const BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  "addressLocality": "Deer Park",
  "addressRegion": "TX",
  "addressCountry": "US"
};

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    // Emitted on the homepage only. Uses LocalBusiness rather than
    // ProfessionalService: schema.org records that the general
    // ProfessionalService type "was deprecated due to confusion with Service".
    case 'localBusiness':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://centerstreetit.com/#organization",
        "name": "Center Street I.T.",
        // "name" should match the Google Business Profile listing exactly. The
        // undotted form is kept here so the entity still resolves for anyone (or
        // anything) citing the business without the periods.
        "alternateName": ["Center Street IT", "Solomon Solutions, LLC"],
        "description": "Managed IT support and cybersecurity for industrial, trades, and professional businesses in Deer Park, Pasadena, and La Porte, Texas.",
        "url": "https://centerstreetit.com",
        "logo": "https://centerstreetit.com/images/logo_light.png",
        "image": "https://centerstreetit.com/images/logo_light.png",
        "telephone": "+1-346-877-9001",
        "faxNumber": "+1-346-877-9002",
        "email": "MoreInfo@CenterStreetIT.com",
        "priceRange": "$$",
        "paymentAccepted": "Cash, Credit Card, Check",
        "currenciesAccepted": "USD",
        "address": BUSINESS_ADDRESS,
        // areaServed, not serviceArea: schema.org marks serviceArea as superseded.
        "areaServed": AREA_SERVED,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:30",
            "closes": "17:00"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-346-877-9001",
          "contactType": "customer service",
          "email": "MoreInfo@CenterStreetIT.com",
          "availableLanguage": "English"
        },
        // Must match the profiles actually linked in content/settings.md.
        "sameAs": [
          "https://facebook.com/centerstreetit",
          "https://twitter.com/centerstreetit",
          "https://www.instagram.com/centerstreetit"
        ]
      };
      break;

    case 'article':
      if (!data || !('author' in data)) return null;
      const articleData = data as ArticleData;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.excerpt,
        "image": articleData.featured_image || "https://centerstreetit.com/images/logo_light.png",
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Center Street I.T.",
          "logo": {
            "@type": "ImageObject",
            "url": "https://centerstreetit.com/images/logo_light.png"
          }
        },
        "datePublished": articleData.date,
        "dateModified": articleData.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://centerstreetit.com/blog/${articleData.slug}`
        }
      };
      break;

    case 'service':
      if (!data || !('title' in data)) return null;
      const serviceData = data as ServiceData;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData.title,
        "description": serviceData.description,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://centerstreetit.com/#organization",
          "name": "Center Street I.T.",
          "address": BUSINESS_ADDRESS,
          "telephone": "+1-346-877-9001"
        },
        "areaServed": AREA_SERVED,
        "serviceType": "IT Support and Managed Services"
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

