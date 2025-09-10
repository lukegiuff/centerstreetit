import { getSiteSettings, getServicePageContent, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServicePageContent } from '@/components/service-page-content';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const servicePages = getAllServicePages();
  
  return servicePages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const siteSettings = getSiteSettings();
  const pageContent = getServicePageContent(slug);
  const servicePages = getAllServicePages();

  if (!pageContent) {
    notFound();
  }

  return (
    <main className="min-h-screen">
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
