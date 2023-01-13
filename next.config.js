/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */

  reactStrictMode: true,

  // images: { unoptimized: true },

  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
