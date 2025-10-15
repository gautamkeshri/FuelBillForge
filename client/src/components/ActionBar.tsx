import { Button } from "@/components/ui/button";
import { Printer, Download, RotateCcw } from "lucide-react";

interface ActionBarProps {
  onPrint: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export default function ActionBar({ onPrint, onDownload, onReset }: ActionBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background border-b p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Fuel Bill Generator</h1>
        <div className="flex items-center gap-2">
          <Button 
            onClick={onPrint} 
            variant="outline" 
            size="sm"
            data-testid="button-print"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button 
            onClick={onDownload} 
            variant="outline" 
            size="sm"
            data-testid="button-download"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline" 
            size="sm"
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
