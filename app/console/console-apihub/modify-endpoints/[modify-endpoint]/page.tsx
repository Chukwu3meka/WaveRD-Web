import { Suspense } from "react";
import { getUserCookies } from "utils/serverHelpers";

import Loading from "components/shared/loading";
import ConsoleService from "services/console.service";
import ConsoleEndpointContainer from "components/console/apihub/console-endpoint";

const ModifyEndpointSSR = async ({ id }: { id: string }) => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const endpoint = await consoleService
    .getEndpoint({ id, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <ConsoleEndpointContainer endpoint={endpoint} />;
};

const EndpointsPage = ({ params: { "modify-endpoint": id } }: { params: { "modify-endpoint": string } }) => (
  <Suspense fallback={<Loading />}>
    <ModifyEndpointSSR id={id} />
  </Suspense>
);

export default EndpointsPage;
