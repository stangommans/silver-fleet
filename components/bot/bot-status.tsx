"use client";

import { BotStatus as BotStatusType } from "@/hooks/use-trading-bot";
import { Activity, Clock, Cpu, ShieldCheck } from "lucide-react";

interface BotStatusProps {
  status: BotStatusType;
  uptime: number;
}

export function BotStatus({ status, uptime }: BotStatusProps) {
  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (s: BotStatusType) => {
    switch (s) {
      case "IDLE": return "text-[#a1a1aa] bg-[#262A31]";
      case "SCANNING": return "text-[#2979FF] bg-[#2979FF]/10";
      case "ANALYZING": return "text-[#AA00FF] bg-[#AA00FF]/10";
      case "TRADING": return "text-[#00E676] bg-[#00E676]/10";
      case "PAUSED": return "text-[#FFAB00] bg-[#FFAB00]/10";
      case "ERROR": return "text-[#FF5252] bg-[#FF5252]/10";
      default: return "text-white bg-gray-500";
    }
  };

  const getStatusIcon = (s: BotStatusType) => {
    switch (s) {
      case "IDLE": return <ShieldCheck className="w-4 h-4" />;
      case "SCANNING": return <Activity className="w-4 h-4 animate-pulse" />;
      case "ANALYZING": return <Cpu className="w-4 h-4 animate-spin-slow" />;
      case "TRADING": return <Activity className="w-4 h-4 animate-bounce" />;
      case "PAUSED": return <ShieldCheck className="w-4 h-4" />;
      case "ERROR": return <ShieldCheck className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Bot Mode */}
      <div className="bg-[#1A1D21] border border-[#2D3139] p-4 rounded-xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Operational Mode</span>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-[11px] font-black tracking-tighter flex items-center gap-1.5 ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              {status}
            </div>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#262A31] flex items-center justify-center border border-[#2D3139]">
          <Cpu className="w-5 h-5 text-[#C0C0C0]" />
        </div>
      </div>

      {/* Uptime */}
      <div className="bg-[#1A1D21] border border-[#2D3139] p-4 rounded-xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Session Uptime</span>
          <span className="text-xl font-mono font-black text-white">{formatUptime(uptime)}</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#262A31] flex items-center justify-center border border-[#2D3139]">
          <Clock className="w-5 h-5 text-[#C0C0C0]" />
        </div>
      </div>

      {/* Strategy */}
      <div className="bg-[#1A1D21] border border-[#2D3139] p-4 rounded-xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Active Strategy</span>
          <span className="text-sm font-black text-[#2979FF] tracking-tight italic">"VOC Swing Hunter v1.0"</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#262A31] flex items-center justify-center border border-[#2D3139]">
          <ShieldCheck className="w-5 h-5 text-[#C0C0C0]" />
        </div>
      </div>
    </div>
  );
}
