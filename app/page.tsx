import { Metadata } from "next";

import pageInfo from "utils/page-info";
import FooterContainer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import HomeContainer from "components/home";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const HomePage = () => (
  <>
    <HeaderContainer position="relative" />
    <HomeContainer />
    <FooterContainer />
  </>
);

export default HomePage;
