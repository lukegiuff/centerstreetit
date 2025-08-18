'use client';




import { QuoteFormSection } from './quote-form-section';
import { RecentBlogSection } from './recent-blog-section';

import { ServicePageContent as ServicePageType } from '@/lib/content';
import { Shield, Settings, Users, Zap, Server, Phone } from 'lucide-react';

interface ServicePageContentProps {
  pageContent: ServicePageType;
}

interface ServicePageRendererProps {
  content: string;
}

function ServicePageRenderer({ content }: ServicePageRendererProps) {
  const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    'threat protection': Shield,
    'it consulting': Users,
    'on-site field support': Settings,
    'end-user support': Phone,
    'cloud services': Server,
    'network monitoring': Zap,
  };



  // Parse the content to identify sections and add visual enhancements
  const parseContent = (htmlContent: string) => {
    // Split content by major sections
    const sections = htmlContent.split('<h2>').filter(section => section.trim());
    
    return sections.map((section, index) => {
      if (index === 0) {
        // Skip the first section (intro content) completely
        return null;
      }

      // Restore the H2 tag and process section
      const sectionContent = '<h2>' + section;
      const titleMatch = sectionContent.match(/<h2[^>]*>(.*?)<\/h2>/);
      const title = titleMatch ? titleMatch[1] : '';
      const restContent = sectionContent.replace(/<h2[^>]*>.*?<\/h2>/, '');

      // Skip these sections completely - we have custom implementations or don't want them
      const sectionsToSkip = [
        'technology partners',
        'why choose center street it',
        'get started today'
      ];
      
      if (sectionsToSkip.some(skipSection => title.toLowerCase().includes(skipSection))) {
        return null;
      }

      // Check if this is a benefits list section (we'll style this specially)
      const isBenefitsList = restContent.includes('<ul>') && title.toLowerCase().includes('benefit');
      const isFeaturesList = restContent.includes('<h3>') && (
        title.toLowerCase().includes('feature') || 
        title.toLowerCase().includes('service')
      );

      if (isBenefitsList) {
        return (
          <div key={index} className="mb-16">
            <WhyChooseSection title={title} content={restContent} />
          </div>
        );
      }

      if (isFeaturesList) {
        return (
          <div key={index} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
              {title}
            </h2>
            <FeaturesGrid content={restContent} iconMap={iconMap} />
          </div>
        );
      }

      // Regular content section
      return (
        <div key={index} className="mb-16">
          <div 
            className="prose prose-xl max-w-none
            prose-headings:font-[family-name:var(--font-cinzel)] 
            prose-headings:text-gray-900 
            prose-h2:text-3xl 
            prose-h2:mb-8 
            prose-p:text-gray-700 
            prose-p:leading-relaxed 
            prose-p:text-lg
            prose-strong:text-gray-900 
            prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: sectionContent }}
          />
        </div>
      );
    });
  };

  return <div>{parseContent(content)}</div>;
}

function WhyChooseSection({ title, content }: { title: string; content: string }) {
  // Extract list items from the HTML
  const listMatch = content.match(/<ul[^>]*>(.*?)<\/ul>/s);
  if (!listMatch) return <div dangerouslySetInnerHTML={{ __html: content }} />;

  const items = listMatch[1].match(/<li[^>]*>(.*?)<\/li>/gs) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left Column - Why Choose Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
          {title}
        </h2>
        <div className="space-y-6">
          {items.map((item, index) => {
            const cleanContent = item.replace(/<\/?li[^>]*>/g, '');
            const strongMatch = cleanContent.match(/<strong[^>]*>(.*?)<\/strong>/);
            const benefit = strongMatch ? strongMatch[1] : '';
            let description = cleanContent.replace(/<strong[^>]*>.*?<\/strong>:?\s*/, '');
            
            // Clean up any remaining HTML tags and nested paragraphs
            description = description.replace(/<\/?p[^>]*>/g, '').trim();

            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#00C9AF] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column - Quote Form */}
      <div>
        <QuoteFormSection serviceName="IT Services" />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BenefitsGrid({ content }: { content: string }) {
  // Extract list items from the HTML
  const listMatch = content.match(/<ul[^>]*>(.*?)<\/ul>/s);
  if (!listMatch) return <div dangerouslySetInnerHTML={{ __html: content }} />;

  const items = listMatch[1].match(/<li[^>]*>(.*?)<\/li>/gs) || [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => {
        const cleanContent = item.replace(/<\/?li[^>]*>/g, '');
        const strongMatch = cleanContent.match(/<strong[^>]*>(.*?)<\/strong>/);
        const benefit = strongMatch ? strongMatch[1] : '';
        let description = cleanContent.replace(/<strong[^>]*>.*?<\/strong>:?\s*/, '');
        
        // Clean up any remaining HTML tags and nested paragraphs
        description = description.replace(/<\/?p[^>]*>/g, '').trim();
        
        return (
          <div key={index}>
            <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 h-full">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#00C9AF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-cinzel)]">
                    {benefit}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FeaturesGrid({ content, iconMap }: { content: string; iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } }) {
  // Extract H3 sections
  const sections = content.split('<h3>').filter(section => section.trim());
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sections.map((section, index) => {
        const sectionContent = '<h3>' + section;
        const titleMatch = sectionContent.match(/<h3[^>]*>(.*?)<\/h3>/);
        const title = titleMatch ? titleMatch[1] : '';
        const description = sectionContent.replace(/<h3[^>]*>.*?<\/h3>/, '').replace(/<\/?p[^>]*>/g, '').trim();
        
        // Get appropriate icon
        const iconKey = title.toLowerCase();
        const IconComponent = Object.keys(iconMap).find(key => iconKey.includes(key)) 
          ? iconMap[Object.keys(iconMap).find(key => iconKey.includes(key))!] 
          : Server;
        
        return (
          <div key={index}>
            <div className="p-6 bg-white rounded-xl border border-gray-200 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-[#b78842] to-[#00C9AF] rounded-xl flex items-center justify-center mb-6">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServicePageContent({ pageContent }: ServicePageContentProps) {

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black to-gray-900 text-white pt-20">
        {/* Static background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl" style={{ left: '10%', top: '20%' }} />
          <div className="absolute w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" style={{ right: '15%', bottom: '25%' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight font-[family-name:var(--font-cinzel)]">
              {pageContent.hero_title}
            </h1>
          </div>

          <div>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-300">
              {pageContent.hero_subtitle}
            </p>
          </div>

          <div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {pageContent.description}
            </p>
          </div>


        </div>
      </section>

      {/* Content Section */}
      <section className="pt-24 pb-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicePageRenderer content={pageContent.content} />
        </div>
      </section>

      {/* Technology Partners Section */}
      <section className="pt-3 pb-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
                    Technology Partners
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Center Street IT partners with industry leaders including Microsoft, Dell, Cisco, Google Cloud, and other top-tier technology providers to ensure you get the best solutions for your business needs.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
                  {/* Microsoft */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">Microsoft</div>
                  </div>
                  
                  {/* Google Cloud */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-lg font-semibold text-gray-700">Google Cloud</div>
                  </div>
                  
                  {/* Dell */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">DELL</div>
                  </div>
                  
                  {/* Cisco */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">Cisco</div>
                  </div>
                  
                  {/* Trend Micro */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-lg font-semibold text-gray-700">Trend Micro</div>
                  </div>
                  
                  {/* ESET */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">ESET</div>
                  </div>
                  
                  {/* SonicWall */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-lg font-semibold text-gray-700">SonicWall</div>
                  </div>
                  
                  {/* QNAP */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">QNAP</div>
                  </div>
                  
                  {/* APC */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">APC</div>
                  </div>
                  
                  {/* Arris */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-gray-700">ARRIS</div>
                  </div>
                  
                  {/* Lenovo */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xl font-semibold text-gray-700">Lenovo</div>
                  </div>
                  
                  {/* Ergotron */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-lg font-semibold text-gray-700">Ergotron</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Blog Posts Section */}
            <RecentBlogSection />
    </>
  );
}
