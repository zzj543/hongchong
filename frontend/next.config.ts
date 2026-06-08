import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "212.129.239.58" },
      { protocol: "http", hostname: "212.129.239.58" },
    ],
    formats: ["image/webp", "image/avif"],
  },
  output: "standalone",
  staticGenerationMaxConcurrency: 2,
  staticGenerationTimeout: 120,
};

export default nextConfig;
