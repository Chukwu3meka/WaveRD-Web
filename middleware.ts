import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { FETCH_OPTIONS } from "utils/constants";
import { accountsServiceUrl } from "./services";

function goToLogin(destination: string, url: string) {
  // return Response.redirect(new URL(`/accounts/signin?target=${destination}`, url));
  return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, url));
}

async function getUserRole(cookies: any) {
  return await fetch(process.env.API_URL + accountsServiceUrl + "/profile", {
    ...FETCH_OPTIONS,
    headers: { Cookie: cookies, "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) return null;

      return res
        .json()
        .then((res) => (res.data ? res.data.role : null))
        .catch((err) => null);
    })
    .catch(() => null);
}

export async function middleware(request: NextRequest) {
  const url = request.url,
    response = NextResponse.next(),
    destination = new URL(url).pathname,
    cookies = request.cookies.get("SSID");

  // ? Delete SoccerMASS SSID if it does not have a value
  if (cookies && !cookies.value) request.cookies.delete(["SSID"]);

  if (privateRoutes.includes(destination)) {
    const ssidCookie = cookies && cookies.value;
    if (!cookies || !ssidCookie) return goToLogin(destination, url);

    const decoded: any = jwtDecode(ssidCookie);
    if (!decoded || !decoded.session) return goToLogin(destination, url);

    const role = await getUserRole(cookies);

    if (destination.startsWith("/console/moderator") && !["moderator"].includes(role)) {
      return goToLogin(destination, url);
    } else {
      return response;
    }
  }

  return response;
}

// ? Use this else middleware will apply to even files in /public, etc
export const config = {
  matcher: ["/", "/info/:path*", "/accounts/:path*", "/console/:path*"],
};

// ? Routes that require authentication
const privateRoutes = ["/apihub", "/console"];
