import service from "./service";

import { AxiosError, AxiosResponse } from "axios";
import { NonPaginatedResponse } from "interfaces/services/shared.interface";

import {
  GetGameWorldsResponse,
  GetGameWorldClubPayload,
  GetGameWorldClubResponse,
  GetGameWorldClubsResponse,
} from "interfaces/services/games.interface";

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

  getGameWorlds = async (title: string | null): Promise<NonPaginatedResponse<GetGameWorldsResponse[]>> => {
    const path = this.gamesServiceUrl + (title ? `/game-worlds/${title}` : "/game-worlds");

    return await service
      .get(path)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getGameWorldClubs = async ({
    world,
    division,
  }: {
    world: string;
    division: string;
  }): Promise<NonPaginatedResponse<GetGameWorldClubsResponse[]>> => {
    const path = this.gamesServiceUrl + `/clubs/${world}/${division}`;

    return await service
      .get(path)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  getGameWorldClub = async ({ world, club }: GetGameWorldClubPayload): Promise<NonPaginatedResponse<GetGameWorldClubResponse>> => {
    const path = this.gamesServiceUrl + `/club/${world}/${club}`;

    return await service
      .get(path)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };
}

export default GamesService;
