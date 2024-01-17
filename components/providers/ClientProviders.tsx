"use client";

import muiTheme from "utils/muiTheme";
import { SnackbarProvider } from "notistack";
import { useStoreContext } from "./StoreContext";
import { SWRConfig, SWRConfiguration } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";

const swrConfigOptions: SWRConfiguration = {};

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { theme } = useStoreContext().layout;

  return (
    <ThemeProvider theme={muiTheme(theme)}>
      <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <SWRConfig value={swrConfigOptions}>{children}</SWRConfig>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
