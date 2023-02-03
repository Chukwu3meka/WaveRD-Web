//  @type {import('next').NextConfig}

const domains = [
  { host: "localhost", domain: "http://localhost:3000" },
  { host: "127.0.0.1", domain: "http://127.0.0.1:3000" },
  { host: "soccermass.com", domain: "https://soccermass.com" },
];

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{ member }}",
    },
  },

  async redirects() {
    return [
      // hub
      ...domains.map(({ host, domain }) => ({
        source: "/:path*",
        has: [{ type: "host", value: `hub.${host}` }],
        destination: `${domain}/hub/:path*`,
        permanent: false,
      })),

      // game
      ...domains.map(({ host, domain }) => ({
        source: "/:path*",
        has: [{ type: "host", value: `game.${host}` }],
        destination: `${domain}/game/:path*`,
        permanent: false,
      })),
    ];
  },
};

module.exports = nextConfig;
