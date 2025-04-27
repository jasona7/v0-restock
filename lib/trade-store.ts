import { create } from "zustand"
import type { ParsedTrade } from "./email-parser"

interface TradeStore {
  trades: ParsedTrade[]
  isLoading: boolean
  error: string | null
  setTrades: (trades: ParsedTrade[]) => void
  addTrades: (trades: ParsedTrade[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearTrades: () => void
}

export const useTradeStore = create<TradeStore>((set) => ({
  trades: [],
  isLoading: false,
  error: null,
  setTrades: (trades) => set({ trades }),
  addTrades: (newTrades) =>
    set((state) => ({
      trades: [...state.trades, ...newTrades],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearTrades: () => set({ trades: [] }),
}))
