import { Metadata } from "next";
import pageInfo from "utils/page-info";
import PrivacyPolicy from "components/info/privacy-policy";

export const metadata: Metadata = {
  title: pageInfo.privacyPolicy.title,
  keywords: pageInfo.privacyPolicy.keywords,
  description: pageInfo.privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
