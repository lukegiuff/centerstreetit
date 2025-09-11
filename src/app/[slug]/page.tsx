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
  
  // Include admin as a valid param to prevent build errors
  const params = servicePages.map((page) => ({
    slug: page.slug,
  }));
  
  // Add admin as a valid param (will be handled specially in component)
  params.push({ slug: 'admin' });
  
  return params;
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
