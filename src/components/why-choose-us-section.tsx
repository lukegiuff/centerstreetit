'use client';

import { motion } from 'framer-motion';
import { Heart, FileText, Award, DollarSign } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';

interface WhyChooseUsSectionProps {
  whyChooseUs: {
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
}

export function WhyChooseUsSection({ whyChooseUs }: WhyChooseUsSectionProps) {
  const reasons = [
    {
      icon: Heart,
      title: whyChooseUs.satisfaction_metric.title,
      description: whyChooseUs.satisfaction_metric.description,
    },
    {
      icon: FileText,
      title: whyChooseUs.contract_free.title,
      description: whyChooseUs.contract_free.description,
    },
    {
      icon: Award,
      title: whyChooseUs.brand_power.title,
      description: whyChooseUs.brand_power.description,
    },
    {
      icon: DollarSign,
      title: whyChooseUs.innovative_leasing.title,
      description: whyChooseUs.innovative_leasing.description,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <motion.div
        className="absolute left-0 top-1/4 w-32 h-32 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(183, 136, 66, 0.1)' }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-0 bottom-1/4 w-40 h-40 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(0, 201, 175, 0.1)' }}
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              Why Choose Center Street IT?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re not just another IT company. Here&apos;s what sets us apart from the competition.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            
            return (
              <AnimatedCard key={index} delay={0.2 + index * 0.1} className="h-full group">
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to bottom right, rgba(183, 136, 66, 0.05), rgba(0, 201, 175, 0.05))` }}
                  initial={false}
                />

                <div className="relative z-10 flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: index % 2 === 0 ? '#b78842' : '#00C9AF' }}
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-cinzel)]">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: index % 2 === 0 ? '#00C9AF' : '#b78842' }}
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </AnimatedCard>
            );
          })}
        </div>

        {/* Call to Action */}
        <AnimatedText variant="slideUp" delay={0.8}>
          <div className="text-center mt-16">
            <motion.p
              className="text-xl text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Ready to experience the Center Street IT difference?
            </motion.p>
            <motion.button
              className="px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.05, backgroundColor: '#b78842' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              Get Your Free Consultation
            </motion.button>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
