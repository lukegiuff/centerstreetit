'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated background shapes */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 blur-3xl"
          style={{ left: '10%', top: '20%' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-brand-teal/15 to-brand-teal/8 blur-3xl"
          style={{ right: '15%', bottom: '25%' }}
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-cinzel)]">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Don't leave your IT infrastructure to chance. Contact Center Street IT today to learn how our comprehensive managed services can transform your business operations, enhance security, and drive growth.
            </p>
            <p className="text-lg text-gray-400 mb-10">
              With our reliable and expert IT solutions, you can focus on what you do best while we handle the technology that powers your success.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <motion.a
                href="tel:+17139098606"
                className="flex items-center space-x-3 text-white hover:text-brand-gold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-teal">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-lg font-semibold">(713) 909-8606</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:info@centerstreetit.com"
                className="flex items-center space-x-3 text-white hover:text-brand-gold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="text-lg font-semibold">info@centerstreetit.com</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-cinzel)]">
                  Ready to Transform Your IT?
                </h3>
                <p className="text-gray-300 mb-8">
                  Get a free consultation and discover how we can optimize your technology infrastructure.
                </p>
                
                <motion.button
                  className="group w-full bg-gradient-to-r from-brand-teal to-brand-gold text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/contact'}
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-gray-400 mb-2">Available 24/7</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Emergency Support Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
