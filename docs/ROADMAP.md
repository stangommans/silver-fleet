# 🚀 Silver Fleet Roadmap

This document outlines the roadmap and development phases to move Silver Fleet to the fully-functional MVP described in the PRD. We will update the checkboxes as we progress.

## Phase 1: Data Ingestion & State Engine
- [x] **CSV Parser Utility** (`lib/parsers/bux.ts`)
  - Implement PapaParse to read `.csv` extracts into strongly typed TypeScript objects (`BuxTransaction`).
- [x] **Deduplication Logic** (`lib/utils/dedup.ts`)
  - Create a reliable hash (Timestamp + Type + Amount + Asset) to ensure repeated monthly CSV drops don't create duplicate transactions.
- [x] **Portfolio State Engine** (`lib/portfolio-math.ts`)
  - Calculate `Current Holdings` (Quantity, Average Cost Basis).
  - Calculate `Total Cash Balance` from deposits, withdrawals, fees, and dividends.

## Phase 2: Core UI & Dashboard Components
- [x] **Global Theme Setup** (`app/globals.css`, `tailwind.config.ts`)
  - Enforce strict Dark Mode aesthetics (#0B0E11, #1A1D21, #C0C0C0, #00E676, #FF5252, #2979FF).
- [x] **File Upload Component** (`components/ui/csv-uploader.tsx`)
  - Drag-and-drop zone to import the monthly BUX backups, storing merged results in Context/Store.
- [x] **Metrics Bar** (`components/dashboard/metrics-bar.tsx`)
  - High-contrast widgets for Total Portfolio Value, Current Cash, and Total Invested.
- [ ] **Performance Line Chart** (`components/dashboard/performance-chart.tsx`)
  - Area/line chart rendering historical portfolio balance over time (via `recharts`).
- [x] **Asset Allocation** (`components/dashboard/allocation-chart.tsx`)
  - Donut chart visualizing distribution by asset/sector.

## Phase 3: Manual Entry & Data Persistence
- [ ] **Manual Asset Form** (`components/manual-entry/add-asset-modal.tsx`)
  - UI state for tracking non-BUX assets.
- [x] **Local JSON Database**
  - Persist the transaction history and settings in a local file-system database (`data/database.json`).

## Phase 4: API Integrations & Polish (Phase 1.5)
- [ ] **Price Syncing**
  - Fetch live prices via free APIs (e.g., Alpha Vantage, Yahoo Finance) to update the true value of the imported holdings dynamically.
- [ ] **Responsive Design Pass**
  - Ensure the dashboard components scale down cleanly for mobile view.

## Phase 5: Branding & Privacy
- [x] **Privacy Mode Engine**
  - Global toggle to mask sensitive financial data across the terminal.
- [x] **"Long live the VOC" Branding**
  - Update visual identity and terminal aesthetics to reflect the project theme.
- [x] **Ticker Alias Discovery**
  - Automated background discovery of Yahoo Finance tickers for imported ISINs.
