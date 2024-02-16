import InfoLayoutContainer from "components/layouts/info";

import { ReactChildren } from "interfaces/components/shared.interface";

export default function InfoLayoutContainerPage({ children }: ReactChildren) {
  return <InfoLayoutContainer>{children}</InfoLayoutContainer>;
}