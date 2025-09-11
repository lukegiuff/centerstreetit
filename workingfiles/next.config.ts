import type { NextConfig } from "next";

// Force new deployment - ensure decap-proxy exclusion fix is applied
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
