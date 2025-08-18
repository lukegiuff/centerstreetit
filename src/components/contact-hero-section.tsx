'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';

interface ContactHeroSectionProps {
  title: string;
  subtitle: string;
}

export function ContactHeroSection({ title, subtitle }: ContactHeroSectionProps) {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(183, 136, 66, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 201, 175, 0.15) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => {
        const fixedPositions = [
          { x: 100, y: 50 }, { x: 300, y: 80 }, { x: 500, y: 60 },
          { x: 200, y: 120 }, { x: 600, y: 40 }, { x: 400, y: 100 },
          { x: 150, y: 140 }, { x: 450, y: 30 }, { x: 750, y: 90 },
          { x: 250, y: 70 }, { x: 550, y: 110 }, { x: 350, y: 50 }
        ];
        const position = fixedPositions[i] || { x: 100 + i * 60, y: 60 + i * 20 };

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: position.x,
              y: position.y,
            }}
            animate={{
              y: [position.y, position.y - 20, position.y],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        );
      })}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedText variant="slideUp" delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-[family-name:var(--font-cinzel)]">
            {title}
          </h1>
        </AnimatedText>

        <AnimatedText variant="slideUp" delay={0.4}>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </AnimatedText>

        {/* Breadcrumb */}
        <AnimatedText variant="fadeIn" delay={0.6}>
          <nav className="flex justify-center mt-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors" style={{ color: '#b78842' }}>
                  Home
                </Link>
              </li>
              <li>»</li>
              <li className="text-white">Contact</li>
            </ol>
          </nav>
        </AnimatedText>
      </div>
    </section>
  );
}
