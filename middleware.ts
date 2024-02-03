import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function goToLogin(destination: string, url: string) {
  return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, url));
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next(),
    cookies = request.cookies.get("SSID"),
    destination = new URL(request.url).pathname;

  // ? Delete SoccerMASS SSID if it does not have a value
  if (cookies && !cookies.value) request.cookies.delete(["SSID"]);

  if (privateRoutes.includes(destination)) {
    const ssidCookie = cookies && cookies.value;

    if (!cookies || !ssidCookie) return goToLogin(destination, request.url);

    jwt.verify(ssidCookie, <string>process.env.JWT_SECRET, async (err: any, decoded: any) => {
      if (err) return goToLogin(destination, request.url);
      if (!decoded) return goToLogin(destination, request.url);

      const { session } = decoded;

      if (session) return response;
    });

    return goToLogin(destination, request.url);
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
