interface IFetcher {
  endpoint: string;
  data?: object | null;
  method: "POST" | "GET" | "PATCH";
}

const fetcher = async ({ endpoint, data = null, method }: IFetcher) => {
  const WEB_URL = process.env.API_URL,
    api_url = `${WEB_URL}/api/v1${endpoint}`;

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
    if (!data) throw { message: "No data set" };
    fetchOptions.body = JSON.stringify(data);
  }

  return fetch(api_url, fetchOptions)
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
