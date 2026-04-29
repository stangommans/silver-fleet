"use client";

import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { usePortfolio } from '@/components/providers/portfolio-provider';
import { MetricsBar } from '@/components/dashboard/metrics-bar';
import { ManualTransactionModal } from '@/components/manual-entry/manual-transaction-modal';
import { AlertTriangle } from 'lucide-react';
import { AllocationChart } from "@/components/dashboard/allocation-chart";

export default function Home() {
  const { transactions, totalInvested, cashBalance, holdings, livePortfolioValue, livePrices, fxRates, totalDividends, totalLending } = usePortfolio();

  return (
    <div className="flex flex-col gap-8 font-sans">
        
      <header className="border-b border-[#2D3139] pb-6">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-white mb-2">Executive Overview</h1>
        <p className="text-[#a1a1aa] text-sm">Real-time portfolio metrics and macro performance indicators.</p>
      </header>

      {transactions.length === 0 ? (
        <div className="mt-12 max-w-2xl mx-auto w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#3f3f46] rounded-lg bg-[#1A1D21]">
          <div className="p-4 rounded-full bg-[#2D3139] mb-4">
            <UploadCloud className="w-8 h-8 text-[#C0C0C0]" />
          </div>
          <h3 className="font-heading font-semibold text-[#e1e2e7] text-lg">No Portfolio Data Found</h3>
          <p className="text-sm text-[#a1a1aa] mt-2 mb-6 text-center">To calculate metrics, you must first import a BUX transaction export into the engine.</p>
          <Link href="/import" className="bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-medium px-4 py-2 rounded transition-colors text-sm">
            Go to CSV Import
          </Link>
        </div>
      ) : (
        <>
          {/* Top Level Metrics */}
          <MetricsBar totalInvested={totalInvested} cashBalance={cashBalance} livePortfolioValue={livePortfolioValue} totalDividends={totalDividends} totalLending={totalLending} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <AllocationChart />
              </div>

              <div className="flex flex-col gap-6">
                {/* Active Holdings List */}
                <div className="bg-[#1A1D21] border border-[#3f3f46] p-4 rounded flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] uppercase tracking-widest font-heading font-bold text-[#a1a1aa]">Active Holdings Matrix</h3>
                    <ManualTransactionModal />
                  </div>
                  
                  {Object.entries(holdings).length === 0 ? (
                    <p className="text-[#a1a1aa] text-sm mt-4 italic">No open positions.</p>
                  ) : (
                    <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {Object.entries(holdings).map(([assetId, data]) => {
                        const priceData = livePrices[assetId];
                        const isLive = priceData != null;
                        
                        let liveValueEur = data.totalInvested;
                        if (isLive) {
                          const rate = fxRates[priceData.currency] || 1;
                          liveValueEur = (priceData.price * rate) * data.quantity;
                        }
                        
                        const isProfitable = liveValueEur >= data.totalInvested;

                        return (
                          <li key={assetId} className="flex justify-between items-center pb-2 border-b border-[#2D3139] last:border-0 hover:bg-[#262A31] -mx-4 px-4 py-2 transition-colors">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <p className="font-bold text-white text-[13px] truncate max-w-[140px]">{data.assetName}</p>
                                {!isLive && (
                                  <span title="The Yahoo Finance price for this asset could not be resolved. Falling back to the original Cost Basis value. You can add a ticker alias in Settings.">
                                    <AlertTriangle className="w-3 h-3 text-yellow-500 cursor-help" />
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#a1a1aa] font-mono tracking-wider">{assetId}</p>
                              <p className="font-mono text-[10px] text-[#2979FF]/80 mt-1">Cost: €{data.totalInvested.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className={`font-mono text-[13px] font-semibold privacy-mask ${isLive ? (isProfitable ? 'text-[#00E676]' : 'text-[#FF5252]') : 'text-[#c2c6d7]'}`}>
                                €{liveValueEur.toFixed(2)}
                              </p>
                              {data.quantity > 0 && (
                                <p className="font-mono text-[10px] text-[#a1a1aa] mt-0.5 privacy-mask">
                                  {data.quantity.toFixed(2)} units 
                                  {isLive && ` @ ${priceData.currency === 'USD' ? '$' : (priceData.currency === 'EUR' ? '€' : priceData.currency)}${priceData.price.toFixed(2)}`}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
}
