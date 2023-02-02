interface IFetcher {
  payload?: object | null;
  endpoint: string;
  method: "POST" | "GET";
  api: "app" | "game" | "hub";
}

const fetcher = async ({ api, endpoint, payload = null, method }: IFetcher) => {
  console.log({ api, endpoint, payload, method });
  const devEnv = process.env.NODE_ENV === "development";

  const subDomain = `${api}-api`;
  const protocol = devEnv ? "http" : "https";
  const domain = devEnv ? "localhost:5000" : "soccermass.com";

  const URL = `${protocol}://${subDomain}.${domain}/api${endpoint}`;

  const fetchOptions: any = {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    mode: "cors",
    method,
  };

  if (["POST"].includes(method)) {
    if (!payload) throw { message: "No payload set" };
    fetchOptions.body = JSON.stringify(payload);
  }
  return fetch(URL, fetchOptions)
    .then(async (response) => {
      // try {
      //   const data = await response.json();
      //   console.log("response data?", data);
      // } catch (error) {
      //   console.log("Error happened here!");
      //   console.error(error);
      // }
      if (!response.ok) throw await response.json();
      return response.json();
    })
    .catch((err) => {
      // console.log(err.message);
      throw err;
    });
};

export default fetcher;
