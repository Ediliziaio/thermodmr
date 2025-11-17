import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ColumnOption {
  key: string;
  label: string;
  defaultSelected: boolean;
}

interface ExportColumnsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnOption[];
  data: any[];
  filename: string;
  onExport: (selectedColumns: string[], data: any[]) => void;
}

export function ExportColumnsDialog({
  open,
  onOpenChange,
  columns,
  data,
  filename,
  onExport,
}: ExportColumnsDialogProps) {
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    () => new Set(columns.filter(c => c.defaultSelected).map(c => c.key))
  );

  const handleToggleColumn = (key: string) => {
    setSelectedColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedColumns(new Set(columns.map(c => c.key)));
  };

  const handleDeselectAll = () => {
    setSelectedColumns(new Set());
  };

  const handleExport = () => {
    if (selectedColumns.size === 0) {
      toast({
        title: "Nessuna colonna selezionata",
        description: "Seleziona almeno una colonna da esportare",
        variant: "destructive",
      });
      return;
    }

    if (data.length === 0) {
      toast({
        title: "Nessun dato da esportare",
        description: "Non ci sono record disponibili per l'export",
        variant: "destructive",
      });
      return;
    }

    const selectedColumnsArray = Array.from(selectedColumns);
    onExport(selectedColumnsArray, data);
    
    toast({
      title: "Export completato",
      description: `Esportati ${data.length} record in ${filename}.csv`,
    });

    onOpenChange(false);
  };

  const allSelected = selectedColumns.size === columns.length;
  const someSelected = selectedColumns.size > 0 && selectedColumns.size < columns.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Seleziona colonne da esportare</DialogTitle>
          <DialogDescription>
            Scegli quali colonne includere nel file CSV. Verranno esportati {data.length} record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedColumns.size} colonne selezionate
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={allSelected}
              >
                Seleziona tutto
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeselectAll}
                disabled={selectedColumns.size === 0}
              >
                Deseleziona tutto
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={column.key}
                    checked={selectedColumns.has(column.key)}
                    onCheckedChange={() => handleToggleColumn(column.key)}
                  />
                  <Label
                    htmlFor={column.key}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {column.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={handleExport} disabled={selectedColumns.size === 0}>
            <Download className="mr-2 h-4 w-4" />
            Esporta CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
