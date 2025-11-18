import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  // console.log("Middleware - Token:", token);
  // console.log("Middleware - Pathname:", request.nextUrl.pathname);
  if (!token && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token) {
    const role = request.cookies.get("role")?.value;
    const { pathname } = request.nextUrl;
    if (
      role === "HSE" &&
      (pathname.startsWith("/kepala") ||
        pathname.startsWith("/direktur") ||
        pathname === "/login" ||
        pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/hse/dashboard", request.url));
    }
    if (
      role === "Kepala Bagian" &&
      (pathname.startsWith("/hse") ||
        pathname.startsWith("/direktur" || pathname === "/login" || pathname === "/register"))
    ) {
      return NextResponse.redirect(new URL("/kepala/dashboard", request.url));
    }
    if (
      role === "Direktur" &&
      (pathname.startsWith("/hse") ||
        pathname.startsWith("/kepala") ||
        pathname === "/login" ||
        pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/direktur/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/hse/:path*",
    "/kepala/:path*",
    "/direktur/:path*",
    "/login",
    "/register",
  ],
};
