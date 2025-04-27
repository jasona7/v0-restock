"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, MoreHorizontal, Loader2, AlertCircle } from "lucide-react"
import { useTradeStore } from "@/lib/trade-store"
import type { ParsedTrade } from "@/lib/email-parser"

interface TradeTableProps {
  isEmailConnected: boolean
}

export function TradeTable({ isEmailConnected }: TradeTableProps) {
  const { trades, isLoading, error } = useTradeStore()
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [timePeriod, setTimePeriod] = useState("30")
  const [filteredTrades, setFilteredTrades] = useState<ParsedTrade[]>([])

  // Apply filters and search to trades
  useEffect(() => {
    if (!trades.length) {
      setFilteredTrades([])
      return
    }

    let result = [...trades]

    // Apply type filter
    if (filter === "buy") {
      result = result.filter((trade) => trade.type === "BUY")
    } else if (filter === "sell") {
      result = result.filter((trade) => trade.type === "SELL")
    } else if (filter === "profit") {
      result = result.filter((trade) => trade.potentialProfit && trade.potentialProfit > 0)
    } else if (filter === "loss") {
      result = result.filter((trade) => trade.potentialProfit && trade.potentialProfit < 0)
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (trade) =>
          trade.symbol.toLowerCase().includes(term) ||
          trade.type.toLowerCase().includes(term) ||
          (trade.accountNumber && trade.accountNumber.includes(term)),
      )
    }

    // Apply time period filter
    if (timePeriod !== "all") {
      const daysAgo = Number.parseInt(timePeriod)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

      result = result.filter((trade) => {
        const tradeDate = new Date(trade.expiryDate)
        return tradeDate >= cutoffDate
      })
    }

    setFilteredTrades(result)
  }, [trades, filter, searchTerm, timePeriod])

  // Function to export trades as CSV
  const exportTrades = () => {
    if (!filteredTrades.length) return

    const headers = [
      "Symbol",
      "Type",
      "Price",
      "Quantity",
      "Expiry Date",
      "Status",
      "Account",
      "Broker",
      "Potential P/L",
    ]

    const csvContent = [
      headers.join(","),
      ...filteredTrades.map((trade) =>
        [
          trade.symbol,
          trade.type,
          trade.price,
          trade.quantity,
          trade.expiryDate,
          trade.status,
          trade.accountNumber || "N/A",
          trade.broker || "N/A",
          trade.potentialProfit || 0,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `trade_analysis_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Trade Analysis</h2>
        <p className="text-muted-foreground">View and analyze your expired trades</p>
      </div>

      {!isEmailConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Email</CardTitle>
            <CardDescription>You need to connect your email to view your expired trades</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Go to Email Integration</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search trades..."
                className="w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter("all")}>All Trades</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("buy")}>Buy Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("sell")}>Sell Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("profit")}>Potential Profit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("loss")}>Potential Loss</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={exportTrades} disabled={!filteredTrades.length}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <Card className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Loading trade data...</p>
              </div>
            </Card>
          ) : error ? (
            <Card className="p-6">
              <CardContent className="flex flex-col items-center justify-center space-y-2 pt-6">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-center">{error}</p>
                <Button variant="outline">Retry</Button>
              </CardContent>
            </Card>
          ) : filteredTrades.length === 0 ? (
            <Card className="p-6">
              <CardContent className="flex flex-col items-center justify-center space-y-2 pt-6">
                <p className="text-center">No trades found. Try connecting your email or adjusting your filters.</p>
                <Button variant="outline">Go to Email Integration</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Potential P/L</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="font-medium">{trade.symbol}</TableCell>
                        <TableCell>
                          <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>{trade.type}</Badge>
                        </TableCell>
                        <TableCell>${trade.price.toFixed(2)}</TableCell>
                        <TableCell>{trade.quantity}</TableCell>
                        <TableCell>{trade.expiryDate}</TableCell>
                        <TableCell>{trade.accountNumber ? `...${trade.accountNumber}` : "N/A"}</TableCell>
                        <TableCell
                          className={
                            trade.potentialProfit && trade.potentialProfit > 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          ${Math.abs(trade.potentialProfit || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>What-If Analysis</DropdownMenuItem>
                              <DropdownMenuItem>Check Current Price</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
