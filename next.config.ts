import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },

  // Les rewrites doivent être ici
  async rewrites() {
    return [
      {
        source: "/cdn/:path*",
        destination: "https://cdn.portalstudio.fr/cora-project.fr/:path*",
      },
    ];
  },
};

export default nextConfig;
