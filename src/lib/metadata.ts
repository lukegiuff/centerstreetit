import type { Metadata } from 'next';

export const SITE_NAME = 'Center Street I.T.';
export const SITE_URL = 'https://centerstreetit.com';

/**
 * Default social card. 1200x630 on a solid ground, so it renders correctly on
 * both light and dark preview panels.
 */
export const OG_IMAGE = {
  url: '/assets/og-card.png',
  width: 1200,
  height: 630,
  alt: 'Center Street I.T. - managed IT support and cybersecurity in Deer Park, Texas',
};

interface SocialMetaInput {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/contact". */
  path: string;
  /** Page-specific image path. Falls back to the site card. */
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Builds the openGraph and twitter blocks for a page.
 *
 * Next.js does NOT deep-merge `openGraph` or `twitter` — a page that defines
 * either one replaces the parent's version wholesale. That silently dropped the
 * social card from every page that set its own og:description, so both blocks are
 * always built in full here rather than relying on inheritance.
 */
export function socialMeta({
  title,
  description,
  path,
  image,
  type = 'website',
}: SocialMetaInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : [OG_IMAGE];

  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
      creator: '@centerstreetit',
    },
  };
}
