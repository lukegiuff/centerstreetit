'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TechnologyPartnersSection() {
  const partners = [
    { name: 'Microsoft', logo: '/logos/microsoft.svg' },
    { name: 'Google Cloud', logo: '/logos/google-cloud.svg' },
    { name: 'DELL', logo: '/logos/dell.svg' },
    { name: 'Cisco', logo: '/logos/cisco.svg' },
    { name: 'Trend Micro', logo: '/logos/trend-micro.svg' },
    { name: 'ESET', logo: '/logos/eset.svg' },
    { name: 'SonicWall', logo: '/logos/sonicwall.svg' },
    { name: 'QNAP', logo: '/logos/qnap.svg' },
    { name: 'APC', logo: '/logos/apc.svg' },
    { name: 'ARRIS', logo: '/logos/arris.svg' },
    { name: 'Lenovo', logo: '/logos/lenovo.svg' },
    { name: 'Ergotron', logo: '/logos/ergotron.svg' },
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
        <div className="relative overflow-hidden">
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
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 transition-all duration-300 min-w-[180px]"
                whileHover={{ scale: 1.05, grayscale: 0 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-24 h-12 relative flex items-center justify-center">
                  {/* Placeholder for partner logos */}
                  <div className="text-gray-600 text-sm font-medium text-center">
                    {partner.name}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <motion.div
                key={`second-${partner.name}`}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 transition-all duration-300 min-w-[180px]"
                whileHover={{ scale: 1.05, grayscale: 0 }}
              >
                <div className="w-24 h-12 relative flex items-center justify-center">
                  {/* Placeholder for partner logos */}
                  <div className="text-gray-600 text-sm font-medium text-center">
                    {partner.name}
                  </div>
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
