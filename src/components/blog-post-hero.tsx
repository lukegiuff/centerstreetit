'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostHeroProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  featuredImage?: string;
  tags: string[];
  readTime: string;
}

export function BlogPostHero({ 
  title, 
  excerpt, 
  author, 
  date, 
  featuredImage, 
  tags, 
  readTime 
}: BlogPostHeroProps) {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Image with Overlay */}
      {featuredImage && (
        <div className="absolute inset-0">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        </div>
      )}

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const fixedPositions = [
            { x: 100, y: 50 }, { x: 300, y: 80 }, { x: 500, y: 60 }, { x: 700, y: 90 },
            { x: 200, y: 120 }, { x: 600, y: 40 }, { x: 400, y: 100 }, { x: 800, y: 70 },
            { x: 150, y: 140 }, { x: 450, y: 30 }, { x: 750, y: 110 }, { x: 250, y: 70 }
          ];
          const position = fixedPositions[i] || { x: 100 + i * 60, y: 60 + i * 20 };

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: position.x,
                y: position.y,
              }}
              animate={{
                y: [position.y, position.y - 20, position.y],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedText variant="fadeIn" delay={0.1}>
          <nav className="flex items-center mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors" style={{ color: '#b78842' }}>
                  Home
                </Link>
              </li>
              <li>»</li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors" style={{ color: '#b78842' }}>
                  Blog
                </Link>
              </li>
              <li>»</li>
              <li className="text-white truncate">{title}</li>
            </ol>
          </nav>
        </AnimatedText>

        {/* Tags */}
        <AnimatedText variant="slideUp" delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full"
                style={{ 
                  backgroundColor: 'rgba(183, 136, 66, 0.2)', 
                  color: '#b78842',
                  border: '1px solid rgba(183, 136, 66, 0.3)'
                }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
          </div>
        </AnimatedText>

        {/* Title */}
        <AnimatedText variant="slideUp" delay={0.4}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-cinzel)]">
            {title}
          </h1>
        </AnimatedText>

        {/* Excerpt */}
        <AnimatedText variant="slideUp" delay={0.6}>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {excerpt}
          </p>
        </AnimatedText>

        {/* Meta Information */}
        <AnimatedText variant="slideUp" delay={0.8}>
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#b78842' }}
                whileHover={{ rotate: 5 }}
              >
                <User className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-white font-medium">{author}</span>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#00C9AF' }}
                whileHover={{ rotate: 5 }}
              >
                <Calendar className="w-4 h-4 text-white" />
              </motion.div>
              <span>{new Date(date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#b78842' }}
                whileHover={{ rotate: 5 }}
              >
                <Clock className="w-4 h-4 text-white" />
              </motion.div>
              <span>{readTime}</span>
            </motion.div>
          </div>
        </AnimatedText>
      </div>


    </section>
  );
}
