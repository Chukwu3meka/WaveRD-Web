import service from "./service";

import { AxiosError, AxiosResponse } from "axios";
import { ConsoleEndpointsContent } from "interfaces/components/console/apihub.interface";
import { NonPaginatedResponse, PaginatedResponse } from "interfaces/services/shared.interface";

import {
  DailyStatResponse,
  GetEndpointsPayload,
  SaveEndpointPayload,
  GetDailyStatPayload,
  AllRequestsResponse,
  GetAllRequestsPayload,
  ConsoleComposeEndpoint,
  FailedRequestsResponse,
  GetFailedRequestsPayload,
  GetConsoleEndpointPayload,
  GetConsoleEndpointResponse,
  ConsoleEndpointTitleExistsResponse,
} from "interfaces/services/console.interface";

class ConsoleService {
  consoleServiceUrl = "/console";

  getEndpoints = async ({ filter, page, size, cookie }: GetEndpointsPayload): Promise<PaginatedResponse<ConsoleEndpointsContent>> => {
    const path = this.consoleServiceUrl + `/apihub/endpoints?filter=${filter}&page=${page}&size=${size}`,
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(path, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getDailyStat = async ({ filter, page, size, cookie }: GetDailyStatPayload): Promise<PaginatedResponse<DailyStatResponse>> => {
    const endpoint = this.consoleServiceUrl + `/logs/daily-statistics?filter=${filter}&page=${page}&size=${size}`,
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(endpoint, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getAllRequests = async ({ filter, page, size, cookie }: GetAllRequestsPayload): Promise<PaginatedResponse<AllRequestsResponse>> => {
    const endpoint = this.consoleServiceUrl + `/logs/all-requests?filter=${filter}&page=${page}&size=${size}`,
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(endpoint, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getFailedRequests = async ({ filter, page, size, cookie }: GetFailedRequestsPayload): Promise<PaginatedResponse<FailedRequestsResponse>> => {
    const endpoint = this.consoleServiceUrl + `/logs/failed-requests?filter=${filter}&page=${page}&size=${size}`,
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(endpoint, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getEndpoint = async ({ id, cookie }: GetConsoleEndpointPayload): Promise<NonPaginatedResponse<GetConsoleEndpointResponse>> => {
    const option = cookie ? { headers: { Cookie: cookie } } : {},
      response = await service.get(this.consoleServiceUrl + `/apihub/endpoints/${id}`, option);

    return response.data;
  };

  endpointTitleExists = async ({ title }: { title: string }): Promise<NonPaginatedResponse<ConsoleEndpointTitleExistsResponse>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/endpoint-title-exists";

    return await service
      .post(endpoint, { title })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  composeEndpoint = async ({ path, method }: { path: string; method: string }): Promise<NonPaginatedResponse<ConsoleComposeEndpoint>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/compose-endpoint";

    return await service
      .post(endpoint, { path, method })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  saveEndpoint = async (payload: SaveEndpointPayload): Promise<NonPaginatedResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/save-endpoint";

    return await service
      .post(endpoint, payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  toggleEndpointVisibility = async (id: string): Promise<NonPaginatedResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/toggle-endpoint-visibility";

    return await service
      .post(endpoint, { id })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  deleteEndpoint = async (id: string): Promise<NonPaginatedResponse<string>> => {
    const endpoint = this.consoleServiceUrl + "/apihub/delete-endpoint";

    return await service
      .post(endpoint, { id })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  // ! GAMES
  createWorld = async (title: string): Promise<NonPaginatedResponse<string>> => {
    const path = this.consoleServiceUrl + "/games/manage-game-world";

    return await service
      .post(path, { title }, { responseType: "stream" })
      .then((res: AxiosResponse) => res.data.getReader())
      .catch((err: AxiosError) => err.response?.data || {});
  };

  // const consoleService = {
  //   contactUs: async (payload: ContactUsPayload) => {
  //     const response = await service.post(consoleServiceUrl + "/contact-us", payload);
  //     return response.data;
  //   },
  // };
}

export default ConsoleService;
