import ApihubService from "services/apihub.service";

import { EndpointsContainer } from ".";
import { GetEndpointsResponse } from "interfaces/services/apihub.interface";

const EndpointsSSR = async () => {
  const apihubService = new ApihubService();

  const limit: 20 = 20,
    endpoints: GetEndpointsResponse = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: 0 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: 0, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: 0, size: limit, totalElements: 0, content: [] }));

  return <EndpointsContainer endpoints={endpoints} limit={limit} />;
};

export default EndpointsSSR;
