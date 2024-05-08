import { AxiosRequestConfig } from "axios";
import service from "./service";

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
  baseUrl = "/accounts";

  getProfile = async () => {
    // const options: AxiosRequestConfig<any> | undefined = cookies ? { headers: { Cookie: cookies } } : undefined,
    const response = await service.get(this.baseUrl + "/profile");
    return response.data;
  };

  setTheme = async (payload: ThemePayload) => {
    const response = await service.post(this.baseUrl + "/theme", payload);
    return response.data;
  };

  signin = async (payload: SigninPayload) => {
    const response = await service.post(this.baseUrl + "/signin", payload);
    return response.data;
  };

  exists = async ({ data, variant }: ExistsPayload) => {
    const response = await service.post(this.baseUrl + `/${variant}_exists`, { [variant]: data });
    return response.data;
  };

  signup = async (payload: SignupPayload) => {
    const response = await service.post(this.baseUrl + "/signup", payload);
    return response.data;
  };

  initPasswordReset = async (payload: InitPassResetService) => {
    const response = await service.post(this.baseUrl + "/initiate-password-reset", payload);
    return response.data;
  };

  confPasswordReset = async (payload: ConfPassResetService) => {
    const response = await service.post(this.baseUrl + "/confirm-password-reset", payload);
    return response.data;
  };

  initDataDeletion = async (payload: DataDeletionService) => {
    const response = await service.post(this.baseUrl + "/data-deletion", payload);
    return response.data;
  };
}

export default AccountsService;
