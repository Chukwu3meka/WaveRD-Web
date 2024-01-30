import axios from "axios";

export const authServiceUrl = "/accounts";

export const authService = axios.create({
  baseURL: process.env.API_URL + authServiceUrl,
});

export const getDetails = async () => {
  const response = await authService.get("/details");
  return response.data;
};
