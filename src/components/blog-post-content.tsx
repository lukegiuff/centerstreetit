'use client';

import { motion } from 'framer-motion';
import { Share2, BookOpen, Heart } from 'lucide-react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';
import { useState } from 'react';

// Enhanced content processing function
function enhanceContent(content: string): string {
  let enhancedContent = content;
  
  // Add custom info boxes for HTML patterns (since content is already processed markdown)
  enhancedContent = enhancedContent.replace(
    /<p><strong>Note:<\/strong>(.*?)<\/p>/gs,
    '<div class="info-box"><strong>💡 Note:</strong>$1</div>'
  );
  
  enhancedContent = enhancedContent.replace(
    /<p><strong>Warning:<\/strong>(.*?)<\/p>/gs,
    '<div class="warning-box"><strong>⚠️ Warning:</strong>$1</div>'
  );
  
  enhancedContent = enhancedContent.replace(
    /<p><strong>Important:<\/strong>(.*?)<\/p>/gs,
    '<div class="important-box"><strong>🔔 Important:</strong>$1</div>'
  );
  
  enhancedContent = enhancedContent.replace(
    /<p><strong>Tip:<\/strong>(.*?)<\/p>/gs,
    '<div class="tip-box"><strong>💡 Tip:</strong>$1</div>'
  );

  // Reading time estimator removed - not needed for blog posts

  // Icon enhancement for bullet points removed - keeping clean text

  return enhancedContent;
}

interface BlogPostContentProps {
  content: string;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42); // Mock data

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="space-y-8">

      {/* Content */}
      <AnimatedCard delay={0.1} hover={false}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#b78842' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <BookOpen className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm text-gray-600">Article Content</span>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
              />
              <span className="text-sm font-medium">{likeCount}</span>
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Article Body */}
        <AnimatedText variant="fadeIn" delay={0.2}>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: enhanceContent(content) }}
          />
        </AnimatedText>
      </AnimatedCard>

      {/* Article Footer */}
      <AnimatedCard delay={0.3} hover={false}>
        <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-cinzel)]">
              Found This Article Helpful?
            </h3>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest IT insights and solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                className="px-6 py-3 text-white font-semibold rounded-lg transition-colors"
                style={{ backgroundColor: '#b78842' }}
                whileHover={{ backgroundColor: '#00C9AF', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View More Articles
              </motion.button>
              <motion.button
                className="px-6 py-3 border-2 font-semibold rounded-lg transition-colors"
                style={{ 
                  borderColor: '#b78842', 
                  color: '#b78842',
                  backgroundColor: 'transparent'
                }}
                whileHover={{ 
                  backgroundColor: '#b78842', 
                  color: 'white',
                  scale: 1.05 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Reading Time Tracker */}
      <motion.div
        className="fixed bottom-4 right-4 bg-white shadow-lg rounded-full p-3 border"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#00C9AF' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <BookOpen className="w-3 h-3 text-white" />
          </motion.div>
          <span className="text-xs text-gray-600 font-medium">Reading...</span>
        </div>
      </motion.div>
    </article>
  );
}
