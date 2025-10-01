import { getContactContent, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { ContactHeroSection } from '@/components/contact-hero-section';
import { ContactFormSection } from '@/components/contact-form-section';
import { ContactInfoSection } from '@/components/contact-info-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { RecentBlogSection } from '@/components/recent-blog-section';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Houston IT Support & Managed Services",
  description: "Contact Center Street IT for expert IT support in Houston, TX. Get a free consultation, network assessment, and learn about our contract-free managed IT services. Call (346) 877-9001.",
  keywords: [
    "contact IT support Houston",
    "Houston IT consultation", 
    "IT support phone number",
    "managed IT services Houston",
    "network assessment Houston",
    "IT help desk Houston"
  ],
  openGraph: {
    title: "Contact Center Street IT - Houston IT Support",
    description: "Get expert IT support in Houston, TX. Free consultation and network assessment. Contract-free managed IT services. Call (346) 877-9001.",
    url: 'https://centerstreetit.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const contactContent = getContactContent();
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  return (
    <main className="min-h-screen">
      <Header 
        siteTitle={siteSettings.site_title}
        navigation={siteSettings.navigation}
      />
      
      <ContactHeroSection
        title={contactContent.hero_title}
        subtitle={contactContent.hero_subtitle}
      />
      
      <ContactFormSection />
      
      <ContactInfoSection
        contactInfo={contactContent.contact_info}
        businessHours={contactContent.business_hours}
        contactReasons={contactContent.contact_reasons}
      />
      
      <WhyChooseUsSection whyChooseUs={contactContent.why_choose_us} />
      
      <RecentBlogSection />
      
      <Footer 
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
      />
    </main>
  );
}
