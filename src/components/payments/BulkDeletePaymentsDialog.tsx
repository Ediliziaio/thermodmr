import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

interface BulkDeletePaymentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPaymentIds: string[];
  onConfirm: () => void;
  isPending: boolean;
}

export function BulkDeletePaymentsDialog({
  open,
  onOpenChange,
  selectedPaymentIds,
  onConfirm,
  isPending,
}: BulkDeletePaymentsDialogProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [typedText, setTypedText] = useState("");

  const handleConfirm = () => {
    if (typedText === "ELIMINA" && confirmed) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setConfirmed(false);
    setTypedText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Elimina {selectedPaymentIds.length} Pagamenti
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Stai per eliminare <strong>{selectedPaymentIds.length}</strong> pagamenti.
            Questa azione è <strong>IRREVERSIBILE</strong> e aggiornerà automaticamente 
            gli importi pagati degli ordini collegati.
          </p>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <p className="font-medium mb-2">⚠️ Attenzione</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Gli importi "Da Pagare" degli ordini aumenteranno</li>
                <li>Le statistiche verranno ricalcolate</li>
                <li>Non sarà possibile recuperare i dati eliminati</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Conferma con checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(!!checked)}
            />
            <label htmlFor="confirm" className="text-sm cursor-pointer">
              Confermo di voler eliminare questi pagamenti
            </label>
          </div>

          {/* Conferma con testo "ELIMINA" */}
          {confirmed && (
            <div className="space-y-2">
              <Label>Digita "ELIMINA" per confermare</Label>
              <Input
                value={typedText}
                onChange={(e) => setTypedText(e.target.value.toUpperCase())}
                placeholder="ELIMINA"
                className="font-mono"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isPending}>
            Annulla
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!confirmed || typedText !== "ELIMINA" || isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Elimina {selectedPaymentIds.length} Pagamenti
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
