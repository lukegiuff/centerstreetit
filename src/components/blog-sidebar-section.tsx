'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, TrendingUp } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';
import { BlogPost } from '@/lib/content';

interface BlogSidebarSectionProps {
  posts: BlogPost[];
}

export function BlogSidebarSection({ posts }: BlogSidebarSectionProps) {

  // Get recent posts (latest 5)
  const recentPosts = posts.slice(0, 5);

  // Get all unique tags with counts
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Recent Posts */}
      <AnimatedCard delay={0.1} hover={false}>
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
            Recent Articles
          </h3>
        </div>
        
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00C9AF' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Popular Tags */}
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
            Popular Topics
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {popularTags.map(([tag, count], index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full cursor-pointer transition-colors"
              style={{ 
                backgroundColor: 'rgba(183, 136, 66, 0.1)', 
                color: '#b78842' 
              }}
            >
              <span>{tag}</span>
              <span className="text-xs opacity-70">({count})</span>
            </motion.span>
          ))}
        </div>
      </AnimatedCard>

      {/* Categories */}
      <AnimatedCard delay={0.3} hover={false}>
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-cinzel)]">
          Categories
        </h3>
        
        <div className="space-y-2">
          {[
            { name: 'IT Solutions', count: 12, color: '#b78842' },
            { name: 'Cybersecurity', count: 8, color: '#00C9AF' },
            { name: 'Cloud Computing', count: 6, color: '#b78842' },
            { name: 'Network Management', count: 5, color: '#00C9AF' },
            { name: 'Business Tips', count: 4, color: '#b78842' }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({category.count})
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}
