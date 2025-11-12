import { getLegalPageContent, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LegalPageContentComponent } from '@/components/legal-page-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = getLegalPageContent('terms-and-conditions');

  if (!pageContent) {
    return {
      title: 'Terms and Conditions Not Found',
    };
  }

  return {
    title: `${pageContent.title} - Center Street IT`,
    description: pageContent.description,
    openGraph: {
      title: `${pageContent.title} - Center Street IT`,
      description: pageContent.description,
      url: 'https://centerstreetit.com/terms-and-conditions',
      type: 'website',
    },
    alternates: {
      canonical: '/terms-and-conditions',
    },
  };
}

export default function TermsAndConditionsPage() {
  const siteSettings = getSiteSettings();
  const pageContent = getLegalPageContent('terms-and-conditions');
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
      <LegalPageContentComponent pageContent={pageContent} />
      <Footer
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
      />
    </main>
  );
}

