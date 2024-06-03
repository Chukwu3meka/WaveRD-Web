import service from "./service";

import { ApiResponse } from "interfaces/services/shared.interface";
import {
  ConsoleComposeEndpoint,
  ConsoleEndpointTitleExistsResponse,
  GetConsoleEndpointPayload,
  GetConsoleEndpointResponse,
  GetConsoleEndpointsPayload,
  GetConsoleEndpointsResponse,
  SaveEndpointPayload,
} from "interfaces/services/console.interface";
import { AxiosError, AxiosResponse } from "axios";

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
    const endpoint = this.consoleServiceUrl + "/apihub/endpoint-title-exists";

    return await service
      .post(endpoint, { title })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  composeEndpoint = async ({ path, method }: { path: string; method: string }): Promise<ApiResponse<ConsoleComposeEndpoint>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/compose-endpoint";

    return await service
      .post(endpoint, { path, method })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  saveEndpoint = async (payload: SaveEndpointPayload): Promise<ApiResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/save-endpoint";

    return await service
      .post(endpoint, payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  toggleEndpointVisibility = async (id: string): Promise<ApiResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/toggle-endpoint-visibility";

    return await service
      .post(endpoint, { id })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  deleteEndpoint = async (id: string): Promise<ApiResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/delete-endpoint";

    return await service
      .post(endpoint, { id })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  // const consoleService = {
  //   contactUs: async (payload: ContactUsPayload) => {
  //     const response = await service.post(consoleServiceUrl + "/contact-us", payload);
  //     return response.data;
  //   },
  // };
}

export default ConsoleService;
