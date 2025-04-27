import { type NextRequest, NextResponse } from "next/server"
import { debugAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const debug = debugAuth()

    return NextResponse.json({
      success: true,
      debug,
      cookies: Object.fromEntries(request.cookies.getAll().map((c) => [c.name, c.value])),
    })
  } catch (error) {
    console.error("API debug error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred",
      },
      { status: 500 },
    )
  }
}
