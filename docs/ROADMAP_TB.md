# 🤖 Automated Swing Trading Bot Roadmap

This document outlines the blueprint and development phases for building a fully automated swing trading bot ("Silver Fleet TB") integrated into the existing Silver Fleet ecosystem.

## Phase 1: Market Intelligence & Data Feed
- [ ] **Multi-Source Data Fetcher** (`lib/trading/data-engine.ts`)
  - Integration with `yahoo-finance2` for historical OHLCV (Open, High, Low, Close, Volume).
  - Implement a caching layer to avoid rate limits during strategy optimization.
- [ ] **Technical Indicator Engine** (`lib/trading/indicators.ts`)
  - Implementation of core swing trading indicators:
    - **Trend**: EMA (20, 50, 200).
    - **Momentum**: RSI (Relative Strength Index).
    - **Volatility**: Bollinger Bands or ATR (Average True Range).
- [ ] **Market Scanner**
  - Background worker to scan a "Watchlist" of tickers and calculate their technical setup daily.

## Phase 2: Strategy Engine (The "Brain")
- [ ] **Signal Generation Logic** (`lib/trading/strategy.ts`)
  - Define "Buy" signals (e.g., RSI Oversold + EMA 20 Cross).
  - Define "Sell" signals (e.g., Take Profit targets or RSI Overbought).
- [ ] **Backtesting Framework**
  - Tooling to run the strategy against 2-5 years of historical data.
  - Calculate key performance metrics: **CAGR, Max Drawdown, Sharpe Ratio, Win Rate**.
- [ ] **Parameter Optimizer**
  - Script to find the "Sweet Spot" for indicator periods based on specific asset classes (Stocks vs. ETFs).

## Phase 3: Risk & Execution Layer
- [ ] **Position Sizing Module**
  - Dynamic sizing based on portfolio heat (e.g., never risk more than 1% of total equity per trade).
- [ ] **Broker Integration Abstraction** (`lib/trading/brokers/`)
  - Create a generic interface for brokers (Interactive Brokers, Alpaca, or DeGiro).
  - Implement **Paper Trading** mode (Sandbox) for risk-free live testing.
- [ ] **Order Management System (OMS)**
  - Automated placement of:
    - Market/Limit Orders.
    - Hard Stop-Losses.
    - Trailing Stops to lock in gains during a swing.

## Phase 4: The "Front" (Bot Control Panel)
- [x] **Bot Health Dashboard** (`app/bot/page.tsx`)
  - Real-time status: `RUNNING`, `PAUSED`, `IDLE`.
  - Kill-switch button for emergency manual intervention.
- [x] **Active Trades View**
  - High-fidelity table showing open positions, entry price, current price, and unrealized PnL.
- [x] **Signal Log & History**
  - Visual timeline of every "Buy/Sell" decision the bot made and why (the "Signal Reason").
- [ ] **Performance Equity Curve**
  - Recharts-powered graph comparing Bot performance vs. S&P 500 (SPY).

## Phase 5: Automation & Reliability
- [ ] **Serverless Execution (Cron Jobs)**
  - Set up GitHub Actions or Vercel Cron to trigger the scan/trade cycle 1 hour before market close.
- [ ] **Notification Engine**
  - Instant alerts via Telegram or Discord for every trade execution or error.
- [ ] **Persistence Layer** (`data/trading_history.json`)
  - Track every trade, fee, and slippage to ensure the state engine is 100% accurate.

## Phase 6: Visual & UI Excellence (The "WOW" Factor)
- [ ] **Glassmorphic Command Center**
  - Use frosted-glass effects and subtle glow animations for the bot status indicators.
- [ ] **Real-time Profit/Loss Pulse**
  - Dynamic color-shifting backgrounds based on daily PnL (Deep Emerald for profit, Crimson for loss).
- [ ] **Interactive Strategy Playground**
  - A "What If" simulator on the front page to visualize trade signals on historical charts before enabling live.

---

### Design Principles for "Silver Fleet TB"
1. **Safety First**: The bot should fail "closed" (liquidate or hold, but never open new trades if data is uncertain).
2. **Transparency**: Every action must be logged with the exact technical indicator values that triggered it.
3. **Modular**: Strategy logic should be separate from Broker API logic to allow for easy exchange swapping.
