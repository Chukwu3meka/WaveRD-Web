import { getUserCookies } from "utils/serverHelpers";

import ConsoleService from "services/console.service";
import EndpointsContainer from "components/console/apihub/console-endpoints";

const EndpointsPage = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const endpoints = await consoleService
    .getEndpoints({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <EndpointsContainer endpoints={endpoints} />;
};

export default EndpointsPage;
