import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/login/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};