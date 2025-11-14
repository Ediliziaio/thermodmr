import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignDealerToCommerciale } from "@/hooks/useCommerciali";
import { useCommerciali } from "@/hooks/useCommerciali";
import { useCreateAuditLog } from "@/hooks/useAuditLog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AssignDealersDialogProps {
  dealerId: string;
  dealerName: string;
  currentCommercialeId: string;
  currentCommercialeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssignDealersDialog = ({
  dealerId,
  dealerName,
  currentCommercialeId,
  currentCommercialeName,
  open,
  onOpenChange,
}: AssignDealersDialogProps) => {
  const [newCommercialeId, setNewCommercialeId] = useState("");
  const [motivazione, setMotivazione] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: commerciali = [] } = useCommerciali();
  const assignMutation = useAssignDealerToCommerciale();
  const createAuditLog = useCreateAuditLog();

  const availableCommerciali = commerciali.filter(
    (c) => c.id !== currentCommercialeId && c.is_active
  );

  const handleAssign = async () => {
    if (!newCommercialeId) {
      toast({
        title: "Errore",
        description: "Seleziona un commerciale",
        variant: "destructive",
      });
      return;
    }

    if (!motivazione.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci una motivazione",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newCommerciale = commerciali.find((c) => c.id === newCommercialeId);

      // 1. Riassegna il dealer
      await assignMutation.mutateAsync({
        dealerId,
        commercialeId: newCommercialeId,
      });

      // 2. Log audit
      await createAuditLog.mutateAsync({
        entity: "dealers",
        entity_id: dealerId,
        azione: "riassegnazione",
        old_values: {
          commerciale_id: currentCommercialeId,
          commerciale_name: currentCommercialeName,
          motivazione,
        },
        new_values: {
          commerciale_id: newCommercialeId,
          commerciale_name: newCommerciale?.display_name,
          motivazione,
        },
      });

      // 3. Invia notifiche email
      try {
        await supabase.functions.invoke("notify-dealer-reassignment", {
          body: {
            dealerId,
            dealerName,
            oldCommercialeId: currentCommercialeId,
            oldCommercialeName: currentCommercialeName,
            newCommercialeId,
            newCommercialeName: newCommerciale?.display_name,
            motivazione,
          },
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Non blocchiamo l'operazione se l'email fallisce
      }

      toast({
        title: "Dealer riassegnato",
        description: `${dealerName} è stato riassegnato con successo a ${newCommerciale?.display_name}`,
      });

      onOpenChange(false);
      setNewCommercialeId("");
      setMotivazione("");
    } catch (error) {
      console.error("Failed to reassign dealer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Riassegna Dealer</DialogTitle>
          <DialogDescription>
            Riassegna <span className="font-semibold">{dealerName}</span> da{" "}
            <span className="font-semibold">{currentCommercialeName}</span> a un altro
            commerciale.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="commerciale">Nuovo Commerciale</Label>
            <Select value={newCommercialeId} onValueChange={setNewCommercialeId}>
              <SelectTrigger id="commerciale">
                <SelectValue placeholder="Seleziona commerciale" />
              </SelectTrigger>
              <SelectContent>
                {availableCommerciali.map((commerciale) => (
                  <SelectItem key={commerciale.id} value={commerciale.id}>
                    {commerciale.display_name} ({commerciale.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivazione">Motivazione *</Label>
            <Textarea
              id="motivazione"
              placeholder="Inserisci la motivazione della riassegnazione..."
              value={motivazione}
              onChange={(e) => setMotivazione(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {motivazione.length}/500 caratteri
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setNewCommercialeId("");
              setMotivazione("");
            }}
            disabled={isSubmitting}
          >
            Annulla
          </Button>
          <Button onClick={handleAssign} disabled={isSubmitting}>
            {isSubmitting ? "Riassegnazione..." : "Conferma Riassegnazione"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
