import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("addis-eats-session")?.value;
  if (!token) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  // Middleware is the first gate. Server pages and actions verify the signed session again.
  return NextResponse.next();
}

export const config = { matcher: ["/orders/:path*", "/checkout/:path*"] };
