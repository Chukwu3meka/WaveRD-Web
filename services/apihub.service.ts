import { GetEndpoints, GetEndpointsCategories, GetEndpointsResponse } from "interfaces/services/apihub.interface";
import service, { apihubServiceUrl } from ".";
import { Endpoint } from "interfaces/components/apihub.interface";
import { ApiResponse } from "interfaces/services/shared.interface";
import { AxiosError } from "axios";

const apihubService = {
  getEndpointsCategories: async ({ limit }: GetEndpointsCategories) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/categories?limit=${limit}`);
    return response.data;
  },

  getEndpointsCategory: async (category: string) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/categories/${category}`);
    return response.data;
  },

  getEndpoints: async ({
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

          return (await service.get(endpoint)).data;
        }

        case "category": {
          const params = `filter=category&page=${page}&size=${size}&category=${category}`,
            endpoint = apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint)).data;
        }

        default: {
          const params = `filter=all&page=${page}&size=${size}`,
            endpoint = apihubServiceUrl + "/endpoints?" + params;

          return (await service.get(endpoint)).data;
        }
      }
    } catch (err) {
      const errMessage = err as AxiosError<ApiResponse<string>>,
        clientMessage = errMessage.response?.data?.message || "Something went wrong!!!";

      return { data: null, success: false, message: clientMessage };
    }
  },

  getEndpoint: async (id: string) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/${id}`);
    return response.data;
  },
};

export default apihubService;
