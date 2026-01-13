import type { NextConfig } from "next";
import path from "path";

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