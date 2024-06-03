import { Suspense } from "react";
import { getUserCookies } from "utils/serverHelpers";

import Modal from "components/shared/modal";
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

  return <ConsoleEndpointContainer endpoint={endpoint} exists={id !== "new"} />;
};

const EndpointsPage = ({ params: { "modify-endpoint": id } }: { params: { "modify-endpoint": string } }) => (
  <Modal maxHeight={600} minHeight="80vh">
    <Suspense fallback={<Loading />}>
      <ModifyEndpointSSR id={id} />
    </Suspense>
  </Modal>
);

export default EndpointsPage;
