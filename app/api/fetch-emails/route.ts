import { type NextRequest, NextResponse } from "next/server"

// Sample email data for demonstration based on the Charles Schwab format
const sampleEmails = [
  {
    id: "email1",
    subject: "Your expired instructions summary is ready to view",
    date: "2025-04-25",
    content: `
Charles Schwab

Account ending: 984
Apr 25, 2025

Here's a summary of your expired day order instructions.

Here are the expired instructions for your account ending in 984.

Expired Day Order Instructions

Action    Quantity    Symbol/Description    Price
BUY       47          OMEX                 $1.26

If you'd like to view your account, or place additional trades, just click the link below.

View your summary

Or go to schwab.com/accountsummary.

Thank you for investing with Schwab.
    `,
  },
  {
    id: "email2",
    subject: "Your expired instructions summary is ready to view",
    date: "2025-04-20",
    content: `
Charles Schwab

Account ending: 984
Apr 20, 2025

Here's a summary of your expired day order instructions.

Here are the expired instructions for your account ending in 984.

Expired Day Order Instructions

Action    Quantity    Symbol/Description    Price
SELL      100         AAPL                 $175.50
BUY       25          MSFT                 $420.75

If you'd like to view your account, or place additional trades, just click the link below.

View your summary

Or go to schwab.com/accountsummary.

Thank you for investing with Schwab.
    `,
  },
  {
    id: "email3",
    subject: "Your expired instructions summary is ready to view",
    date: "2025-04-15",
    content: `
Charles Schwab

Account ending: 984
Apr 15, 2025

Here's a summary of your expired day order instructions.

Here are the expired instructions for your account ending in 984.

Expired Day Order Instructions

Action    Quantity    Symbol/Description    Price
BUY       200         TSLA                 $250.30
SELL      50          AMZN                 $180.25
BUY       75          GOOGL                $145.60

If you'd like to view your account, or place additional trades, just click the link below.

View your summary

Or go to schwab.com/accountsummary.

Thank you for investing with Schwab.
    `,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { provider, email, criteria } = await request.json()

    // In a real app, this would authenticate with the email provider
    // and fetch actual emails based on the criteria

    // Filter emails based on criteria
    let filteredEmails = [...sampleEmails]

    if (criteria) {
      if (criteria.symbol) {
        filteredEmails = filteredEmails.filter((email) => email.content.includes(`${criteria.symbol}`))
      }

      if (criteria.dateRange && criteria.dateRange.start && criteria.dateRange.end) {
        const startDate = new Date(criteria.dateRange.start)
        const endDate = new Date(criteria.dateRange.end)

        filteredEmails = filteredEmails.filter((email) => {
          const emailDate = new Date(email.date)
          return emailDate >= startDate && emailDate <= endDate
        })
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ emails: filteredEmails })
  } catch (error) {
    console.error("Error fetching emails:", error)
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
