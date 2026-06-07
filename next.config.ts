import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
