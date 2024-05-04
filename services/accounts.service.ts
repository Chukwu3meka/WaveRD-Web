import service, { accountsServiceUrl } from ".";

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
  getProfile = async () => {
    const response = await service.get(accountsServiceUrl + "/profile");
    return response.data;
  };

  setTheme = async (payload: ThemePayload) => {
    const response = await service.post(accountsServiceUrl + "/theme", payload);
    return response.data;
  };

  signin = async (payload: SigninPayload) => {
    const response = await service.post(accountsServiceUrl + "/signin", payload);
    return response.data;
  };

  exists = async ({ data, variant }: ExistsPayload) => {
    const response = await service.post(accountsServiceUrl + `/${variant}_exists`, { [variant]: data });
    return response.data;
  };

  signup = async (payload: SignupPayload) => {
    const response = await service.post(accountsServiceUrl + "/signup", payload);
    return response.data;
  };

  initPasswordReset = async (payload: InitPassResetService) => {
    const response = await service.post(accountsServiceUrl + "/initiate-password-reset", payload);
    return response.data;
  };

  confPasswordReset = async (payload: ConfPassResetService) => {
    const response = await service.post(accountsServiceUrl + "/confirm-password-reset", payload);
    return response.data;
  };

  initDataDeletion = async (payload: DataDeletionService) => {
    const response = await service.post(accountsServiceUrl + "/data-deletion", payload);
    return response.data;
  };
}

export default AccountsService;
