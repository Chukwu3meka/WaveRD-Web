import axios from "axios";

export const baseServiceUrl = {
  apihubService: "/apihub",
  consoleService: "/console",
  accountsService: "/accounts",
};

export const service = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

// export const setAxiosCookieInterceptor = (cookies: string | null) => {
//   service.interceptors.request.use(
//     (config) => {
//       // Set the cookie in the request header
//       config.headers.Cookie = cookies;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };
