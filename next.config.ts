import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack to this dir; silences the "multiple lockfiles" warning
  // when a stray lockfile exists higher up the tree.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
