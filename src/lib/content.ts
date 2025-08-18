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
    return data as SiteSettings;
  } catch (error) {
    console.error('Error reading site settings:', error);
    // Return default settings if file doesn't exist
    return {
      site_title: "Center Street IT",
      site_description: "Technology Solutions Provider",
      navigation: [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
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
  slug: string;
  content: string;
}

export function getServicePageContent(slug: string): ServicePageContent | null {
  const pagesPath = path.join(process.cwd(), 'content', 'pages');
  
  try {
    if (!fs.existsSync(pagesPath)) {
      return null;
    }

    const filePath = path.join(pagesPath, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || 'Service Page',
      description: data.description || '',
      hero_title: data.hero_title || data.title || 'Service Page',
      hero_subtitle: data.hero_subtitle || '',
      slug: data.slug || slug,
      content: decodeHtmlEntities(marked(content) as string)
    };
  } catch (error) {
    console.error('Error reading service page content:', error);
    return null;
  }
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
