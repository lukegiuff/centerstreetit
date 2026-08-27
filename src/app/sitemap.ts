import fs from 'fs';
import path from 'path';
import { getBlogPosts, getAllServicePages } from '@/lib/content';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Last-modified time of the markdown file backing a page.
 *
 * Previously every entry used `new Date()`, which told crawlers that all ~35 URLs
 * had changed on every single build. That is noise at the best of times, and it is
 * actively unhelpful right after a repositioning when we want crawlers to notice
 * the pages that genuinely changed.
 */
function contentModified(...segments: string[]): Date {
  try {
    return fs.statSync(path.join(process.cwd(), 'content', ...segments)).mtime;
  } catch {
    return new Date();
  }
}

/**
 * Canonical URL for a route.
 *
 * next.config.ts sets `trailingSlash: true`, so every page is served at "/foo/" and
 * its canonical tag is written with the trailing slash. The sitemap previously
 * emitted "/foo" without one. Google treats those as two different URLs, so the
 * canonical version of every page appeared in no sitemap at all, which is what
 * Search Console reports as "no referring sitemaps".
 */
function url(basePath: string, ...segments: string[]): string {
  const path = segments.filter(Boolean).join('/');
  return path ? `${basePath}/${path}/` : `${basePath}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://centerstreetit.com';

  // Blog posts are needed up front so /blog can report the date of its newest post.
  const blogPosts = getBlogPosts();

  // Static pages
  const staticPages = [
    {
      url: url(baseUrl),
      lastModified: contentModified('homepage.md'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: url(baseUrl, 'contact'),
      lastModified: contentModified('pages', 'contact.md'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: url(baseUrl, 'locations'),
      lastModified: contentModified('services', 'it-support-in-deer-park.md'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: url(baseUrl, 'blog'),
      lastModified: blogPosts.length ? new Date(blogPosts[0].date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: url(baseUrl, 'privacy-policy'),
      lastModified: contentModified('pages', 'privacy-policy.md'),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: url(baseUrl, 'terms-and-conditions'),
      lastModified: contentModified('pages', 'terms-and-conditions.md'),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Service pages
  const servicePages = getAllServicePages();
  const serviceUrls = servicePages.map((service) => ({
    url: url(baseUrl, service.slug),
    lastModified: contentModified('services', `${service.slug}.md`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogUrls = blogPosts.map((post) => ({
    url: url(baseUrl, "blog", post.slug),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}

