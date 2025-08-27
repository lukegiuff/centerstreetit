'use client';

import type { ServicePageContent } from '@/lib/content';
import { ServiceBenefitsSection } from './service-benefits-section';
import { RecentBlogSection } from './recent-blog-section';
import { CallToActionSection } from './call-to-action-section';
import { TechnologyPartnersSection } from './technology-partners-section';
import { 
  Server, Shield, Users, Zap, Monitor, Cloud, Database, Lock, Settings, Phone,
  Clock, RefreshCw, TrendingUp, Headphones, Timer, RotateCcw, Scale, MessageCircle,
  Download, HardDrive, Expand, ArrowUpRight, ShieldCheck, CalendarClock, PlayCircle
} from 'lucide-react';
import Image from 'next/image';

interface ServicePageContentProps {
  pageContent: ServicePageContent;
}

// Icon mapping for features
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  server: Server,
  shield: Shield,
  users: Users,
  zap: Zap,
  monitor: Monitor,
  cloud: Cloud,
  database: Database,
  lock: Lock,
  settings: Settings,
  phone: Phone,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'trending-up': TrendingUp,
  headphones: Headphones,
  timer: Timer,
  'rotate-ccw': RotateCcw,
  scale: Scale,
  'message-circle': MessageCircle,
  download: Download,
  'hard-drive': HardDrive,
  expand: Expand,
  'arrow-up-right': ArrowUpRight,
  'shield-check': ShieldCheck,
  'calendar-clock': CalendarClock,
  'play-circle': PlayCircle
};

export function ServicePageContent({ pageContent }: ServicePageContentProps) {
  // Check if we need to use legacy content parsing
  const hasStructuredData = pageContent.benefits || pageContent.features || pageContent.additional_sections;
  
  if (!hasStructuredData && pageContent.content) {
    // Fall back to legacy content parsing for backward compatibility
    return <LegacyServicePageContent pageContent={pageContent} />;
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection pageContent={pageContent} />

      {/* Main Content */}
      <section className="pt-24 pb-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
            {/* Benefits Section */}
            {pageContent.show_benefits && pageContent.benefits && pageContent.benefits.length > 0 && (
              <div className="mb-8">
                <ServiceBenefitsSection
                  title={pageContent.benefits_title || 'Benefits of Center Street IT\'s Services:'}
                  benefits={pageContent.benefits}
                  serviceName={extractServiceName(pageContent.hero_title)}
                />
              </div>
            )}

            {/* Features Section */}
            {pageContent.show_features && pageContent.features && pageContent.features.length > 0 && (
              <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
                  {pageContent.features_title || 'Features'}
        </h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="divide-y divide-gray-100">
                    {pageContent.features.map((feature, index) => {
                      const IconComponent = iconMap[feature.icon || 'server'] || Server;
            return (
                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#b78842] to-[#00C9AF] rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-white" />
                  </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-[family-name:var(--font-cinzel)]">
                                {feature.title}
                  </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                  </p>
                            </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
              </div>
            )}

            {/* Additional Sections */}
            {pageContent.show_additional && pageContent.additional_sections && pageContent.additional_sections.length > 0 && (
              <>
                {pageContent.additional_sections.map((section, index) => (
                  <div key={index} className="mb-16">
                    <div className={section.two_columns ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : ""}>
                      <div className="prose prose-xl max-w-none prose-headings:font-[family-name:var(--font-cinzel)] prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mb-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-strong:text-gray-900 prose-strong:font-bold">
                        <h2>{section.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      </div>
      </div>
    </div>
                ))}
              </>
            )}

            {/* CTA Section */}
            {pageContent.show_cta && (
              <div className="mb-16">
                <div className="prose prose-xl max-w-none prose-headings:font-[family-name:var(--font-cinzel)] prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mb-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-strong:text-gray-900 prose-strong:font-bold">
                  <h2>{pageContent.cta_title || 'Get Started Today'}</h2>
                  {pageContent.cta_content && (
                    <p>{pageContent.cta_content}</p>
                  )}
                </div>
              </div>
            )}
          </div>
    </div>
      </section>

      {/* Technology Partners Section */}
      <TechnologyPartnersSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Recent Blog Posts */}
      <RecentBlogSection />
    </>
  );
}

// Legacy component for backward compatibility
function LegacyServicePageContent({ pageContent }: ServicePageContentProps) {
  // Parse the content for different sections
  const sections = parseContent(pageContent.content || '');
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection pageContent={pageContent} />

      {/* Main Content */}
      <section className="pt-24 pb-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {sections.map((section, index) => (
              <div key={index} className="mb-16">
                {section.type === 'benefits' && section.benefits ? (
                  <ServiceBenefitsSection
                    title={section.title}
                    benefits={section.benefits}
                    serviceName={extractServiceName(pageContent.hero_title)}
                  />
                ) : section.type === 'features' && section.features ? (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
                      {section.title}
                    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {section.features.map((feature, featureIndex) => (
                        <div key={featureIndex}>
            <div className="p-6 bg-white rounded-xl border border-gray-200 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-[#b78842] to-[#00C9AF] rounded-xl flex items-center justify-center mb-6">
                              <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
                              {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                              {feature.description}
              </p>
            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-xl max-w-none prose-headings:font-[family-name:var(--font-cinzel)]  prose-headings:text-gray-900  prose-h2:text-3xl  prose-h2:mb-8  prose-p:text-gray-700  prose-p:leading-relaxed  prose-p:text-lg prose-strong:text-gray-900  prose-strong:font-bold">
                    <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
    </div>
      </section>

      {/* Technology Partners Section */}
      <TechnologyPartnersSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Recent Blog Posts */}
      <RecentBlogSection />
    </>
  );
}

function HeroSection({ pageContent }: { pageContent: ServicePageContent }) {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black via-gray-900 to-slate-800 text-white pt-20 pb-16">
      {/* Background Image */}
      {pageContent.hero_image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={pageContent.hero_image}
            alt={pageContent.hero_title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60" />
        </div>
      )}

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-brand-gold/15 to-brand-gold/5 blur-3xl animate-pulse"
          style={{ left: '5%', top: '15%' }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-brand-teal/20 to-brand-teal/8 blur-3xl animate-pulse"
          style={{ right: '10%', bottom: '20%', animationDelay: '2s' }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-brand-gold/10 to-brand-teal/10 blur-2xl animate-pulse"
          style={{ left: '45%', top: '25%', animationDelay: '4s' }}
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12">
          <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-[family-name:var(--font-cinzel)]">
              {pageContent.hero_title}
            </h1>
          </div>

          <div>
                    <p className="text-xl md:text-2xl mb-10 font-light" style={{ color: '#b78842' }}>
            {pageContent.hero_subtitle}
          </p>
          </div>

          <div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {pageContent.hero_description || pageContent.description}
            </p>
        </div>
        </div>
      </section>
  );
}

function parseContent(content: string) {
  const sections = [];
  const htmlContent = content;
  
  // Split content by h2 tags
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const splits = htmlContent.split(h2Regex);
  
  for (let i = 1; i < splits.length; i += 2) {
    const title = splits[i];
    const restContent = splits[i + 1] || '';
    
    // Check if this is a benefits list section (we'll style this specially)
    const isBenefitsList = restContent.includes('<ul>') && (
      title.toLowerCase().includes('benefit') || 
      title.toLowerCase().includes('why choose')
    );
    
    if (isBenefitsList) {
      // Extract benefits from the ul/li structure
      const benefits = extractBenefits(restContent);
      sections.push({
        type: 'benefits',
        title,
        benefits
      });
    } else if (title.toLowerCase().includes('feature')) {
      // Extract features with H3 headings
      const features = extractFeatures(restContent);
      if (features.length > 0) {
        sections.push({
          type: 'features',
          title,
          features
        });
      } else {
        sections.push({
          type: 'content',
          title,
          content: `<h2>${title}</h2>${restContent}`
        });
      }
    } else {
      sections.push({
        type: 'content',
        title,
        content: `<h2>${title}</h2>${restContent}`
      });
    }
  }
  
  return sections;
}

function extractBenefits(content: string) {
  const benefits = [];
  const liRegex = /<li[^>]*><p[^>]*><strong[^>]*>(.*?)<\/strong[^>]*>(.*?)<\/p[^>]*><\/li>/g;
  let match;
  
  while ((match = liRegex.exec(content)) !== null) {
    benefits.push({
      title: match[1].trim(),
      description: match[2].replace(/^:\s*/, '').trim()
    });
  }
  
  return benefits;
}

function extractFeatures(content: string) {
  const features = [];
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g;
  const h3Splits = content.split(h3Regex);
  
  for (let i = 1; i < h3Splits.length; i += 2) {
    const title = h3Splits[i];
    const description = h3Splits[i + 1] || '';
    
    // Clean up the description by removing HTML tags and getting just the text
    const cleanDescription = description
      .replace(/<p[^>]*>/g, '')
      .replace(/<\/p>/g, '')
      .replace(/<[^>]*>/g, '')
      .trim();
    
    if (title && cleanDescription) {
      features.push({
        title: title.trim(),
        description: cleanDescription
      });
    }
  }
  
  return features;
}

function extractServiceName(heroTitle: string): string {
  // Extract service name from hero title for the quote form
  const title = heroTitle.trim();
  
  // If the title starts with "Managed", extract everything after "Managed "
  if (title.toLowerCase().startsWith('managed ')) {
    return title.substring(8); // Remove "Managed " prefix
  }
  
  // If it contains "Services", try to extract the service type
  if (title.toLowerCase().includes(' services')) {
    const parts = title.split(' Services');
    if (parts[0]) {
      return parts[0] + ' Services';
    }
  }
  
  // Fallback: return the full title or "Services"
  return title || 'Services';
}

