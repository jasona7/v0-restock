import { type NextRequest, NextResponse } from "next/server"
import { logout } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("sessionId")?.value

    console.log(`API logout request with sessionId: ${sessionId || "none"}`)

    const result = logout(sessionId)

    const response = NextResponse.json(result)

    // Clear the session cookie
    response.cookies.delete("sessionId")

    console.log("API logout successful, cookie deleted")

    return response
  } catch (error) {
    console.error("API logout error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during logout",
      },
      { status: 500 },
    )
  }
}
