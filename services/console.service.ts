import service from "./service";

import { GetEndpointsPayload } from "interfaces/services/console.interface";

class ConsoleService {
  consoleServiceUrl = "/console";

  getEndpoints = async ({ filter, page, size }: GetEndpointsPayload) => {
    const response = await service.get(this.consoleServiceUrl + `/endpoints?filter=${filter}&page=${page}&size=${size}`);
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
