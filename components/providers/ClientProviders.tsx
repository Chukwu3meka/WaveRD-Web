"use client";

import { Zoom } from "@mui/material";
import muiTheme from "utils/muiTheme";
import { ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";
import { useStoreContext } from "./StoreContext";
import { SWRConfig, SWRConfiguration } from "swr";
import GlobalLayout from "components/layouts/global";

import { ReactChildren } from "interfaces/components/shared.interface";

const swrConfigOptions: SWRConfiguration = {};

export default function ClientProviders({ children }: ReactChildren) {
  const { theme } = useStoreContext().layout;

  return (
    <ThemeProvider theme={muiTheme(theme)}>
      <SnackbarProvider TransitionComponent={Zoom} maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <SWRConfig value={swrConfigOptions}>
          <GlobalLayout>{children}</GlobalLayout>
        </SWRConfig>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
