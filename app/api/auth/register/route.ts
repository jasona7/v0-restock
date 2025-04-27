import { type NextRequest, NextResponse } from "next/server"
import { register } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log(`API register attempt for email: ${email}`)

    const result = await register(name, email, password)

    if (result.success) {
      const response = NextResponse.json(result)

      // Set the session cookie
      response.cookies.set({
        name: "sessionId",
        value: result.sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        sameSite: "lax",
      })

      console.log(`API register successful, setting cookie: ${result.sessionId}`)

      return response
    }

    console.log(`API register failed: ${result.error}`)

    return NextResponse.json(result)
  } catch (error) {
    console.error("API register error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during registration",
      },
      { status: 500 },
    )
  }
}
