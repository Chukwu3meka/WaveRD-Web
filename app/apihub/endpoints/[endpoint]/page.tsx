import { Suspense } from "react";

import Loading from "components/shared/loading";
import EndpointSSR from "components/apihub/endpoint";

const EndpointsPage = ({ params: { endpoint } }: { params: { endpoint: string } }) => (
  <Suspense fallback={<Loading />}>
    <EndpointSSR path={endpoint} />
  </Suspense>
);

export default EndpointsPage;
