import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSession } from "./auth/server";

const isPublic = ["/sign-in", "/sign-up"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authContext = await getSession();
  const { pathname } = request.nextUrl;

  if (!authContext && !isPublic.includes(pathname))
    return NextResponse.redirect(
      new URL(`/sign-in?redirect_url=${request.nextUrl.href}`, request.url),
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
