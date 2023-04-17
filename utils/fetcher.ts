interface IFetcher {
  payload?: object | null;
  endpoint: string;
  method: "POST" | "GET" | "PATCH";
  api: "srv-accounts" | "srv-game" | "srv-apihub" | "srv-logs";
}

const fetcher = async ({ api, endpoint, payload = null, method }: IFetcher) => {
  const devEnv = process.env.NODE_ENV === "production";

  // const subDomain = `${api}-api`;
  const protocol = devEnv ? "https" : "http";
  const domain = devEnv ? "soccermass.com" : "localhost:5000";

  // const URL = `${protocol}://${subDomain}.${domain}/api${endpoint}`;
  // const URL = `${protocol}://${api}.${domain}/api${endpoint}`;

  const URL = devEnv ? `${protocol}://${api}.${domain}/api${endpoint}` : `${protocol}://${domain}/api/${api}${endpoint}`;

  console.log({ URL });

  const fetchOptions: any = {
    headers: { "Content-Type": "application/json" },
    /* credentials: "include", tells browser will include credentials in the request, 
       The server must respond with the appropriate CORS headers, including:
       Access-Control-Allow-Origin and Access-Control-Allow-Credentials,
       to allow the response to be received by the client. */
    credentials: "include",
    /* mode: "cors", This involves sending a preflight OPTIONS request to the server to check whether the server allows the requested access, 
       and then sending the actual request if the server responds with the appropriate CORS headers.*/
    mode: "cors",
    method,
  };

  if (["POST", "PATCH"].includes(method)) {
    if (!payload) throw { message: "No payload set" };
    fetchOptions.body = JSON.stringify(payload);
  }
  return fetch(URL, fetchOptions)
    .then(async (response) => {
      if (!response.ok) throw await response.json();
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};

export default fetcher;
