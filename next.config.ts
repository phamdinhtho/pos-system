import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict mode to detect potential errors
  swcMinify: true, // Use SWC to shrink code, increase build performance

  webpack(config) {
    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
