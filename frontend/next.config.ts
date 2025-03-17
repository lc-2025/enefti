import type { NextConfig } from 'next';

// NextJS Configuration
const nextConfig: NextConfig = {
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
};

export default nextConfig;
