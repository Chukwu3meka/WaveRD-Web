import routes from "utils/routes";

import { Empty } from "antd";
import { Navigation } from ".";
import { NavigationContainerProps } from "interfaces/components/others/shared.interface";

const NavigationContainer = ({ research }: NavigationContainerProps) => {
  const navRoutes = routes.filter((props) => props.research === research);

  if (!navRoutes.length)
    return (
      <main>
        <Empty description="No Module Found" />
      </main>
    );

  return <Navigation routes={navRoutes} />;
};

export default NavigationContainer;
