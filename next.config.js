/** @type {import('next').NextConfig} */

const domains = [
    { host: "localhost", domain: "http://localhost:8081" },
    { host: "soccermass.com", domain: "https://soccermass.com" },
  ],
  subDomains = ["apihub", "manager", "console", "accounts"],
  WEB_URL = process.env.NODE_ENV === "production" ? "https://soccermass.com" : "http://localhost:8081",
  API_URL = process.env.NODE_ENV === "production" ? "https://api.soccermass.com/v1" : "http://localhost:8081/v1";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    "@mui/material": { transform: "@mui/material/{{ member }}" },
    "@mui/icons-material": { transform: "@mui/icons-material/{{ member }}" },
  },

  experimental: {
    serverActions: {
      // allowedForwardedHosts: ["localhost", "www.soccermass.com"],
      // allowedOrigins: ["https://www.soccermass.com", "localhost:8081"],
      allowedForwardedHosts: ["localhost", "www.soccermass.com"],
      allowedOrigins: ["https://www.soccermass.com", "localhost:8081"],
    },
  },

  env: {
    API_URL,
    WEB_URL,
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
        source: "/v1/:path*",
        destination: `http://localhost:3000/v1/:path*`, // Rewrite the API routes to the local host

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
