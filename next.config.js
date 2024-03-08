module.exports = {
  reactStrictMode: true,
  env: {
    // DOMAIN: process.env.NODE_ENV === "production" ? "https://soccermass.com" : "localhost:3000",
    DOMAIN: process.env.NODE_ENV === "production" ? "https://soccermass.com" : "localhost:3000",
    SALARY_CAP: 300,
    MAX_BUDGET: 700,
    MAX_SQUAD: 32,
    MIN_SQUAD: 21,
    TOURNAMENT_ROWS_PER_PAGE: {
      cup: 16,
      league: 32,
      divisionOne: 8,
      divisionTwo: 8,
      divisionThree: 8,
      divisionFour: 8,
    },
  },
};
