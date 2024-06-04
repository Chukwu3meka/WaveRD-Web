import service from "./service";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "interfaces/services/shared.interface";

import {
  ThemePayload,
  ExistsPayload,
  SigninPayload,
  SignupPayload,
  DataDeletionService,
  ConfPassResetService,
  InitPassResetService,
} from "interfaces/services/accounts.interface";

class AccountsService {
  accountsServiceUrl = "/accounts";

  getProfile = async (): Promise<ApiResponse<any>> => {
    const endpoint = this.accountsServiceUrl + "/profile";

    return await service
      .get(endpoint)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data);
  };

  setTheme = async (payload: ThemePayload) => {
    const response = await service.post(this.accountsServiceUrl + "/theme", payload);
    return response.data;
  };

  signin = async (payload: SigninPayload) => {
    const response = await service.post(this.accountsServiceUrl + "/signin", payload);
    return response.data;
  };

  exists = async ({ data, variant }: ExistsPayload) => {
    const response = await service.post(this.accountsServiceUrl + `/${variant}_exists`, { [variant]: data });
    return response.data;
  };

  signup = async (payload: SignupPayload) => {
    const response = await service.post(this.accountsServiceUrl + "/signup", payload);
    return response.data;
  };

  initPasswordReset = async (payload: InitPassResetService) => {
    const response = await service.post(this.accountsServiceUrl + "/initiate-password-reset", payload);
    return response.data;
  };

  confPasswordReset = async (payload: ConfPassResetService) => {
    const response = await service.post(this.accountsServiceUrl + "/confirm-password-reset", payload);
    return response.data;
  };

  initDataDeletion = async (payload: DataDeletionService) => {
    const response = await service.post(this.accountsServiceUrl + "/data-deletion", payload);
    return response.data;
  };
}

export default AccountsService;
