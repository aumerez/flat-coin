import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.octav.fi',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
