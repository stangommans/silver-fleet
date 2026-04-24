# Silver Fleet: Gotchas & Lessons Learned

## BUX CSV Parsing & Currency
- **Foreign Trade Values:** When BUX records a 'Buy Trade', the `ASSET_TRADE_BUY` line contains the `Transaction Amount` in the foreign currency (e.g., USD) rather than the local account currency (EUR). To ensure the math accurately reflects the true fiat cost, always reference the corresponding `CASH_DEBIT` or `CASH_CREDIT` lines instead. These contain the actual deducted/added EUR amounts, avoiding mixed-currency calculations in `Total Invested`.
