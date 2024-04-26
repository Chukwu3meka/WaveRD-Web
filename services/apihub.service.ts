import { GetEndpoints, GetEndpointsCategories, GetEndpointsResponse } from "interfaces/services/apihub.interface";
import service, { axios, apihubServiceUrl } from ".";
import { Endpoint } from "interfaces/components/apihub/endpoints.interface";
import { ApiResponse } from "interfaces/services/shared.interface";
import { AxiosError } from "axios";

class ApihubService {
  getEndpointsCategories = async ({ limit }: GetEndpointsCategories) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/categories?limit=${limit}`);
    return response.data;
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
  }: GetEndpoints): Promise<ApiResponse<GetEndpointsResponse>> => {
    try {
      switch (filter) {
        case "search": {
          const params = `filter=search&phrase=${phrase}&token=${token}&sequence=${sequence}&size=${size}`,
            endpoint = apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint, { signal: this.getEndpointsController.signal })).data;
        }

        case "category": {
          const params = `filter=category&page=${page}&size=${size}&category=${category}`,
            endpoint = apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint, { signal: this.getEndpointsController.signal })).data;
        }

        default: {
          const params = `filter=all&page=${page}&size=${size}`,
            endpoint = apihubServiceUrl + "/endpoints?" + params;

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
        const errMessage = err as AxiosError<ApiResponse<string>>,
          clientMessage = errMessage.response?.data?.message || "Something went wrong!!!";

        return { data: { content: [], page: page || 0, size, totalElements: 0 }, success: false, message: clientMessage };
      }
    }
  };

  getEndpoint = async (path: string) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/${path}`);
    return response.data;
  };
}

export default ApihubService;
