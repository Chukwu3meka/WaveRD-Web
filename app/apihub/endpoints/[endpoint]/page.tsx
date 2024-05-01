import { Suspense } from "react";
import { Box } from "@mui/material";

import Loading from "components/shared/loading";
import EndpointSSR from "components/apihub/endpoint";

const EndpointsPage = ({ params: { endpoint } }: { params: { endpoint: string } }) => (
  <Suspense fallback={<Loading />}>
    <Box maxWidth={1200} m="auto" pt={3} width="100%" minHeight={300}>
      <EndpointSSR path={endpoint} />
    </Box>
  </Suspense>
);

export default EndpointsPage;
