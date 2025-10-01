import { getBlogPost, getBlogPosts, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { BlogPostHero } from '@/components/blog-post-hero';
import { BlogPostContent } from '@/components/blog-post-content';
import { BlogPostSidebar } from '@/components/blog-post-sidebar';
import { BlogPostNavigation } from '@/components/blog-post-navigation';
import { Footer } from '@/components/footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { StructuredData } from '@/components/structured-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://centerstreetit.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.featured_image ? [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const allPosts = getBlogPosts();
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  if (!post) {
    notFound();
  }

  // Get related posts (same tags)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  // Get navigation posts (previous/next)
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      <StructuredData type="article" data={post} />
      <Header 
        siteTitle={siteSettings.site_title}
        navigation={siteSettings.navigation}
      />
      
      <BlogPostHero
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        date={post.date}
        featuredImage={post.featured_image}
        tags={post.tags}
        readTime={post.readTime}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogPostContent content={post.content} />
            
            <BlogPostNavigation
              previousPost={previousPost}
              nextPost={nextPost}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogPostSidebar
              author={post.author}
              tags={post.tags}
              relatedPosts={relatedPosts}
            />
          </div>
        </div>
      </div>
      
      <Footer 
        siteTitle={siteSettings.site_title}
        social={siteSettings.social}
        navigation={siteSettings.navigation}
        servicePages={servicePages}
      />
    </main>
  );
}
