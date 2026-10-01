import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Canonical URL for the primary service moved to a top-level,
        // SEO-friendly path — permanent redirect preserves any existing
        // links/search equity pointing at the old nested route.
        source: "/services/website-development",
        destination: "/real-estate-website-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
