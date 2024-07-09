import pageInfo from "utils/page-info";
import HeaderContainer from "components/shared/header";
import FooterContainer from "components/shared/footer";
import ComingSoonContainer from "components/shared/coming-soon";

import { Metadata } from "next";
import { Box } from "@mui/material";
import { styles } from "components/layouts/apihub";
import { ReactChildren } from "interfaces/components/others/shared.interface";
import { getUserCookies } from "utils/serverHelpers";
import ManagerService from "services/games.service";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

import GamesLayoutContainer from "components/layouts/games";
import RegisterContainer from "components/games/Register";

const InfoLayoutContainerPage = async ({ children }: ReactChildren) => {
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

  // const profile = await managerService.getProfile(cookie).then(({ success, data, message }) => {
  //   if (success) return data;
  //   return null;
  // });

  // console.log({ profile });

  // return profile ? <GamesLayoutContainer>{children}</GamesLayoutContainer> : <RegisterContainer />;
  return <RegisterContainer />;
};

export default InfoLayoutContainerPage;
