import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /staff/dashboard routes
  if (request.nextUrl.pathname.startsWith("/staff/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/staff/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/staff/login") {
    if (session) {
      const dashboardUrl = new URL("/staff/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ["/staff/:path*"],
};
