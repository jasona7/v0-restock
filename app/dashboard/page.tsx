"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LayoutDashboard, Mail, Settings, LogOut, PieChart, LineChart, Filter } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmailIntegration } from "@/components/email-integration"
import { TradeTable } from "@/components/trade-table"
import { WhatIfAnalysis } from "@/components/what-if-analysis"
import { TradingInsights } from "@/components/trading-insights"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEmailConnected, setIsEmailConnected] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="font-bold">TradeAnalyzer</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Link
                href="#"
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "overview" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="#"
                onClick={() => setActiveTab("email")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "email" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <Mail className="h-4 w-4" />
                Email Integration
              </Link>
              <Link
                href="#"
                onClick={() => setActiveTab("trades")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "trades" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <BarChart className="h-4 w-4" />
                Trade Analysis
              </Link>
              <Link
                href="#"
                onClick={() => setActiveTab("whatif")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "whatif" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <LineChart className="h-4 w-4" />
                What-If Analysis
              </Link>
              <Link
                href="#"
                onClick={() => setActiveTab("insights")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "insights" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <PieChart className="h-4 w-4" />
                Trading Insights
              </Link>
              <Link
                href="#"
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  activeTab === "settings" ? "bg-gray-200 dark:bg-gray-800" : "opacity-70"
                } transition-all hover:opacity-100`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <DashboardShell>
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
                <p className="text-muted-foreground">Here's an overview of your expired trades and analysis</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expired Trades</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{isEmailConnected ? "24" : "0"}</div>
                    <p className="text-xs text-muted-foreground">
                      {isEmailConnected ? "+2 since last month" : "Connect your email to see data"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Potential Profit Missed</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{isEmailConnected ? "$1,245" : "$0"}</div>
                    <p className="text-xs text-muted-foreground">
                      {isEmailConnected ? "Based on current market prices" : "Connect your email to see data"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Most Frequent Symbol</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{isEmailConnected ? "AAPL" : "N/A"}</div>
                    <p className="text-xs text-muted-foreground">
                      {isEmailConnected ? "5 expired trades" : "Connect your email to see data"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Opportunities</CardTitle>
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{isEmailConnected ? "3" : "0"}</div>
                    <p className="text-xs text-muted-foreground">
                      {isEmailConnected ? "Based on your trading history" : "Connect your email to see data"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>Connect your email to start analyzing your expired trades</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-8 w-8" />
                      <div>
                        <p className="text-sm font-medium leading-none">Email Integration</p>
                        <p className="text-sm text-muted-foreground">Connect to analyze expired trade emails</p>
                      </div>
                    </div>
                    <Button onClick={() => setActiveTab("email")}>{isEmailConnected ? "Manage" : "Connect"}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "email" && (
            <EmailIntegration isConnected={isEmailConnected} onConnect={() => setIsEmailConnected(true)} />
          )}

          {activeTab === "trades" && <TradeTable isEmailConnected={isEmailConnected} />}

          {activeTab === "whatif" && <WhatIfAnalysis isEmailConnected={isEmailConnected} />}

          {activeTab === "insights" && <TradingInsights isEmailConnected={isEmailConnected} />}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <div className="rounded-md border p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>{user?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Account Type:</span>
                        <span>Free Plan</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Email Integration</h3>
                  <p className="text-sm text-muted-foreground">Manage your email connection settings</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("email")}>
                      Manage Email Integration
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Account Settings</h3>
                  <p className="text-sm text-muted-foreground">Update your account information</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">Notification Settings</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </DashboardShell>
      </div>
    </div>
  )
}
