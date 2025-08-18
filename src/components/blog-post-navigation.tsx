'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import Link from 'next/link';
import { BlogPost } from '@/lib/content';

interface BlogPostNavigationProps {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export function BlogPostNavigation({ previousPost, nextPost }: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <AnimatedCard delay={0.5} className="mt-12" hover={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        <div className="md:col-span-1">
          {previousPost ? (
            <Link href={`/blog/${previousPost.slug}`} className="block group h-full">
              <motion.div
                className="p-6 rounded-lg border h-full flex flex-col justify-between transition-all duration-300"
                style={{ borderColor: 'rgba(183, 136, 66, 0.2)' }}
                whileHover={{ 
                  borderColor: '#b78842',
                  backgroundColor: 'rgba(183, 136, 66, 0.05)',
                  scale: 1.02 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      whileHover={{ x: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="w-4 h-4" style={{ color: '#b78842' }} />
                    </motion.div>
                    <span className="text-sm font-medium" style={{ color: '#b78842' }}>
                      Previous Article
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {previousPost.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {previousPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <span>{new Date(previousPost.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{previousPost.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="p-6 rounded-lg border h-full flex items-center justify-center opacity-50">
              <span className="text-gray-400">No previous article</span>
            </div>
          )}
        </div>

        {/* Next Post */}
        <div className="md:col-span-1">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="block group h-full">
              <motion.div
                className="p-6 rounded-lg border h-full flex flex-col justify-between transition-all duration-300 text-right"
                style={{ borderColor: 'rgba(0, 201, 175, 0.2)' }}
                whileHover={{ 
                  borderColor: '#00C9AF',
                  backgroundColor: 'rgba(0, 201, 175, 0.05)',
                  scale: 1.02 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <span className="text-sm font-medium" style={{ color: '#00C9AF' }}>
                      Next Article
                    </span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" style={{ color: '#00C9AF' }} />
                    </motion.div>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {nextPost.excerpt}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-500">
                    <span>{new Date(nextPost.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{nextPost.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="p-6 rounded-lg border h-full flex items-center justify-center opacity-50">
              <span className="text-gray-400">No next article</span>
            </div>
          )}
        </div>
      </div>

      {/* Back to Blog */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <Link href="/blog">
          <motion.button
            className="px-6 py-3 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#b78842' }}
            whileHover={{ backgroundColor: '#00C9AF', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to All Articles
          </motion.button>
        </Link>
      </div>
    </AnimatedCard>
  );
}
