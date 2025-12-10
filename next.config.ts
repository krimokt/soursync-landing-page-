import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SWC minification is enabled by default in Next.js 16+
  // Compression is enabled by default in Next.js 16+
  
  // Remove X-Powered-By header for security
  poweredByHeader: false,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
    // Enable modern image formats for better performance
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimize package imports for better tree-shaking
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react', '@radix-ui/react-slot'],
  },
};

export default nextConfig;
