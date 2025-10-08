import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req) {
  const res = intlMiddleware(req);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Detect locale (e.g., /bn/dashboard → locale = 'bn')
  const localeMatch = pathname.match(/^\/(en|bn|fr)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";

  // Remove locale prefix for easier checks
  const pathWithoutLocale = localeMatch
    ? pathname.replace(`/${locale}`, "")
    : pathname;

  // 🔒 Handle banned users
  if (token?.isBanned && !pathWithoutLocale.startsWith("/banned")) {
    const bannedUrl = req.nextUrl.clone();
    bannedUrl.pathname = `/${locale}/banned`;
    return NextResponse.redirect(bannedUrl);
  }

  // 🔒 Protect admin routes (only require login)
  if (pathWithoutLocale.startsWith("/admin") && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  // 🔒 Protect dashboard routes (locale-aware)
  if (pathWithoutLocale.startsWith("/dashBoard") && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/(bn|en|fr)/:path*", // locales handled
    "/admin/:path*",
    "/dashBoard/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
