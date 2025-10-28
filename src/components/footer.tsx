'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface NavigationItem {
  label: string;
  link: string;
  submenu?: Array<{
    section: string;
    items: Array<{
      label: string;
      link: string;
    }>;
  }>;
}

interface ServicePage {
  slug: string;
  title: string;
  description: string;
}

interface FooterProps {
  siteTitle: string;
  social: SocialLink[];
  navigation: NavigationItem[];
  servicePages: ServicePage[];
}

export function Footer({ siteTitle, social, navigation, servicePages }: FooterProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as never)[iconName];
    return IconComponent ? IconComponent : LucideIcons.Link;
  };

  // Popular services to feature
  const popularServices = [
    'managed-it-services',
    'managed-security',
    'it-support',
    'cloud-services',
    'microsoft-365',
    'google-workspace',
    'data-loss-prevention',
    'email-security',
    'managed-backup-services',
    'security-awareness-training'
  ];

  const featuredServices = servicePages.filter(service => 
    popularServices.includes(service.slug)
  );

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="col-span-1 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Image
                src="/assets/Logo-WhiteText.png"
                alt={siteTitle}
                width={350}
                height={105}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6">
                                 At Center Street IT, we&apos;re proud to offer IT Support Management Infrastructure and Consulting that delivers truly transformative results. Unlike the traditional Managed Services model which only addresses surface-level issues, we tackle the root cause of your challenges to provide a permanent solution. Say goodbye to recurring problems and hello to a seamless experience!
            </p>
            <div className="flex space-x-4">
              {social.map((link, index) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: '#1f2937' }}
                                               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b78842')}
                           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </motion.li>
              
              {/* Show static navigation items (Blog, Contact, etc.) */}
              {navigation.filter(item => !item.submenu).map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index + 1) * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={item.link}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Popular Services</h4>
            <ul className="space-y-2">
              {featuredServices.map((service, index) => (
                <motion.li
                  key={service.slug}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={`/${service.slug}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>MoreInfo@CenterStreetIT.com</p>
              <p>(346) 877-9001</p>
              <p>(346) 877-9001</p>
              <p>8999 Kirby Dr Ste 220<br />Houston, TX 77054</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: '#b78842' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 {siteTitle}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
