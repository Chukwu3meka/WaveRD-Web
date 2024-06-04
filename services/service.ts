import axios from "axios";

if (!process.env.BASE_URL) throw { message: "Server URL is not specified" };
if (!process.env.STABLE_VERSION) throw { message: "Application Version is undefined" };

const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL,
});

const cookieInterceptor = (cookie: string) => {
  return service.interceptors.request.use((config) => {
    config.headers.Cookie = cookie;
    return config;
  });
};

export { cookieInterceptor, service as default };
