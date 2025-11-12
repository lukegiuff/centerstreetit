import { getLegalPageContent, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LegalPageContentComponent } from '@/components/legal-page-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = getLegalPageContent('privacy-policy');

  if (!pageContent) {
    return {
      title: 'Privacy Policy Not Found',
    };
  }

  return {
    title: `${pageContent.title} - Center Street IT`,
    description: pageContent.description,
    openGraph: {
      title: `${pageContent.title} - Center Street IT`,
      description: pageContent.description,
      url: 'https://centerstreetit.com/privacy-policy',
      type: 'website',
    },
    alternates: {
      canonical: '/privacy-policy',
    },
  };
}

export default function PrivacyPolicyPage() {
  const siteSettings = getSiteSettings();
  const pageContent = getLegalPageContent('privacy-policy');
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

