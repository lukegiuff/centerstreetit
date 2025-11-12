'use client';

import { LegalPageContent } from '@/lib/content';
import Link from 'next/link';

interface LegalPageContentProps {
  pageContent: LegalPageContent;
}

export function LegalPageContentComponent({ pageContent }: LegalPageContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pageContent.title}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date(pageContent.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div 
            className="prose prose-lg prose-blue max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-6 prose-ul:space-y-2
              prose-li:text-gray-600
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              [&>*:first-child]:mt-0"
            dangerouslySetInnerHTML={{ __html: pageContent.content }}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to help answer any questions you may have.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

