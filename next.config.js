const domains = [
  { host: "localhost", domain: "http://localhost:3000" },
  { host: "soccermass.com", domain: "https://soccermass.com" },
];

const subDomains = ["apihub", "manager", "logs", "accounts"];

const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{ member }}",
    },
  },

  async redirects() {
    return subDomains.map((subDomain) =>
      domains.map(({ host, domain }) => ({
        source: "/:path*",
        has: [{ type: "host", value: `subDomain.${host}` }],
        destination: `${domain}/subDomain/:path*`,
        permanent: false,
      }))
    );

    //  [
    //   // apihub
    //   ...domains.map(({ host, domain }) => ({
    //     source: "/:path*",
    //     has: [{ type: "host", value: `apihub.${host}` }],
    //     destination: `${domain}/apihub/:path*`,
    //     permanent: false,
    //   })),

    //   // manager
    //   ...domains.map(({ host, domain }) => ({
    //     source: "/:path*",
    //     has: [{ type: "host", value: `manager.${host}` }],
    //     destination: `${domain}/manager/:path*`,
    //     permanent: false,
    //   })),
    // ];
  },
};

module.exports = nextConfig;
