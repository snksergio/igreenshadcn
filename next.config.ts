import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignorar erros do Storybook durante o build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
