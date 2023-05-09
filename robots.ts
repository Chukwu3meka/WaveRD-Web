import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/accounts/reset-password", "/accounts/email-verification-success", "/accounts/email-verification-failed"],
    },
    sitemap: "https://soccermass.com/sitemap.xml",
  };
}
