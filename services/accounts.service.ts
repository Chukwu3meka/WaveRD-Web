import axios from "axios";
import { Theme } from "interfaces/store/layout.interfaces";

export const URL = "/accounts";

export const service = axios.create({
  baseURL: process.env.API_URL + URL,
});

export const getDetails = async () => {
  const response = await service.get("/details");
  return response.data;
};

export const setTheme = async (theme: Theme) => {
  const response = await service.post("/theame", { theme });
  return response.data;
};
