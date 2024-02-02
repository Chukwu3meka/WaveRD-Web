import { Metadata } from "next";
import PrivacyPolicy from "components/info/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how SoccerMASS safeguards your information. Your privacy matters to us, and we are committed to transparency and data protection.",
  keywords: ["privacy", "privacy policy", "soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
