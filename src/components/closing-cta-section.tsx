'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedText } from './ui/animated-text';

interface ClosingCtaSectionProps {
  title: string;
  body: string;
  buttonText: string;
  buttonLink: string;
}

export function ClosingCtaSection({
  title,
  body,
  buttonText,
  buttonLink,
}: ClosingCtaSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedText variant="slideUp" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-cinzel)]">
            {title}
          </h2>
        </AnimatedText>

        <AnimatedText variant="fadeIn" delay={0.3}>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {body}
          </p>
        </AnimatedText>

        <AnimatedText variant="slideUp" delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={buttonLink}>
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full"
                style={{ backgroundColor: '#00C9AF' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>

            <a
              href="tel:+13468779001"
              className="px-8 py-4 font-semibold rounded-full border transition-colors"
              style={{ borderColor: '#b78842', color: '#b78842' }}
            >
              (346) 877-9001
            </a>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
