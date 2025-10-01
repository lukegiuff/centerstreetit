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
  type: 'organization' | 'localBusiness' | 'article' | 'service';
  data?: ArticleData | ServiceData;
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
      if (!data || !('author' in data)) return null;
      const articleData = data as ArticleData;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.excerpt,
        "image": articleData.featured_image || "https://centerstreetit.com/assets/Logo-WhiteText.png",
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Center Street IT",
          "logo": {
            "@type": "ImageObject",
            "url": "https://centerstreetit.com/assets/Logo-WhiteText.png"
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

