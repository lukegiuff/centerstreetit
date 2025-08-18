'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from './ui/animated-counter';
import { AnimatedText } from './ui/animated-text';

interface Stat {
  number: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(183, 136, 66, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 201, 175, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(183, 136, 66, 0.15) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-cinzel)]">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#b78842' }}>
                                   Our track record speaks for itself. Here&apos;s what we&apos;ve achieved together with our clients.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Glowing background effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                  <AnimatedCounter
                    value={stat.number}
                    delay={0.5 + index * 0.1}
                    className="block text-4xl md:text-5xl font-bold text-white mb-2"
                  />
                  
                  <motion.p
                    className="font-medium uppercase tracking-wider text-sm"
                    style={{ color: '#b78842' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => {
          // Fixed positions to prevent hydration mismatch
          const fixedPositions = [
            { x: 100, y: 50 }, { x: 300, y: 150 }, { x: 500, y: 100 },
            { x: 200, y: 200 }, { x: 600, y: 80 }, { x: 400, y: 180 }
          ];
          const position = fixedPositions[i] || { x: 100 + i * 100, y: 100 + i * 30 };
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: position.x,
                y: position.y,
              }}
              animate={{
                y: [position.y, position.y - 20, position.y],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
