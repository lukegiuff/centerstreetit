'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeIn' | 'slideUp' | 'typewriter';
}

export function AnimatedText({ 
  children, 
  className = '', 
  delay = 0, 
  variant = 'fadeIn' 
}: AnimatedTextProps) {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, delay }
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: "easeOut" }
    },
    typewriter: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay, ease: 'easeOut' }
    }
  };

  const config = variants[variant];

  return (
    <motion.div
      initial={config.initial}
      animate={config.animate}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
