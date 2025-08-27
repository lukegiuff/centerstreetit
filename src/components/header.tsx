'use client';

import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NavigationSubItem {
  label: string;
  link: string;
}

interface NavigationSection {
  section: string;
  items: NavigationSubItem[];
}

interface NavigationItem {
  label: string;
  link: string;
  submenu?: NavigationSection[];
}

interface HeaderProps {
  siteTitle: string;
  navigation: NavigationItem[];
}

export function Header({ siteTitle, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemLabel: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredItem(itemLabel);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b"
      style={{ borderColor: '#b78842' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
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
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative px-4 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.label.toLowerCase() === 'contact' ? (
                  <Link
                    href={item.link}
                    className="px-6 py-2 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#00C9AF' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b78842')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00C9AF')}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <Link
                      href={item.link}
                      className="text-white/90 hover:text-white transition-colors duration-200 font-medium flex items-center gap-1"
                    >
                      {item.label}
                      {item.submenu && (
                        <motion.div
                          animate={{ 
                            rotate: hoveredItem === item.label ? 180 : 0 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {item.submenu && hoveredItem === item.label && (
                      <motion.div
                        className="absolute top-full left-0 w-80 bg-black/95 backdrop-blur-lg border border-gray-700 rounded-lg shadow-xl z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          marginTop: '0px',
                          marginLeft: '-16px',
                        }}
                      >
                        <div className="p-6">
                          {item.submenu.map((section, sectionIndex) => (
                            <div key={section.section} className={sectionIndex > 0 ? 'mt-6' : ''}>
                              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide" style={{ color: '#b78842' }}>
                                {section.section}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      href={subItem.link}
                                      className="block text-gray-300 hover:text-white transition-colors duration-200 py-1 text-sm"
                                      onClick={() => setHoveredItem(null)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </>
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
                      onTouchStart={(e) => (e.currentTarget.style.backgroundColor = '#b78842')}
                      onTouchEnd={(e) => (e.currentTarget.style.backgroundColor = '#00C9AF')}
                    >
                      {item.label}
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      href={item.link}
                      className="flex items-center justify-between text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {item.submenu && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-3">
                        {item.submenu.map((section) => (
                          <div key={section.section}>
                            <h4 className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: '#b78842' }}>
                              {section.section}
                            </h4>
                            <ul className="space-y-1">
                              {section.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.link}
                                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-1 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
