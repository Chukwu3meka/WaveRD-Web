import { GetEndpoints, GetEndpointsCategories } from "interfaces/services/apihub.interface";
import service, { apihubServiceUrl } from ".";

const apihubService = {
  getEndpointsCategories: async ({ limit }: GetEndpointsCategories) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/categories?limit=${limit}`);
    return response.data;
  },

  getEndpointsCategory: async (category: string) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/categories/${category}`);
    return response.data;
  },

  getEndpoints: async ({ phrase, limit = 30, token, sequence }: GetEndpoints) => {
    const response = await service.get(apihubServiceUrl + `/endpoints?phrase=${phrase}&token=${token}&sequence=${sequence}&limit=${limit}`);
    return response.data;
  },

  getEndpoint: async (id: string) => {
    const response = await service.get(apihubServiceUrl + `/endpoints/${id}`);
    return response.data;
  },
};

export default apihubService;
