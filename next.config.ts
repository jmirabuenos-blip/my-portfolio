import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // allowedDevOrigins is no longer valid in Next.js 16+
    // allowedDevOrigins: ["http://192.168.254.203:3000"],
  },
};

export default nextConfig;
