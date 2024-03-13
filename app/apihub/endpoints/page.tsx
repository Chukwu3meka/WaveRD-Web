import { Metadata } from "next";

import pageInfo from "utils/page-info";
import EndpointsContainer from "components/apihub/endpoints";
import ComingSoonContainer from "components/shared/coming-soon";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function HomePage() {
  return process.env.NODE_ENV === "production" ? (
    <ComingSoonContainer header={true} finishDate={new Date("13 May 2024")} />
  ) : (
    <EndpointsContainer />
  );
}
