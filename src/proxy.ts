import { NextResponse, type NextRequest } from "next/server";
// Keep established English URLs public; /en is only an internal routing prefix.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (/^\/en(?:\/|$)/.test(url.pathname)) {
    url.pathname = url.pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }
  if (/^\/es(?:\/|$)/.test(url.pathname)) return NextResponse.next();
  url.pathname = `/en${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}
export const config = {
  matcher: [
    "/((?!_next/|images/|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)",
  ],
};
