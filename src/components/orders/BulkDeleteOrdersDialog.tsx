import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBulkDeleteOrders } from "@/hooks/useOrders";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BulkDeleteOrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrderIds: string[];
  onSuccess: () => void;
}

export function BulkDeleteOrdersDialog({
  open,
  onOpenChange,
  selectedOrderIds,
  onSuccess,
}: BulkDeleteOrdersDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [acknowledgeWarning, setAcknowledgeWarning] = useState(false);
  const bulkDelete = useBulkDeleteOrders();

  const handleSubmit = async () => {
    if (confirmText !== "ELIMINA" || !acknowledgeWarning) return;

    await bulkDelete.mutateAsync({
      orderIds: selectedOrderIds,
    });

    onSuccess();
    onOpenChange(false);
    setConfirmText("");
    setAcknowledgeWarning(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setConfirmText("");
    setAcknowledgeWarning(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Elimina Ordini - Azione Irreversibile
          </DialogTitle>
          <DialogDescription>
            Questa azione eliminerà permanentemente {selectedOrderIds.length} {selectedOrderIds.length === 1 ? "ordine" : "ordini"} e tutti i dati associati.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>ATTENZIONE:</strong> Questa azione è irreversibile e cancellerà:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Gli ordini selezionati</li>
                <li>Tutte le righe d'ordine associate</li>
                <li>I pagamenti registrati</li>
                <li>Gli allegati caricati</li>
                <li>Le provvigioni calcolate</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium mb-2">
              Ordini da eliminare: <span className="text-destructive">{selectedOrderIds.length}</span>
            </p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedOrderIds.slice(0, 10).map(id => (
                <p key={id} className="text-xs text-muted-foreground">• {id}</p>
              ))}
              {selectedOrderIds.length > 10 && (
                <p className="text-xs text-muted-foreground italic">
                  ... e altri {selectedOrderIds.length - 10} ordini
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox
                id="acknowledge"
                checked={acknowledgeWarning}
                onCheckedChange={(checked) => setAcknowledgeWarning(checked as boolean)}
              />
              <Label 
                htmlFor="acknowledge" 
                className="text-sm font-normal leading-tight cursor-pointer"
              >
                Comprendo che questa azione è irreversibile e cancellerà permanentemente tutti i dati associati
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-sm">
                Per confermare, digita <span className="font-mono font-bold">ELIMINA</span>
              </Label>
              <input
                id="confirm-text"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-destructive"
                placeholder="Digita ELIMINA"
                disabled={bulkDelete.isPending || !acknowledgeWarning}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={bulkDelete.isPending}
          >
            Annulla
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={confirmText !== "ELIMINA" || !acknowledgeWarning || bulkDelete.isPending}
          >
            {bulkDelete.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Elimina {selectedOrderIds.length} {selectedOrderIds.length === 1 ? 'Ordine' : 'Ordini'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
