"use server";

import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

export interface PriceData {
  price: number;
  currency: string;
}

export async function getLivePrices(tickers: string[], customMappings: Record<string, string> = {}): Promise<Record<string, PriceData>> {
  const prices: Record<string, PriceData> = {};

  for (const ticker of tickers) {
    try {
      const searchSymbol = customMappings[ticker] || ticker;
      const quote = await yahooFinance.quote(searchSymbol);
      
      if (quote && quote.regularMarketPrice !== undefined) {
        prices[ticker] = {
          price: quote.regularMarketPrice,
          currency: quote.currency || "USD"
        };
      }
    } catch (error) {
      console.warn(`[Silver Fleet] Failed to resolve live price for ${ticker}`);
    }
  }

  return prices;
}

/**
 * Perform a deep search for Asset IDs (ISINs) to suggest the best ticker match.
 * Use this in the background/settings to populate aliases.
 */
export async function discoverAssets(assetIds: string[]): Promise<Record<string, string>> {
    const suggestions: Record<string, string> = {};

    for (const id of assetIds) {
        try {
            console.log(`[Silver Fleet] Discovering: ${id}`);
            const searchResults = await yahooFinance.search(id);
            const topEquity = searchResults.quotes.find((q: any) => 
                (q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.typeDisp === "equity" || q.typeDisp === "etf") && q.symbol
            ) as any;
            
            if (topEquity?.symbol) {
                suggestions[id] = topEquity.symbol;
            }
        } catch (e) {
            console.error(`Discovery failed for ${id}`, e);
        }
    }

    return suggestions;
}
