// Types for our parsed trade data
export interface ParsedTrade {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  price: number
  quantity: number
  expiryDate: string
  status: "Expired"
  accountNumber?: string
  potentialProfit?: number
  originalEmail?: string
  broker?: string
}

/**
 * Parses the email content to extract trade data from Charles Schwab emails
 * @param emailContent The content of the email to parse
 * @param emailDate The date of the email
 * @returns An array of parsed trade objects
 */
export function parseTradeEmail(emailContent: string, emailDate: string): ParsedTrade[] {
  const trades: ParsedTrade[] = []

  try {
    // Extract account number
    const accountMatch = emailContent.match(/account ending in (\d+)/i)
    const accountNumber = accountMatch ? accountMatch[1] : undefined

    // Extract date from email if available, otherwise use the provided email date
    const dateMatch = emailContent.match(/([A-Z][a-z]{2} \d{1,2}, \d{4})/i)
    const emailDateFormatted = dateMatch ? dateMatch[0] : emailDate

    // Convert to ISO format for consistency
    const expiryDate = formatDate(emailDateFormatted)

    // Look for the table structure
    // In Charles Schwab emails, we're looking for Action, Quantity, Symbol/Description, Price
    const actionMatch = emailContent.match(/Action\s+Quantity\s+Symbol\/Description\s+Price/i)

    if (actionMatch) {
      // Find all rows in the table
      // This regex looks for patterns like "BUY    47    OMEX    $1.26"
      const rowRegex = /(BUY|SELL)\s+(\d+)\s+([A-Z]+)\s+\$(\d+\.\d+)/g
      let match

      while ((match = rowRegex.exec(emailContent)) !== null) {
        const [_, type, quantity, symbol, price] = match

        trades.push({
          id: `${symbol}-${expiryDate}-${Date.now()}`,
          symbol,
          type: type as "BUY" | "SELL",
          price: Number.parseFloat(price),
          quantity: Number.parseInt(quantity, 10),
          expiryDate,
          status: "Expired",
          accountNumber,
          broker: "Charles Schwab",
          originalEmail: emailContent,
        })
      }
    }

    return trades
  } catch (error) {
    console.error("Error parsing email:", error)
    return []
  }
}

/**
 * Formats a date string to ISO format (YYYY-MM-DD)
 * @param dateStr Date string in various formats
 * @returns ISO formatted date string
 */
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toISOString().split("T")[0]
  } catch (error) {
    console.error("Error formatting date:", error)
    return new Date().toISOString().split("T")[0]
  }
}

/**
 * Calculates potential profit/loss for a trade based on current market price
 * @param trade The trade to calculate for
 * @param currentPrice The current market price of the symbol
 * @returns The trade with potential profit/loss calculated
 */
export function calculatePotentialProfit(trade: ParsedTrade, currentPrice: number): ParsedTrade {
  const { type, price, quantity } = trade

  // Calculate potential profit/loss
  // For BUY orders: (currentPrice - originalPrice) * quantity
  // For SELL orders: (originalPrice - currentPrice) * quantity
  const potentialProfit = type === "BUY" ? (currentPrice - price) * quantity : (price - currentPrice) * quantity

  return {
    ...trade,
    potentialProfit,
  }
}

/**
 * Extracts HTML content from an email
 * @param emailContent The raw email content
 * @returns The extracted HTML content
 */
export function extractHtmlContent(emailContent: string): string {
  // Simple extraction - in a real app, you'd use a proper HTML parser
  const htmlMatch = emailContent.match(/<html[^>]*>([\s\S]*?)<\/html>/i)
  return htmlMatch ? htmlMatch[0] : emailContent
}

/**
 * Extracts plain text from HTML content
 * @param htmlContent The HTML content
 * @returns Plain text extracted from HTML
 */
export function extractTextFromHtml(htmlContent: string): string {
  // Remove HTML tags
  let text = htmlContent.replace(/<[^>]*>/g, " ")

  // Replace multiple spaces with a single space
  text = text.replace(/\s+/g, " ")

  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

  return text.trim()
}

/**
 * Main function to process an email and extract trades
 * @param email The email object with subject, date, and content
 * @returns Array of parsed trades
 */
export function processEmail(email: { subject: string; date: string; content: string }): ParsedTrade[] {
  // Check if this is a Charles Schwab expired order email
  if (email.subject.includes("summary of your expired") || email.content.includes("summary of your expired")) {
    // Extract HTML if present
    const htmlContent = extractHtmlContent(email.content)

    // Convert HTML to plain text for easier parsing
    const textContent = extractTextFromHtml(htmlContent)

    // Parse the email
    return parseTradeEmail(textContent, email.date)
  }

  return []
}
