"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { BuxTransaction } from "@/lib/parsers/bux";

export function ManualTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { addManualTransaction } = usePortfolio();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [assetName, setAssetName] = useState("");
  const [assetId, setAssetId] = useState("");
  const [tradeType, setTradeType] = useState("Buy Trade");
  const [quantity, setQuantity] = useState("");
  const [totalValue, setTotalValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // The math engine calculates "value invested" using transactionAmount (CASH_DEBIT)
    // Buy Trades are negative cash amounts in BUX, so we flip the user's positive input to negative if it's a Buy.
    const qtyNum = parseFloat(quantity) || 0;
    const valueNum = parseFloat(totalValue) || 0;
    const isBuy = tradeType === "Buy Trade";
    
    const transactionAmount = isBuy ? -Math.abs(valueNum) : Math.abs(valueNum);
    const transferType = isBuy ? "CASH_DEBIT" : "CASH_CREDIT";

    const newTx: BuxTransaction = {
      transactionTime: new Date(date).toISOString(),
      transactionCategory: "Manual Entry",
      transactionType: tradeType,
      transferType: transferType,
      transactionAmount: transactionAmount,
      transactionCurrency: "EUR",
      cashBalanceAmount: null, // We do not modify cash balances for external assets
      assetId: assetId.toUpperCase(),
      assetName: assetName,
      assetQuantity: qtyNum,
      assetPrice: qtyNum > 0 ? valueNum / qtyNum : 0,
      assetCurrency: "EUR",
      currencyPair: "",
      exchangeRate: null,
      profitAndLossAmount: null,
      profitAndLossCurrency: "",
      dividendCurrency: "",
      dividendGrossAmount: null,
      dividendNetAmount: null,
      dividendTaxAmount: null,
      transactionDescription: "Added manually via Dashboard",
    };

    addManualTransaction(newTx);
    setIsOpen(false);
    
    // Reset Form
    setAssetName("");
    setAssetId("");
    setQuantity("");
    setTotalValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-2 bg-[#2979FF] hover:bg-[#2979FF]/90 text-white px-3 py-1.5 rounded transition-colors text-xs font-semibold">
        <Plus className="w-4 h-4" />
        <span>Add Custom Asset</span>
      </DialogTrigger>
      
      <DialogContent className="bg-[#1A1D21] border-[#2D3139] text-[#e1e2e7] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading tracking-tight text-white">Manual Transaction Entry</DialogTitle>
          <DialogDescription className="text-[#a1a1aa] text-xs">
            Insert non-BUX assets (e.g. Traditional Broker, Crypto) directly into the mathematical engine.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Trade Type</Label>
              <Select value={tradeType} onValueChange={(val) => { if (val) setTradeType(val) }}>
                <SelectTrigger className="bg-[#0B0E11] border-[#2D3139] shadow-none h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1D21] border-[#2D3139] text-white">
                  <SelectItem value="Buy Trade">Buy</SelectItem>
                  <SelectItem value="Sell Trade">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Date & Time</Label>
              <Input 
                type="datetime-local" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#0B0E11] border-[#2D3139] h-9 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Asset Ticker</Label>
              <Input 
                placeholder="e.g. BTC" 
                value={assetId} 
                onChange={(e) => setAssetId(e.target.value)}
                className="bg-[#0B0E11] border-[#2D3139] h-9 text-sm uppercase" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Asset Name</Label>
              <Input 
                placeholder="e.g. Bitcoin" 
                value={assetName} 
                onChange={(e) => setAssetName(e.target.value)}
                className="bg-[#0B0E11] border-[#2D3139] h-9 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Quantity</Label>
              <Input 
                type="number" 
                step="any"
                min="0"
                placeholder="0.00" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-[#0B0E11] border-[#2D3139] h-9 text-sm font-mono" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-[#a1a1aa] font-semibold uppercase tracking-widest">Total Value (EUR)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#a1a1aa] text-sm font-mono">€</span>
                <Input 
                  type="number" 
                  step="any"
                  min="0"
                  placeholder="0.00" 
                  value={totalValue} 
                  onChange={(e) => setTotalValue(e.target.value)}
                  className="bg-[#0B0E11] border-[#2D3139] h-9 text-sm pl-7 font-mono" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-semibold text-sm px-4 py-2 rounded transition-colors"
            >
              Simulate & Inject
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
