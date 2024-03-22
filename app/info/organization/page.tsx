import { Metadata } from "next";

import Faq from "components/info/faq";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.organization.title,
  keywords: pageInfo.organization.keywords,
  description: pageInfo.organization.description,
};

const FaqPage = () => <Faq />;

export default FaqPage;
