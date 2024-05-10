import { Suspense } from "react";

import ConsoleService from "services/console.service";
import EndpointsContainer from "components/console/apihub/endpoints";

const EndpointsSSR = async () => {
  const consoleService = new ConsoleService();

  const endpoints = await consoleService
    .getEndpoints({ filter: "", page: 0, size: 20 })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <EndpointsContainer endpoints={endpoints} />;
};

const EndpointsPage = () => (
  <Suspense fallback="Loading...">
    <EndpointsSSR />
  </Suspense>
);

export default EndpointsPage;
