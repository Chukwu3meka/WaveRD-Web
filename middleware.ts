import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function goToLogin(destination: string, url: string) {
  return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, url));
  // return Response.redirect(new URL(`/accounts/signin?target=${destination}`, url));
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

    jwt.verify(ssidCookie, <string>process.env.JWT_SECRET, async (err: any, decoded: any) => {
      if (err) return goToLogin(destination, url);
      if (!decoded) return goToLogin(destination, url);

      const { session } = decoded;

      if (session) return response;
    });

    return goToLogin(destination, url);
  }

  return response;
}

// ? Use this else maiddleware will apply to even files in /public, etc
export const config = {
  matcher: [
    "/",
    "/info/:path*",
    "/accounts/:path*",
    // "/apihub/:path*",
  ],
};

const privateRoutes = [
  // ? Routes that require authentication
  "/apihub",
];
