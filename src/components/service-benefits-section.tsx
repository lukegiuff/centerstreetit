'use client';

import { motion } from 'framer-motion';
import { Check, Phone, Mail, MapPin } from 'lucide-react';

import { AnimatedText } from './ui/animated-text';

interface Benefit {
  title: string;
  description: string;
}

interface ServiceBenefitsSectionProps {
  title: string;
  benefits: Benefit[];
  serviceName: string;
}

export function ServiceBenefitsSection({ title, benefits, serviceName }: ServiceBenefitsSectionProps) {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits List */}
          <div>
            <AnimatedText variant="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
                {title}
              </h2>
            </AnimatedText>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: '#00C9AF' }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
                Get Started with {serviceName}
              </h3>
              <p className="text-gray-600 mb-6">
                Ready to transform your business? Contact us today for a free consultation.
              </p>

              <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your needs"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    style={{ backgroundColor: '#00C9AF' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Free Consultation
                  </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>(713) 909-8606</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <span>info@centerstreetit.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Houston, TX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
