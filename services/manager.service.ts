import service from "./service";

import { AxiosError, AxiosResponse } from "axios";
import { ConsoleEndpointsContent } from "interfaces/components/console/apihub.interface";
import { NonPaginatedResponse, PaginatedResponse } from "interfaces/services/shared.interface";

import { DailyStatResponse, GetEndpointsPayload } from "interfaces/services/console.interface";

class GamesService {
  gamesServiceUrl = "/games";

  getProfile = async (cookie?: string | null): Promise<NonPaginatedResponse<any>> => {
    const path = this.gamesServiceUrl + "/get-profile",
      option = cookie ? { headers: { Cookie: cookie } } : {};

    return await service
      .get(path, option)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };
}

export default GamesService;
