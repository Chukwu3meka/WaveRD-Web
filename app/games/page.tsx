import pageInfo from "utils/page-info";
import HeaderContainer from "components/shared/header";
import FooterContainer from "components/shared/footer";
import ComingSoonContainer from "components/shared/coming-soon";

import { Metadata } from "next";
import { Box } from "@mui/material";
import { styles } from "components/layouts/apihub";
import { ReactChildren } from "interfaces/components/others/shared.interface";
import { getUserCookies } from "utils/serverHelpers";
import ManagerService from "services/manager.service";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const HomePage = async () => {
  return (
    // <div className={styles.layout}>
    //   <HeaderContainer position="relative" />
    // children
    <main>sadsads</main>
    //   <FooterContainer />
    // </div>
  );
};

export default HomePage;
