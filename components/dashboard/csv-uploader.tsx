"use client";

import React, { useCallback, useRef, useState } from "react";
import Papa from "papaparse";
import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { parseBuxCsv } from "@/lib/parsers/bux";
import { dedupTransactions } from "@/lib/utils/dedup";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { useRouter } from "next/navigation";

export function CsvUploader() {
  const { transactions, setTransactions } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const processFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rawTransactions = parseBuxCsv(results.data);
          
          const merged = [...transactions, ...rawTransactions];
          const deduped = dedupTransactions(merged);

          deduped.sort((a, b) => new Date(a.transactionTime).getTime() - new Date(b.transactionTime).getTime());

          setTransactions(deduped);
          
          // Auto-direct user to visual dashboard!
          router.push("/");
        } catch (error) {
          console.error("Error parsing BUX CSV:", error);
          alert("Failed to parse BUX CSV. See console for details.");
        }
      },
      error: (error) => {
        console.error("PapaParse error:", error);
        alert("Failed to read the file.");
      }
    });
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [transactions]); // Need transactions in deps to merge them

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <Card 
      onClick={() => fileInputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`border-dashed cursor-pointer border-2 transition-all p-12 flex flex-col items-center justify-center gap-4 bg-[#1A1D21] 
        ${isHovering ? "border-[#2979FF] bg-[#2979FF]/5" : "border-[#3f3f46] hover:border-[#C0C0C0] hover:bg-[#3f3f46]/20"}`}
    >
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={onFileChange} 
      />
      
      <div className={`p-4 rounded-full transition-colors ${isHovering ? "bg-[#2979FF]/20" : "bg-[#2D3139]"}`}>
        <UploadCloud className={`w-8 h-8 ${isHovering ? "text-[#2979FF]" : "text-[#C0C0C0]"}`} />
      </div>

      <div className="text-center">
        <h3 className="font-heading font-semibold text-[#e1e2e7] text-lg">Upload BUX Export</h3>
        <p className="font-sans text-sm text-[#a1a1aa] mt-1">Drag and drop your transaction CSV here, or click to browse</p>
      </div>

      <div className="mt-4 flex gap-2">
         {transactions.length > 0 && (
           <span className="font-sans text-xs bg-[#2979FF]/10 text-[#2979FF] px-2 py-1 rounded">
             {transactions.length} records loaded. Drop another to merge.
           </span>
         )}
      </div>
    </Card>
  );
}
