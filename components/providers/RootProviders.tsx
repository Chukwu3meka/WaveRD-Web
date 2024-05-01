import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { accountsServiceUrl } from "services/index";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { RootProvidersProps } from "interfaces/components/providers.interface";
import { SwrProvider, SnackbarProvider, ReduxProvider, Providers } from ".";

const getUserProfile = async (): Promise<null | Profile> => {
  const cookieStore = cookies(),
    ssidCookie = cookieStore.get("SSID");

  if (!ssidCookie || !ssidCookie.value) {
    // // ? Delete SoccerMASS SSID if it does not have a value
    // if (status) cookies().delete("SSID");
    return null;
  }
  return jwt.verify(ssidCookie.value, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if (err || !decoded || !decoded.session) return null;

    const res = await fetch(process.env.API_URL + accountsServiceUrl + "/profile", {
      headers: { Cookie: cookies().toString(), "Content-Type": "application/json" },
      /* credentials: "include", tells browser will include credentials in the request, 
          The server must respond with the appropriate CORS headers, including:
          Access-Control-Allow-Origin and Access-Control-Allow-Credentials,
          to allow the response to be received by the client. */
      // credentials: "include",
      credentials: "same-origin",
      /* mode: "cors", This involves sending a preflight OPTIONS request to the server to check whether the server allows the requested access, 
          and then sending the actual request if the server responds with the appropriate CORS headers. */
      mode: "cors",
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res
      .json()
      .then((res) => res.data)
      .catch((err) => null);
  }) as unknown as null | Profile;
};

const RootProviders = async ({ children, modal }: RootProvidersProps) => {
  const user: null | Profile = await getUserProfile();

  return (
    <AppRouterCacheProvider>
      <ReduxProvider>
        <SnackbarProvider>
          <Providers user={user}>
            <SwrProvider>
              {children}
              {modal}
            </SwrProvider>
          </Providers>
        </SnackbarProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );
};

export default RootProviders;
