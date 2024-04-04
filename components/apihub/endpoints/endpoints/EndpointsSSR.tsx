import apihubService from "services/apihub.service";

import { EndpointsContainer } from ".";
import { GetEndpointsResponse } from "interfaces/services/apihub.interface";

const EndpointsSSR = async () => {
  const limit = 20,
    initEndpoints: GetEndpointsResponse = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: 0 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: 0, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: 0, size: limit, totalElements: 0, content: [] }));

  return <EndpointsContainer initEndpoints={initEndpoints} limit={limit} />;
};

export default EndpointsSSR;
