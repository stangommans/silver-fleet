"use client";

import { useTradingBot } from "@/hooks/use-trading-bot";
import { BotStatus } from "@/components/bot/bot-status";
import { TradingLog } from "@/components/bot/trading-log";
import { BotControls } from "@/components/bot/bot-controls";
import { BotHoldings } from "@/components/bot/bot-holdings";
import { ShieldCheck, Target, Zap, BarChart3 } from "lucide-react";

export default function TradingBotPage() {
  const { status, logs, holdings, uptime, startBot, stopBot, pauseBot, liquidateHolding } = useTradingBot();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#2979FF]">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Automated Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            TRADING <span className="text-[#2979FF]">BOT</span>
          </h1>
          <p className="text-[#a1a1aa] text-sm max-w-xl">
            Real-time execution command center. Monitor algorithmic decisions, technical signals, and portfolio execution metrics.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#1A1D21] border border-[#2D3139] p-2 rounded-lg">
           <div className="flex flex-col items-end px-2">
              <span className="text-[9px] font-bold text-[#515761] uppercase tracking-widest">Network Status</span>
              <span className="text-[10px] font-black text-[#00E676] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                OPTIMAL
              </span>
           </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <BotStatus status={status} uptime={uptime} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Logs (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <BotHoldings 
            holdings={holdings}
            onLiquidate={liquidateHolding}
          />
          <TradingLog logs={logs} />
        </div>

        {/* Right Column: Controls & Info (1/3 width) */}
        <div className="flex flex-col gap-6">
          <BotControls 
            status={status}
            onStart={startBot}
            onStop={stopBot}
            onPause={pauseBot}
          />

          {/* Strategy Details Card */}
          <div className="bg-[#1A1D21] border border-[#2D3139] p-5 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#2D3139] pb-3">
              <Target className="w-4 h-4 text-[#AA00FF]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0C0C0]">Strategy Parameters</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#a1a1aa]">Entry Logic</span>
                <span className="text-xs font-mono text-[#e1e2e7]">RSI &lt; 30 + EMA Cross</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#a1a1aa]">Exit Logic</span>
                <span className="text-xs font-mono text-[#e1e2e7]">Take Profit 5% / SL 2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#a1a1aa]">Max Exposure</span>
                <span className="text-xs font-mono text-[#e1e2e7]">15.00% Total Equity</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#a1a1aa]">Risk Per Trade</span>
                <span className="text-xs font-mono text-[#e1e2e7]">1.00% Account Value</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 p-3 bg-[#2979FF]/5 border border-[#2979FF]/20 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#2979FF]" />
              <span className="text-[10px] text-[#2979FF] font-bold">BACKTESTED WIN RATE: 64.2%</span>
            </div>
          </div>

          {/* Performance Quick Look */}
          <div className="bg-[#1A1D21] border border-[#2D3139] p-5 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#2D3139] pb-3">
              <BarChart3 className="w-4 h-4 text-[#00E676]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0C0C0]">Live Session PnL</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <span className="text-3xl font-black text-[#00E676]">+$0.00</span>
              <span className="text-[10px] text-[#515761] font-bold uppercase mt-1">0 Trades Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
