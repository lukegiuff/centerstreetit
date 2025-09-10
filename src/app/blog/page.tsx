import { getBlogPosts, getSiteSettings, getAllServicePages } from '@/lib/content';
import { Header } from '@/components/header';
import { BlogHeroSection } from '@/components/blog-hero-section';
import { BlogListingSection } from '@/components/blog-listing-section';
import { BlogSidebarSection } from '@/components/blog-sidebar-section';
import { Footer } from '@/components/footer';

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  const siteSettings = getSiteSettings();
  const servicePages = getAllServicePages();

  return (
    <main className="min-h-screen">
      <Header 
        siteTitle={siteSettings.site_title}
        navigation={siteSettings.navigation}
      />
      
      <BlogHeroSection
        title="Our Blog"
        subtitle="Insights, Tips & Technology Updates"
        description="Stay informed with our latest articles on IT solutions, cybersecurity, cloud computing, and industry best practices."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Blog Content */}
          <div className="lg:col-span-2">
            <BlogListingSection posts={blogPosts} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebarSection posts={blogPosts} />
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
