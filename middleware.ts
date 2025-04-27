import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the session ID from the cookie
  const sessionId = request.cookies.get("sessionId")?.value

  console.log(`Middleware for ${request.nextUrl.pathname}, sessionId: ${sessionId || "none"}`)

  // Check if the request is for the dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // If no session ID, redirect to login
    if (!sessionId) {
      console.log("Middleware redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
