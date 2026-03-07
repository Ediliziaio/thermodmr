import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useBulkUpdateOrderStatus } from "@/hooks/useOrders";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BulkUpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrderIds: string[];
  onSuccess: () => void;
}

const statusLabels: Record<string, string> = {
  da_confermare: "Da Confermare",
  da_pagare_acconto: "Da Pagare Acconto",
  in_lavorazione: "In Lavorazione",
  da_saldare: "Da Saldare",
  da_consegnare: "Da Consegnare",
  consegnato: "Consegnato",
};

export function BulkUpdateStatusDialog({
  open,
  onOpenChange,
  selectedOrderIds,
  onSuccess,
}: BulkUpdateStatusDialogProps) {
  const [newStatus, setNewStatus] = useState<string>("");
  const bulkUpdate = useBulkUpdateOrderStatus();

  const handleSubmit = async () => {
    if (!newStatus) return;

    await bulkUpdate.mutateAsync({
      orderIds: selectedOrderIds,
      stato: newStatus,
    });

    onSuccess();
    onOpenChange(false);
    setNewStatus("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setNewStatus("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiorna Stato Ordini</DialogTitle>
          <DialogDescription>
            Stai per aggiornare lo stato di {selectedOrderIds.length} {selectedOrderIds.length === 1 ? "ordine" : "ordini"}.
            Questa azione modificherà tutti gli ordini selezionati.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-status">Nuovo Stato</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger id="new-status">
                <SelectValue placeholder="Seleziona stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="da_confermare">Da Confermare</SelectItem>
                <SelectItem value="da_pagare_acconto">Da Pagare Acconto</SelectItem>
                <SelectItem value="in_lavorazione">In Lavorazione</SelectItem>
                <SelectItem value="da_saldare">Da Saldare</SelectItem>
                <SelectItem value="da_consegnare">Da Consegnare</SelectItem>
                <SelectItem value="consegnato">Consegnato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ordini selezionati:</strong> {selectedOrderIds.length}
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={bulkUpdate.isPending}
          >
            Annulla
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!newStatus || bulkUpdate.isPending}
          >
            {bulkUpdate.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Aggiorna {selectedOrderIds.length} {selectedOrderIds.length === 1 ? "Ordine" : "Ordini"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
