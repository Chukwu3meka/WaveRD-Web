import { service, baseServiceUrl } from ".";

const baseURL = baseServiceUrl.apihubService;

export const searchEndpointService = async (phrase: string) => {
  const response = await service.get(baseURL + `/endpoints/search?query=${phrase}`);
  return response.data;
};

// endpoints
