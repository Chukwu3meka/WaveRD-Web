/**
 * @type {import('next').NextConfig}
 */

const domains = [
  { host: "localhost", domain: "http://localhost:3000" },
  { host: "soccermass.com", domain: "https://soccermass.com" },
  { host: "127.0.0.1", domain: "http://127.0.0.1:3000" },
];

const nextConfig = {
  /* config options here */

  reactStrictMode: true,

  // images: { unoptimized: true },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // ignoreBuildErrors: false,
  },

  async redirects() {
    return [
      // apihub
      ...domains.map(({ host, domain }) => ({
        source: "/:path*",
        has: [{ type: "host", value: `apihub.${host}` }],
        destination: `${domain}/apihub/:path*`,
        permanent: false,
      })),

      // manager
      ...domains.map(({ host, domain }) => ({
        source: "/:path*",
        has: [{ type: "host", value: `manager.${host}` }],
        destination: `${domain}/manager/:path*`,
        permanent: false,
      })),
    ];
  },
};

module.exports = nextConfig;
