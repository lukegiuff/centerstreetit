import { getHomepageContent, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { StatsSection } from '@/components/stats-section';
import { ValuePropositionSection } from '@/components/value-proposition-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const homepageContent = getHomepageContent();
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  return (
    <main className="min-h-screen">
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
      />
      
      <FeaturesSection features={homepageContent.features} />
      
      <StatsSection stats={homepageContent.stats} />
      
      <ValuePropositionSection />
      
      <TestimonialsSection testimonials={homepageContent.testimonials} />
      
      <Footer 
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
      />
    </main>
  );
}
