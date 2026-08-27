import { socialMeta } from '@/lib/metadata';
import { getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LocationsHub } from '@/components/locations-hub';
import type { Metadata } from 'next';

const TITLE = 'Service Areas - Deer Park, Pasadena & La Porte';
const DESCRIPTION =
  'Center Street I.T. provides managed IT support and cybersecurity across Deer Park, Pasadena and La Porte, Texas, with 24-hour on-site dispatch.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...socialMeta({
    title: `${TITLE} | Center Street I.T.`,
    description: DESCRIPTION,
    path: '/locations',
  }),
  alternates: {
    canonical: '/locations',
  },
};

export default function LocationsPage() {
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  // Driven by the pages' own "Locations" nav section, so a new city page added in
  // the CMS appears here with no code change.
  const locationPages = servicePages.filter(
    (page) => page.nav_section?.toLowerCase() === 'locations'
  );

  return (
    <main className="min-h-screen">
      <Header siteTitle={siteSettings.site_title} navigation={siteSettings.navigation} />

      <LocationsHub locations={locationPages} />

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
