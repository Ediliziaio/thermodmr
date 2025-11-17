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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InviteUserDialog = ({ open, onOpenChange }: InviteUserDialogProps) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email || !displayName || !role) {
      toast({
        title: "Campi mancanti",
        description: "Compila tutti i campi richiesti",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Note: This requires the assign-role edge function to be invoked
      // For now, we'll show a message that the user needs to sign up first
      toast({
        title: "Invito preparato",
        description: `Invia questo link di registrazione a ${displayName}: ${window.location.origin}/auth con email: ${email}. Dopo la registrazione, assegna il ruolo "${role}" da questa sezione.`,
      });
      
      onOpenChange(false);
      setEmail("");
      setDisplayName("");
      setRole("");
    } catch (error) {
      console.error("Error inviting user:", error);
      toast({
        title: "Errore",
        description: "Impossibile inviare l'invito",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invita Nuovo Utente</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del nuovo utente da invitare nel sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="utente@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Nome Visualizzato *</Label>
            <Input
              id="displayName"
              placeholder="Mario Rossi"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Ruolo *</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona un ruolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="commerciale">Commerciale</SelectItem>
                <SelectItem value="rivenditore">Rivenditore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={handleInvite} disabled={loading}>
            {loading ? "Invio..." : "Invia Invito"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;