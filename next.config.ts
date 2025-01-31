import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    unoptimized: true,
    domains: ["localhost", 'localhost:7270'],
  },
};

export default nextConfig;
