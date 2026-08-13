'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '05750a43-833d-4bc9-ab72-ecbadfde67f7',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `Consultation Request for ${serviceName} from ${formData.name}`,
          from_name: 'Center Street IT Website - Consultation Request',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">
                    Thank you! Your request has been sent. We&apos;ll be in touch shortly.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">
                    Something went wrong sending your request. Please call us on (346) 877-9001
                    and we&apos;ll get straight onto it.
                  </p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your needs"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#00C9AF' }}
                    whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
                  </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <a href="tel:+13468779001" className="hover:text-teal-700 transition-colors">
                    (346) 877-9001
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <a
                    href="mailto:MoreInfo@CenterStreetIT.com"
                    className="hover:text-teal-700 transition-colors"
                  >
                    MoreInfo@CenterStreetIT.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Deer Park, TX &middot; Serving Deer Park, Pasadena &amp; La Porte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
