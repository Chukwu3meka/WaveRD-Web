import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FETCH_OPTIONS } from "utils/constants";
import { accountsServiceUrl } from "services/index";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { RootProvidersProps } from "interfaces/components/others/providers.interface";
import { SnackbarProvider, ReduxProvider, Providers } from ".";

const getUserProfile = async (): Promise<null | Profile> => {
  const cookieStore = cookies(),
    ssidCookie = cookieStore.get("SSID");

  if (!ssidCookie || !ssidCookie.value) return null;

  const decoded: any = jwtDecode(ssidCookie.value);
  if (!decoded || !decoded.session) return null;

  const res = await fetch(process.env.API_URL + accountsServiceUrl + "/profile", {
    ...FETCH_OPTIONS,
    headers: { Cookie: cookies().toString(), "Content-Type": "application/json" },
  });

  if (!res.ok) return null;

  return res
    .json()
    .then((res) => res.data)
    .catch((err) => null);
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
