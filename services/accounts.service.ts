import { ConfPassResetService, ExistsPayload, InitPassResetService, SigninPayload, SignupPayload, ThemePayload } from "interfaces/services/accounts.interface";

import { service, baseServiceUrl } from ".";
const baseURL = baseServiceUrl.accountsService;

export const authService = async () => {
  const response = await service.get(baseURL + "/profile");
  return response.data;
};

export const themeService = async (payload: ThemePayload) => {
  const response = await service.post(baseURL + "/theme", payload);
  return response.data;
};

export const signinService = async (payload: SigninPayload) => {
  const response = await service.post(baseURL + "/signin", payload);
  return response.data;
};

export const existsService = async ({ data, variant }: ExistsPayload) => {
  const response = await service.post(baseURL + `/${variant}_exists`, { [variant]: data });
  return response.data;
};

export const signupService = async (payload: SignupPayload) => {
  const response = await service.post(baseURL + "/signup", payload);
  return response.data;
};

export const initPassResetService = async (payload: InitPassResetService) => {
  const response = await service.post(baseURL + "/initiate-password-reset", payload);
  return response.data;
};

export const confPassResetService = async (payload: ConfPassResetService) => {
  const response = await service.post(baseURL + "/confirm-password-reset", payload);
  return response.data;
};
