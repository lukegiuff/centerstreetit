import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Function to post-process HTML to decode entities
function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export interface HomepageContent {
  title: string;
  subtitle: string;
  hero_text: string;
  cta_text: string;
  cta_link: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  stats: Array<{
    number: string;
    label: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
    avatar?: string;
  }>;
}

export interface SiteSettings {
  site_title: string;
  site_description: string;
  navigation: Array<{
    label: string;
    link: string;
  }>;
  social: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export interface ContactContent {
  title: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  contact_info: {
    phone_primary: string;
    phone_secondary: string;
    email: string;
    address: string;
  };
  business_hours: {
    monday_friday: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
  contact_reasons: Array<{
    title: string;
    description: string;
  }>;
  why_choose_us: {
    satisfaction_metric: {
      title: string;
      description: string;
    };
    contract_free: {
      title: string;
      description: string;
    };
    brand_power: {
      title: string;
      description: string;
    };
    innovative_leasing: {
      title: string;
      description: string;
    };
  };
  call_to_action: {
    title: string;
    description: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  featured_image?: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

export function getHomepageContent(): HomepageContent {
  const contentPath = path.join(process.cwd(), 'content', 'homepage.md');
  
  try {
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const { data } = matter(fileContents);
    return data as HomepageContent;
  } catch (error) {
    console.error('Error reading homepage content:', error);
    // Return default content if file doesn't exist
    return {
      title: "Welcome to Center Street IT",
      subtitle: "Innovative Technology Solutions",
      hero_text: "We deliver cutting-edge technology solutions for modern businesses.",
      cta_text: "Get Started",
      cta_link: "/contact",
      features: [],
      stats: [],
      testimonials: []
    };
  }
}

export function getSiteSettings(): SiteSettings {
  const settingsPath = path.join(process.cwd(), 'content', 'settings.md');
  
  try {
    const fileContents = fs.readFileSync(settingsPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Build dynamic navigation from service pages
    const serviceNavigation = buildNavigationFromServices();
    
    // Merge static navigation with dynamic service navigation
    const combinedNavigation = [
      ...serviceNavigation,
      ...(data.navigation || [])
    ];
    
    return {
      ...data,
      navigation: combinedNavigation
    } as SiteSettings;
  } catch (error) {
    console.error('Error reading site settings:', error);
    // Return default settings if file doesn't exist
    return {
      site_title: "Center Street IT",
      site_description: "Technology Solutions Provider",
      navigation: [
        { label: "Blog", link: "/blog" },
        { label: "Contact", link: "/contact" }
      ],
      social: []
    };
  }
}

export function getContactContent(): ContactContent {
  const contactPath = path.join(process.cwd(), 'content', 'pages', 'contact.md');
  
  try {
    const fileContents = fs.readFileSync(contactPath, 'utf8');
    const { data } = matter(fileContents);
    return data as ContactContent;
  } catch (error) {
    console.error('Error reading contact content:', error);
    // Return default content if file doesn't exist
    return {
      title: "Contact Center Street IT",
      description: "Get in touch with our IT experts",
      hero_title: "Contact Us",
      hero_subtitle: "Ready to Transform Your IT Infrastructure?",
      contact_info: {
        phone_primary: "+1 (555) 123-4567",
        phone_secondary: "+1 (555) 987-6543",
        email: "hello@centerstreetit.com",
        address: "123 Center Street, Tech City, TC 12345"
      },
      business_hours: {
        monday_friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Emergency Support Only",
        emergency: "24/7 Emergency Support Available"
      },
      contact_reasons: [
        {
          title: "IT Support & Helpdesk",
          description: "Get immediate assistance with technical issues and system problems."
        },
        {
          title: "Network Assessment",
          description: "Schedule a comprehensive evaluation of your current IT infrastructure."
        }
      ],
      why_choose_us: {
        satisfaction_metric: {
          title: "Satisfaction is our only Metric",
          description: "We are only happy if you are happy and running well."
        },
        contract_free: {
          title: "Contract Free",
          description: "We offer all of our services contract free."
        },
        brand_power: {
          title: "Brand Power",
          description: "Working with industry leaders for reliable solutions."
        },
        innovative_leasing: {
          title: "Innovative Leasing Programs",
          description: "Flexible equipment financing options."
        }
      },
      call_to_action: {
        title: "IT Support and Management with Center Street IT is your SUCCESS",
        description: "Let us provide you with a network assessment."
      }
    };
  }
}

export function getBlogPosts(): BlogPost[] {
  const blogPath = path.join(process.cwd(), 'content', 'blog');
  
  try {
    if (!fs.existsSync(blogPath)) {
      return getDefaultBlogPosts();
    }

    const files = fs.readdirSync(blogPath);
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(blogPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Extract slug from filename
        const slug = file.replace(/\.md$/, '');
        
        // Calculate read time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        
        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          author: data.author || 'Center Street IT Team',
          featured_image: data.featured_image,
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          content: decodeHtmlEntities(marked(content) as string),
          tags: data.tags || ['general'],
          readTime: `${readTime} min read`
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return getDefaultBlogPosts();
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export interface ServicePageContent {
  title: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description?: string;
  hero_image?: string;
  slug: string;
  
  // Navigation fields
  nav_section?: string;
  nav_subsection?: string;
  
  // Section visibility flags
  show_benefits?: boolean;
  show_features?: boolean;
  show_additional?: boolean;
  show_cta?: boolean;
  
  // Benefits section
  benefits_title?: string;
  benefits?: Array<{
    title: string;
    description: string;
  }>;
  
  // Features section
  features_title?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  
  // Additional sections
  additional_sections?: Array<{
    title: string;
    content: string;
    two_columns?: boolean;
  }>;
  
  // CTA section
  cta_title?: string;
  cta_content?: string;
  
  // Legacy content (for backward compatibility)
  content?: string;
}

export function getServicePageContent(slug: string): ServicePageContent | null {
  const servicesPath = path.join(process.cwd(), 'content', 'services');
  
  try {
    if (!fs.existsSync(servicesPath)) {
      return null;
    }

    const filePath = path.join(servicesPath, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process additional sections content if it exists
    const processedAdditionalSections = data.additional_sections?.map((section: { content?: string; [key: string]: unknown }) => ({
      ...section,
      content: section.content ? decodeHtmlEntities(marked(section.content) as string) : ''
    }));

    return {
      title: data.title || 'Service Page',
      description: data.description || '',
      hero_title: data.hero_title || data.title || 'Service Page',
      hero_subtitle: data.hero_subtitle || '',
      hero_description: data.hero_description,
      hero_image: data.hero_image,
      slug: data.slug || slug,
      
      // Navigation fields
      nav_section: data.nav_section,
      nav_subsection: data.nav_subsection,
      
      // Section visibility flags
      show_benefits: data.show_benefits !== false, // Default to true
      show_features: data.show_features !== false, // Default to true
      show_additional: data.show_additional || false,
      show_cta: data.show_cta !== false, // Default to true
      
      // Benefits section
      benefits_title: data.benefits_title || 'Benefits of Center Street IT\'s Services:',
      benefits: data.benefits || [],
      
      // Features section
      features_title: data.features_title || 'Features',
      features: data.features || [],
      
      // Additional sections
      additional_sections: processedAdditionalSections || [],
      
      // CTA section
      cta_title: data.cta_title || 'Get Started Today',
      cta_content: data.cta_content,
      
      // Legacy content (for backward compatibility)
      content: content ? decodeHtmlEntities(marked(content) as string) : undefined
    };
  } catch (error) {
    console.error('Error reading service page content:', error);
    return null;
  }
}

export function getAllServicePages(): Array<{slug: string, title: string, description: string, nav_section?: string, nav_subsection?: string}> {
  const servicesPath = path.join(process.cwd(), 'content', 'services');
  
  try {
    if (!fs.existsSync(servicesPath)) {
      return [];
    }

    const files = fs.readdirSync(servicesPath);
    const services = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace('.md', '');
        const filePath = path.join(servicesPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug,
          title: data.title || slug,
          description: data.description || '',
          nav_section: data.nav_section,
          nav_subsection: data.nav_subsection
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return services;
  } catch (error) {
    console.error('Error reading service pages:', error);
    return [];
  }
}

export function buildNavigationFromServices() {
  const services = getAllServicePages();
  const navigationMap: Record<string, { label: string; link: string; submenu: Record<string, { section: string; items: Array<{ label: string; link: string }> }> }> = {};

  // Build navigation structure from service pages
  services.forEach(service => {
    if (service.nav_section) {
      if (!navigationMap[service.nav_section]) {
        navigationMap[service.nav_section] = {
          label: service.nav_section,
          link: '#',
          submenu: {}
        };
      }

      if (service.nav_subsection) {
        // Add to subsection with subsection as non-clickable heading
        if (!navigationMap[service.nav_section].submenu[service.nav_subsection]) {
          navigationMap[service.nav_section].submenu[service.nav_subsection] = {
            section: service.nav_subsection,
            items: []
          };
        }
        navigationMap[service.nav_section].submenu[service.nav_subsection].items.push({
          label: service.title,
          link: `/${service.slug}`
        });
      } else {
        // Add directly to main section (no subsection heading)
        if (!navigationMap[service.nav_section].submenu['direct']) {
          navigationMap[service.nav_section].submenu['direct'] = {
            section: '',
            items: []
          };
        }
        navigationMap[service.nav_section].submenu['direct'].items.push({
          label: service.title,
          link: `/${service.slug}`
        });
      }
    }
  });

  // Convert to array format expected by navigation
  const navigation = Object.values(navigationMap).map((section) => ({
    label: section.label,
    link: section.link,
    submenu: Object.values(section.submenu).filter((sub) => sub.items.length > 0)
  }));

  return navigation;
}

function getDefaultBlogPosts(): BlogPost[] {
  // This is fallback content if no blog files exist
  // The actual content will be loaded from markdown files
  const markdownContent = `In today's digital landscape, the sheer volume of sensitive data generated and stored by organizations is staggering. From personal identifying information (PII) to proprietary business secrets, the potential for data breaches has never been greater. This alarming reality underscores the importance of robust data loss prevention (DLP) solutions. In this post, we will delve into DLP technology, explore its mechanisms, and illustrate how it effectively protects confidential information.

## What is DLP?

Data Loss Prevention (DLP) refers to a set of tools and strategies designed to prevent sensitive data from being accessed, shared, or compromised by unauthorized users. DLP technology is essential for organizations that grapple with ensuring compliance with regulations, such as GDPR, HIPAA, or PCI-DSS, while also managing the risk of data breaches and insider threats.

### Types of DLP Solutions:

DLP solutions can be classified into three primary categories based on their deployment and focus areas:

**Network DLP**: This type monitors and controls data in transit over the network. It analyzes outgoing traffic to detect and block unauthorized transmission of sensitive information, such as emails containing PII or financial data.

**Endpoint DLP**: Endpoint DLP focuses on securing data on user devices (like laptops and desktops). It ensures that confidential information stored locally cannot be copied, emailed, or printed without proper authorization.

**Cloud DLP**: With the growing reliance on cloud services, cloud DLP focuses on protecting data stored in cloud environments. It helps organizations enforce data governance policies and detect unauthorized sharing or access to sensitive information.

## The Mechanisms Behind DLP Technology

To successfully protect confidential information, DLP solutions employ a variety of mechanisms including content discovery and classification, policy enforcement, real-time monitoring, and encryption and data masking.

## Why DLP is Essential for Protecting Confidential Information

DLP technology plays an indispensable role in protecting confidential information in our increasingly digital world. By employing strategic measures like content discovery, policy enforcement, and real-time monitoring, organizations can significantly reduce the risk of data breaches.`;

  return [
    {
      slug: '2024-02-26-understanding-dlp-technology',
      title: 'Understanding DLP Technology: Protecting Your Confidential Information',
      date: '2024-02-26',
      author: 'Center Street IT Team',
      excerpt: 'In today\'s digital landscape, the sheer volume of sensitive data generated and stored by organizations is staggering. Learn how DLP technology effectively protects confidential information.',
      content: decodeHtmlEntities(marked(markdownContent) as string),
      tags: ['cybersecurity', 'data-protection', 'compliance'],
      readTime: '5 min read'
    }
  ];
}
