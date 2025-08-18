import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
