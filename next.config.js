module.exports = {
  swcMinify: true,
  reactStrictMode: true, // would cause double render
  // env Variable that don't need to be private can be stored here,
  // [What will an attacker do with our HOST if he/she finds it on Github? Absolutely nothing]
  // If your repo is a private repo accessible to only you, you can still have your keys hers
  env: {
    HOST: process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://www.socceratlas.com",
  },
  async headers() {
    return [
      {
        // matching all API routes in /v1
        source: "/api/v1/:path*",
        headers: [
          // { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              //ensure you pass 'x-api-key' else you keep running into cors issues
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-APIKey",
          },
        ],
      },
    ];
  },
};
