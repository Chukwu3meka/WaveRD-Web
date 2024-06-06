/** @type {import('next').NextConfig} */

const SERVER_ENV_URLS = { test: "https://dev.waverd.com", development: "http://localhost:8081", production: "https://api.waverd.com" },
  STABLE_VERSION = "/v1",
  INIT_NODE_ENV = process.env.NODE_ENV,
  DOMAINS = ["apihub", "manager", "console", "accounts"],
  BASE_URL = SERVER_ENV_URLS[INIT_NODE_ENV] + STABLE_VERSION;

const nextConfig = {
  reactStrictMode: true,

  modularizeImports: {
    "@mui/material": { transform: "@mui/material/{{ member }}" },
    "@mui/icons-material": { transform: "@mui/icons-material/{{ member }}" },
  },

  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost", "www.waverd.com", "preview.waverd.com"],
      allowedOrigins: ["http://localhost:8081", "https://www.waverd.com", "https://preview.waverd.com"],
    },
  },

  async redirects() {
    return DOMAINS.map((domain) => ({
      permanent: false,
      source: "/:path*",
      destination: `https://www.waverd.com/${domain}/:path*`,
      has: [{ type: "host", value: `${domain}.waverd.com` }],
    }));
  },

  env: {
    BASE_URL,
    STABLE_VERSION,
    NOTICE_PERIOD: "30",
    INACTIVITY_PERIOD: "21",
    DATA_DELETION_PERIOD_PERIOD: "14",
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true" });
module.exports = withBundleAnalyzer(nextConfig);
