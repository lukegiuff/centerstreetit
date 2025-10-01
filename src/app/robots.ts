import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/out/'],
      },
    ],
    sitemap: 'https://centerstreetit.com/sitemap.xml',
  };
}

