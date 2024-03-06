"use client";

import ProvidersContainer from ".";
import appStore from "../../redux-store/reduxStore";

import { Zoom } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { SWRConfig, SWRConfiguration } from "swr";
import { Provider as ReduxProvider } from "react-redux";
import { RootProviders } from "interfaces/components/providers.interface";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const swrConfigOptions: SWRConfiguration = {},
  RootProviders = ({ children, user }: RootProviders) => (
    <AppRouterCacheProvider>
      <ReduxProvider store={appStore}>
        <SnackbarProvider TransitionComponent={Zoom} maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <ProvidersContainer user={user}>
            <SWRConfig value={swrConfigOptions}>{children}</SWRConfig>
          </ProvidersContainer>
        </SnackbarProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );

export default RootProviders;
