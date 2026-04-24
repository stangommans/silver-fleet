# Silver Fleet 🚢
**Your Personal Investment Command Center** 

Silver Fleet is a centralized investment dashboard designed to give you total control over your financial portfolio. By aggregating data from brokers like BUX, manual entries, and real-time market APIs, it provides a "single source of truth" for your wealth.

## 🌟 Project Vision
To bridge the gap between fragmented brokerage apps and professional-grade analytics. Silver Fleet focuses on deep insights, clean aesthetics (Dark Mode first), and an architecture that scales smoothly from a local MVP to a fully deployed application.

## 🚀 Core Features (MVP Focus)
### 1. Local Data Ingestion
* **BUX CSV Import:** Robust client-side parser for BUX CSV files.
* **Manual Entry:** UI state for tracking offline assets.

### 2. Analytics & Visualization
* **Core Metrics:** Total Value, Daily P&L, All-Time P&L in high-contrast widgets.
* **Performance Charts:** Interactive line charts for portfolio growth.
* **Allocation:** Donut/pie charts by sector and asset class.

### 3. API Integrations (Phase 1.5)
* **Price Syncing:** Live prices via Alpha Vantage/Yahoo Finance.

## 🎨 Design Guidelines (UI/UX)
* **Theme:** Strict Dark Mode.
* **Palette:**
  * Background: #0B0E11 (Deep Black)
  * Surface/Cards: #1A1D21 (Charcoal Grey)
  * Accents: #C0C0C0 (Silver)
* **Status Indicators:**
  * Gains: #00E676 (Neon Green)
  * Losses: #FF5252 (Soft Red)
  * Interaction: #2979FF (Electric Blue)
* **Typography:** Clean, high data density focus.
* **Components:** shadcn/ui style, Recharts for visualization, Lucide icons.