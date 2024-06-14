import ConsoleService from "services/console.service";

import { getUserCookies } from "utils/serverHelpers";
import { FailedRequestsContainer } from "components/console/logs/failed-requests";


const Page = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const failedRequests = await consoleService
    .getFailedRequests({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <FailedRequestsContainer failedRequests={failedRequests} />;
};

export default Page;
