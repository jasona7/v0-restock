import { type NextRequest, NextResponse } from "next/server"
import { processEmail, calculatePotentialProfit, type ParsedTrade } from "@/lib/email-parser"

// Mock function to fetch current market prices
// In a real app, this would call a financial API
async function fetchCurrentPrice(symbol: string): Promise<number> {
  // Mock prices for demonstration
  const mockPrices: Record<string, number> = {
    AAPL: 175.5,
    MSFT: 420.75,
    TSLA: 250.3,
    AMZN: 180.25,
    GOOGL: 145.6,
    OMEX: 1.26,
    // Add more symbols as needed
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Return the mock price or a slightly higher price to simulate market movement
  const basePrice = mockPrices[symbol] || 100.0
  const randomFactor = 1 + (Math.random() * 0.1 - 0.05) // Random factor between 0.95 and 1.05
  return basePrice * randomFactor
}

export async function POST(request: NextRequest) {
  try {
    const { emails, filterSymbol, dateRange } = await request.json()

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json({ error: "Invalid request. Emails array is required." }, { status: 400 })
    }

    // Parse each email and extract trades
    let allTrades: ParsedTrade[] = []

    for (const email of emails) {
      if (email.subject.includes("expired") || email.content.includes("expired")) {
        const parsedTrades = processEmail(email)
        allTrades = [...allTrades, ...parsedTrades]
      }
    }

    // Apply filters if provided
    if (filterSymbol) {
      allTrades = allTrades.filter((trade) => trade.symbol === filterSymbol)
    }

    if (dateRange && dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)

      allTrades = allTrades.filter((trade) => {
        const tradeDate = new Date(trade.expiryDate)
        return tradeDate >= startDate && tradeDate <= endDate
      })
    }

    // Fetch current prices and calculate potential profit/loss
    const tradesWithProfit = await Promise.all(
      allTrades.map(async (trade) => {
        const currentPrice = await fetchCurrentPrice(trade.symbol)
        return calculatePotentialProfit(trade, currentPrice)
      }),
    )

    return NextResponse.json({ trades: tradesWithProfit })
  } catch (error) {
    console.error("Error processing emails:", error)
    return NextResponse.json({ error: "Failed to process emails" }, { status: 500 })
  }
}
