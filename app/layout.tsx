import "styles/globals.scss";

import jwt from "jsonwebtoken";
import pageInfo from "utils/page-info";
import stylesVariables from "styles/variables.module.scss";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { baseServiceUrl } from "services/index";
import { RootProviders } from "components/providers";
import { LinearProgress, Stack } from "@mui/material";
import { Merienda, Roboto_Slab } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { ReactChildren } from "interfaces/components/shared.interface";

const merienda = Merienda({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

const getUserProfile = async (): Promise<null | Profile> => {
  const cookieStore = cookies(),
    ssidCookie = cookieStore.get("SSID");

  const deleteCookie = (status: boolean) => {
    // ? Delete SoccerMASS SSID if it does not have a value
    if (status) cookies().delete("SSID");

    // throw { message: "Invalid Credentials" };
    return null;
  };

  if (!ssidCookie || !ssidCookie.value) return deleteCookie(true);

  return jwt.verify(ssidCookie.value, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if (err) return deleteCookie(false);
    if (!decoded) return deleteCookie(false);

    const { session } = decoded;
    if (!session) return deleteCookie(false);

    const res = await fetch(process.env.API_URL + baseServiceUrl.accountsService + "/profile", {
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

    // if (!res.ok) throw await res.json();
    if (!res.ok) return null;

    return res
      .json()
      .then((res) => res.data)
      .catch((error) => null);
  }) as unknown as null | Profile;
};

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function RootLayout({ children }: ReactChildren) {
  let initializing = true;

  const profile: null | Profile = await getUserProfile()
    .then((res) => res)
    .catch((err) => null)
    .finally(() => (initializing = false));

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
      </head>
      <body className={`${merienda.className}  ${robotoSlab.className}`}>
        {initializing ? (
          <Stack sx={{ width: "100%", color: stylesVariables.primaryColor }}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : (
          <RootProviders user={profile}>{children}</RootProviders>
        )}

        <SpeedInsights />
      </body>

      {/* Temporarily disabled to improve page speed for search engine */}
      {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID!} /> */}
    </html>
  );
}
