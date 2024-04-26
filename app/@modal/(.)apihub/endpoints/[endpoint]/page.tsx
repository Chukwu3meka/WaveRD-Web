import { Suspense } from "react";

import Modal from "components/shared/modal";
import EndpointSSR from "components/apihub/endpoint";

const EndpointsPage = ({ params: { endpoint } }: { params: { endpoint: string } }) => (
  <Modal maxHeight={600} height="100vh">
    <Suspense fallback={"loading....."}>
      <EndpointSSR path={endpoint} />
    </Suspense>
  </Modal>
);

export default EndpointsPage;
