import service from "./service";

import { ApiResponse } from "interfaces/services/shared.interface";
import { GetConsoleEndpointsPayload, GetConsoleEndpointsResponse } from "interfaces/services/console.interface";

class ConsoleService {
  consoleServiceUrl = "/console";

  getEndpoints = async ({ filter, page, size, cookie }: GetConsoleEndpointsPayload): Promise<ApiResponse<GetConsoleEndpointsResponse>> => {
    const option = cookie ? { headers: { Cookie: cookie } } : {},
      response = await service.get(this.consoleServiceUrl + `/endpoints?filter=${filter}&page=${page}&size=${size}`, option);

    return response.data;
  };

  // const consoleService = {
  //   contactUs: async (payload: ContactUsPayload) => {
  //     const response = await service.post(consoleServiceUrl + "/contact-us", payload);
  //     return response.data;
  //   },
  // };
}

export default ConsoleService;
