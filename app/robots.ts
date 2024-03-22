import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/accounts/email-verification", "/accounts/password-reset/"],
  },
  sitemap: "https://soccermass.com/sitemap.xml",
});

export default robots;
