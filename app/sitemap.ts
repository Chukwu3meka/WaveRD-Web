import { MetadataRoute } from "next";
import pageInfo from "utils/page-info";

const sitemap = (): MetadataRoute.Sitemap => [
  // ? Solemnity of Mary, the Mother of God
  { url: process.env.WEB_URL! + pageInfo.home, lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
  { url: process.env.WEB_URL! + pageInfo.signin, lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
  { url: process.env.WEB_URL! + pageInfo.signup, lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
  { url: process.env.WEB_URL! + pageInfo.passwordReset, lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
  { url: process.env.WEB_URL! + pageInfo.organization, lastModified: new Date("1 Jan 2024"), changeFrequency: "yearly", priority: 1 },

  // ? Feast of The Chair of St Peter, Apostle
  { url: process.env.WEB_URL! + pageInfo.faq, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.pricing, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.contactUs, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.dataDeletion, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.cookiePolicy, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.advertisement, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.privacyPolicy, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
  { url: process.env.WEB_URL! + pageInfo.termsAndCondition, lastModified: new Date("22 Feb 2024"), priority: 0.7 },

  // ?
];

export default sitemap;
