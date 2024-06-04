import { Metadata } from "next";

import pageInfo from "utils/page-info";
import Sponsors from "components/info/sponsors";

export const metadata: Metadata = {
  title: pageInfo.sponsors.title,
  keywords: pageInfo.sponsors.keywords,
  description: pageInfo.sponsors.description,
};

const SponsorsPage = () => <Sponsors />;

export default SponsorsPage;
