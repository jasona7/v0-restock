import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, PieChart, Mail, RefreshCw, Bell, Zap, Database, Users, TrendingUp } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">TradeAnalyzer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Powerful Features for Traders
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover how TradeAnalyzer can help you learn from your expired trades and make better trading
                  decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/pricing">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input px-8"
                  >
                    Try for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Core Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform offers powerful tools to analyze your trading history
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary p-3 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Email Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Securely connect to your email to analyze expired trade notifications from brokers like Charles
                    Schwab.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary p-3 text-white">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">What-If Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Simulate alternative outcomes for your expired trades and discover missed opportunities.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary p-3 text-white">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Trading Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gain valuable insights into your trading habits, patterns, and potential improvements.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Email Integration</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Connect your email account to automatically analyze expired trade notifications. We support major
                    brokers including Charles Schwab.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Secure OAuth integration with major email providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Automatic detection of trade notification emails</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Privacy-focused with limited access to only relevant emails</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Support for multiple email accounts (Pro plan)</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">Email Integration</h3>
                    <p className="text-sm text-gray-500">Connect your email to analyze expired trades</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Provider</label>
                      <div className="h-10 w-full rounded-md border bg-gray-100"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="h-10 w-full rounded-md border bg-gray-100"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 rounded border bg-gray-100"></div>
                      <label className="text-sm">I give permission to scan my inbox for trade emails</label>
                    </div>
                    <div className="h-10 w-full rounded-md bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex items-center justify-center order-2 lg:order-1">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">What-If Analysis</h3>
                    <p className="text-sm text-gray-500">Explore alternative outcomes for your expired trades</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">If you had bought:</p>
                          <p className="text-xl font-bold text-green-600">+$252.50</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">If you had sold:</p>
                          <p className="text-xl font-bold text-red-600">-$152.50</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <LineChart className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4 bg-gray-100 rounded-md">
                        <p className="text-sm font-medium">Recommendation:</p>
                        <p className="text-green-600 font-bold">Consider buying AAPL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What-If Analysis</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Explore alternative outcomes for your expired trades and learn from missed opportunities.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Calculate potential profit/loss scenarios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Compare buy vs. sell outcomes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Receive AI-powered recommendations (Pro plan)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Simulate custom price scenarios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trading Insights</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Gain valuable insights into your trading habits and patterns to improve your future trading
                    decisions.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Visualize trading patterns and trends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Identify your most profitable symbols</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Analyze trading frequency and timing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Discover potential trading opportunities</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">Trading Insights</h3>
                    <p className="text-sm text-gray-500">Analyze your trading patterns</p>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium">Total Expired Trades</p>
                      <p className="text-2xl font-bold">24</p>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 w-3/4 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium">Most Frequent Symbol</p>
                      <p className="text-2xl font-bold">AAPL</p>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 w-2/3 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium">Potential Profit Missed</p>
                      <p className="text-2xl font-bold">$1,245</p>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 w-1/2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium">Current Opportunities</p>
                      <p className="text-2xl font-bold">3</p>
                      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 w-1/4 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Additional Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore more powerful tools to enhance your trading analysis
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get real-time market data updates for your analyzed trades (Pro plan).
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Bell className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive alerts for new trading opportunities based on your history (Pro plan).
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Database className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Data Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Export your trade data and analysis in multiple formats for further analysis.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Multi-Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Analyze trades across multiple brokerage accounts in one place (Pro plan).
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Choose the plan that's right for you and start analyzing your trades today.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/pricing">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input px-8"
                  >
                    Try for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 TradeAnalyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
