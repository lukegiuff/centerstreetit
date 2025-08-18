'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0, 
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      className={`bg-white/90 backdrop-blur-lg border rounded-xl p-6 shadow-xl ${className}`}
      style={{ borderColor: 'rgba(183, 136, 66, 0.2)' }}
    >
      {children}
    </motion.div>
  );
}
