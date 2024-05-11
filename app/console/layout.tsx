import { ReactChildren } from "interfaces/components/others/shared.interface";
import ConsoleLayoutContainer from "components/layouts/console/ConsoleLayoutContainer";

const ConsoleLayout = async ({ children }: ReactChildren) => {
  return <ConsoleLayoutContainer>{children}</ConsoleLayoutContainer>;
};

export default ConsoleLayout;
