/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },

  env: {
    DOMAIN: process.env.NODE_ENV === "production" ? "https://soccermass.com" : "localhost:3000",
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "apihub.soccermass.com",
          },
        ],
        destination: "/apihub/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "apihub.localhost.com",
          },
        ],
        destination: "/apihub/:path*",
      },
    ];
  },
};
