import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    unoptimized: true,
  },
  // Remove optimizePackageImports - causes slow dev compilation
  // Add response compression
  compress: true,
  // Reduce unnecessary rewrites
  poweredByHeader: false,
};

export default nextConfig;
