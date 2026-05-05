"use client";

import type { BotStatus } from "@/hooks/use-trading-bot";
import { Play, Square, Pause, AlertTriangle } from "lucide-react";

interface BotControlsProps {
  status: BotStatus;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
}

export function BotControls({ status, onStart, onStop, onPause }: BotControlsProps) {
  const isRunning = status !== "IDLE" && status !== "PAUSED" && status !== "ERROR";
  const isPaused = status === "PAUSED";
  
  return (
    <div className="bg-[#1A1D21] border border-[#2D3139] p-4 rounded-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Bot Controls</span>
        {isRunning && (
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#00E676] animate-pulse">
            <div className="w-1 h-1 rounded-full bg-[#00E676]" />
            LIVE
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onStart}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded font-black text-xs transition-all
            ${isRunning 
              ? "bg-[#262A31] text-[#515761] cursor-not-allowed" 
              : "bg-[#00E676] text-black hover:bg-[#00c867] active:scale-95 shadow-[0_0_15px_rgba(0,230,118,0.2)]"
            }`}
        >
          <Play className={`w-4 h-4 ${isRunning ? "opacity-50" : "fill-current"}`} />
          {isPaused ? "RESUME ENGINE" : "START ENGINE"}
        </button>

        <button
          onClick={onPause}
          disabled={!isRunning}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded font-black text-xs transition-all
            ${!isRunning
              ? "bg-[#262A31] text-[#515761] cursor-not-allowed" 
              : "bg-[#FFAB00] text-black hover:bg-[#e69a00] active:scale-95"
            }`}
        >
          <Pause className={`w-4 h-4 ${!isRunning ? "opacity-50" : "fill-current"}`} />
          PAUSE
        </button>
      </div>

      <button
        onClick={onStop}
        disabled={status === "IDLE"}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded font-black text-xs transition-all border
          ${status === "IDLE"
            ? "bg-transparent border-[#2D3139] text-[#515761] cursor-not-allowed"
            : "bg-[#FF5252]/10 border-[#FF5252]/30 text-[#FF5252] hover:bg-[#FF5252]/20 active:scale-95"
          }`}
      >
        <Square className={`w-3.5 h-3.5 ${status === "IDLE" ? "opacity-50" : "fill-current"}`} />
        STOP ALL OPERATIONS
      </button>

      <div className="mt-2 p-3 bg-red-500/5 border border-red-500/20 rounded flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="text-[10px] text-red-500 font-bold uppercase tracking-tight">Emergency Kill Switch</span>
          <p className="text-[10px] text-[#FF5252]/70 leading-relaxed font-medium mt-0.5">
            Stopping operations will cancel all pending orders and halt analysis immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
