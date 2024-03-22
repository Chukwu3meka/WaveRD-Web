import { Metadata } from "next";

import Faq from "components/info/faq";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.faq.title,
  keywords: pageInfo.faq.keywords,
  description: pageInfo.faq.description,
};

const FaqPage = () => <Faq />;

export default FaqPage;
