import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Marketing imagery is static — cache aggressively
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
