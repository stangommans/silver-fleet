import { BuxTransaction } from "./parsers/bux";

export interface AssetHolding {
  assetId: string;
  assetName: string;
  quantity: number;
  averageCostBasis: number;
  totalInvested: number;
  totalEarnings: number;
}

export interface PortfolioState {
  cashBalance: number;
  holdings: Record<string, AssetHolding>;
  totalInvested: number;
  totalDividends: number;
  totalLending: number;
}

export function calculatePortfolioState(transactions: BuxTransaction[]): PortfolioState {
  let cashBalance = 0;
  const holdings: Record<string, AssetHolding> = {};
  let totalInvested = 0; // Total cost basis of current holdings
  let totalDividends = 0;
  let totalLending = 0;

  // Loop through chronological transactions
  for (const tx of transactions) {
    // 1. Update Cash Balance
    if (tx.cashBalanceAmount !== null && tx.cashBalanceAmount !== undefined) {
      cashBalance = tx.cashBalanceAmount;
    }

    // 2. Global Earnings Tracking (Captured even if assetId is missing)
    if (tx.transactionType === "Cash Dividend" || tx.transactionType === "Manufactured Cash Dividend") {
      totalDividends += Math.abs(tx.transactionAmount || 0);
    } else if (tx.transactionType === "Cash Dividend Reversal") {
      totalDividends -= Math.abs(tx.transactionAmount || 0);
    } else if (tx.transactionType === "Security Lending Revenue") {
      totalLending += Math.abs(tx.transactionAmount || 0);
    }

    const id = tx.assetId;
    // Handle asset-specific logic only if an asset ID is present
    if (id) {
      if (!holdings[id]) {
        holdings[id] = {
          assetId: id,
          assetName: tx.assetName || id,
          quantity: 0,
          averageCostBasis: 0,
          totalInvested: 0,
          totalEarnings: 0,
        };
      }

      const h = holdings[id];

      // Handle Buys
      if (tx.transactionType === "Buy Trade" && tx.transferType === "CASH_DEBIT") {
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
      // Handle Sells
      else if (tx.transactionType === "Sell Trade" && (tx.transferType === "CASH_CREDIT" || tx.transferType === "ASSET_TRADE_SELL")) {
        const qtySold = Math.abs(tx.assetQuantity || 0);
        if (qtySold > 0) {
          const costOfSoldShares = qtySold * h.averageCostBasis;
          h.quantity -= qtySold;
          h.totalInvested = Math.max(0, h.totalInvested - costOfSoldShares);
          totalInvested = Math.max(0, totalInvested - costOfSoldShares);

          if (h.quantity <= 0) {
            h.quantity = 0;
            h.averageCostBasis = 0;
            h.totalInvested = 0;
          }
        }
      }
      // Handle Corporate Actions
      else if (tx.transactionCategory === "corporate_actions" || tx.transactionType === "General Corporate Action") {
        const prevTotalCost = h.quantity * h.averageCostBasis;
        
        if (tx.transferType === "CASH_DEBIT") {
          const valueInvestedEur = Math.abs(tx.transactionAmount || 0);
          h.totalInvested += valueInvestedEur;
          totalInvested += valueInvestedEur;
          if (h.quantity > 0) {
            h.averageCostBasis = (prevTotalCost + valueInvestedEur) / h.quantity;
          } else {
            h.averageCostBasis = valueInvestedEur; 
          }
        } else if (tx.transferType === "ASSET_DEPOSIT") {
          const newQuantity = tx.assetQuantity || 0;
          h.quantity += newQuantity;
          if (h.quantity > 0) {
            h.averageCostBasis = h.totalInvested / h.quantity;
          }
        } else if (tx.transferType === "ASSET_WITHDRAWAL") {
          const qtyRemoved = Math.abs(tx.assetQuantity || 0);
          const costOfRemovedShares = qtyRemoved * h.averageCostBasis;
          h.quantity = Math.max(0, h.quantity - qtyRemoved);
          h.totalInvested = Math.max(0, h.totalInvested - costOfRemovedShares);
          totalInvested = Math.max(0, totalInvested - costOfRemovedShares);
          if (h.quantity === 0) {
            h.averageCostBasis = 0;
            h.totalInvested = 0;
          }
        } else if (tx.transferType === "CASH_CREDIT") {
          const amountReceived = Math.abs(tx.transactionAmount || 0);
          h.totalInvested = Math.max(0, h.totalInvested - amountReceived);
          totalInvested = Math.max(0, totalInvested - amountReceived);
          if (h.quantity > 0) {
            h.averageCostBasis = h.totalInvested / h.quantity;
          }
        }
      }

      // Per-Asset Earnings tracking for Matrix
      if (tx.transactionType === "Cash Dividend" || tx.transactionType === "Manufactured Cash Dividend") {
        h.totalEarnings += Math.abs(tx.transactionAmount || 0);
      } else if (tx.transactionType === "Cash Dividend Reversal") {
        h.totalEarnings -= Math.abs(tx.transactionAmount || 0);
      } else if (tx.transactionType === "Security Lending Revenue") {
        h.totalEarnings += Math.abs(tx.transactionAmount || 0);
      }
    }
  }

  return {
    cashBalance,
    holdings,
    totalInvested,
    totalDividends,
    totalLending
  };
}
