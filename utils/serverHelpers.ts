import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getUserCookies = async (): Promise<string | null> => {
  "use server";

  const cookieStore = cookies(),
    ssidCookie = cookieStore.get("SSID");

  if (!ssidCookie || !ssidCookie.value) return null;
  const decoded: any = jwtDecode(ssidCookie.value);
  if (!decoded || !decoded.session) return null;

  return `SSID=${ssidCookie.value}`;
};
