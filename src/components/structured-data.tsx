interface StructuredDataProps {
  type: 'organization' | 'localBusiness' | 'article' | 'service';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Center Street IT",
        "url": "https://centerstreetit.com",
        "logo": "https://centerstreetit.com/assets/Logo-WhiteText.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-346-877-9001",
          "contactType": "customer service",
          "email": "MoreInfo@CenterStreetIT.com",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8999 Kirby Dr Ste 220",
          "addressLocality": "Houston",
          "addressRegion": "TX",
          "postalCode": "77054",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://facebook.com/centerstreetit",
          "https://twitter.com/centerstreetit",
          "https://linkedin.com/company/centerstreetit"
        ]
      };
      break;

    case 'localBusiness':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://centerstreetit.com",
        "name": "Center Street IT",
        "image": "https://centerstreetit.com/assets/Logo-WhiteText.png",
        "description": "Premier IT support and managed services in Houston, TX. Expert technology solutions, cloud infrastructure, cybersecurity, and 24/7 IT support for businesses.",
        "url": "https://centerstreetit.com",
        "telephone": "+1-346-877-9001",
        "email": "MoreInfo@CenterStreetIT.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8999 Kirby Dr Ste 220",
          "addressLocality": "Houston",
          "addressRegion": "TX",
          "postalCode": "77054",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.6516",
          "longitude": "-95.4915"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "29.6516",
            "longitude": "-95.4915"
          },
          "geoRadius": "50000"
        },
        "priceRange": "$$",
        "paymentAccepted": "Cash, Credit Card, Check",
        "currenciesAccepted": "USD"
      };
      break;

    case 'article':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.excerpt,
        "image": data.featured_image || "https://centerstreetit.com/assets/Logo-WhiteText.png",
        "author": {
          "@type": "Person",
          "name": data.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Center Street IT",
          "logo": {
            "@type": "ImageObject",
            "url": "https://centerstreetit.com/assets/Logo-WhiteText.png"
          }
        },
        "datePublished": data.date,
        "dateModified": data.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://centerstreetit.com/blog/${data.slug}`
        }
      };
      break;

    case 'service':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": data.title,
        "description": data.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Center Street IT",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "8999 Kirby Dr Ste 220",
            "addressLocality": "Houston",
            "addressRegion": "TX",
            "postalCode": "77054",
            "addressCountry": "US"
          },
          "telephone": "+1-346-877-9001"
        },
        "areaServed": {
          "@type": "City",
          "name": "Houston",
          "containedInPlace": {
            "@type": "State",
            "name": "Texas"
          }
        },
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

