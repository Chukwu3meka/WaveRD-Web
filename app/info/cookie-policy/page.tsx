import { Metadata } from "next";
import pageInfo from "utils/page-info";
import CookiePolicy from "components/info/cookie-policy";

export const metadata: Metadata = {
  title: pageInfo.cookiePolicy.title,
  keywords: pageInfo.cookiePolicy.keywords,
  description: pageInfo.cookiePolicy.description,
};

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
