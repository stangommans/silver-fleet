import { BuxTransaction } from "./parsers/bux";

export interface AssetHolding {
  assetId: string;
  assetName: string;
  quantity: number;
  averageCostBasis: number;
  totalInvested: number;
}

export interface PortfolioState {
  cashBalance: number;
  holdings: Record<string, AssetHolding>;
  totalInvested: number;
}

export function calculatePortfolioState(transactions: BuxTransaction[]): PortfolioState {
  let cashBalance = 0;
  const holdings: Record<string, AssetHolding> = {};
  let totalInvested = 0; // Total amount moved from Cash -> Assets

  // Loop through chronological transactions
  for (const tx of transactions) {
    // 1. Update Cash Balance
    if (tx.cashBalanceAmount !== null && tx.cashBalanceAmount !== undefined) {
      // If BUX provides an exact snapshot of cash balance, we can trust it.
      // But let's build logic just relying on the delta if we need to.
      // E.g., deposits, withdrawals, fees.
      // For now, let's just track the latest cash balance snapshot BUX gives us.
      cashBalance = tx.cashBalanceAmount;
    }

    // 2. Update Asset Holdings based on Buys/Sells in EUR
    // Look at CASH_DEBIT for buys to ensure we capture the exact EUR cost instead of foreign currency assetPrice
    if (tx.transactionType === "Buy Trade" && tx.transferType === "CASH_DEBIT") {
      const id = tx.assetId;
      if (!id) continue;

      if (!holdings[id]) {
        holdings[id] = {
          assetId: id,
          assetName: tx.assetName,
          quantity: 0,
          averageCostBasis: 0,
          totalInvested: 0,
        };
      }

      const h = holdings[id];
      const prevTotalCost = h.quantity * h.averageCostBasis;
      const newQuantity = tx.assetQuantity || 0;
      const valueInvestedEur = Math.abs(tx.transactionAmount || 0);

      h.quantity += newQuantity;
      h.totalInvested += valueInvestedEur;
      totalInvested += valueInvestedEur;
      
      if (h.quantity > 0) {
        h.averageCostBasis = (prevTotalCost + valueInvestedEur) / h.quantity;
      }
    } 
    // Look at CASH_CREDIT for sells
    else if (tx.transactionType === "Sell Trade" && (tx.transferType === "CASH_CREDIT" || tx.transferType === "ASSET_TRADE_SELL")) {
      // Sometimes asset quantity might only be safely available on the trade line depending on CSV variations
      // To be safe we decrement if the quantity is present
      const id = tx.assetId;
      if (!id || !holdings[id]) continue;
      
      // Some BUX exports don't always duplicate the qty onto the CASH_CREDIT line for sells, 
      // so if it's missing, let's gracefully continue or use ASSET_TRADE_SELL specifically for quantity decreases.
      const qtySold = Math.abs(tx.assetQuantity || 0);
      if (qtySold === 0) continue;

      const h = holdings[id];
      
      h.quantity -= qtySold;
      if (h.quantity <= 0) {
        h.quantity = 0;
        h.averageCostBasis = 0;
      }
    }
  }

  return {
    cashBalance,
    holdings,
    totalInvested
  };
}
