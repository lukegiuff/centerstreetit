import { getSiteSettings, getServicePageContent, getAllServicePages } from '@/lib/content';
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
    `${pageContent.title} Houston`,
    'IT services Houston',
    'managed IT services',
    'business technology solutions',
    'Houston IT support',
    'enterprise IT services'
  ];

  return {
    title: `${pageContent.title} - Houston IT Services`,
    description: pageContent.description || `Expert ${pageContent.title.toLowerCase()} services in Houston, TX. Professional IT solutions from Center Street IT with 24/7 support and contract-free options.`,
    keywords: serviceKeywords,
    openGraph: {
      title: `${pageContent.title} - Center Street IT Houston`,
      description: pageContent.description || `Professional ${pageContent.title.toLowerCase()} services in Houston, TX.`,
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
      <ServicePageContent pageContent={pageContent} />
      <Footer
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
      />
    </main>
  );
}
