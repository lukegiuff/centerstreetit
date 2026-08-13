import { getContactContent, getSiteSettings, getAllServicePages, getRecentPosts } from '@/lib/content';
import { Header } from '@/components/header';
import { ContactHeroSection } from '@/components/contact-hero-section';
import { ContactFormSection } from '@/components/contact-form-section';
import { ContactInfoSection } from '@/components/contact-info-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { RecentBlogSection } from '@/components/recent-blog-section';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Managed IT Support & Consultation",
  description: "Contact Center Street IT for managed IT support across Deer Park, Pasadena and La Porte, TX. Free consultation and network assessment. Call (346) 877-9001.",
  keywords: [
    "contact IT support Deer Park TX",
    "IT consultation Deer Park",
    "IT support phone number",
    "managed IT services Pasadena TX",
    "network assessment La Porte TX",
    "IT help desk Deer Park"
  ],
  openGraph: {
    title: "Contact Center Street IT",
    description: "Managed IT support across Deer Park, Pasadena and La Porte, TX. Free consultation and network assessment. Call (346) 877-9001.",
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
      
      <RecentBlogSection posts={getRecentPosts(3)} />
      
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
