"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Mail, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useTradeStore } from "@/lib/trade-store"

interface EmailIntegrationProps {
  isConnected: boolean
  onConnect: () => void
}

export function EmailIntegration({ isConnected, onConnect }: EmailIntegrationProps) {
  const [provider, setProvider] = useState("gmail")
  const [emailAddress, setEmailAddress] = useState("")
  const [consentGiven, setConsentGiven] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [searchCriteria, setSearchCriteria] = useState("all")
  const [symbol, setSymbol] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [emailsFetched, setEmailsFetched] = useState(0)
  const [tradesParsed, setTradesParsed] = useState(0)

  const { setTrades, setLoading, setError } = useTradeStore()
  const { toast } = useToast()

  const handleConnect = async () => {
    if (!emailAddress || !consentGiven) {
      toast({
        title: "Missing information",
        description: "Please provide your email address and consent to proceed.",
        variant: "destructive",
      })
      return
    }

    setConnecting(true)

    try {
      // In a real app, this would authenticate with the email provider
      // For demo purposes, we'll simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onConnect()
      toast({
        title: "Email connected successfully",
        description: "Your email account has been connected. You can now search for trade emails.",
      })
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to your email account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  const handleSearch = async () => {
    if (!isConnected) {
      toast({
        title: "Email not connected",
        description: "Please connect your email account first.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setLoading(true)
    setError(null)

    try {
      // Prepare search criteria
      const criteria: any = {}

      if (searchCriteria === "symbol" && symbol) {
        criteria.symbol = symbol
      }

      if (searchCriteria === "date" && startDate && endDate) {
        criteria.dateRange = {
          start: startDate,
          end: endDate,
        }
      }

      // Fetch emails
      const emailResponse = await fetch("/api/fetch-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          email: emailAddress,
          criteria,
        }),
      })

      if (!emailResponse.ok) {
        throw new Error("Failed to fetch emails")
      }

      const emailData = await emailResponse.json()
      setEmailsFetched(emailData.emails.length)

      // Parse emails
      const parseResponse = await fetch("/api/parse-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: emailData.emails,
          filterSymbol: searchCriteria === "symbol" ? symbol : undefined,
          dateRange: searchCriteria === "date" ? { start: startDate, end: endDate } : undefined,
        }),
      })

      if (!parseResponse.ok) {
        throw new Error("Failed to parse emails")
      }

      const parseData = await parseResponse.json()
      setTradesParsed(parseData.trades.length)
      setTrades(parseData.trades)

      toast({
        title: "Search completed",
        description: `Found ${emailData.emails.length} emails and extracted ${parseData.trades.length} trades.`,
      })
    } catch (error) {
      console.error("Search error:", error)
      setError("Failed to search and parse emails")
      toast({
        title: "Search failed",
        description: "An error occurred while searching for trade emails.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Email Integration</h2>
        <p className="text-muted-foreground">Connect your email to analyze expired trade notifications</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          We only scan for emails with the subject line &quot;Your expired instructions summary is ready to view.&quot;
          Your privacy is our priority.
        </AlertDescription>
      </Alert>

      {isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Connected Email Account
            </CardTitle>
            <CardDescription>
              Your email account is connected and we are analyzing your trade notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Connected Account</Label>
              <div className="rounded-md border p-3">
                <div className="font-medium">{emailAddress || "user@example.com"}</div>
                <div className="text-sm text-muted-foreground">{provider === "gmail" ? "Gmail" : provider}</div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Auto-Sync</span>
                <Switch defaultChecked />
              </Label>
              <p className="text-sm text-muted-foreground">Automatically sync new expired trade emails</p>
            </div>

            {emailsFetched > 0 && (
              <div className="rounded-md border p-3 bg-muted/50">
                <p className="text-sm">Last search results:</p>
                <p className="text-sm">
                  <span className="font-medium">{emailsFetched}</span> emails found,
                  <span className="font-medium"> {tradesParsed}</span> trades extracted
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setTrades([])
                setEmailsFetched(0)
                setTradesParsed(0)
              }}
            >
              Clear Data
            </Button>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Sync Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Email</CardTitle>
            <CardDescription>We need your permission to scan for expired trade notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-provider">Email Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger id="email-provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail</SelectItem>
                  <SelectItem value="outlook">Outlook</SelectItem>
                  <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="consent" checked={consentGiven} onCheckedChange={setConsentGiven} />
              <Label htmlFor="consent" className="text-sm">
                I give permission to scan my inbox for emails with the subject line &quot;Your expired instructions
                summary is ready to view.&quot;
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnect} disabled={!consentGiven || connecting}>
              {connecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Email"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Email Search Options</CardTitle>
          <CardDescription>Configure how we search for expired trade emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Search Criteria</Label>
            <Tabs defaultValue="all" value={searchCriteria} onValueChange={setSearchCriteria}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Trades</TabsTrigger>
                <TabsTrigger value="symbol">By Symbol</TabsTrigger>
                <TabsTrigger value="date">Date Range</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">Search for all expired trade emails in your inbox</p>
                <Button disabled={!isConnected || isSearching} onClick={handleSearch}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search All"
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="symbol" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., AAPL, MSFT, TSLA"
                    disabled={!isConnected}
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
                <Button disabled={!isConnected || !symbol || isSearching} onClick={handleSearch}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search by Symbol"
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="date" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      disabled={!isConnected}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      disabled={!isConnected}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button disabled={!isConnected || !startDate || !endDate || isSearching} onClick={handleSearch}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search by Date"
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
