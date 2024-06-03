import { Profile } from "interfaces/redux-store/account.interfaces";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import AccountsService from "services/accounts.service";
import { cookieInterceptor } from "services/service";

export const getUserCookies = async (): Promise<string | null> => {
  "use server";

  const cookieStore = cookies(),
    ssidCookie = cookieStore.get("SSID");

  if (!ssidCookie || !ssidCookie.value) return null;
  const decoded: any = jwtDecode(ssidCookie.value);
  if (!decoded || !decoded.session) return null;

  return `SSID=${ssidCookie.value}`;
};

export const getUserProfile = async (): Promise<null | Profile> => {
  "use server";

  const cookie = await getUserCookies(),
    accountsService = new AccountsService();

  if (!cookie) return null;

  cookieInterceptor(cookie);

  return await accountsService.getProfile().then(({ success, data }) => {
    if (success) return data;
    return null;
  });
};
