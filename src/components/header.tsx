'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface NavigationItem {
  label: string;
  link: string;
}

interface HeaderProps {
  siteTitle: string;
  navigation: NavigationItem[];
}

export function Header({ siteTitle, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b"
      style={{ borderColor: '#b78842' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/Logo-WhiteText.png"
                alt={siteTitle}
                width={300}
                height={90}
                priority
                className="h-15 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {item.label.toLowerCase() === 'contact' ? (
                  <Link
                    href={item.link}
                    className="px-6 py-2 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#00C9AF' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b78842'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#00C9AF'}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.link}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navigation.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {item.label.toLowerCase() === 'contact' ? (
                  <div className="py-2">
                    <Link
                      href={item.link}
                      className="inline-block px-6 py-3 text-white font-semibold rounded-full text-sm transition-all duration-200"
                      style={{ backgroundColor: '#00C9AF' }}
                      onClick={() => setIsMenuOpen(false)}
                      onTouchStart={(e) => e.target.style.backgroundColor = '#b78842'}
                      onTouchEnd={(e) => e.target.style.backgroundColor = '#00C9AF'}
                    >
                      {item.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
