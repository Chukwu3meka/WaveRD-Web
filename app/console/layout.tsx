import { ReactChildren } from "interfaces/components/others/shared.interface";
import ConsoleLayoutContainer from "components/layouts/console/ConsoleLayoutContainer";

const ConsoleLayout = async ({ children }: ReactChildren) => {
  if (process.env.NODE_ENV === "development") return <ConsoleLayoutContainer>{children}</ConsoleLayoutContainer>;
  return <p>Setting up enviroment. Kindly wait, Loading...</p>;
};

export default ConsoleLayout;
