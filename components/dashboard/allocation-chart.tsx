"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { useMemo } from "react";

const COLORS = ["#2979FF", "#00E676", "#FFD600", "#FF5252", "#AA00FF", "#00B0FF", "#00C853", "#FF6D00"];

export function AllocationChart() {
  const { holdings, livePrices, fxRates, isPrivacyMode } = usePortfolio();

  const chartData = useMemo(() => {
    const data = Object.entries(holdings)
      .filter(([_, h]) => h.quantity > 0)
      .map(([id, h]) => {
        const livePrice = livePrices[id];
        const fxRate = livePrice ? (fxRates[livePrice.currency] || 1) : 1;
        const currentPriceEur = livePrice ? (livePrice.price / fxRate) : h.averageCostBasis;
        return {
          name: h.assetName,
          value: h.quantity * currentPriceEur,
        };
      })
      .sort((a, b) => b.value - a.value);

    if (data.length > 8) {
      const main = data.slice(0, 7);
      const othersValue = data.slice(7).reduce((acc, curr) => acc + curr.value, 0);
      return [...main, { name: "Others", value: othersValue }];
    }

    return data;
  }, [holdings, livePrices, fxRates]);

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="bg-[#1A1D21] border-[#3f3f46] p-6 flex flex-col h-[400px] rounded">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-heading text-[11px] font-bold text-[#a1a1aa] uppercase tracking-widest">Asset Allocation</h3>
          <p className="text-xs text-[#626e7c] mt-1">Portfolio distribution by Market Value (EUR)</p>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percent = ((data.value / totalValue) * 100).toFixed(1);
                  return (
                    <div className="bg-[#0B0E11] border border-[#2D3139] p-3 rounded shadow-xl">
                      <p className="text-xs font-bold text-white mb-1">{data.name}</p>
                      <div className="flex items-center gap-3">
                        <p className={`text-sm font-mono font-bold text-[#2979FF] ${isPrivacyMode ? 'blur-sm' : ''}`}>
                          €{data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-[#a1a1aa]">{percent}%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value, entry: any) => {
                    const percent = ((entry.payload.value / totalValue) * 100).toFixed(1);
                    return <span className="text-[10px] text-[#C0C0C0] font-sans ml-1">{value} <span className="text-[#a1a1aa] opacity-50 ml-1">({percent}%)</span></span>;
                }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-[40px]">
            <div className="text-center">
                <span className="block text-[9px] text-[#a1a1aa] uppercase font-bold tracking-tighter">Total MV</span>
                <span className={`block text-lg font-heading font-black text-white ${isPrivacyMode ? 'blur-md' : ''}`}>
                    €{(totalValue / 1000).toFixed(1)}k
                </span>
            </div>
        </div>
      </div>
    </Card>
  );
}
