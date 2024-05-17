import { Suspense } from "react";
import { Box } from "@mui/material";
import { EndpointSSRProps } from "interfaces/components/apihub/endpoint.interface";

import Loading from "components/shared/loading";
import ApihubService from "services/apihub.service";
import EndpointContainer from "components/apihub/endpoint";

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
  <Suspense fallback={<Loading />}>
    <Box maxWidth={1200} m="auto" pt={3} width="100%" minHeight={300}>
      <EndpointSSR path={endpoint} />
    </Box>
  </Suspense>
);

export default EndpointsPage;
