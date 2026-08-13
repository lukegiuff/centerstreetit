import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // '/api/' and '/out/' were also listed here but match nothing: this is a
        // static export with no API routes, and out/ is the build root, not a path.
        disallow: ['/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://centerstreetit.com/sitemap.xml',
  };
}

