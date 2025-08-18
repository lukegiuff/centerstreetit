'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/content';

interface BlogListingSectionProps {
  posts: BlogPost[];
}

export function BlogListingSection({ posts }: BlogListingSectionProps) {
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <section className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
              Featured Article
            </h2>
            <AnimatedCard delay={0.2} className="overflow-hidden group" hover={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Image */}
                <div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden"
                >
                  {featuredPost.featured_image ? (
                    <Image
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(183, 136, 66, 0.1), rgba(0, 201, 175, 0.1))' }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(183, 136, 66, 0.2)' }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      >
                        <Tag className="w-10 h-10" style={{ color: '#b78842' }} />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-4">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <span className="text-gray-600">by {featuredPost.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{ 
                          backgroundColor: 'rgba(183, 136, 66, 0.1)', 
                          color: '#b78842' 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center space-x-2 font-semibold transition-colors"
                      style={{ color: '#b78842' }}
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedText>
      )}

      {/* Regular Posts */}
      <div>
        <AnimatedText variant="slideUp" delay={0.3}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-cinzel)]">
            Latest Articles
          </h2>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map((post, index) => (
            <AnimatedCard key={post.slug} delay={0.4 + index * 0.1} className="group h-full flex flex-col" hover={false}>
              {/* Post Image */}
              <div
                className="relative h-48 rounded-lg overflow-hidden mb-4"
              >
                {post.featured_image ? (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(183, 136, 66, 0.1), rgba(0, 201, 175, 0.1))' }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(183, 136, 66, 0.2)' }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <Tag className="w-8 h-8" style={{ color: '#b78842' }} />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col space-y-3">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 flex-grow">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: 'rgba(0, 201, 175, 0.1)', 
                        color: '#00C9AF' 
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 font-medium transition-colors"
                    style={{ color: '#b78842' }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {posts.length > 6 && (
        <AnimatedText variant="slideUp" delay={0.8}>
          <div className="text-center mt-12">
            <button
              className="px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
              style={{ backgroundColor: '#00C9AF' }}
            >
              Load More Articles
            </button>
          </div>
        </AnimatedText>
      )}
    </section>
  );
}
