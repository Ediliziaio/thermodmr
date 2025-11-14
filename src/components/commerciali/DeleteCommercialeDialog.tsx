import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useCommerciali, useDeleteCommerciale, CommercialeStats } from "@/hooks/useCommerciali";

interface DeleteCommercialeDialogProps {
  commerciale: CommercialeStats;
}

export const DeleteCommercialeDialog = ({ commerciale }: DeleteCommercialeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [transferToId, setTransferToId] = useState<string>("");
  const { data: commerciali = [] } = useCommerciali();
  const deleteCommerciale = useDeleteCommerciale();

  const availableCommerciali = commerciali.filter(
    (c) => c.id !== commerciale.id && c.is_active
  );

  const handleDelete = async () => {
    if (!transferToId) return;

    await deleteCommerciale.mutateAsync({
      commerciale_id: commerciale.id,
      transfer_to_commerciale_id: transferToId,
    });

    setOpen(false);
    setTransferToId("");
  };

  const hasDealers = commerciale.dealers_count > 0;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elimina Commerciale</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              Sei sicuro di voler eliminare <strong>{commerciale.display_name}</strong>?
            </p>
            {hasDealers && (
              <>
                <p className="text-destructive font-medium">
                  Attenzione: questo commerciale ha {commerciale.dealers_count} dealer{commerciale.dealers_count !== 1 ? 's' : ''} assegnati.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="transfer-to">
                    Trasferisci i dealers a: <span className="text-destructive">*</span>
                  </Label>
                  <Select value={transferToId} onValueChange={setTransferToId}>
                    <SelectTrigger id="transfer-to">
                      <SelectValue placeholder="Seleziona commerciale" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCommerciali.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.display_name} ({c.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <p className="text-muted-foreground text-sm">
              Questa azione è irreversibile.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={hasDealers && !transferToId}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteCommerciale.isPending ? "Eliminazione..." : "Elimina"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
