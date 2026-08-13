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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://centerstreetit.com';

  // Blog posts are needed up front so /blog can report the date of its newest post.
  const blogPosts = getBlogPosts();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: contentModified('homepage.md'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contentModified('pages', 'contact.md'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogPosts.length ? new Date(blogPosts[0].date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: contentModified('pages', 'privacy-policy.md'),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: contentModified('pages', 'terms-and-conditions.md'),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Service pages
  const servicePages = getAllServicePages();
  const serviceUrls = servicePages.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: contentModified('services', `${service.slug}.md`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}

