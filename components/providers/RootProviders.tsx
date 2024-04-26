import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { RootProvidersProps } from "interfaces/components/providers.interface";
import { SwrProvider, SnackbarProvider, ReduxProvider, ProvidersContainer } from ".";

const RootProviders = ({ children, user, modal }: RootProvidersProps) => (
  <AppRouterCacheProvider>
    <ReduxProvider>
      <SnackbarProvider>
        <ProvidersContainer user={user}>
          <SwrProvider>
            {children}
            {modal}
          </SwrProvider>
        </ProvidersContainer>
      </SnackbarProvider>
    </ReduxProvider>
  </AppRouterCacheProvider>
);

export default RootProviders;
