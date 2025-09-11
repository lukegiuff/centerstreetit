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
  
  return [
    ...servicePages.map((page) => ({
      slug: page.slug,
    })),
    // Add admin to prevent build error, but handle it specially
    { slug: 'admin' }
  ];
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  // Handle admin route specially - redirect to static admin
  if (slug === 'admin') {
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content="0; url=/admin/index.html" />
          <title>Redirecting to Admin...</title>
        </head>
        <body>
          <p>Redirecting to admin panel...</p>
          <script dangerouslySetInnerHTML={{
            __html: "window.location.replace('/admin/index.html');"
          }} />
        </body>
      </html>
    );
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
