import { Metadata } from "next";

import pageInfo from "utils/page-info";
import Pricing from "components/info/pricing";

export const metadata: Metadata = {
  title: pageInfo.pricing.title,
  keywords: pageInfo.pricing.keywords,
  description: pageInfo.pricing.description,
};

const PricingPage = () => <Pricing />;

export default PricingPage;
