"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type BotStatus = "IDLE" | "SCANNING" | "ANALYZING" | "TRADING" | "PAUSED" | "ERROR";

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "INFO" | "WARN" | "ERROR" | "SIGNAL";
  message: string;
}

export interface Holding {
  id: string;
  symbol: string;
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
}

const MOCK_MESSAGES = [
  { level: "INFO", message: "Market data feed connected via Yahoo Finance." },
  { level: "INFO", message: "Scanning S&P 500 watchlist for RSI oversold conditions..." },
  { level: "INFO", message: "Analyzing ticker AAPL: RSI(14) is 32.5 (Neutral)." },
  { level: "INFO", message: "Analyzing ticker TSLA: RSI(14) is 28.1 (Oversold candidate)." },
  { level: "SIGNAL", message: "BUY SIGNAL: TSLA at $174.50. Reason: RSI < 30 + EMA 20 Support." },
  { level: "INFO", message: "Executing position sizing... Risk 1% ($500)." },
  { level: "INFO", message: "Order placed: Buy 3 shares TSLA @ Market." },
  { level: "INFO", message: "Order filled: TSLA @ $174.55. Transaction ID: #TX-9921." },
  { level: "INFO", message: "Monitoring active positions for take-profit targets..." },
  { level: "WARN", message: "Market volatility increasing (ATR spike detected)." },
  { level: "INFO", message: "Analyzing ticker NVDA: Price approaching EMA 200." },
];

const MOCK_HOLDINGS: Holding[] = [
  { id: "1", symbol: "TSLA", shares: 3, entryPrice: 174.55, currentPrice: 178.20, pnl: 10.95, pnlPercentage: 2.09 },
  { id: "2", symbol: "AMD", shares: 10, entryPrice: 162.10, currentPrice: 165.40, pnl: 33.00, pnlPercentage: 2.04 },
];

export function useTradingBot() {
  const [status, setStatus] = useState<BotStatus>("IDLE");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [uptime, setUptime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdingsRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback((level: LogEntry["level"], message: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      level,
      message,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  const liquidateHolding = useCallback((id: string) => {
    setHoldings((prev) => {
      const h = prev.find(item => item.id === id);
      if (h) {
        addLog("SIGNAL", `LIQUIDATING: ${h.symbol} at $${h.currentPrice}. Manual exit triggered.`);
      }
      return prev.filter(item => item.id !== id);
    });
  }, [addLog]);

  const startBot = useCallback(() => {
    setStatus("SCANNING");
    addLog("INFO", "Trading bot initialized. Entering SCANNING mode.");
    setHoldings(MOCK_HOLDINGS); // Initial mock holdings
    
    // Start uptime timer
    timerRef.current = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    // Simulate price movements
    holdingsRef.current = setInterval(() => {
      setHoldings((prev) => prev.map(h => {
        const change = (Math.random() - 0.48) * 0.5; // Slight upward bias
        const newPrice = h.currentPrice + change;
        const pnl = (newPrice - h.entryPrice) * h.shares;
        const pnlPercentage = ((newPrice - h.entryPrice) / h.entryPrice) * 100;
        return { ...h, currentPrice: newPrice, pnl, pnlPercentage };
      }));
    }, 2000);

    // Simulate logs
    logIntervalRef.current = setInterval(() => {
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      addLog(randomMsg.level as any, randomMsg.message);
      
      // Randomly change status to make it feel alive
      const statuses: BotStatus[] = ["SCANNING", "ANALYZING", "TRADING"];
      if (Math.random() > 0.7) {
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }
    }, 4000);
  }, [addLog]);

  const stopBot = useCallback(() => {
    setStatus("IDLE");
    addLog("WARN", "Trading bot manually stopped.");
    if (timerRef.current) clearInterval(timerRef.current);
    if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    if (holdingsRef.current) clearInterval(holdingsRef.current);
    setUptime(0);
    setHoldings([]);
  }, [addLog]);

  const pauseBot = useCallback(() => {
    setStatus("PAUSED");
    addLog("WARN", "Trading bot paused. Execution suspended.");
    if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    if (holdingsRef.current) clearInterval(holdingsRef.current);
  }, [addLog]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      if (holdingsRef.current) clearInterval(holdingsRef.current);
    };
  }, []);

  return {
    status,
    logs,
    holdings,
    uptime,
    startBot,
    stopBot,
    pauseBot,
    addLog,
    liquidateHolding
  };
}
