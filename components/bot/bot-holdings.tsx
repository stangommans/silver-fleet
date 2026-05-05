"use client";

import { Holding } from "@/hooks/use-trading-bot";
import { TrendingUp, TrendingDown, Trash2, Box } from "lucide-react";

interface BotHoldingsProps {
  holdings: Holding[];
  onLiquidate: (id: string) => void;
}

export function BotHoldings({ holdings, onLiquidate }: BotHoldingsProps) {
  return (
    <div className="bg-[#1A1D21] border border-[#2D3139] rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#1A1D21] border-b border-[#2D3139] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-[#2979FF]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0C0C0]">Active Bot Holdings</span>
        </div>
        <span className="text-[10px] font-black text-[#a1a1aa] bg-[#262A31] px-2 py-0.5 rounded">
          {holdings.length} POSITIONS
        </span>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2D3139] bg-[#111417]/50">
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider">Asset</th>
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider text-right">Shares</th>
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider text-right">Entry</th>
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider text-right">Current</th>
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider text-right">PnL</th>
              <th className="px-4 py-3 text-[10px] font-bold text-[#515761] uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3139]">
            {holdings.map((h) => {
              const isProfit = h.pnl >= 0;
              return (
                <tr key={h.id} className="hover:bg-[#262A31]/30 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white tracking-tight">{h.symbol}</span>
                      <span className="text-[9px] text-[#515761] font-bold uppercase">Equity Long</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-mono font-bold text-[#C0C0C0]">{h.shares}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-mono text-[#C0C0C0]">${h.entryPrice.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-mono text-white">${h.currentPrice.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`flex flex-col items-end ${isProfit ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                      <div className="flex items-center gap-1 font-mono font-bold text-xs">
                        {isProfit ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        ${Math.abs(h.pnl).toFixed(2)}
                      </div>
                      <span className="text-[10px] font-black tracking-tighter">
                        {isProfit ? '+' : ''}{h.pnlPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => onLiquidate(h.id)}
                      className="p-2 rounded bg-[#FF5252]/10 text-[#FF5252] opacity-0 group-hover:opacity-100 hover:bg-[#FF5252]/20 transition-all active:scale-90"
                      title="Liquidate Position"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {holdings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <Box className="w-8 h-8 text-[#515761]" />
                    <span className="text-xs font-bold text-[#515761] uppercase tracking-widest">No Active Positions</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Summary */}
      {holdings.length > 0 && (
        <div className="bg-[#111417]/50 border-t border-[#2D3139] px-4 py-2 flex justify-between items-center text-[10px] font-bold uppercase text-[#515761]">
           <span>Total Risk Exposure</span>
           <span className="text-white">
             ${holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
           </span>
        </div>
      )}
    </div>
  );
}
