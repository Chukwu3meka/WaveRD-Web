import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import AccountsService from "services/accounts.service";

async function goToLogin(destination: string, url: string) {
  // return Response.redirect(new URL(`/accounts/signin?target=${destination}`, url));
  return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, url));
}

async function getUserRole(cookies: any) {
  const accountsService = new AccountsService();

  return await fetch(process.env.API_URL + accountsService.baseUrl + "/profile", {
    /* credentials: "include", tells browser will include credentials in the request,
  The server must respond with the appropriate CORS headers, including:
  Access-Control-Allow-Origin and Access-Control-Allow-Credentials,
  to allow the response to be received by the client. */
    // credentials: "include",
    credentials: "same-origin",
    /* mode: "cors", This involves sending a preflight OPTIONS request to the server to check whether the server allows the requested access,
  and then sending the actual request if the server responds with the appropriate CORS headers. */
    mode: "cors",
    method: "GET",
    cache: "no-store",
    headers: { Cookie: cookies, "Content-Type": "application/json" },
  })
    .then(async (res) => {
      if (!res.ok) return null;

      return res
        .json()
        .then(async (res) => (res.data ? res.data.role : null))
        .catch(async (err) => null);
    })
    .catch(() => null);
}

export async function middleware(request: NextRequest) {
  const url = request.url,
    response = NextResponse.next(),
    destination = new URL(url).pathname,
    cookies = request.cookies.get("SSID");

  try {
    // ? Delete SoccerMASS SSID if it does not have a value
    if (cookies && !cookies.value) request.cookies.delete(["SSID"]);
  } catch (err) {
    return goToLogin(destination, url);
  }

  if (privateRoutes.includes(destination)) {
    const ssidCookie = cookies && cookies.value;
    if (!cookies || !ssidCookie) return goToLogin(destination, url);

    const decoded: any = jwtDecode(ssidCookie);
    if (!decoded || !decoded.session) return goToLogin(destination, url);

    const role = await getUserRole(cookies);

    if (destination.startsWith("/console/") && !["moderator"].includes(role)) {
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
