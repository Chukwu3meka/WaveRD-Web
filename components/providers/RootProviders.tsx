import service from "services/service";
import AccountsService from "services/accounts.service";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { SnackbarProvider, ReduxProvider, Providers } from ".";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { RootProvidersProps } from "interfaces/components/others/providers.interface";

const getUserProfile = async (): Promise<null | Profile> => {
  const cookieStore = cookies(),
    accountsService = new AccountsService(),
    ssidCookie = cookieStore.get("SSID");

  if (!ssidCookie || !ssidCookie.value) return null;
  const decoded: any = jwtDecode(ssidCookie.value);
  if (!decoded || !decoded.session) return null;

  service.interceptors.request.use((config) => {
    config.headers.Cookie = `SSID=${ssidCookie.value}`;
    return config;
  });

  return await accountsService
    .getProfile()
    .then(async (res) => {
      return res.data;
    })
    .catch(() => null);
};

const RootProviders = async ({ children, modal }: RootProvidersProps) => {
  const user: null | Profile = await getUserProfile();

  return (
    <AppRouterCacheProvider>
      <ReduxProvider>
        <SnackbarProvider>
          <Providers user={user}>
            {children}
            {modal}
          </Providers>
        </SnackbarProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );
};

export default RootProviders;
