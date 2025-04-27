"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface TradingInsightsProps {
  isEmailConnected: boolean
}

export function TradingInsights({ isEmailConnected }: TradingInsightsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Trading Insights</h2>
        <p className="text-muted-foreground">Gain valuable insights into your trading habits and patterns</p>
      </div>

      {!isEmailConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Email</CardTitle>
            <CardDescription>You need to connect your email to view trading insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Go to Email Integration</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Tabs defaultValue="summary" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="symbols">Symbols</TabsTrigger>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                </TabsList>
                <Select defaultValue="30">
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
              </div>

              <TabsContent value="summary">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Expired Trades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+2 since last month</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
                        <div className="h-1 w-[75%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Potential Profit Missed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,245</div>
                      <p className="text-xs text-muted-foreground">Based on current market prices</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
                        <div className="h-1 w-[60%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Most Frequent Symbol</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">AAPL</div>
                      <p className="text-xs text-muted-foreground">5 expired trades</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
                        <div className="h-1 w-[40%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Current Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Based on your trading history</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
                        <div className="h-1 w-[25%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Trading Summary</CardTitle>
                    <CardDescription>Overview of your expired trades and potential outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <h3 className="text-lg font-medium">Expired Trade Distribution</h3>
                          <div className="mt-4 h-40 w-full bg-muted flex items-end justify-around px-2">
                            <div className="relative h-[30%] w-8 bg-primary rounded-t-md">
                              <span className="absolute -top-6 left-0 text-xs">Buy</span>
                              <span className="absolute -bottom-6 left-0 text-xs">30%</span>
                            </div>
                            <div className="relative h-[70%] w-8 bg-primary rounded-t-md">
                              <span className="absolute -top-6 left-0 text-xs">Sell</span>
                              <span className="absolute -bottom-6 left-0 text-xs">70%</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-lg font-medium">Potential Profit vs Loss</h3>
                          <div className="mt-4 h-40 w-full bg-muted flex items-end justify-around px-2">
                            <div className="relative h-[65%] w-8 bg-green-500 rounded-t-md">
                              <span className="absolute -top-6 left-0 text-xs">Profit</span>
                              <span className="absolute -bottom-6 left-0 text-xs">65%</span>
                            </div>
                            <div className="relative h-[35%] w-8 bg-red-500 rounded-t-md">
                              <span className="absolute -top-6 left-0 text-xs">Loss</span>
                              <span className="absolute -bottom-6 left-0 text-xs">35%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Key Insights</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              1
                            </span>
                            <span>
                              You have a pattern of letting profitable trades expire, especially with tech stocks.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              2
                            </span>
                            <span>
                              Most of your expired trades would have been profitable if executed as buy orders.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              3
                            </span>
                            <span>Your expired trades tend to cluster around market volatility periods.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symbols">
                <Card>
                  <CardHeader>
                    <CardTitle>Symbol Analysis</CardTitle>
                    <CardDescription>Breakdown of expired trades by symbol</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className="mr-2">AAPL</Badge>
                            <span className="text-sm font-medium">Apple Inc.</span>
                          </div>
                          <span className="text-sm">5 expired trades</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[45%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Potential profit: $325.50</span>
                          <span>Current price: $175.50</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className="mr-2">MSFT</Badge>
                            <span className="text-sm font-medium">Microsoft Corp.</span>
                          </div>
                          <span className="text-sm">4 expired trades</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Potential profit: $210.25</span>
                          <span>Current price: $310.25</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className="mr-2">TSLA</Badge>
                            <span className="text-sm font-medium">Tesla Inc.</span>
                          </div>
                          <span className="text-sm">3 expired trades</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[25%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Potential profit: $322.00</span>
                          <span>Current price: $250.75</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className="mr-2">AMZN</Badge>
                            <span className="text-sm font-medium">Amazon.com Inc.</span>
                          </div>
                          <span className="text-sm">2 expired trades</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[15%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Potential profit: $178.80</span>
                          <span>Current price: $160.20</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patterns">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Patterns</CardTitle>
                    <CardDescription>Analysis of your trading habits and patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Expiry Timing</h3>
                        <p className="text-sm text-muted-foreground">Your trades tend to expire at specific times</p>
                        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
                          <div className="space-y-2">
                            <div className="text-xs">Mon</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[30%]"></div>
                            </div>
                            <div className="text-xs">30%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Tue</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[15%]"></div>
                            </div>
                            <div className="text-xs">15%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Wed</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[10%]"></div>
                            </div>
                            <div className="text-xs">10%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Thu</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[5%]"></div>
                            </div>
                            <div className="text-xs">5%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Fri</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[25%]"></div>
                            </div>
                            <div className="text-xs">25%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Sat</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[5%]"></div>
                            </div>
                            <div className="text-xs">5%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">Sun</div>
                            <div className="h-20 bg-muted relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary h-[10%]"></div>
                            </div>
                            <div className="text-xs">10%</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Trade Type Patterns</h3>
                        <p className="text-sm text-muted-foreground">Analysis of your trade type preferences</p>
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Buy Orders</span>
                              <span className="text-sm">45%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200">
                              <div className="h-2 w-[45%] rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Sell Orders</span>
                              <span className="text-sm">55%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200">
                              <div className="h-2 w-[55%] rounded-full bg-red-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Key Pattern Insights</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              1
                            </span>
                            <span>You tend to let trades expire more frequently on Mondays and Fridays.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              2
                            </span>
                            <span>You have a slight preference for sell orders over buy orders.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-white text-xs">
                              3
                            </span>
                            <span>Tech stocks make up 75% of your expired trades.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Opportunities</CardTitle>
                    <CardDescription>Potential trade opportunities based on your history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className="bg-green-500">Strong Buy</Badge>
                            <h3 className="mt-2 text-lg font-medium">AAPL - Apple Inc.</h3>
                            <p className="text-sm text-muted-foreground">Current price: $175.50</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Potential Profit</p>
                            <p className="text-lg font-bold text-green-600">+12.5%</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">
                            You've had 5 expired trades for AAPL. Based on current market conditions and your trading
                            history, this represents a strong buying opportunity.
                          </p>
                          <Button className="mt-2 bg-green-600 hover:bg-green-700">View Analysis</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className="bg-blue-500">Moderate Buy</Badge>
                            <h3 className="mt-2 text-lg font-medium">MSFT - Microsoft Corp.</h3>
                            <p className="text-sm text-muted-foreground">Current price: $310.25</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Potential Profit</p>
                            <p className="text-lg font-bold text-blue-600">+8.2%</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">
                            You've had 4 expired trades for MSFT. Current market analysis suggests a moderate buying
                            opportunity.
                          </p>
                          <Button className="mt-2 bg-blue-600 hover:bg-blue-700">View Analysis</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className="bg-amber-500">Hold</Badge>
                            <h3 className="mt-2 text-lg font-medium">TSLA - Tesla Inc.</h3>
                            <p className="text-sm text-muted-foreground">Current price: $250.75</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Potential Profit</p>
                            <p className="text-lg font-bold text-amber-600">+3.1%</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">
                            You've had 3 expired trades for TSLA. Market volatility suggests waiting for a better entry
                            point.
                          </p>
                          <Button className="mt-2 bg-amber-600 hover:bg-amber-700">View Analysis</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}
