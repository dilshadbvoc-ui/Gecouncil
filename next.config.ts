import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true, // skip image optimization for faster local dev
  },
  // Remove optimizePackageImports - causes slow dev compilation
  // Add response compression
  compress: true,
  // Reduce unnecessary rewrites
  poweredByHeader: false,
};

export default nextConfig;
