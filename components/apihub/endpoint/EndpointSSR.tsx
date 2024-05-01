import ApihubService from "services/apihub.service";

import { EndpointContainer } from ".";
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

export default EndpointSSR;
