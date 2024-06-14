import ConsoleService from "services/console.service";

import { getUserCookies } from "utils/serverHelpers";
import { AllRequestContainer } from "components/console/logs/all-request";

const Page = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const allRequests = await consoleService
    .getAllRequests({ filter: "", page: 0, size: 100, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <AllRequestContainer allRequests={allRequests} />;
};

export default Page;
