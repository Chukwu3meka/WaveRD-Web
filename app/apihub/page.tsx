import FooterContainer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import pageInfo from "utils/page-info";

import { Metadata } from "next";
import { Intro, Peaks } from "components/apihub/home";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function HomePage() {
  return (
    <main>
      <HeaderContainer position="relative" />
      <Intro />
      <Peaks />
      <FooterContainer />
    </main>
  );
}
