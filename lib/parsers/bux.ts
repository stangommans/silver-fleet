
export interface BuxTransaction {
  transactionTime: string;
  transactionCategory: string;
  transactionType: string;
  transferType: string;
  transactionAmount: number | null;
  transactionCurrency: string;
  cashBalanceAmount: number | null;
  assetId: string;
  assetName: string;
  assetQuantity: number | null;
  assetPrice: number | null;
  assetCurrency: string;
  currencyPair: string;
  exchangeRate: number | null;
  profitAndLossAmount: number | null;
  profitAndLossCurrency: string;
  dividendCurrency: string;
  dividendGrossAmount: number | null;
  dividendNetAmount: number | null;
  dividendTaxAmount: number | null;
  transactionDescription: string;
}

export function parseBuxCsv(rows: any[]): BuxTransaction[] {
  return rows.map((row: any) => ({
    transactionTime: row["Transaction Time (CET)"] || "",
    transactionCategory: row["Transaction Category"] || "",
    transactionType: row["Transaction Type"] || "",
    transferType: row["Transfer Type"] || "",
    transactionAmount: row["Transaction Amount"] ? parseFloat(row["Transaction Amount"]) : null,
    transactionCurrency: row["Transaction Currency"] || "",
    cashBalanceAmount: row["Cash Balance Amount"] ? parseFloat(row["Cash Balance Amount"]) : null,
    assetId: row["Asset Id"] || "",
    assetName: row["Asset Name"] || "",
    assetQuantity: row["Asset Quantity"] ? parseFloat(row["Asset Quantity"]) : null,
    assetPrice: row["Asset Price"] ? parseFloat(row["Asset Price"]) : null,
    assetCurrency: row["Asset Currency"] || "",
    currencyPair: row["Currency Pair"] || "",
    exchangeRate: row["Exchange Rate"] ? parseFloat(row["Exchange Rate"]) : null,
    profitAndLossAmount: row["Profit And Loss Amount"] ? parseFloat(row["Profit And Loss Amount"]) : null,
    profitAndLossCurrency: row["Profit And Loss Currency"] || "",
    dividendCurrency: row["Dividend Currency"] || "",
    dividendGrossAmount: row["Dividend Gross Amount"] ? parseFloat(row["Dividend Gross Amount"]) : null,
    dividendNetAmount: row["Dividend Net Amount"] ? parseFloat(row["Dividend Net Amount"]) : null,
    dividendTaxAmount: row["Dividend Tax Amount"] ? parseFloat(row["Dividend Tax Amount"]) : null,
    transactionDescription: row["Transaction Description"] || "",
  }));
}
