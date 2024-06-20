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

const HomePage = async ({ children }: ReactChildren) => {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className={styles.layout}>
        <HeaderContainer position="relative" />
        <ComingSoonContainer finishDate={new Date("01-01-2025")} />
        <FooterContainer />
      </div>
    );
  }

  const cookie = await getUserCookies(),
    managerService = new ManagerService();

  const profile = await managerService
    .getProfile({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  console.log(profile);

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
