import { Metadata } from "next";
import CookiePolicy from "components/info/cookie-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Discover how we use cookies to enhance your browsing experience and provide personalized content. Your privacy matters to us.",
  keywords: ["cookies", "cookie policy", "soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
