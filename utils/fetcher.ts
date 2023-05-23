interface IFetcher {
  endpoint: string;
  payload?: object | null;
  method: "POST" | "GET" | "PATCH";
}

const fetcher = async ({ endpoint, payload = null, method }: IFetcher) => {
  const domain = process.env.NODE_ENV === "production" ? "https://api.soccermass.com" : "http://localhost:5000",
    apiUrl = `${domain}/v1${endpoint}`;

  const fetchOptions: any = {
    headers: { "Content-Type": "application/json" },
    /* credentials: "include", tells browser will include credentials in the request, 
       The server must respond with the appropriate CORS headers, including:
       Access-Control-Allow-Origin and Access-Control-Allow-Credentials,
       to allow the response to be received by the client. */
    credentials: "include",
    /* mode: "cors", This involves sending a preflight OPTIONS request to the server to check whether the server allows the requested access, 
       and then sending the actual request if the server responds with the appropriate CORS headers. */
    mode: "cors",
    method,
  };

  if (["POST", "PATCH"].includes(method)) {
    if (!payload) throw { message: "No payload set" };
    fetchOptions.body = JSON.stringify(payload);
  }

  return fetch(apiUrl, fetchOptions)
    .then(async (response) => {
      if (!response.ok) throw await response.json();
      return response.json();
    })
    .catch((err) => {
      // if (process.env.NODE_ENV === "development") console.log(err);
      throw err;
    });
};

export default fetcher;
