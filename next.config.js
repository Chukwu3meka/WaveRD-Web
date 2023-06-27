const subDomains = ["apihub", "manager", "console", "accounts"],
  domains = [
    { host: "localhost", domain: "http://localhost:3000" },
    { host: "soccermass.com", domain: "https://soccermass.com" },
  ];

const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    "@mui/material": { transform: "@mui/material/{{ member }}" },
    "@mui/icons-material": { transform: "@mui/icons-material/{{ member }}" },
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

module.exports = nextConfig;
