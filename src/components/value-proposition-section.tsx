'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Shield, Zap } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';

export function ValuePropositionSection() {
  const propositions = [
    {
      icon: CheckCircle,
      title: "Satisfaction is our only Metric",
      description: "While other providers talk about how many tickets they close or how much time they spend with you, these all lead to a negative experience. At Center Street IT, we are only happy if you are happy and running well."
    },
    {
      icon: Shield,
      title: "Worry-Free",
      description: "We know that problems mean money. That's why at Center Street IT our focus is proactively ensuring that technical challenges never slow you down."
    },
    {
      icon: Award,
      title: "Contract Free",
      description: "We are so sure that you'll be happy with us, we offer all of our services contract free."
    },
    {
      icon: Zap,
      title: "Brand Power",
      description: "Only working with the biggest industry leaders such as Cisco, Microsoft, Google and Dell to ensure the solutions we deliver meet or exceed the test of time."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              Why Center Street IT is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don&apos;t just fix problems - we prevent them. Our unique approach focuses on long-term solutions and your complete satisfaction.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {propositions.map((prop, index) => {
            const IconComponent = prop.icon;
            
            return (
              <AnimatedCard key={index} delay={0.2 + index * 0.1} className="h-full">
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#b78842' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {prop.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Leasing Program Highlight */}
        <AnimatedCard delay={0.6} className="border-2" style={{ background: `linear-gradient(to right, rgba(183, 136, 66, 0.1), rgba(0, 201, 175, 0.1))`, borderColor: '#b78842' }}>
          <div className="text-center">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Award className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
              Innovative Leasing Programs
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Through partnerships with leading financial services firms to provide the equipment you need along with a payment that won&apos;t break the bank. Often times we can outfit/refresh your entire office for what you currently pay for just copiers.
            </p>
          </div>
        </AnimatedCard>

        {/* Call to Action */}
        <AnimatedText variant="slideUp" delay={0.8}>
          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
              IT Support and Management with Center Street IT is your SUCCESS
            </h3>
            <motion.button
              className="px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Your Network Assessment
            </motion.button>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
