import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silver Fleet",
  description: "Your Personal Investment Command Center",
};

import { PortfolioProvider } from "@/components/providers/portfolio-provider";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0E11] text-[#e1e2e7]">
        <PortfolioProvider>
          <Sidebar />
          <Topbar />
          <main className="pt-20 pb-20 md:pb-8 px-6 md:ml-64 max-w-[1600px] mx-auto min-h-screen w-full transition-all">
            {children}
          </main>
          <MobileNav />
        </PortfolioProvider>
      </body>
    </html>
  );
}
