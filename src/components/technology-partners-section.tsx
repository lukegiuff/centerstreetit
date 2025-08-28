'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TechnologyPartnersSection() {
  const partners = [
    { name: 'Microsoft', logo: '/assets/Microsoft.png' },
    { name: 'Google Cloud', logo: '/assets/GoogleCloud.png' },
    { name: 'Dell', logo: '/assets/Dell.png' },
    { name: 'HP', logo: '/assets/HP.png' },
    { name: 'Cisco', logo: '/assets/Cisco.png' },
    { name: 'Trend Micro', logo: '/assets/Trend_Micro.png' },
    { name: 'ESET', logo: '/assets/ESET.png' },
    { name: 'SonicWall', logo: '/assets/SonicWall.png' },
    { name: 'QNAP', logo: '/assets/QNAP.jpg' },
    { name: 'APC', logo: '/assets/APC.png' },
    { name: 'ARRIS', logo: '/assets/ARRIS.png' },
    { name: 'Lenovo', logo: '/assets/Lenovo.png' },
    { name: 'Ergotron', logo: '/assets/Ergotron.png' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
            Trusted Technology Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We partner with industry leaders to deliver cutting-edge solutions and ensure your technology infrastructure is built on proven, reliable platforms.
          </p>
        </motion.div>

        {/* Scrolling Partners Container */}
        <div className="relative overflow-hidden py-4">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Content */}
          <motion.div
            className="flex items-center space-x-8"
            animate={{
              x: [0, -180 * partners.length] // Adjusted for proper spacing
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: partners.length * 2.5, // Slightly faster
                ease: "linear",
              },
            }}
            style={{ width: `${partners.length * 2 * 188}px` }} // Account for both sets
          >
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <motion.div
                key={`first-${partner.name}`}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow transition-all duration-300 min-w-[180px]"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-28 h-10 relative flex items-center justify-center p-2">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((partner) => (
              <motion.div
                key={`second-${partner.name}`}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow transition-all duration-300 min-w-[180px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-28 h-10 relative flex items-center justify-center p-2">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            And many more technology partners to serve your unique business needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
