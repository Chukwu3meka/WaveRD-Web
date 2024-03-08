import pageInfo from "utils/page-info";
import FooterContainer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import EndpointsContainer from "components/apihub/endpoints";

import { Metadata } from "next";
import ComingSoonContainer from "components/shared/coming-soon";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function HomePage() {
  return (
    <>
      {process.env.NODE_ENV !== "production" ? (
        <ComingSoonContainer header={true} finishDate={new Date("13 May 2024")} />
      ) : (
        <>
          <HeaderContainer position="relative" />
          <main>
            <EndpointsContainer />
          </main>
        </>
      )}
      <FooterContainer />
    </>
  );
}
