import { getSiteSettings, getServicePageContent, getAllServicePages, getRecentPosts } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServicePageContent } from '@/components/service-page-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { StructuredData } from '@/components/structured-data';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const servicePages = getAllServicePages();
  
  // Include admin as a valid param to prevent build errors
  const params = servicePages.map((page) => ({
    slug: page.slug,
  }));
  
  // Add admin as a valid param (will be handled specially in component)
  params.push({ slug: 'admin' });
  
  return params;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Handle admin specially
  if (slug === 'admin') {
    return {
      title: 'Admin',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  const pageContent = getServicePageContent(slug);

  if (!pageContent) {
    return {
      title: 'Service Not Found',
    };
  }

  const serviceKeywords = [
    `${pageContent.title} Deer Park TX`,
    'IT services Deer Park',
    'managed IT services',
    'business technology solutions',
    'IT support Pasadena TX',
    'IT support La Porte TX'
  ];

  // Per-page override comes from the "Meta Description" field in the CMS. The
  // fallback is deliberately location-neutral — the location pages carry their
  // own city in their title and their own description.
  const description =
    pageContent.description ||
    `${pageContent.title} from Center Street IT — managed IT support and cybersecurity for businesses in Deer Park, Pasadena and La Porte, Texas.`;

  return {
    title: pageContent.title,
    description,
    keywords: serviceKeywords,
    openGraph: {
      title: `${pageContent.title} | Center Street IT`,
      description,
      url: `https://centerstreetit.com/${slug}`,
      type: 'website',
      images: pageContent.hero_image ? [
        {
          url: pageContent.hero_image,
          width: 1200,
          height: 630,
          alt: pageContent.title,
        }
      ] : undefined,
    },
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  // Handle admin specially - return 404 to let static files take over
  if (slug === 'admin') {
    notFound();
  }
  
  const siteSettings = getSiteSettings();
  const pageContent = getServicePageContent(slug);
  const servicePages = getAllServicePages();

  if (!pageContent) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <StructuredData type="service" data={pageContent} />
      <Header
        siteTitle={siteSettings.site_title}
        navigation={siteSettings.navigation}
      />
      <ServicePageContent pageContent={pageContent} recentPosts={getRecentPosts(3)} />
      <Footer
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
        contact={siteSettings.contact}
      />
    </main>
  );
}
