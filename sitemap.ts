import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://soccermass.com",
      lastModified: new Date(),
    },
    {
      url: "https://soccermass.com/accounts/signin",
      lastModified: new Date(),
    },
    {
      url: "https://soccermass.com/accounts/signup",
      lastModified: new Date(),
    },
    {
      url: "https://soccermass.com/accounts/forgot-password",
      lastModified: new Date(),
    },
    {
      url: "https://soccermass.com/organization",
      lastModified: new Date(),
    },
  ];
}
