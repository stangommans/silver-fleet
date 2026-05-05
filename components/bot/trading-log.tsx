"use client";

import { LogEntry } from "@/hooks/use-trading-bot";
import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface TradingLogProps {
  logs: LogEntry[];
}

export function TradingLog({ logs }: TradingLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Newest are at top in the state, but we can reverse it or just show top
    }
  }, [logs]);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "INFO": return "text-blue-400";
      case "WARN": return "text-yellow-400";
      case "ERROR": return "text-red-400";
      case "SIGNAL": return "text-emerald-400 font-bold";
      default: return "text-white";
    }
  };

  return (
    <div className="bg-[#0B0E11] border border-[#2D3139] rounded-xl overflow-hidden flex flex-col h-[500px]">
      {/* Terminal Header */}
      <div className="bg-[#1A1D21] border-b border-[#2D3139] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#C0C0C0]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0C0C0]">Bot Execution Log</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5252]/20 border border-[#FF5252]/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFAB00]/20 border border-[#FFAB00]/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E676]/20 border border-[#00E676]/40" />
        </div>
      </div>

      {/* Log Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-[11px] selection:bg-[#2979FF]/30"
      >
        <div className="flex flex-col-reverse gap-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 group animate-in fade-in slide-in-from-left-1 duration-300">
              <span className="text-[#515761] shrink-0">
                [{log.timestamp.toLocaleTimeString()}]
              </span>
              <span className={`shrink-0 w-12 ${getLevelColor(log.level)}`}>
                {log.level}
              </span>
              <span className="text-[#e1e2e7] break-all group-hover:text-white transition-colors">
                {log.message}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-[#515761] italic">
              No logs available. Start the bot to begin execution...
            </div>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="bg-[#1A1D21] border-t border-[#2D3139] px-4 py-1.5 text-[9px] text-[#515761] flex justify-between">
        <span>STDOUT / STDERR REDIRECTED</span>
        <span className="animate-pulse">_ LINE 00:00:00</span>
      </div>
    </div>
  );
}
