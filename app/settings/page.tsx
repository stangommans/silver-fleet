"use client";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { useState } from "react";
import { Save, Plus, Trash2, HelpCircle, Search, ExternalLink, Zap, Loader2 } from "lucide-react";
import { discoverAssets } from "@/app/actions/prices";

export default function SettingsPage() {
  const { tickerAliases, updateTickerAlias, holdings } = usePortfolio();
  const [newAssetId, setNewAssetId] = useState("");
  const [newAlias, setNewAlias] = useState("");
  const [isDiscovering, setIsDiscovering] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssetId && newAlias) {
      updateTickerAlias(newAssetId.trim().toUpperCase(), newAlias.trim().toUpperCase());
      setNewAssetId("");
      setNewAlias("");
    }
  };

  const activeHoldings = Object.entries(holdings)
    .filter(([_, h]) => h.quantity > 0)
    .sort((a, b) => a[1].assetName.localeCompare(b[1].assetName));

  const unmappedAssetIds = activeHoldings
    .filter(([id]) => !tickerAliases[id])
    .map(([id]) => id);

  const handleAutoDiscovery = async () => {
    if (unmappedAssetIds.length === 0) return;
    
    setIsDiscovering(true);
    try {
        const discovered = await discoverAssets(unmappedAssetIds);
        Object.entries(discovered).forEach(([assetId, symbol]) => {
            updateTickerAlias(assetId, symbol);
        });
    } finally {
        setIsDiscovering(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 font-sans max-w-4xl">
      <header className="border-b border-[#2D3139] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-white mb-2">Engine Settings</h1>
          <p className="text-[#a1a1aa] text-sm">Configure data source overrides and market mapping aliases.</p>
        </div>

        {unmappedAssetIds.length > 0 && (
            <button 
                onClick={handleAutoDiscovery}
                disabled={isDiscovering}
                className="bg-[#00E676] hover:bg-[#00E676]/90 disabled:opacity-50 text-[#121417] font-bold px-4 py-2 rounded text-xs flex items-center gap-2 transition-all active:scale-95"
            >
                {isDiscovering ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                Complete auto mapping ({unmappedAssetIds.length} left)
            </button>
        )}
      </header>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
            <h2 className="text-xl font-heading font-semibold text-white">Ticker Aliases</h2>
            <p className="text-sm text-[#a1a1aa]">
                The engine uses these mappings to resolve Yahoo Finance prices for assets that don't have a direct ISIN match.
            </p>
        </div>

        <div className="bg-[#1A1D21] border border-[#2D3139] rounded-lg p-6">
            <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-[#262A31] rounded border border-[#3f3f46]">
                <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#a1a1aa] ml-1">Asset ID / ISIN</label>
                    <input 
                        type="text" 
                        placeholder="e.g. US60741F1049" 
                        className="bg-[#1A1D21] border border-[#2D3139] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2979FF]"
                        value={newAssetId}
                        onChange={e => setNewAssetId(e.target.value)}
                    />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#a1a1aa] ml-1">Yahoo Ticker Alias</label>
                    <input 
                        type="text" 
                        placeholder="e.g. MBLY" 
                        className="bg-[#1A1D21] border border-[#2D3139] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2979FF]"
                        value={newAlias}
                        onChange={e => setNewAlias(e.target.value)}
                    />
                </div>
                <button 
                    type="submit"
                    disabled={!newAssetId || !newAlias}
                    className="md:mt-5 bg-[#2979FF] hover:bg-[#2979FF]/90 disabled:opacity-50 text-white font-bold px-6 py-2 rounded text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add Mapping
                </button>
            </form>

            <div className="flex flex-col gap-3">
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#a1a1aa] mb-1">Active Mappings</h3>
                {Object.entries(tickerAliases).length === 0 ? (
                    <div className="py-8 text-center border border-dashed border-[#2D3139] rounded text-[#a1a1aa] text-sm italic">
                        No custom aliases configured yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(tickerAliases).map(([id, alias]) => {
                            const [isEditing, setIsEditing] = useState(false);
                            const [editValue, setEditValue] = useState(alias);

                            const handleSaveEdit = () => {
                                updateTickerAlias(id, editValue.trim().toUpperCase());
                                setIsEditing(false);
                            };

                            return (
                                <div key={id} className="flex justify-between items-center bg-[#262A31] border border-[#2D3139] rounded p-3 group hover:border-[#3f3f46] transition-colors">
                                    <div className="flex flex-col flex-1">
                                        <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">{id}</span>
                                        {isEditing ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input 
                                                    autoFocus
                                                    className="bg-[#1A1D21] border border-[#2979FF] rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                                                    value={editValue}
                                                    onChange={e => setEditValue(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
                                                    onBlur={() => { if (editValue === alias) setIsEditing(false); }}
                                                />
                                                <button onClick={handleSaveEdit} className="text-[#00E676] hover:text-white"><Save className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                                {alias}
                                                <button onClick={() => setIsEditing(true)} className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Plus className="w-3 h-3 text-[#2979FF]" />
                                                </button>
                                                <a href={`https://finance.yahoo.com/quote/${alias}`} target="_blank" rel="noreferrer" className="text-[#a1a1aa] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => updateTickerAlias(id, "")}
                                        className="p-2 hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-500 rounded transition-colors"
                                        title="Delete Mapping"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-heading font-semibold text-white">Diagnostics</h2>
        <div className="bg-[#1A1D21] border border-[#2D3139] rounded-lg p-6">
            <h3 className="text-sm font-bold text-white mb-2">Unmapped Identified Assets</h3>
            <p className="text-xs text-[#a1a1aa] mb-4">The following assets are currently in your portfolio but do not have a live price. You might want to add an alias for them.</p>
            
            <div className="space-y-2">
                {activeHoldings.map(([id, h]) => {
                    const hasAlias = tickerAliases[id] != null;
                    if (hasAlias) return null;

                    return (
                        <div key={id} className="flex justify-between items-center bg-[#262A31]/50 border border-[#2D3139] rounded p-3">
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">{h.assetName}</span>
                                <span className="text-[10px] font-mono text-[#a1a1aa]">{id}</span>
                            </div>
                            <button 
                                onClick={() => {
                                    setNewAssetId(id);
                                    // Try to guess alias if it's not an ISIN
                                    if (id.length < 8) setNewAlias(id);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="text-[11px] font-bold text-[#2979FF] hover:underline"
                            >
                                Setup Alias
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    </div>
  );
}
