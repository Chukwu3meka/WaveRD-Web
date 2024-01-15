"use client";

import muiTheme from "utils/muiTheme";
import { SnackbarProvider } from "notistack";
import { SWRConfig, SWRConfiguration } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import StoreContextProvider from "./StoreContext";
import { setCssThemeVar } from "utils/helpers";
import { useEffect } from "react";

const swrConfigOptions: SWRConfiguration = {};

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setCssThemeVar("dark");

    // Set relative (not sticky) header height
    document.documentElement.style.setProperty("--headerHeight", "77px");
    // --visibleScreen: to fix wrong VH in  iPhone
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`);
  });

  return (
    <StoreContextProvider>
      <ThemeProvider theme={muiTheme("dark")}>
        <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <AppRouterCacheProvider>
          <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
            <SWRConfig value={swrConfigOptions}>{children}</SWRConfig>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </ThemeProvider>
    </StoreContextProvider>
  );
}
