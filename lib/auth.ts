import { redirect } from "next/navigation"
import crypto from "crypto"

// In-memory user store
interface User {
  id: string
  name: string
  email: string
  passwordHash: string
}

// In-memory session store
interface Session {
  id: string
  userId: string
  expiresAt: number
}

// Initialize with a demo user
const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    // Password: "password123"
    passwordHash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
  },
]

const sessions: Session[] = []

// Helper functions
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Auth functions
export async function login(email: string, password: string) {
  console.log(`Login attempt for email: ${email}`)

  // Find user
  const user = users.find((u) => u.email === email)

  if (!user) {
    console.log(`User not found for email: ${email}`)
    return { success: false, error: "Invalid email or password" }
  }

  // Check password
  if (user.passwordHash !== hashPassword(password)) {
    console.log(`Invalid password for email: ${email}`)
    return { success: false, error: "Invalid email or password" }
  }

  // Create session
  const sessionId = crypto.randomUUID()
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days

  sessions.push({
    id: sessionId,
    userId: user.id,
    expiresAt,
  })

  console.log(`Login successful for email: ${email}, sessionId: ${sessionId}`)

  return {
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
    sessionId,
  }
}

export async function register(name: string, email: string, password: string) {
  console.log(`Registration attempt for email: ${email}`)

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    console.log(`User already exists for email: ${email}`)
    return { success: false, error: "Email already in use" }
  }

  // Create user
  const userId = crypto.randomUUID()
  const newUser: User = {
    id: userId,
    name,
    email,
    passwordHash: hashPassword(password),
  }

  users.push(newUser)

  // Create session
  const sessionId = crypto.randomUUID()
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days

  sessions.push({
    id: sessionId,
    userId,
    expiresAt,
  })

  console.log(`Registration successful for email: ${email}, sessionId: ${sessionId}`)
  console.log(`Current users: ${users.length}`)

  return {
    success: true,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    sessionId,
  }
}

export function getUserBySessionId(sessionId: string | undefined) {
  if (!sessionId) {
    console.log("No sessionId provided")
    return null
  }

  console.log(`Looking up session: ${sessionId}`)

  // Find session
  const session = sessions.find((s) => s.id === sessionId)

  if (!session) {
    console.log(`Session not found: ${sessionId}`)
    return null
  }

  // Check if session is expired
  if (Date.now() > session.expiresAt) {
    console.log(`Session expired: ${sessionId}`)
    // Remove expired session
    const index = sessions.findIndex((s) => s.id === sessionId)
    if (index !== -1) {
      sessions.splice(index, 1)
    }
    return null
  }

  // Find user
  const user = users.find((u) => u.id === session.userId)

  if (!user) {
    console.log(`User not found for session: ${sessionId}`)
    return null
  }

  console.log(`User found for session: ${sessionId}, email: ${user.email}`)

  return { id: user.id, name: user.name, email: user.email }
}

export function logout(sessionId: string | undefined) {
  if (!sessionId) {
    console.log("No sessionId provided for logout")
    return { success: true }
  }

  console.log(`Logging out session: ${sessionId}`)

  // Remove session
  const index = sessions.findIndex((s) => s.id === sessionId)
  if (index !== -1) {
    sessions.splice(index, 1)
    console.log(`Session removed: ${sessionId}`)
  } else {
    console.log(`Session not found for logout: ${sessionId}`)
  }

  return { success: true }
}

export function requireAuth(sessionId: string | undefined) {
  const user = getUserBySessionId(sessionId)

  if (!user) {
    console.log("Authentication required, redirecting to login")
    redirect("/login")
  }

  return user
}

// Debug function to list all users and sessions
export function debugAuth() {
  return {
    users: users.map((u) => ({ id: u.id, email: u.email, name: u.name })),
    sessions: sessions.map((s) => ({ id: s.id, userId: s.userId, expiresAt: new Date(s.expiresAt).toISOString() })),
  }
}
