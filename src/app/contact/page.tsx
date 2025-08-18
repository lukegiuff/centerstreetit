import { getContactContent, getSiteSettings } from '@/lib/content';
import { Header } from '@/components/header';
import { ContactHeroSection } from '@/components/contact-hero-section';
import { ContactFormSection } from '@/components/contact-form-section';
import { ContactInfoSection } from '@/components/contact-info-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { RecentBlogSection } from '@/components/recent-blog-section';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const contactContent = getContactContent();
  const siteSettings = getSiteSettings();

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
      />
    </main>
  );
}
