# **Silver Fleet 🚢**

**Your Personal Investment Command Center**  
Silver Fleet is a centralized investment dashboard designed to give you total control over your financial portfolio. By aggregating data from brokers like BUX, manual entries, and real-time market APIs, it provides a "single source of truth" for your wealth.

## **🤖 AI Agent Instructions**

\[\!IMPORTANT\]  
Any AI agent or LLM interacting with this repository **must** strictly adhere to the rules defined in:  
[**docs/ai-rules/admin.md**](http://docs.google.com/docs/ai-rules/admin.md)  
Please consult this file before performing any code generations, refactors, or architectural decisions.  
**Coding Standard Note:** Frontend code should use TypeScript and React functional components. (If any supplementary Python scripts are created for data analysis, strictly use 4 spaces for indentation and maintain consistent commenting styles).

## **🌟 Project Vision**

To bridge the gap between fragmented brokerage apps and professional-grade analytics. Silver Fleet focuses on deep insights, clean aesthetics (Dark Mode first), and an architecture that scales smoothly from a local MVP to a fully deployed application.  
**Current Phase:** Next.js MVP. The goal is to build the core UI components, validate local CSV parsing, and implement charting locally before migrating to a managed database (like Supabase) in the future.

## **🚀 Core Features (MVP Focus)**

### **1\. Local Data Ingestion**

* **BUX CSV Import:** A robust client-side or Next.js API route parser (using libraries like PapaParse) that reads exported BUX CSV files and normalizes the data.  
* **Manual Entry:** A simple UI state or local JSON structure to mock and track offline assets.

### **2\. Analytics & Visualization**

* **Core Metrics:** Total Value, Daily P\&L, and All-Time P\&L displayed in high-contrast widgets.  
* **Performance Charts:** Interactive line charts showing portfolio growth over time.  
* **Allocation:** Interactive donut/pie charts by sector and asset class.

### **3\. API Integrations (Phase 1.5)**

* **Price Syncing:** Fetching live prices via free APIs (e.g., Alpha Vantage, Yahoo Finance) to update the value of the imported holdings dynamically.

## **🛠 Technical Stack (MVP Phase)**

We are starting with a modern React stack. This provides absolute control over the Dark Mode aesthetics and ensures the codebase is deployment-ready from day one.

* **Framework:** [Next.js](https://nextjs.org/) (App Router) with TypeScript.  
* **Styling:** Tailwind CSS \+ [shadcn/ui](https://ui.shadcn.com/) for beautifully crafted, accessible components.  
* **Icons:** Lucide React.  
* **Charts:** [Recharts](https://recharts.org/) (React-native, highly customizable, and great for dark mode).  
* **Data Parsing:** PapaParse (for fast, reliable CSV processing).  
* **State Management:** React Context or Zustand (if needed for complex portfolio states).

*Note: Data persistence is currently handled via local files (CSV/JSON). A managed database like PostgreSQL (Supabase) will be introduced in the next phase.*

## **🎨 Design Guidelines (UI/UX)**

The interface is built for high data density, focus, and sophistication.

* **Theme:** Strict Dark Mode.  
* **Palette:**  
  * Background: \#0B0E11 (Deep Black)  
  * Surface/Cards: Charcoal Greys (\#1A1D21)  
  * Accents: \#C0C0C0 (Silver)  
* **Status Indicators:** \* Gains: Neon Green (\#00E676)  
  * Losses: Soft Red (\#FF5252)  
  * Interaction: Electric Blue (\#2979FF)

## **📦 Installation & Local Development**

### **1\. Prerequisites**

* Node.js 18.x or higher installed.  
* npm, yarn, or pnpm.

### **2\. Setup Project**

Clone the repository and install the dependencies:  
git clone \<repository-url\>  
cd silver-fleet  
npm install

### **3\. Environment Variables**

Create a .env.local file in the root directory for your API keys:  
\# Future API Integrations  
NEXT\_PUBLIC\_ALPHA\_VANTAGE\_API\_KEY=your\_key\_here

### **4\. Run the Dashboard**

Start the Next.js development server:  
npm run dev

This will automatically open the dashboard in your default web browser at http://localhost:3000.

## **📂 Current & Planned Project Structure**

/  
├── docs/                 \# Documentation and AI Governance  
│   ├── ai-rules/           
│   │   └── admin.md      \# Core governance rules (Environments, workflows)  
│   ├── CHANGELOG.md      \# Session-based version history  
│   ├── GOTCHAS.md        \# Platform quirks and lessons learned  
│   ├── REQUESTS.md       \# Backlog for UI changes, features, and fixes  
│   ├── ROADMAP.md        \# Task checklist and project milestones  
│   └── SYSTEM\_DEPENDENCIES.md \# Service endpoints, IDs, and credentials  
├── app/                  \# (Planned) Next.js App Router (Pages, Layouts, API routes)  
├── components/           \# (Planned) Reusable React components  
├── lib/                  \# (Planned) Utility functions (CSV parsers, math)  
├── data/                 \# (Planned) Local data storage (drop raw CSVs here for testing)  
├── .gitignore            \# Git ignore rules  
├── package.json          \# (Planned) Node dependencies  
└── README.md             \# Project overview (this file)  
