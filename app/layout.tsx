import "styles/globals.scss";

import pageInfo from "utils/page-info";
import RootProviders from "components/providers";
import stylesVariables from "styles/variables.module.scss";

import { Metadata } from "next";
import { Suspense } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { Merienda, Roboto_Slab } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProps } from "interfaces/components/others/layouts.interface";

const merienda = Merienda({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

const { description, keywords, title } = pageInfo.home,
  metadata: Metadata = { description, keywords, title };

const RootLayout = async ({ children, modal }: RootProps) => (
  <html lang="en">
    <head>
      <link rel="icon" href="/icon.ico" type="image/ico" sizes="auto" />
      <link rel="apple-touch-icon" href="/apple-icon.ico" type="image/ico" sizes="auto" />

      <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </head>
    <body className={`${merienda.className}  ${robotoSlab.className}`}>
      <Suspense
        fallback={
          <Stack sx={{ width: "100%", color: stylesVariables.primaryColor }}>
            <LinearProgress color="inherit" />
          </Stack>
        }>
        <RootProviders modal={modal}>{children}</RootProviders>
      </Suspense>

      <SpeedInsights />
    </body>

    {/* Temporarily disabled to improve page speed for search engine */}
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID!} />
  </html>
);

export { metadata, RootLayout as default };
