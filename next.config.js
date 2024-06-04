/** @type {import('next').NextConfig} */

const STABLE_VERSION = "/v1",
  NODE_ENV = process.env.NODE_ENV,
  DOMAINS = ["apihub", "manager", "console", "accounts"],
  [PREVIEW, PRODUCTION] = ["https://dev.waverd.com", "https://api.waverd.com"],
  BASE_URL = NODE_ENV === "production" ? PRODUCTION : NODE_ENV === "test" ? PREVIEW : "http://localhost:8081";

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

  env: { BASE_URL: BASE_URL + STABLE_VERSION, STABLE_VERSION, NOTICE_PERIOD: "30", INACTIVITY_PERIOD: "21", DATA_DELETION_PERIOD_PERIOD: "14" },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true" });
module.exports = withBundleAnalyzer(nextConfig);
