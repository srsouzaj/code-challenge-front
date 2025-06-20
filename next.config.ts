import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
