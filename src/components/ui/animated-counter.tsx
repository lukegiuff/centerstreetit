'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({ value, className = '', delay = 0 }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // Handle non-numeric values like "99.9%" or "24/7"
    const numericMatch = value.match(/(\d+\.?\d*)/);
    if (!numericMatch) return value;
    
    const currentNumber = Math.round(latest);
    
    if (currentNumber === 0) return value.replace(numericMatch[1], '0');
    
    return value.replace(numericMatch[1], currentNumber.toString());
  });

  useEffect(() => {
    const numericMatch = value.match(/(\d+\.?\d*)/);
    if (!numericMatch) return;
    
    const targetNumber = parseFloat(numericMatch[1]);
    
    const timer = setTimeout(() => {
      animate(count, targetNumber, { 
        duration: 2, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, delay, value]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {rounded}
    </motion.span>
  );
}
