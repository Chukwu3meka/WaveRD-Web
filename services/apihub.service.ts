import service from "./service";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Endpoint } from "interfaces/components/apihub/endpoints.interface";
import { GetEndpoints, GetEndpointsCategories } from "interfaces/services/apihub.interface";
import { NonPaginatedResponse, PaginatedResponse } from "interfaces/services/shared.interface";

class ApihubService {
  apihubServiceUrl = "/apihub";

  getEndpointsCategories = async ({ limit }: GetEndpointsCategories) => {
    const endpoint = `${this.apihubServiceUrl}/endpoints/categories?limit=${limit}`;

    return await service
      .get(endpoint)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  // getEndpointsCategory = async (category: string) => {
  //   const response = await service.get(apihubServiceUrl + `/endpoints/categories/${category}`);
  //   return response.data;
  // };

  private getEndpointsSource = axios.CancelToken.source();

  updateGetEndpointsSource = () => {
    // this.getEndpointsSource = axios.CancelToken.source();
    this.getEndpointsController = new AbortController();
  };

  private getEndpointsController = new AbortController();

  cancelGetEndpoints = () => {
    // this.getEndpointsSource.cancel();

    //     const pendingRequests = axios.;
    // pendingRequests.forEach((request) => {
    //   request.cancel();
    this.getEndpointsController.abort();
  };

  getEndpoints = async ({
    phrase,
    size,
    filter,
    page,
    token,
    sequence,
    category,
  }: // }: GetEndpoints): Promise<NonPaginatedResponse<Endpoint>> => {
  GetEndpoints): Promise<PaginatedResponse<Endpoint>> => {
    try {
      switch (filter) {
        case "search": {
          const params = `filter=search&phrase=${phrase}&token=${token}&sequence=${sequence}&size=${size}`,
            endpoint = this.apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint, { signal: this.getEndpointsController.signal })).data;
        }

        case "category": {
          const params = `filter=category&page=${page}&size=${size}&category=${category}`,
            endpoint = this.apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint, { signal: this.getEndpointsController.signal })).data;
        }

        default: {
          const params = `filter=all&page=${page}&size=${size}`,
            endpoint = this.apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint, { signal: this.getEndpointsController.signal })).data;
        }
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return {
          success: false,
          message: "Request was cancelled by client's action",
          data: { content: [], page: page || 0, size, totalElements: 0 },
        };
      } else {
        const errMessage = err as AxiosError<NonPaginatedResponse<string>>,
          clientMessage = errMessage.response?.data?.message || "Something went wrong!!!";

        return { data: { content: [], page: page || 0, size, totalElements: 0 }, success: false, message: clientMessage };
      }
    }
  };

  getEndpoint = async (path: string) => {
    const response = await service.get(this.apihubServiceUrl + `/endpoints/${path}`);
    return response.data;
  };
}

export default ApihubService;
