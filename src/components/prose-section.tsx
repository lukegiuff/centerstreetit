'use client';

import { AnimatedText } from './ui/animated-text';

interface ProseSectionProps {
  title: string;
  /** Blank-line-separated paragraphs, straight from the CMS. */
  body: string;
  /** Alternating grounds keep consecutive prose sections visually separated. */
  tone?: 'light' | 'muted';
  eyebrow?: string;
}

export function ProseSection({ title, body, tone = 'light', eyebrow }: ProseSectionProps) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className={`py-24 ${tone === 'muted' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText variant="slideUp" delay={0.1}>
          {eyebrow && (
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#b78842' }}
            >
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-cinzel)]">
            {title}
          </h2>
        </AnimatedText>

        <AnimatedText variant="fadeIn" delay={0.3}>
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
