import axios from "axios";

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

const service = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL,
  }),
  apihubServiceUrl = "/apihub",
  consoleServiceUrl = "/console",
  accountsServiceUrl = "/accounts";

export {
  //
  apihubServiceUrl,
  consoleServiceUrl,
  accountsServiceUrl,
  service as default,
};
