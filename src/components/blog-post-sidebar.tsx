'use client';

import { motion } from 'framer-motion';
import { User, Tag, TrendingUp, ArrowRight } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import Link from 'next/link';
import { BlogPost } from '@/lib/content';

interface BlogPostSidebarProps {
  author: string;
  tags: string[];
  relatedPosts: BlogPost[];
}

export function BlogPostSidebar({ author, tags, relatedPosts }: BlogPostSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Author Info */}
      <AnimatedCard delay={0.1} hover={false}>
        <div className="text-center">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#b78842' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-cinzel)]">
            {author}
          </h3>
          <p className="text-gray-600 mb-4">
            IT Solutions Expert at Center Street IT
          </p>
          
          <motion.button
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'rgba(0, 201, 175, 0.1)', 
              color: '#00C9AF' 
            }}
            whileHover={{ 
              backgroundColor: '#00C9AF', 
              color: 'white',
              scale: 1.05 
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.button>
        </div>
      </AnimatedCard>

      {/* Article Tags */}
      <AnimatedCard delay={0.2} hover={false}>
        <div className="flex items-center mb-4">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
            style={{ backgroundColor: '#00C9AF' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Tag className="w-4 h-4 text-white" />
          </motion.div>
          <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
            Article Tags
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full cursor-pointer transition-colors"
              style={{ 
                backgroundColor: 'rgba(183, 136, 66, 0.1)', 
                color: '#b78842' 
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </AnimatedCard>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <AnimatedCard delay={0.3} hover={false}>
          <div className="flex items-center mb-4">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
              style={{ backgroundColor: '#b78842' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
              Related Articles
            </h3>
          </div>
          
          <div className="space-y-4">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <motion.span
                        className="text-xs font-medium flex items-center gap-1"
                        style={{ color: '#b78842' }}
                        whileHover={{ x: 3 }}
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* Quick Actions */}
      <AnimatedCard delay={0.4} hover={false}>
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
          Quick Actions
        </h3>
        
        <div className="space-y-3">
          <motion.button
            className="w-full px-4 py-3 text-left rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'rgba(183, 136, 66, 0.2)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Share Article
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </motion.button>

          <motion.button
            className="w-full px-4 py-3 text-left rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'rgba(0, 201, 175, 0.2)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Print Article
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </motion.button>

          <Link href="/contact">
            <motion.div
              className="w-full px-4 py-3 text-left rounded-lg border hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'rgba(183, 136, 66, 0.2)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Get IT Help
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          </Link>
        </div>
      </AnimatedCard>
    </div>
  );
}
