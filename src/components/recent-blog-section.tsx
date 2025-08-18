'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';
import Link from 'next/link';


export function RecentBlogSection() {
  // Featured blog post - in a real app, this would come from your CMS
  const recentPosts = [
    {
      id: 1,
      title: "Understanding DLP Technology: Protecting Your Confidential Information",
      excerpt: "In today's digital landscape, the sheer volume of sensitive data generated and stored by organizations is staggering. Learn how DLP technology effectively protects confidential information.",
      date: "February 26, 2024",
      image: "/assets/blog/dlp-technology.jpg",
      slug: "2024-02-26-understanding-dlp-technology",
      readTime: "5 min read"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <motion.div
        className="absolute left-1/4 top-0 w-24 h-24 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(183, 136, 66, 0.1)' }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-0 w-32 h-32 rounded-full blur-xl"
        style={{ backgroundColor: 'rgba(0, 201, 175, 0.1)' }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: '#b78842' }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-cinzel)]">
                Recent Blog Posts
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest insights on technology, security, and IT best practices.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <AnimatedCard key={post.id} delay={0.2 + index * 0.1} className="group overflow-hidden" hover={false}>
              {/* Blog Image Placeholder */}
              <div
                className="w-full h-48 rounded-lg mb-6 overflow-hidden"
                style={{ backgroundColor: 'rgba(183, 136, 66, 0.1)' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(183, 136, 66, 0.2)' }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <BookOpen className="w-8 h-8" style={{ color: '#b78842' }} />
                  </motion.div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="space-y-4">
                {/* Date and Read Time */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="pt-4">
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

        {/* View All Posts Button */}
        <AnimatedText variant="slideUp" delay={0.6}>
          <div className="text-center">
            <Link href="/blog">
              <button
                className="px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#00C9AF' }}
              >
                View All Blog Posts
              </button>
            </Link>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
