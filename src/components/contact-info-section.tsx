'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Headphones, Shield, Cloud, Settings, Users, Zap } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';


interface ContactInfoSectionProps {
  contactInfo: {
    phone_primary: string;
    phone_secondary: string;
    fax?: string;
    email: string;
    address: string;
  };
  businessHours: {
    monday_friday: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
  contactReasons: Array<{
    title: string;
    description: string;
  }>;
}

export function ContactInfoSection({ contactInfo, businessHours, contactReasons }: ContactInfoSectionProps) {
  const getIcon = (title: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'IT Support & Helpdesk': Headphones,
      'Network Assessment': Settings,
      'Cloud Migration': Cloud,
      'Security Consultation': Shield,
      'Managed Services': Users,
    };
    return iconMap[title] || Zap;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <AnimatedCard delay={0.1} className="text-center">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#b78842' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone</h3>
            <div className="space-y-2">
              <a 
                href={`tel:${contactInfo.phone_primary.replace(/\D/g, '')}`}
                className="block text-lg hover:underline transition-colors"
                style={{ color: '#b78842' }}
              >
                {contactInfo.phone_primary}
              </a>
              {contactInfo.phone_secondary && (
                <a 
                  href={`tel:${contactInfo.phone_secondary.replace(/\D/g, '')}`}
                  className="block text-lg hover:underline transition-colors"
                  style={{ color: '#b78842' }}
                >
                  {contactInfo.phone_secondary}
                </a>
              )}
              {contactInfo.fax && (
                <div className="text-lg" style={{ color: '#b78842' }}>
                  {contactInfo.fax} <span className="text-sm text-gray-500">(Fax)</span>
                </div>
              )}
            </div>
          </AnimatedCard>

          {/* Email */}
          <AnimatedCard delay={0.2} className="text-center">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Email</h3>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="text-lg hover:underline transition-colors"
              style={{ color: '#b78842' }}
            >
              {contactInfo.email}
            </a>
          </AnimatedCard>

          {/* Address */}
          <AnimatedCard delay={0.3} className="text-center">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#b78842' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              {contactInfo.address}
            </p>
          </AnimatedCard>
        </div>

        {/* Business Hours & Contact Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Business Hours */}
          <AnimatedCard delay={0.4}>
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: '#00C9AF' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
                Business Hours
              </h2>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center py-3 border-b border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="font-medium text-gray-700">Monday - Friday</span>
                <span className="text-gray-600">{businessHours.monday_friday}</span>
              </motion.div>

              <motion.div
                className="flex justify-between items-center py-3 border-b border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-medium text-gray-700">Saturday</span>
                <span className="text-gray-600">{businessHours.saturday}</span>
              </motion.div>

              <motion.div
                className="flex justify-between items-center py-3 border-b border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="font-medium text-gray-700">Sunday</span>
                <span className="text-gray-600">{businessHours.sunday}</span>
              </motion.div>

              <motion.div
                className="py-4 px-4 rounded-lg"
                style={{ backgroundColor: 'rgba(0, 201, 175, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold" style={{ color: '#00C9AF' }}>
                  🚨 {businessHours.emergency}
                </span>
              </motion.div>
            </div>
          </AnimatedCard>

          {/* Contact Reasons */}
          <AnimatedCard delay={0.5}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              How Can We Help?
            </h2>
            
            <div className="space-y-6">
              {contactReasons.map((reason, index) => {
                const IconComponent = getIcon(reason.title);
                
                return (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#b78842' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
