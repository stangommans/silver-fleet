"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PieChart, Bot, UploadCloud } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { name: "Dash", href: "/", icon: LayoutDashboard },
    { name: "Matrix", href: "/assets", icon: PieChart },
    { name: "Bot", href: "/bot", icon: Bot },
    { name: "Import", href: "/import", icon: UploadCloud },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1A1D21] border-t border-[#2D3139] px-6 flex items-center justify-between z-50">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 transition-all
              ${isActive ? "text-[#2979FF]" : "text-[#a1a1aa] opacity-70 hover:opacity-100"}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
