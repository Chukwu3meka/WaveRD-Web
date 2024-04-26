import { EndpointContainer } from ".";
import ApihubService from "services/apihub.service";

const EndpointSSR = async ({ path }: any) => {
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
