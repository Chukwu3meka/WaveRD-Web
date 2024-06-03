import { Suspense } from "react";
import { getUserCookies } from "utils/serverHelpers";

import Loading from "components/shared/loading";
import ConsoleService from "services/console.service";
import EndpointsContainer from "components/console/apihub/console-endpoints";

const EndpointsSSR = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  console.log({ a: process.env.MY_VARIABLE, b: "MY_VARIABLE" });

  const endpoints = await consoleService
    .getEndpoints({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <EndpointsContainer endpoints={endpoints} />;
};

const EndpointsPage = () => (
  <Suspense fallback={<Loading />}>
    <EndpointsSSR />
  </Suspense>
);

export default EndpointsPage;
