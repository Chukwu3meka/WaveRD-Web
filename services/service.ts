import axios from "axios";

const service = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

const cookieInterceptor = (cookie: string) => {
  return service.interceptors.request.use((config) => {
    config.headers.Cookie = cookie;
    return config;
  });
};

export { cookieInterceptor, service as default };
