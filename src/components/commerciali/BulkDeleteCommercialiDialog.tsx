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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BulkDeleteCommercialiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commercialeIds: string[];
  onSuccess?: () => void;
}

export function BulkDeleteCommercialiDialog({
  open,
  onOpenChange,
  commercialeIds,
  onSuccess,
}: BulkDeleteCommercialiDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDealers, setHasDealers] = useState(false);
  const queryClient = useQueryClient();

  // Check if commerciali have dealers
  const checkDealers = async () => {
    const { data } = await supabase
      .from("dealers")
      .select("id")
      .in("commerciale_owner_id", commercialeIds)
      .limit(1);
    
    setHasDealers((data?.length || 0) > 0);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete from auth.users (cascade will handle profiles and user_roles)
      const { error } = await supabase.auth.admin.deleteUser(commercialeIds[0]);
      
      if (error) throw error;

      // For multiple users, delete sequentially
      for (let i = 1; i < commercialeIds.length; i++) {
        await supabase.auth.admin.deleteUser(commercialeIds[i]);
      }

      toast.success(`${commercialeIds.length} commerciali eliminati con successo`);
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error deleting commerciali:", error);
      toast.error(error.message || "Errore durante l'eliminazione");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={checkDealers}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Conferma Eliminazione Multipla
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Stai per eliminare <strong>{commercialeIds.length} commerciali</strong>.
              Questa azione è irreversibile e eliminerà anche i loro account utente.
            </p>

            {hasDealers && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Alcuni commerciali selezionati hanno rivenditori assegnati.
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
