import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function PricingPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Select the plan that best fits your trading analysis needs
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8 lg:gap-12">
              {/* Free Tier */}
              <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 justify-between border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-2xl font-bold text-center">Free</h3>
                  <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                    <span className="text-4xl font-bold text-black dark:text-white">$0</span>/ month
                  </div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Basic email integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Up to 50 trades analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Basic what-if analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>7-day data history</span>
                    </li>
                    <li className="flex items-center">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span className="text-gray-400">Multi-account support</span>
                    </li>
                    <li className="flex items-center">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span className="text-gray-400">Advanced trading insights</span>
                    </li>
                    <li className="flex items-center">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span className="text-gray-400">Real-time market data</span>
                    </li>
                    <li className="flex items-center">
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span className="text-gray-400">Email notifications</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 justify-between border-2 border-primary">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-center">Pro</h3>
                  <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                    <span className="text-4xl font-bold text-black dark:text-white">$6.99</span>/ month
                  </div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Advanced email integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Unlimited trades analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Advanced what-if analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Unlimited data history</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Multi-account support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Advanced trading insights</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Real-time market data</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Email notifications</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button className="w-full">Subscribe Now</Button>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold text-center">Detailed Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border px-4 py-2 text-left">Feature</th>
                      <th className="border px-4 py-2 text-center">Free</th>
                      <th className="border px-4 py-2 text-center">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Email Integration</td>
                      <td className="border px-4 py-2 text-center">Basic (1 account)</td>
                      <td className="border px-4 py-2 text-center">Advanced (Multiple accounts)</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Trade Analysis</td>
                      <td className="border px-4 py-2 text-center">Up to 50 trades</td>
                      <td className="border px-4 py-2 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">What-If Analysis</td>
                      <td className="border px-4 py-2 text-center">Basic scenarios</td>
                      <td className="border px-4 py-2 text-center">Advanced scenarios with AI recommendations</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Data History</td>
                      <td className="border px-4 py-2 text-center">7 days</td>
                      <td className="border px-4 py-2 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Multi-Account Support</td>
                      <td className="border px-4 py-2 text-center">
                        <X className="inline h-5 w-5 text-red-500" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <Check className="inline h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Trading Insights</td>
                      <td className="border px-4 py-2 text-center">Basic</td>
                      <td className="border px-4 py-2 text-center">Advanced with pattern recognition</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Market Data</td>
                      <td className="border px-4 py-2 text-center">Delayed (15 min)</td>
                      <td className="border px-4 py-2 text-center">Real-time</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Email Notifications</td>
                      <td className="border px-4 py-2 text-center">
                        <X className="inline h-5 w-5 text-red-500" />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <Check className="inline h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Export Options</td>
                      <td className="border px-4 py-2 text-center">CSV only</td>
                      <td className="border px-4 py-2 text-center">CSV, PDF, Excel</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-medium">Customer Support</td>
                      <td className="border px-4 py-2 text-center">Email only</td>
                      <td className="border px-4 py-2 text-center">Priority email and chat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">Can I upgrade from Free to Pro?</h3>
                  <p className="mt-2 text-gray-500">
                    Yes, you can upgrade at any time and immediately access all Pro features.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">Is there a contract or commitment?</h3>
                  <p className="mt-2 text-gray-500">No, the Pro plan is billed monthly and you can cancel anytime.</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">Do you offer a free trial of Pro?</h3>
                  <p className="mt-2 text-gray-500">Yes, we offer a 14-day free trial of all Pro features.</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">What payment methods do you accept?</h3>
                  <p className="mt-2 text-gray-500">We accept all major credit cards and PayPal.</p>
                </div>
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
