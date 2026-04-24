import { Card } from "@/components/ui/card";
import { Landmark, TrendingUp, History, Activity, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

export function MetricsBar({ 
  totalInvested, 
  cashBalance,
  livePortfolioValue 
}: { 
  totalInvested: number, 
  cashBalance: number,
  livePortfolioValue: number
}) {
  const totalNetWorth = cashBalance + livePortfolioValue;
  const rawProfit = livePortfolioValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (rawProfit / totalInvested) * 100 : 0;
  const isProfitable = rawProfit >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Metric 1: Total Net Asset Value */}
      <Card className="bg-[#1A1D21] border-[#3f3f46] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#2979FF] transition-colors rounded">
         <div className="flex justify-between items-start z-10">
            <span className="font-heading text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Total Net Worth</span>
            <Activity className="w-4 h-4 text-[#2979FF]" />
         </div>
         <div className="flex items-baseline gap-2 mt-2 z-10">
            <span className="font-heading text-2xl lg:text-3xl font-bold text-white tracking-tighter privacy-mask">€{totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
         </div>
         <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#2979FF]/5 rounded-full blur-2xl z-0"></div>
      </Card>
      
      {/* Metric 2: Total Invested */}
      <Card className="bg-[#1A1D21] border-[#3f3f46] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#2979FF] transition-colors rounded">
         <div className="flex justify-between items-start z-10">
            <span className="font-heading text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Total Invested</span>
            <TrendingUp className="w-4 h-4 text-[#C0C0C0]" />
         </div>
         <div className="flex items-baseline gap-2 mt-2 z-10">
            <span className="font-heading text-2xl lg:text-3xl font-bold text-white tracking-tighter privacy-mask">€{totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
         </div>
      </Card>

      {/* Metric 3: Total P/L */}
      <Card className="bg-[#1A1D21] border-[#3f3f46] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#2979FF] transition-colors rounded">
         <div className="flex justify-between items-start z-10">
            <span className="font-heading text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Total P/L</span>
            <BarChart3 className={`w-4 h-4 ${isProfitable ? 'text-[#00E676]' : 'text-[#FF5252]'}`} />
         </div>
         <div className="flex flex-col mt-2 z-10">
            <span className={`font-heading text-2xl lg:text-3xl font-bold tracking-tighter privacy-mask ${isProfitable ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                {isProfitable ? '+' : ''}€{Math.abs(rawProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-[11px] font-mono font-bold privacy-mask ${isProfitable ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                {isProfitable ? '▲' : '▼'} {Math.abs(profitPercentage).toFixed(2)}%
            </span>
         </div>
      </Card>

      {/* Metric 4: Current Cash Balance */}
      <Card className="bg-[#1A1D21] border-[#3f3f46] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#2979FF] transition-colors rounded">
         <div className="flex justify-between items-start z-10">
            <span className="font-heading text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Current Cash</span>
            <History className="w-4 h-4 text-[#C0C0C0]" />
         </div>
         <div className="flex items-baseline gap-2 mt-2 z-10">
            <span className="font-heading text-2xl lg:text-3xl font-bold text-white tracking-tighter privacy-mask">€{cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
         </div>
      </Card>
    </div>
  );
}
