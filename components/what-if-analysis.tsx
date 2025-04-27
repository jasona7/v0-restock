"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { useTradeStore } from "@/lib/trade-store"
import type { ParsedTrade } from "@/lib/email-parser"

interface WhatIfAnalysisProps {
  isEmailConnected: boolean
}

export function WhatIfAnalysis({ isEmailConnected }: WhatIfAnalysisProps) {
  const { trades, isLoading } = useTradeStore()
  const [selectedTrade, setSelectedTrade] = useState<ParsedTrade | null>(null)
  const [customPrice, setCustomPrice] = useState("")
  const [whatIfScenarios, setWhatIfScenarios] = useState<
    Array<{
      id: string
      symbol: string
      originalType: string
      originalPrice: number
      quantity: number
      expiryDate: string
      currentPrice: number
      buyScenario: number
      sellScenario: number
      recommendation: string
    }>
  >([])

  // Set the first trade as selected when trades are loaded
  useEffect(() => {
    if (trades.length > 0 && !selectedTrade) {
      setSelectedTrade(trades[0])
    }

    // Calculate what-if scenarios for all trades
    const scenarios = trades.map((trade) => {
      const currentPrice = trade.potentialProfit
        ? trade.type === "BUY"
          ? trade.price + trade.potentialProfit / trade.quantity
          : trade.price - trade.potentialProfit / trade.quantity
        : trade.price * 1.05 // Assume 5% increase if no potential profit data

      const buyScenario = (currentPrice - trade.price) * trade.quantity
      const sellScenario = (trade.price - currentPrice) * trade.quantity

      return {
        id: trade.id,
        symbol: trade.symbol,
        originalType: trade.type,
        originalPrice: trade.price,
        quantity: trade.quantity,
        expiryDate: trade.expiryDate,
        currentPrice,
        buyScenario,
        sellScenario,
        recommendation: buyScenario > sellScenario ? "BUY" : "SELL",
      }
    })

    setWhatIfScenarios(scenarios)
  }, [trades, selectedTrade])

  // Calculate custom price scenarios
  const calculateCustomScenarios = () => {
    if (!selectedTrade || !customPrice || isNaN(Number.parseFloat(customPrice))) return

    const customPriceValue = Number.parseFloat(customPrice)
    const buyScenario = (customPriceValue - selectedTrade.price) * selectedTrade.quantity
    const sellScenario = (selectedTrade.price - customPriceValue) * selectedTrade.quantity

    // Update the what-if scenarios for the selected trade
    setWhatIfScenarios((prev) =>
      prev.map((scenario) =>
        scenario.id === selectedTrade.id
          ? {
              ...scenario,
              currentPrice: customPriceValue,
              buyScenario,
              sellScenario,
              recommendation: buyScenario > sellScenario ? "BUY" : "SELL",
            }
          : scenario,
      ),
    )
  }

  // Get the what-if scenario for the selected trade
  const getSelectedScenario = () => {
    if (!selectedTrade) return null
    return whatIfScenarios.find((scenario) => scenario.id === selectedTrade.id)
  }

  const selectedScenario = getSelectedScenario()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">What-If Analysis</h2>
        <p className="text-muted-foreground">Explore alternative outcomes for your expired trades</p>
      </div>

      {!isEmailConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Email</CardTitle>
            <CardDescription>You need to connect your email to perform What-If analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Go to Email Integration</Button>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <Card className="flex items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading trade data...</p>
          </div>
        </Card>
      ) : trades.length === 0 ? (
        <Card className="p-6">
          <CardContent className="flex flex-col items-center justify-center space-y-2 pt-6">
            <p className="text-center">No trades found. Try connecting your email or searching for trades.</p>
            <Button variant="outline">Go to Email Integration</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Trade</CardTitle>
                <CardDescription>Choose an expired trade to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trade">Expired Trade</Label>
                    <Select
                      value={selectedTrade?.id}
                      onValueChange={(value) => {
                        const trade = trades.find((t) => t.id === value)
                        if (trade) setSelectedTrade(trade)
                      }}
                    >
                      <SelectTrigger id="trade">
                        <SelectValue placeholder="Select a trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {trades.map((trade) => (
                          <SelectItem key={trade.id} value={trade.id}>
                            {trade.symbol} - {trade.type} - Expired {trade.expiryDate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTrade && (
                    <div className="rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Symbol</p>
                          <p className="text-lg font-bold">{selectedTrade.symbol}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Original Order</p>
                          <Badge variant={selectedTrade.type === "BUY" ? "default" : "secondary"}>
                            {selectedTrade.type}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Original Price</p>
                          <p className="text-lg">${selectedTrade.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-lg">{selectedTrade.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Expiry Date</p>
                          <p className="text-lg">{selectedTrade.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Account</p>
                          <p className="text-lg">
                            {selectedTrade.accountNumber ? `...${selectedTrade.accountNumber}` : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What-If Scenarios</CardTitle>
                <CardDescription>Analyze potential outcomes if you had executed the trade</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTrade && selectedScenario && (
                  <Tabs defaultValue="market">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="market">Current Market</TabsTrigger>
                      <TabsTrigger value="custom">Custom Price</TabsTrigger>
                    </TabsList>
                    <TabsContent value="market" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">If you had bought</p>
                              <div className="flex items-center">
                                <p
                                  className={`text-xl font-bold ${selectedScenario.buyScenario > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ${Math.abs(selectedScenario.buyScenario).toFixed(2)}
                                </p>
                                {selectedScenario.buyScenario > 0 ? (
                                  <ArrowUpRight className="ml-1 h-5 w-5 text-green-600" />
                                ) : (
                                  <ArrowDownRight className="ml-1 h-5 w-5 text-red-600" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Based on current price of ${selectedScenario.currentPrice.toFixed(2)}
                              </p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">If you had sold</p>
                              <div className="flex items-center">
                                <p
                                  className={`text-xl font-bold ${selectedScenario.sellScenario > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  ${Math.abs(selectedScenario.sellScenario).toFixed(2)}
                                </p>
                                {selectedScenario.sellScenario > 0 ? (
                                  <ArrowUpRight className="ml-1 h-5 w-5 text-green-600" />
                                ) : (
                                  <ArrowDownRight className="ml-1 h-5 w-5 text-red-600" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Based on current price of ${selectedScenario.currentPrice.toFixed(2)}
                              </p>
                            </div>
                            <TrendingDown className="h-10 w-10 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="rounded-md border p-4 bg-muted/50">
                          <p className="text-sm font-medium">Recommendation</p>
                          <p className="text-lg font-bold">
                            {selectedScenario.recommendation === "BUY" ? (
                              <span className="text-green-600">Consider buying {selectedTrade.symbol}</span>
                            ) : (
                              <span className="text-red-600">Consider selling {selectedTrade.symbol}</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Based on your trading history and current market conditions
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="custom" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="custom-price">Custom Price</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="custom-price"
                            type="number"
                            placeholder="Enter price"
                            value={customPrice}
                            onChange={(e) => setCustomPrice(e.target.value)}
                          />
                          <Button onClick={calculateCustomScenarios}>Calculate</Button>
                        </div>
                      </div>
                      {customPrice && (
                        <div className="rounded-md border p-4 bg-muted/50">
                          <p className="text-sm font-medium">Custom Price Analysis</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>If you had bought:</span>
                              <span className={selectedScenario.buyScenario > 0 ? "text-green-600" : "text-red-600"}>
                                ${Math.abs(selectedScenario.buyScenario).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>If you had sold:</span>
                              <span className={selectedScenario.sellScenario > 0 ? "text-green-600" : "text-red-600"}>
                                ${Math.abs(selectedScenario.sellScenario).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All What-If Scenarios</CardTitle>
              <CardDescription>Compare potential outcomes for all your expired trades</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Original Order</TableHead>
                    <TableHead>Original Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>If Bought</TableHead>
                    <TableHead>If Sold</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatIfScenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">{scenario.symbol}</TableCell>
                      <TableCell>
                        <Badge variant={scenario.originalType === "BUY" ? "default" : "secondary"}>
                          {scenario.originalType}
                        </Badge>
                      </TableCell>
                      <TableCell>${scenario.originalPrice.toFixed(2)}</TableCell>
                      <TableCell>${scenario.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={scenario.buyScenario > 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(scenario.buyScenario).toFixed(2)}
                      </TableCell>
                      <TableCell className={scenario.sellScenario > 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(scenario.sellScenario).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={scenario.recommendation === "BUY" ? "default" : "secondary"}>
                          {scenario.recommendation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
