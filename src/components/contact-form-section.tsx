'use client';

import { motion } from 'framer-motion';
import { Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';

import { useState } from 'react';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
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
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: 'Center Street IT Website',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <AnimatedCard delay={0.1} className="h-fit">
            <div className="flex items-center mb-8">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: '#00C9AF' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
                Send a Message
              </h2>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800">
                  Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800">
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe it
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Tell us about your IT needs..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  style={{ backgroundColor: isSubmitting ? '#9CA3AF' : '#00C9AF' }}
                  whileHover={!isSubmitting ? { scale: 1.02, backgroundColor: '#b78842' } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </AnimatedCard>

          {/* Say Hello Section */}
          <AnimatedCard delay={0.2} className="h-fit">
            <div className="flex items-center mb-8">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: '#b78842' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
                Say Hello to Us
              </h2>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone</h4>
                <div className="space-y-1">
                  <a 
                    href="tel:+13468779001" 
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    style={{ color: '#b78842' }}
                  >
                    (346) 877-9001
                  </a>
                  <div className="text-lg" style={{ color: '#b78842' }}>
                    (346) 877-9002 <span className="text-sm text-gray-500">(Fax)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                <a 
                  href="mailto:MoreInfo@CenterStreetIT.com" 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                  style={{ color: '#b78842' }}
                >
                  MoreInfo@CenterStreetIT.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="pt-6 border-t border-gray-200"
              >
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong>By providing my phone number to &quot;Center Street IT&quot;</strong>, I agree and acknowledge that &quot;Center Street IT&quot; may send text messages to my wireless phone number for any purpose. Message and data rates may apply. Message frequency will vary, and you will be able to Opt-out by replying &quot;STOP&quot;. For more information on how your data will be handled please visit our privacy policy.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">Book an appointment today!</p>
                <motion.button
                  className="px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200"
                  style={{ backgroundColor: '#00C9AF' }}
                  whileHover={{ scale: 1.05, backgroundColor: '#b78842' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Consultation
                </motion.button>
              </motion.div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
