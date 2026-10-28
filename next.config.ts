import type { NextConfig } from "next";

// The site is a single "Coming Soon" page until the next P3RI season.
// Send links to the old pages back to it instead of a 404.
const RETIRED_ROUTES = ["/program", "/timeline", "/live", "/infak", "/sponsor"];

const nextConfig: NextConfig = {
  async redirects() {
    return RETIRED_ROUTES.flatMap((route) => [
      { source: route, destination: "/", permanent: false },
      { source: `${route}/:path*`, destination: "/", permanent: false },
    ]);
  },
};

export default nextConfig;
