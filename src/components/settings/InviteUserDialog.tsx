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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InviteUserDialog = ({ open, onOpenChange }: InviteUserDialogProps) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);

  const generateSecurePassword = (): string => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return pwd;
  };

  const resetForm = () => {
    setEmail("");
    setDisplayName("");
    setRole("");
    setCreatedPassword(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiato!",
      description: "Password copiata negli appunti",
    });
  };

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
      // Genera sempre password temporanea sicura
      const tempPassword = generateSecurePassword();

      // Call create-user edge function
      const response = await supabase.functions.invoke('create-user', {
        body: {
          email,
          password: tempPassword,
          display_name: displayName,
          role,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Errore durante la creazione');
      }

      // Show success with password
      setCreatedPassword(tempPassword);
      
      toast({
        title: "✅ Utente creato con successo",
        description: `${displayName} è stato aggiunto al sistema`,
      });
      
      // Invalidate users query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile creare l'utente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crea Nuovo Utente</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del nuovo utente. L'account sarà attivo immediatamente.
          </DialogDescription>
        </DialogHeader>

        {createdPassword ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ⚠️ Salvare la password - sarà mostrata solo ora
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="p-2 bg-muted rounded text-sm">
                {email}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password Temporanea</Label>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                  {createdPassword}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(createdPassword)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Alert className="bg-amber-500/10 border-amber-500/20">
              <AlertDescription className="text-sm">
                L'utente può accedere immediatamente con queste credenziali. Consigliato cambiare la password al primo accesso.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="utente@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Nome Visualizzato *</Label>
              <Input
                id="displayName"
                placeholder="Mario Rossi"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Ruolo *</Label>
              <Select value={role} onValueChange={setRole} disabled={loading}>
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
        )}

        <DialogFooter>
          {createdPassword ? (
            <Button onClick={handleClose} className="w-full">
              Chiudi
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose} disabled={loading}>
                Annulla
              </Button>
              <Button onClick={handleInvite} disabled={loading}>
                {loading ? "Creazione..." : "Crea Utente"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;