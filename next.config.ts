import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Ensure static files are properly exported
  assetPrefix: '',
  basePath: '',
  // Basic optimizations compatible with static export
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Note: Headers, compress, and generateEtags are not supported with output: 'export'
  // These would be handled by the hosting provider (Cloudflare Pages)
};

export default nextConfig;
