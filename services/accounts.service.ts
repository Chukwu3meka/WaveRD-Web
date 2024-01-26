import { existsPayload, signinPayload, signupPayload, themePayload } from "interfaces/services/accounts.interface";

import { service, baseServiceUrl } from ".";
const baseURL = baseServiceUrl.accountsService;

export const authService = async () => {
  const response = await service.get(baseURL + "/profile");
  return response.data;
};

export const themeService = async (payload: themePayload) => {
  const response = await service.post(baseURL + "/theme", payload);
  return response.data;
};

export const signinService = async (payload: signinPayload) => {
  const response = await service.post(baseURL + "/signin", payload);
  return response.data;
};

export const existsService = async ({ data, variant }: existsPayload) => {
  const response = await service.post(baseURL + `${variant}_exists`, { [variant]: data });
  return response.data;
};

export const signupService = async (payload: signupPayload) => {
  const response = await service.post(baseURL + "/signup", payload);
  return response.data;
};
