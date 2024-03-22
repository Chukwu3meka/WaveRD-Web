import pageInfo from "utils/page-info";
import FooterContainer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";

import { Metadata } from "next";
import { RefreshHome, ApiHub, ManagerContainer, Welcome } from "components/home";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const HomePage = () => (
  <>
    <HeaderContainer position="relative" />

    <main>
      <Welcome />
      <ManagerContainer />
      <ApiHub />
    </main>

    <RefreshHome />
    <FooterContainer />
  </>
);

export default HomePage;
