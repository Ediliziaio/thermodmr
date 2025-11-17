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
import { Trash2 } from "lucide-react";
import { useDeleteDealer, type DealerWithStats } from "@/hooks/useDealers";

interface DeleteDealerDialogProps {
  dealer: DealerWithStats;
  trigger?: React.ReactNode;
}

export function DeleteDealerDialog({ dealer, trigger }: DeleteDealerDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteDealer, isPending } = useDeleteDealer();

  const handleDelete = async () => {
    deleteDealer(dealer.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const hasOrders = (dealer.orders_count || 0) > 0;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elimina Rivenditore</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              Sei sicuro di voler eliminare{" "}
              <strong>{dealer.ragione_sociale}</strong>?
            </p>
            {hasOrders && (
              <p className="text-destructive font-medium">
                ⚠️ Attenzione: questo rivenditore ha {dealer.orders_count} ordini
                associati. L'eliminazione non è consigliata.
              </p>
            )}
            <p className="text-muted-foreground text-sm">
              Questa azione è irreversibile e eliminerà permanentemente tutti i dati
              del rivenditore.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Eliminazione..." : "Elimina"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
