import { type NextRequest, NextResponse } from "next/server"
import { getUserBySessionId } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("sessionId")?.value

    console.log(`API me request with sessionId: ${sessionId || "none"}`)

    const user = getUserBySessionId(sessionId)

    if (user) {
      console.log(`API me found user: ${user.email}`)
      return NextResponse.json({ success: true, user })
    }

    console.log("API me no user found")

    return NextResponse.json({ success: false, user: null })
  } catch (error) {
    console.error("API me error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred",
      },
      { status: 500 },
    )
  }
}
