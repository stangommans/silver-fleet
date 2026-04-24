import { BuxTransaction } from "../parsers/bux";

/**
 * Generates a unique hash for a transaction line based on exact data points.
 * Ensures we can cleanly drop the same transaction rows without duplication, 
 * but still allows different identical transactions hitting on the exact same microsecond.
 */
export function getTransactionHash(tx: BuxTransaction): string {
  return `${tx.transactionTime}_${tx.transactionType}_${tx.assetId || "CASH"}_${tx.transactionAmount || 0}`;
}

/**
 * Deduplicates an array of BuxTransactions based on their composite hash.
 * Later arrays overwrite earlier ones if there's an identical hash.
 */
export function dedupTransactions(transactions: BuxTransaction[]): BuxTransaction[] {
  const map = new Map<string, BuxTransaction>();

  for (const tx of transactions) {
    const hash = getTransactionHash(tx);
    map.set(hash, tx);
  }

  // Convert back to array and sort chronologically just to be safe
  const result = Array.from(map.values());
  result.sort((a, b) => new Date(a.transactionTime).getTime() - new Date(b.transactionTime).getTime());
  
  return result;
}
