import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['sai-events-backend-simplified.onrender.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sai-events-backend-simplified.onrender.com",
        port: '',
        pathname: "/media/**",
        search: '',
      },
    ],
  },
};

export default nextConfig;
