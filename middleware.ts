import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next(),
    destination = new URL(request.url).pathname,
    { name, value } = request.cookies.get("SSID") || {},
    cookie = name && value ? `${name}=${value};` : null;

  if (name && !value) response.cookies.delete("SSID");

  if (privateRoutes.includes(destination)) {
    const goToLogin = () => {
      return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, request.url));
    };

    if (!cookie || !value) return goToLogin();

    jwt.verify(cookie, <string>process.env.JWT_SECRET, async (err: any, decoded: any) => {
      if (err) return goToLogin();
      if (!decoded) return goToLogin();

      const { session } = decoded;

      if (session) return response;
    });

    return goToLogin();
  }

  return response;
}

const privateRoutes = [
  // ? Routes that require authentication
  "/apihub",
];
