# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Mobile Navigation Bar: Fixed bottom navigation bar for seamless access on small screens.
- Trading Bot Command Center: New `/bot` dashboard with real-time operational transparency.
- Terminal-Style Signal Log: Live logging component for tracking bot decisions and EMA/RSI signals.
- Active Bot Holdings View: Dedicated tracking of bot-managed positions with live PnL and liquidation controls.
- Local Storage Persistence: Migration of all sensitive portfolio data to the browser for 100% privacy.
- CapRover Deployment Automation: Multi-stage Dockerfile and `captain-definition` for automated Next.js builds.
- Automated Ticker Alias Engine: Background discovery and mapping of ISINs to Yahoo Finance tickers.
- Persistent JSON Database: Local file-system based storage for transactions and settings in `data/database.json`.
- Global Privacy Mode: Toggle to mask sensitive financial values across the dashboard.
- FX Conversion Engine: Real-time currency conversion to EUR using Yahoo Finance FX rates.
- Dynamic Pricing Engine: Background process to fetch and cache live asset prices.
- Visual Branding: Implementation of the "Long live the VOC" terminal aesthetic across the dashboard.

### Changed
- Privacy Architecture: Moved transaction storage from server-side JSON to client-side `localStorage`.
- Deployment Strategy: Switched from generic Node template to custom Dockerfile for production build support.
- UI Refinement: Cleaned up sidebar navigation and topbar layout for better data density.
- Portfolio Logic: Improved cash balance and invested total calculations using `portfolio-math.ts`.

### Fixed
- Next.js Build Error: Resolved "production build not found" issue in CapRover via multi-stage Docker build.
- React Hook Order: Resolved stability issues and hydration errors in the main dashboard view.
- Asset Mapping: Fixed collisions between BUX symbols and global ticker symbols.
