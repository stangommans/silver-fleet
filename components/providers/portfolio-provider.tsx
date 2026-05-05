"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { BuxTransaction } from "@/lib/parsers/bux";
import { calculatePortfolioState, AssetHolding } from "@/lib/portfolio-math";
import { getFullStateFromDB } from "@/app/actions/database";
import { getLivePrices, PriceData } from "@/app/actions/prices";
import { StorageManager } from "@/lib/storage";

interface PortfolioState {
  transactions: BuxTransaction[];
  setTransactions: (transactions: BuxTransaction[]) => void;
  addManualTransaction: (newTx: BuxTransaction) => void;
  cashBalance: number;
  totalInvested: number;
  livePortfolioValue: number;
  livePrices: Record<string, PriceData>;
  fxRates: Record<string, number>;
  tickerAliases: Record<string, string>;
  updateTickerAlias: (assetId: string, alias: string) => void;
  isPrivacyMode: boolean;
  togglePrivacyMode: () => void;
  holdings: Record<string, AssetHolding>;
  totalDividends: number;
  totalLending: number;
}

const PortfolioContext = createContext<PortfolioState | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<BuxTransaction[]>([]);
  const [tickerAliases, setTickerAliases] = useState<Record<string, string>>({});
  const [livePrices, setLivePrices] = useState<Record<string, PriceData>>({});
  const [fxRates, setFxRates] = useState<Record<string, number>>({ "EUR": 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const togglePrivacyMode = () => setIsPrivacyMode(!isPrivacyMode);

  // Initialize from Local Storage with Server Fallback (Migration)
  useEffect(() => {
    const localTransactions = StorageManager.getItem("TRANSACTIONS", null);
    const localAliases = StorageManager.getItem("TICKER_ALIASES", null);
    const hasMigrated = StorageManager.getItem("MIGRATED", false);

    if (localTransactions !== null && localAliases !== null) {
      // Use local storage if available
      setTransactions(localTransactions);
      setTickerAliases(localAliases);
      setIsLoaded(true);
    } else if (!hasMigrated) {
      // Perform one-time migration from server DB
      getFullStateFromDB()
        .then((state) => {
          setTransactions(state.transactions);
          setTickerAliases(state.settings.tickerAliases);
          StorageManager.setItem("MIGRATED", true);
          setIsLoaded(true);
        })
        .catch((e) => {
          console.error("Migration from server DB failed", e);
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
    
    // Load privacy mode
    const localPrivacy = StorageManager.getItem("PRIVACY_MODE", false);
    setIsPrivacyMode(localPrivacy);
  }, []);

  // Sync back to Browser Local Storage whenever state mutates
  useEffect(() => {
    if (isLoaded) {
      StorageManager.setItem("TRANSACTIONS", transactions);
      StorageManager.setItem("TICKER_ALIASES", tickerAliases);
      StorageManager.setItem("PRIVACY_MODE", isPrivacyMode);
    }
  }, [transactions, tickerAliases, isPrivacyMode, isLoaded]);

  const addManualTransaction = (newTx: BuxTransaction) => {
    setTransactions((prev) => {
      const merged = [...prev, newTx];
      merged.sort((a, b) => new Date(a.transactionTime).getTime() - new Date(b.transactionTime).getTime());
      return merged;
    });
  };

  const updateTickerAlias = (assetId: string, alias: string) => {
    setTickerAliases(prev => {
        const next = { ...prev };
        if (!alias) {
            delete next[assetId];
        } else {
            next[assetId] = alias;
        }
        return next;
    });
    // Clear the current live price for this asset so it re-fetches with the new alias
    setLivePrices(prev => {
        const next = { ...prev };
        delete next[assetId];
        return next;
    });
  };

  // Calculate the derived portfolio state automatically whenever transactions change
  const { cashBalance, holdings, totalInvested, totalDividends, totalLending } = useMemo(() => {
    return calculatePortfolioState(transactions);
  }, [transactions]);

  // Background Pricing Engine: Auto-fetches missing prices for active holdings
  useEffect(() => {
    const activeTickers = Object.entries(holdings)
      .filter(([_, h]) => h.quantity > 0)
      .map(([id]) => id);

    const missingTickers = activeTickers.filter(id => livePrices[id] === undefined);

    if (missingTickers.length > 0) {
      getLivePrices(missingTickers, tickerAliases)
        .then((fetchedPrices) => {
          setLivePrices((prev) => {
            const newState = { ...prev };
            missingTickers.forEach(t => {
                if (!fetchedPrices[t]) newState[t] = null as any;
            });
            return { ...newState, ...fetchedPrices };
          });

          // Extract non-EUR currencies that we need FX rates for
          const neededCurrencies = Object.values(fetchedPrices)
            .map(p => p.currency)
            .filter(pc => pc !== "EUR" && fxRates[pc] === undefined);

          if (neededCurrencies.length > 0) {
              const fxTickers = Array.from(new Set(neededCurrencies)).map(c => `${c}EUR=X`);
              getLivePrices(fxTickers).then(rates => {
                  setFxRates(prev => {
                      const updated = { ...prev };
                      Object.entries(rates).forEach(([ticker, data]) => {
                          const base = ticker.replace("EUR=X", "");
                          updated[base] = data.price;
                      });
                      return updated;
                  });
              });
          }
        })
        .catch(console.error);
    }
  }, [holdings, livePrices, fxRates, tickerAliases]);

  // Derive the real-time value wrapper (combining live Yahoo prices + FX logic)
  const livePortfolioValue = useMemo(() => {
    let value = 0;
    for (const [id, holding] of Object.entries(holdings)) {
      if (holding.quantity > 0) {
        const liveData = livePrices[id];
        if (liveData != null) {
          const rate = fxRates[liveData.currency] || 1;
          value += (liveData.price * rate) * holding.quantity;
        } else {
          value += holding.totalInvested;
        }
      }
    }
    return value;
  }, [holdings, livePrices, fxRates]);

  // Sync privacy mode to document attribute for CSS targeting
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-privacy", isPrivacyMode.toString());
    }
  }, [isPrivacyMode]);

  // Prevent flash of empty state until storage read completes
  if (!isLoaded) return null;

  return (
    <PortfolioContext.Provider
      value={{
        transactions,
        setTransactions,
        addManualTransaction,
        cashBalance,
        totalInvested,
        livePortfolioValue,
        livePrices,
        fxRates,
        tickerAliases,
        updateTickerAlias,
        isPrivacyMode,
        togglePrivacyMode,
        holdings,
        totalDividends,
        totalLending,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
