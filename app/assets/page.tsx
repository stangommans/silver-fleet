"use client";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AlertTriangle, ArrowUpRight, ArrowDownRight, Search, ArrowUpDown, Filter } from "lucide-react";
import { useState, useMemo } from "react";

export default function AssetsPage() {
  const { holdings, livePrices, fxRates } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({ key: 'marketValueEur', direction: 'desc' });

  // 1. Process Raw Data into Sortable/Filterable Objects
  const processedData = useMemo(() => {
    return Object.entries(holdings).map(([id, data]) => {
        const priceData = livePrices[id];
        const isLive = priceData != null;
        
        let marketValueEur = data.totalInvested;
        let priceDisplay = "N/A";
        
        if (isLive) {
          const rate = fxRates[priceData.currency] || 1;
          marketValueEur = (priceData.price * rate) * data.quantity;
          priceDisplay = `${priceData.currency === 'USD' ? '$' : (priceData.currency === 'EUR' ? '€' : priceData.currency)}${priceData.price.toFixed(2)}`;
        }

        const rawProfit = marketValueEur - data.totalInvested;
        const profitPercent = data.totalInvested > 0 ? (rawProfit / data.totalInvested) * 100 : 0;

        return {
            id,
            ...data,
            isLive,
            marketValueEur,
            priceDisplay,
            rawProfit,
            profitPercent
        };
    });
  }, [holdings, livePrices, fxRates]);

  // 2. Apply Filters and Sorting
  const filteredHoldings = useMemo(() => {
    let result = [...processedData].filter(d => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = d.id.toLowerCase().includes(search) || d.assetName.toLowerCase().includes(search);
        const matchesActive = showOnlyActive ? d.quantity > 0 : true;
        return matchesSearch && matchesActive;
    });

    if (sortConfig) {
        result.sort((a: any, b: any) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return result;
  }, [processedData, searchTerm, showOnlyActive, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prev => {
        if (prev?.key === key) {
            return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
        }
        return { key, direction: 'desc' };
    });
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      <header className="border-b border-[#2D3139] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-white mb-2">Holdings Matrix</h1>
          <p className="text-[#a1a1aa] text-sm">Detailed inventory of all active and historical asset positions.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowOnlyActive(!showOnlyActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-colors border ${showOnlyActive ? 'bg-[#2979FF]/10 border-[#2979FF] text-[#2979FF]' : 'bg-[#1A1D21] border-[#2D3139] text-[#a1a1aa] hover:text-white'}`}
          >
            <Filter className="w-3.5 h-3.5" />
            {showOnlyActive ? 'Showing Active ONLY' : 'Showing ALL Positions'}
          </button>
          
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
             <input 
               type="text" 
               placeholder="Filter assets..." 
               className="w-full bg-[#1A1D21] border border-[#2D3139] rounded px-9 py-2 text-sm text-white focus:outline-none focus:border-[#2979FF] transition-colors"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>
      </header>

      <div className="bg-[#1A1D21] border border-[#2D3139] rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2D3139]/30 border-b border-[#2D3139] text-[10px] uppercase tracking-widest text-[#a1a1aa] font-bold">
              <th className="px-6 py-4 cursor-pointer hover:text-white group" onClick={() => handleSort('assetName')}>
                <div className="flex items-center gap-2">Asset <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white group" onClick={() => handleSort('quantity')}>
                <div className="flex items-center gap-2">Quantity <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
              <th className="px-6 py-4 text-right cursor-pointer hover:text-white group" onClick={() => handleSort('averageCostBasis')}>
                <div className="flex items-center justify-end gap-2">Avg. Cost <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
              <th className="px-6 py-4 text-right cursor-pointer hover:text-white group" onClick={() => handleSort('totalInvested')}>
                <div className="flex items-center justify-end gap-2">Invested <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right cursor-pointer hover:text-white group" onClick={() => handleSort('marketValueEur')}>
                <div className="flex items-center justify-end gap-2">Market Val <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
              <th className="px-6 py-4 text-right cursor-pointer hover:text-white group" onClick={() => handleSort('rawProfit')}>
                <div className="flex items-center justify-end gap-2">Yield <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3139]">
            {filteredHoldings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[#a1a1aa] italic text-sm">
                  No assets found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredHoldings.map((item) => {
                const isProfitable = item.rawProfit >= 0;

                return (
                  <tr key={item.id} className="hover:bg-[#262A31] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm truncate max-w-[240px]">{item.assetName}</span>
                          {!item.isLive && (
                             <span title="The Yahoo Finance price for this asset could not be resolved. Falling back to the original Cost Basis value.">
                               <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 cursor-help" />
                             </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#a1a1aa] font-mono tracking-widest uppercase">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm privacy-mask">{item.quantity.toFixed(4)}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm privacy-mask">€{item.averageCostBasis.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm privacy-mask">€{item.totalInvested.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-semibold privacy-mask">
                      {item.priceDisplay}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-bold text-white privacy-mask">
                      €{item.marketValueEur.toFixed(2)}
                      {!item.isLive && <span className="text-[10px] text-yellow-500/50 ml-1">(Cost)</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex flex-col items-end privacy-mask ${isProfitable ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                        <div className="flex items-center gap-1 font-mono text-sm font-bold">
                          {isProfitable ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          €{Math.abs(item.rawProfit).toFixed(2)}
                        </div>
                        <span className="text-[10px] font-mono opacity-80">
                          {isProfitable ? '+' : ''}{item.profitPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
