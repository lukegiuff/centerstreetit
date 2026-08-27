'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';

interface LocationPage {
  slug: string;
  title: string;
  description: string;
}

interface LocationsHubProps {
  locations: LocationPage[];
}

export function LocationsHub({ locations }: LocationsHubProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-black via-gray-900 to-gray-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText variant="slideUp" delay={0.1}>
            <div className="flex items-center justify-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: '#b78842' }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-cinzel)]">
                Service Areas
              </h1>
            </div>
          </AnimatedText>

          <AnimatedText variant="slideUp" delay={0.3}>
            <p className="text-xl md:text-2xl mb-4" style={{ color: '#b78842' }}>
              Deer Park &middot; Pasadena &middot; La Porte
            </p>
          </AnimatedText>

          <AnimatedText variant="fadeIn" delay={0.5}>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Center Street I.T. is based in Deer Park and works a deliberately small
              radius. Being close enough to show up the same day is the whole point.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* City cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <AnimatedCard key={location.slug} delay={0.1 + index * 0.1} className="h-full">
                <div className="flex flex-col h-full">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                    style={{ backgroundColor: '#b78842' }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {location.title}
                  </h2>

                  {location.description && (
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {location.description}
                    </p>
                  )}

                  <Link
                    href={`/${location.slug}/`}
                    className="inline-flex items-center space-x-2 font-semibold transition-colors mt-auto"
                    style={{ color: '#b78842' }}
                  >
                    <span>View {location.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Coverage promise */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
              <Clock className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00C9AF' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">On site within 24 hours</h3>
                <p className="text-gray-600">
                  Emergency support is reachable around the clock.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
              <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00C9AF' }} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Talk to us directly</h3>
                <p className="text-gray-600">
                  <a href="tel:+13468779001" className="hover:underline" style={{ color: '#b78842' }}>
                    (346) 877-9001
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
