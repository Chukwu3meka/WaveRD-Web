import "styles/globals.scss";
import pageInfo from "utils/page-info";
import stylesVariables from "styles/variables.module.scss";

import { Metadata } from "next";
import { baseServiceUrl } from "services/index";
import { RootProviders } from "components/providers";
import { LinearProgress, Stack } from "@mui/material";
import { Merienda, Roboto_Slab } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ReactChildren } from "interfaces/components/shared.interface";

const merienda = Merienda({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

async function getUserProfile() {
  const res = await fetch(process.env.API_URL + baseServiceUrl.accountsService + "/profile", {
    headers: { "Content-Type": "application/json" },
    /* credentials: "include", tells browser will include credentials in the request, 
       The server must respond with the appropriate CORS headers, including:
       Access-Control-Allow-Origin and Access-Control-Allow-Credentials,
       to allow the response to be received by the client. */
    credentials: "include",
    /* mode: "cors", This involves sending a preflight OPTIONS request to the server to check whether the server allows the requested access, 
       and then sending the actual request if the server responds with the appropriate CORS headers. */
    mode: "cors",
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function RootLayout({ children }: ReactChildren) {
  let initializing = true;

  const profile = await getUserProfile()
    .then((data) => data)
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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID!} />
    </html>
  );
}
