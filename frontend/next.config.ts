import bundleAnalyzer from '@next/bundle-analyzer';
import { NEXT_PUBLIC_BACKEND_URL } from '@/utilities/environment';
import type { NextConfig } from 'next';

// NextJS Configuration
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
        search: '?*',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['apollo'],
  },
};
// Build Analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
