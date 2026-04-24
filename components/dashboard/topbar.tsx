import { Search, Bell, Activity, UserCircle } from "lucide-react";

export function Topbar() {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-14 border-b border-[#2D3139] bg-[#1A1D21]/95 backdrop-blur-md flex items-center justify-between px-6 z-40">
      {/* Search Bar (Left) */}
      <div className="flex-1 max-w-md flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Search className="w-[18px] h-[18px] text-[#C0C0C0]" />
          </div>
          <input 
            type="text" 
            placeholder="Search terminal..." 
            className="w-full bg-[#0B0E11] border border-[#2D3139] text-[#e1e2e7] text-sm rounded h-8 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-[#2979FF] focus:border-[#2979FF] transition-shadow placeholder:text-[#a1a1aa] font-sans" 
          />
        </div>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded text-[#C0C0C0] hover:text-[#2979FF]/80 transition-colors duration-200">
             <Activity className="w-5 h-5" />
          </button>
          <button className="p-1.5 rounded text-[#C0C0C0] hover:text-[#2979FF]/80 transition-colors duration-200">
             <UserCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
