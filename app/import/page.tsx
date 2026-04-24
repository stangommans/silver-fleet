import { CsvUploader } from "@/components/dashboard/csv-uploader";

export default function ImportPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-[#2D3139] pb-6">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-white mb-2">CSV Data Import</h1>
        <p className="text-[#a1a1aa] text-sm">Upload your raw monthly BUX exports. Core math engine will deduplicate and compile the results automatically.</p>
      </header>
      
      <div className="mt-8 max-w-2xl w-full">
         <CsvUploader />
      </div>
    </div>
  );
}
