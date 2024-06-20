import service from "./service";

import { AxiosError, AxiosResponse } from "axios";
import { ConsoleEndpointsContent } from "interfaces/components/console/apihub.interface";
import { NonPaginatedResponse, PaginatedResponse } from "interfaces/services/shared.interface";

import { DailyStatResponse, GetEndpointsPayload } from "interfaces/services/console.interface";

class GamesService {
  gamesServiceUrl = "/games";

  getProfile = async ({ filter, page, size, cookie }: GetEndpointsPayload): Promise<PaginatedResponse<ConsoleEndpointsContent>> => {
    const path = this.gamesServiceUrl + `/apihub/endpoints?filter=${filter}&page=${page}&size=${size}`,
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(path, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };
}

export default GamesService;
