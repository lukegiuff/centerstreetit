'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  heroText: string;
  ctaText: string;
  ctaLink: string;
}

export function HeroSection({ title, subtitle, heroText, ctaText, ctaLink }: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/HeroBG.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: '#b78842' + '20' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#00C9AF' + '20' }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: '#b78842' + '15' }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        // Fixed positions based on index to prevent hydration mismatch
        const fixedPositions = [
          { x: 100, y: 200 }, { x: 300, y: 150 }, { x: 500, y: 300 }, { x: 700, y: 100 },
          { x: 200, y: 400 }, { x: 600, y: 250 }, { x: 800, y: 350 }, { x: 150, y: 500 },
          { x: 450, y: 180 }, { x: 750, y: 420 }, { x: 350, y: 80 }, { x: 550, y: 480 },
          { x: 250, y: 320 }, { x: 650, y: 200 }, { x: 850, y: 280 }, { x: 50, y: 380 },
          { x: 400, y: 450 }, { x: 900, y: 150 }, { x: 300, y: 550 }, { x: 600, y: 350 }
        ];
        const position = fixedPositions[i] || { x: 100 + i * 50, y: 200 + i * 30 };
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: position.x,
              y: position.y,
            }}
            animate={{
              y: [position.y, position.y - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        );
      })}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedText variant="slideUp" delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-cinzel)]">
            {title}
          </h1>
        </AnimatedText>

        <AnimatedText variant="slideUp" delay={0.4}>
          <p className="text-xl md:text-2xl mb-8 font-light" style={{ color: '#b78842' }}>
            {subtitle}
          </p>
        </AnimatedText>

        <AnimatedText variant="fadeIn" delay={0.6}>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroText}
          </p>
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href={ctaLink}>
            <motion.button
              className="group relative px-8 py-4 text-white font-semibold rounded-full text-lg shadow-lg overflow-hidden"
              style={{ backgroundColor: '#00C9AF' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: '#b78842' }}
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>


    </section>
  );
}
