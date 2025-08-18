'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what industry leaders have to say about working with us.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard 
              key={index} 
              delay={0.2 + index * 0.1}
              className="relative group h-full"
            >
              {/* Quote icon */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#b78842' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>

              {/* Star rating */}
              <div className="flex items-center mb-4 pt-6">
                {[...Array(5)].map((_, starIndex) => (
                  <motion.div
                    key={starIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4 + index * 0.1 + starIndex * 0.05,
                      duration: 0.3 
                    }}
                  >
                    <Star className="w-5 h-5 fill-current" style={{ color: '#b78842' }} />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <motion.blockquote
                className="text-gray-700 mb-6 italic leading-relaxed flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                &quot;{testimonial.quote}&quot;
              </motion.blockquote>

              {/* Author info */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#b78842' }}>
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom right, rgba(183, 136, 66, 0.05), rgba(0, 201, 175, 0.05))' }}
                initial={false}
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-4 right-4 w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgba(0, 201, 175, 0.3)' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            </AnimatedCard>
          ))}
        </div>

        {/* Call to action */}
        <AnimatedText variant="slideUp" delay={0.8}>
          <div className="text-center mt-16">
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Ready to join our satisfied clients?
            </motion.p>
            <motion.button
              className="px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              Start Your Project Today
            </motion.button>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
