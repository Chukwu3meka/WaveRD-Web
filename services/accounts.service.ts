import axios, { AxiosError, AxiosResponse } from "axios";

import { Theme } from "interfaces/store/layout.interfaces";
import { signinPayload, themePayload } from "interfaces/services/accounts.interface";
import { ApiResponse } from "interfaces/services/shared.interface";

export const URL = "/accounts";

export const service = axios.create({
  baseURL: process.env.API_URL + URL,
});

export const authService = async () => {
  const response = await service.get("/details");
  return response.data;
};

export const themeService = async (payload: themePayload) => {
  const response = await service.post("/theme", payload);
  return response.data;
};

export const signinService = async (payload: signinPayload) => {
  const response = await service.post("/signin", payload);
  return response.data;
};
