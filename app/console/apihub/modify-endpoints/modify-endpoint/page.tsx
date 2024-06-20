import { getUserCookies } from "utils/serverHelpers";

import ConsoleService from "services/console.service";
import ConsoleEndpointContainer from "components/console/apihub/console-endpoint";

const EndpointsPage = async ({ params: { "modify-endpoint": id } }: { params: { "modify-endpoint": string } }) => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const endpoint = await consoleService
    .getEndpoint({ id, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <ConsoleEndpointContainer endpoint={endpoint} exists={id !== "new"} />;
};

export default EndpointsPage;
