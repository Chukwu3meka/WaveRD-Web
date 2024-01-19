"use client";

import muiTheme from "utils/muiTheme";
import { useStoreContext } from "./StoreContext";
import { SWRConfig, SWRConfiguration } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactChildren } from "interfaces/components/shared.interface";

const swrConfigOptions: SWRConfiguration = {};

export default function ClientProviders({ children }: ReactChildren) {
  const { theme } = useStoreContext().layout;

  return (
    <ThemeProvider theme={muiTheme(theme)}>
      <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <SWRConfig value={swrConfigOptions}>{children}</SWRConfig>
    </ThemeProvider>
  );
}
