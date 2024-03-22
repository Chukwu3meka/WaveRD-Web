import { Metadata } from "next";

import pageInfo from "utils/page-info";
import Advertisement from "components/info/advertisement";

export const metadata: Metadata = {
  title: pageInfo.advertisement.title,
  keywords: pageInfo.advertisement.keywords,
  description: pageInfo.advertisement.description,
};

const AdvertisementPage = () => <Advertisement />;

export default AdvertisementPage;
