import { Suspense } from "react";

import Modal from "components/shared/modal";
import EndpointSSR from "components/apihub/endpoint";
import Loading from "components/shared/loading";

const EndpointsPage = ({ params: { endpoint } }: { params: { endpoint: string } }) => (
  <Modal maxHeight={600} minHeight="80vh">
    <Suspense fallback={<Loading />}>
      <EndpointSSR path={endpoint} />
    </Suspense>
  </Modal>
);

export default EndpointsPage;
