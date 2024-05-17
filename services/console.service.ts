import service from "./service";

import { ApiResponse } from "interfaces/services/shared.interface";
import {
  ConsoleEndpointTitleExistsResponse,
  GetConsoleEndpointPayload,
  GetConsoleEndpointResponse,
  GetConsoleEndpointsPayload,
  GetConsoleEndpointsResponse,
} from "interfaces/services/console.interface";

class ConsoleService {
  consoleServiceUrl = "/console";

  getEndpoints = async ({ filter, page, size, cookie }: GetConsoleEndpointsPayload): Promise<ApiResponse<GetConsoleEndpointsResponse>> => {
    const option = cookie ? { headers: { Cookie: cookie } } : {},
      response = await service.get(this.consoleServiceUrl + `/apihub/endpoints?filter=${filter}&page=${page}&size=${size}`, option);

    return response.data;
  };

  getEndpoint = async ({ id, cookie }: GetConsoleEndpointPayload): Promise<ApiResponse<GetConsoleEndpointResponse>> => {
    const option = cookie ? { headers: { Cookie: cookie } } : {},
      response = await service.get(this.consoleServiceUrl + `/apihub/endpoints/${id}`, option);

    return response.data;
  };

  endpointTitleExists = async ({ title }: { title: string }): Promise<ApiResponse<ConsoleEndpointTitleExistsResponse>> => {
    const response = await service.post(this.consoleServiceUrl + `/apihub/endpoint-title-exists`, { title });

    return response.data;
  };

  composeEndpoint = async ({ path, method }: { path: string; method: string }): Promise<ApiResponse<ConsoleEndpointTitleExistsResponse>> => {
    const response = await service.post(this.consoleServiceUrl + `/apihub/compose-endpoint`, { path, method });

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
