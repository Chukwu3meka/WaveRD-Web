import axios from "axios";

export const service = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

export const baseServiceUrl = {
  accountsService: "/accounts",
};

// // Add a request interceptor to log headers
// service.interceptors.request.use(
//   (config) => {
//     console.log("Request Headers:", config.headers);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const setAxiosCookieInterceptor = (cookies: string | null) => {
  service.interceptors.request.use(
    (config) => {
      // Set the cookie in the request header
      config.headers.Cookie = cookies;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
