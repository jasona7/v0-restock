import { cookies } from "next/headers"
import type React from "react"
import { requireAuth } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the session ID from the cookie
  const cookieStore = cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  console.log(`Dashboard layout with sessionId: ${sessionId || "none"}`)

  // This will redirect to login if not authenticated
  requireAuth(sessionId)

  return <>{children}</>
}
