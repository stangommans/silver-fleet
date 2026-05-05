"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, PieChart, UploadCloud, Settings, User, Eye, EyeOff, Bot } from "lucide-react";
import { usePortfolio } from "@/components/providers/portfolio-provider";

export function Sidebar() {
  const pathname = usePathname();
  const { isPrivacyMode, togglePrivacyMode } = usePortfolio();

  const links = [
    { name: "Executive Overview", href: "/", icon: LayoutDashboard },
    { name: "Holdings Matrix", href: "/assets", icon: PieChart },
    { name: "Trading Bot", href: "/bot", icon: Bot },
    { name: "CSV Data Import", href: "/import", icon: UploadCloud },
    { name: "System Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 border-r border-[#2D3139] bg-[#1A1D21] flex-col py-4 z-50">
      {/* Header */}
      <div className="px-6 mb-8 mt-2 flex flex-col gap-1">
        <h1 className="font-heading text-[#C0C0C0] text-lg font-black tracking-tighter">SILVER FLEET</h1>
        <span className="font-sans text-[#a1a1aa] text-[11px] font-bold uppercase tracking-widest">Long live the VOC</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1 px-3 flex-1 font-heading antialiased tracking-tight text-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-150
                ${
                  isActive
                    ? "bg-[#262A31] text-[#2979FF] border-r-2 border-[#2979FF]"
                    : "text-[#C0C0C0] opacity-70 hover:bg-[#262A31] hover:text-white hover:opacity-100"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Privacy Mode Toggle */}
      <div className="px-3 mb-2">
        <button 
            onClick={togglePrivacyMode}
            className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded text-[#a1a1aa] hover:bg-[#262A31] hover:text-white transition-all text-sm"
        >
            <div className="flex items-center gap-3">
                {isPrivacyMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="font-heading">Privacy Mode</span>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isPrivacyMode ? 'bg-[#00E676]/20 text-[#00E676]' : 'bg-[#2D3139] text-[#a1a1aa]'}`}>
                {isPrivacyMode ? 'ON' : 'OFF'}
            </span>
        </button>
      </div>

      {/* User Avatar Area (Bottom) */}
      <div className="px-6 flex items-center gap-3 pt-4 border-t border-[#2D3139]">
        <div className="w-8 h-8 rounded-full bg-[#111417] text-[#C0C0C0] flex items-center justify-center overflow-hidden border border-[#2D3139]">
          <User className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs text-[#e1e2e7] truncate w-32">Silver Fleet Executive</span>
          <span className="font-sans font-bold text-[#a1a1aa] tracking-widest text-[9px] uppercase">Admin</span>
        </div>
      </div>
    </nav>
  );
}
