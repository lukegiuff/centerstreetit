'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? IconComponent : LucideIcons.Star;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with exceptional service to deliver solutions that drive real results.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            
            return (
              <AnimatedCard key={index} delay={0.2 + index * 0.1} className="relative group">
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to bottom right, rgba(183, 136, 66, 0.1), rgba(0, 201, 175, 0.1))` }}
                  initial={false}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#b78842' }}
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#00C9AF' }}
                  animate={{
                    scale: [1, 1.2, 1],
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

        {/* Decorative background shapes */}
        <motion.div
          className="absolute left-0 top-1/2 w-32 h-32 rounded-full blur-xl"
          style={{ backgroundColor: 'rgba(183, 136, 66, 0.05)' }}
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
          className="absolute right-0 bottom-0 w-40 h-40 rounded-full blur-xl"
          style={{ backgroundColor: 'rgba(0, 201, 175, 0.05)' }}
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
      </div>
    </section>
  );
}
