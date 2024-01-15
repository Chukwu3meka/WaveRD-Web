import axios from "axios";

export const URL = "/accounts";

export const service = axios.create({
  baseURL: process.env.API_URL + URL,
});

export const getDetails = async () => {
  const response = await service.get("/details");
  return response.data;
};
