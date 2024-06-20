import GamesLayoutContainer from "components/layouts/games";
import { ReactChildren } from "interfaces/components/others/shared.interface";

const InfoLayoutContainerPage = ({ children }: ReactChildren) => {
  return <GamesLayoutContainer>{children}</GamesLayoutContainer>;
};

export default InfoLayoutContainerPage;
