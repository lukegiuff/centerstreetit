import { getSiteSettings, getServicePageContent } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServicePageContent } from '@/components/service-page-content';
import { notFound } from 'next/navigation';

export default function ManagedITServicesPage() {
  const siteSettings = getSiteSettings();
  const pageContent = getServicePageContent('managed-it-services');

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
      />
    </main>
  );
}
