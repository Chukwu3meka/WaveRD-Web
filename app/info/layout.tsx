import InfoLayoutContainer from "components/layouts/info-layout";
import { ReactChildren } from "interfaces/components/shared.interface";

const InfoLayoutContainerPage = ({ children }: ReactChildren) => {
  return <InfoLayoutContainer>{children}</InfoLayoutContainer>;
};

export default InfoLayoutContainerPage;
