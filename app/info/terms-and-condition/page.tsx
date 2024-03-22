import { Metadata } from "next";
import pageInfo from "utils/page-info";
import Terms from "components/info/terms";

export const metadata: Metadata = {
  title: pageInfo.termsAndCondition.title,
  keywords: pageInfo.termsAndCondition.keywords,
  description: pageInfo.termsAndCondition.description,
};

const TermsPage = () => <Terms />;

export default TermsPage;
