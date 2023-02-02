interface IFetcher {
  payload: object;
  endpoint: "string";
  method: "POST" | "GET";
  api: "app" | "game" | "hub";
}

export default async ({ api, endpoint, payload, method }: IFetcher) => {
  const devEnv = process.env.NODE_ENV === "development";

  const subDomain = `${api}-api`;
  const protocol = devEnv ? "http" : "https";
  const domain = devEnv ? "localhost:5000" : "soccermass.com";

  const URL = `${protocol}://${subDomain}.${domain}/api${endpoint}`;

  const fetchOptions: any = {
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    mode: "same-origin",
    method,
  };

  if (["POST"].includes(method)) fetchOptions.body = JSON.stringify(payload);

  return fetch(URL, fetchOptions)
    .then(async (response) => {
      if (!response.ok) throw await response.json();
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};
