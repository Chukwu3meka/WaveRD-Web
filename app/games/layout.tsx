import pageInfo from "utils/page-info";
import GamesService from "services/games.service";
import HeaderContainer from "components/shared/header";
import FooterContainer from "components/shared/footer";
import GamesLayoutContainer from "components/layouts/games";
import ComingSoonContainer from "components/shared/coming-soon";

import { Metadata } from "next";
import { styles } from "components/layouts/apihub";
import { getUserCookies } from "utils/serverHelpers";
import { ReactChildren } from "interfaces/components/others/shared.interface";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const InfoLayoutContainerPage = async ({ children }: ReactChildren) => {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className={styles.layout}>
        <HeaderContainer position="relative" />
        <ComingSoonContainer finishDate={new Date("15-08-2025")} />
        <FooterContainer />
      </div>
    );
  }

  const cookie = await getUserCookies(),
    gamesService = new GamesService();

  const profile = await gamesService.getProfile(cookie).then(({ success, data }) => {
    if (success) return data;
    return null;
  });

  return <GamesLayoutContainer profile={profile}>{children}</GamesLayoutContainer>;
};

export default InfoLayoutContainerPage;
