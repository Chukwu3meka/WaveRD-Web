import { Suspense } from "react";
import ConsoleService from "services/console.service";
import ApihubEndpointsContainer from "components/console/apihub-endpoints";

const ApihubEndpointsSSR = async () => {
  const consoleService = new ConsoleService();

  const endpoints = await consoleService
    .getEndpoints({ filter: "", page: 0, size: 20 })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <ApihubEndpointsContainer endpoints={endpoints} />;
};

const EndpointsPage = () => (
  <Suspense fallback="Loading...">
    <ApihubEndpointsSSR />
  </Suspense>
);

export default EndpointsPage;
