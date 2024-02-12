import { Metadata } from "next";
import pageInfo from "utils/page-info";
import Terms from "components/info/terms";

export const metadata: Metadata = {
  title: pageInfo.terms.title,
  keywords: pageInfo.terms.keywords,
  description: pageInfo.terms.description,
};

export default function TermsPage() {
  return <Terms />;
}
