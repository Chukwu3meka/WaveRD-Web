import { getUserCookies } from "utils/serverHelpers";

import ConsoleService from "services/console.service";
import ConsoleEndpointContainer from "components/console/apihub/console-endpoint";

const EndpointsPage = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  // const endpoint = await consoleService
  //   .getEndpoint({ id, cookie })
  //   .then(({ success, data }) => {
  //     if (success) return data;
  //     return null;
  //   })
  //   .catch(() => null);

  // return <ConsoleEndpointContainer endpoint={endpoint} exists={id !== "new"} />;
  return <p>ss</p>;
};

export default EndpointsPage;
