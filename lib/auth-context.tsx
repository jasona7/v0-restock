"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()

        if (data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}
