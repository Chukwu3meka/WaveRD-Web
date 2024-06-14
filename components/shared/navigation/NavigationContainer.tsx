import { Empty } from "antd";
import { Navigation } from ".";
import { NavigationContainerProps } from "interfaces/components/others/shared.interface";

import CONSOLE_ROUTES from "routes/console.routes";

const NavigationContainer = ({ research }: NavigationContainerProps) => {
  const navRoutes = CONSOLE_ROUTES.filter((props) => props.research === research);

  if (!navRoutes.length)
    return (
      <main>
        <Empty description="No Module Found" />
      </main>
    );

  return <Navigation routes={navRoutes} />;
};

export default NavigationContainer;
