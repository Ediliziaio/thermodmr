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
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BulkDeleteDealersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dealerIds: string[];
  onSuccess?: () => void;
}

export function BulkDeleteDealersDialog({
  open,
  onOpenChange,
  dealerIds,
  onSuccess,
}: BulkDeleteDealersDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const queryClient = useQueryClient();

  // Check if dealers have orders
  const checkOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("id")
      .in("dealer_id", dealerIds)
      .limit(1);
    
    setHasOrders((data?.length || 0) > 0);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("dealers")
        .delete()
        .in("id", dealerIds);

      if (error) throw error;

      toast({ title: `${dealerIds.length} rivenditori eliminati con successo` });
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error deleting dealers:", error);
      toast({ title: error.message || "Errore durante l'eliminazione", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={checkOrders}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Conferma Eliminazione Multipla
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Stai per eliminare <strong>{dealerIds.length} rivenditori</strong>.
              Questa azione è irreversibile.
            </p>

            {hasOrders && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Alcuni rivenditori selezionati hanno ordini associati.
                  L'eliminazione potrebbe fallire per vincoli di integrità del database.
                </AlertDescription>
              </Alert>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Annulla
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminazione...
              </>
            ) : (
              "Elimina Tutti"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
