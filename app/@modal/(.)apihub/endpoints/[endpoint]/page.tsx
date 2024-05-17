import Modal from "components/shared/modal";
import Loading from "components/shared/loading";
import ApihubService from "services/apihub.service";
import EndpointContainer from "components/apihub/endpoint";

import { Suspense } from "react";
import { EndpointSSRProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointSSR = async ({ path }: EndpointSSRProps) => {
  const apihubService = new ApihubService();

  const endpoint = await apihubService
    .getEndpoint(path)
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <EndpointContainer endpoint={endpoint} />;
};

const EndpointsPage = ({ params: { endpoint } }: { params: { endpoint: string } }) => (
  <Modal maxHeight={600} minHeight="80vh">
    <Suspense fallback={<Loading />}>
      <EndpointSSR path={endpoint} />
    </Suspense>
  </Modal>
);

export default EndpointsPage;
