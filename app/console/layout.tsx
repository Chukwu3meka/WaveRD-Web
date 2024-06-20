import { ReactChildren } from "interfaces/components/others/shared.interface";
import ConsoleLayoutContainer from "components/layouts/console/ConsoleLayoutContainer";

const ConsoleLayout = async ({ children }: ReactChildren) => {
  switch (process.env.NODE_ENV) {
    case "development":
      return <ConsoleLayoutContainer>{children}</ConsoleLayoutContainer>;
    default:
      return <p>Setting up enviroment. Kindly wait, Loading...</p>;
  }
};

export default ConsoleLayout;
