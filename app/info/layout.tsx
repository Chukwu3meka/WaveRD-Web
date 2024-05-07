import InfoLayoutContainer from "components/layouts/info";
import { ReactChildren } from "interfaces/components/others/shared.interface";

const InfoLayoutContainerPage = ({ children }: ReactChildren) => {
  return <InfoLayoutContainer>{children}</InfoLayoutContainer>;
};

export default InfoLayoutContainerPage;
