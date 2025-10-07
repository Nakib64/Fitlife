import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req) {
  // next-intl middleware
  const intlResponse = await intlMiddleware(req);
  if (intlResponse) return intlResponse;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // banned users
  if (token?.isBanned) {
    const url = req.nextUrl.clone();
    url.pathname = "/banned";
    return NextResponse.redirect(url);
  }

  // admin role check (optional)
  if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  // dashboard login check
  if (req.nextUrl.pathname.startsWith("/dashBoard") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashBoard/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
