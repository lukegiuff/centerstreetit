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
  
  // Add admin to prevent the error, but we'll handle it in the component
  const params = servicePages.map((page) => ({
    slug: page.slug,
  }));
  
  // Add admin as a valid param to prevent build errors
  params.push({ slug: 'admin' });
  
  return params;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  // Don't handle admin routes - let static files be served
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
