/** @type {import('next').NextConfig} */

const lts = 1,
  domains = [
    { host: "localhost", domain: "http://localhost:8081" },
    { host: "waverd.com", domain: "https://waverd.com" },
  ],
  subDomains = ["apihub", "manager", "console", "accounts"],
  WEB_URL = process.env.NODE_ENV === "production" ? "https://waverd.com" : "http://localhost:8081",
  API_URL = process.env.NODE_ENV === "production" ? "https://api.waverd.com/" + lts : "http://localhost:8081/" + lts;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": { transform: "@mui/material/{{ member }}" },
    "@mui/icons-material": { transform: "@mui/icons-material/{{ member }}" },
  },

  experimental: {
    serverActions: {
      // allowedForwardedHosts: ["localhost", "www.waverd.com"],
      // allowedOrigins: ["https://www.waverd.com", "localhost:8081"],
      allowedForwardedHosts: ["localhost", "www.waverd.com"],
      allowedOrigins: ["https://www.waverd.com", "localhost:8081"],
    },
  },

  env: {
    API_URL,
    WEB_URL,
    STABLE_VERSION: lts,
    NOTICE_PERIOD: "30",
    INACTIVITY_PERIOD: "21",
    DATA_DELETION_PERIOD_PERIOD: "14",
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/:path",
  //       headers: [{ key: "Access-Control-Allow-Origin", value: WEB_URL }],
  //     },
  //   ];
  // },

  async rewrites() {
    return [
      {
        source: `/${lts}/:path*`,
        destination: `http://localhost:3000/${lts}/:path*`, // Rewrite the API routes to the local host

        //   async rewrites() {
        //     return [
        //       {
        //         source: '/api/:path*',
        //         destination: 'http://localhost:3000/api/:path*', // Rewrite the API routes to the local host
        //       },
        //     ];
        //   },
        // };
      },
    ];
  },

  async redirects() {
    return subDomains
      .flatMap((subDomain) => [
        domains.map(({ host, domain }) => ({
          source: "/:path*",
          has: [{ type: "host", value: `${subDomain}.${host}` }],
          destination: `${domain}/${subDomain}/:path*`,
          permanent: false,
        })),
      ])
      .flat();
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// module.exports = nextConfig;
