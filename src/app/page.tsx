import { getHomepageContent, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProseSection } from '@/components/prose-section';
import { FeaturesSection } from '@/components/features-section';
import { StatsSection } from '@/components/stats-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ClosingCtaSection } from '@/components/closing-cta-section';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/structured-data';
import { socialMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  const homepageContent = getHomepageContent();
  const description = homepageContent.meta_description ?? '';
  // title.template only applies to CHILD segments, and app/page.tsx shares the
  // root segment with app/layout.tsx — so the suffix has to be written out here.
  const title = 'Managed IT Support in Deer Park, TX | Center Street I.T.';

  return {
    title: { absolute: title },
    description,
    ...socialMeta({ title, description, path: '/' }),
  };
}

export default function Home() {
  const homepageContent = getHomepageContent();
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  return (
    <main className="min-h-screen">
      {/* Business-level JSON-LD, homepage only */}
      <StructuredData type="localBusiness" />

      <Header
        siteTitle={siteSettings.site_title}
        navigation={siteSettings.navigation}
      />

      <HeroSection
        title={homepageContent.title}
        subtitle={homepageContent.subtitle}
        heroText={homepageContent.hero_text}
        ctaText={homepageContent.cta_text}
        ctaLink={homepageContent.cta_link}
        ctaSecondaryText={homepageContent.cta_secondary_text}
        ctaSecondaryLink={homepageContent.cta_secondary_link}
      />

      {homepageContent.proximity && (
        <ProseSection
          eyebrow="Why local matters"
          title={homepageContent.proximity.title}
          body={homepageContent.proximity.body}
        />
      )}

      {homepageContent.differentiator && (
        <ProseSection
          eyebrow="Who we build for"
          title={homepageContent.differentiator.title}
          body={homepageContent.differentiator.body}
          tone="muted"
        />
      )}

      <FeaturesSection
        features={homepageContent.features}
        title={homepageContent.features_title}
        intro={homepageContent.features_intro}
      />

      <StatsSection stats={homepageContent.stats} />

      {homepageContent.how_we_work && (
        <ProseSection
          eyebrow="How we work"
          title={homepageContent.how_we_work.title}
          body={homepageContent.how_we_work.body}
        />
      )}

      <TestimonialsSection testimonials={homepageContent.testimonials} />

      {homepageContent.closing_cta && (
        <ClosingCtaSection
          title={homepageContent.closing_cta.title}
          body={homepageContent.closing_cta.body}
          buttonText={homepageContent.closing_cta.button_text}
          buttonLink={homepageContent.closing_cta.button_link}
        />
      )}

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
