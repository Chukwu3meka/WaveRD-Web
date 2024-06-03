import pageInfo from "utils/page-info";
import HeaderContainer from "components/shared/header";
import FooterContainer from "components/shared/footer";
import ComingSoonContainer from "components/shared/coming-soon";

import { Metadata } from "next";
import { Box } from "@mui/material";
import { styles } from "components/layouts/apihub";
import { ReactChildren } from "interfaces/components/others/shared.interface";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

// const HomePage = async ( { children }: ReactChildren) => (
const HomePage = () => (
  <div className={styles.layout}>
    <HeaderContainer position="relative" />
    <ComingSoonContainer finishDate={new Date("01-01-2025")} />
    <FooterContainer />
  </div>
);

export default HomePage;
