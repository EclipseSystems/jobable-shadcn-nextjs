import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
  images: {
    qualities: [25, 50, 75, 100]
  }
};

export default nextConfig;