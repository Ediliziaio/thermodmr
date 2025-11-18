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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, KeyRound, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResetPasswordDialogProps {
  userId: string;
  userName: string;
  trigger?: React.ReactNode;
}

const ResetPasswordDialog = ({ userId, userName, trigger }: ResetPasswordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const response = await supabase.functions.invoke('reset-user-password', {
        body: { userId },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Errore durante il reset');
      }

      const { newPassword: generatedPassword } = response.data;
      setNewPassword(generatedPassword);

      toast({
        title: "✅ Password resettata",
        description: `La password di ${userName} è stata resettata con successo`,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Impossibile resettare la password",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  const copyToClipboard = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      toast({
        title: "Copiato!",
        description: "Password copiata negli appunti",
      });
    }
  };

  const handleClose = () => {
    setNewPassword(null);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger || (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <KeyRound className="h-4 w-4 mr-2" />
          Reset Password
        </Button>
      )}
      <AlertDialogContent className="max-w-md">
        {!newPassword ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Reset Password Utente
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>
                  Stai per resettare la password di <strong>{userName}</strong>.
                </p>
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    Verrà generata una nuova password temporanea che dovrai comunicare all'utente.
                    La vecchia password non funzionerà più.
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isResetting}>Annulla</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                disabled={isResetting}
                className="bg-primary"
              >
                {isResetting ? "Reset in corso..." : "Reset Password"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-green-600 dark:text-green-500">
                <KeyRound className="h-5 w-5" />
                Password Resettata
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  La password di <strong>{userName}</strong> è stata resettata con successo.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nuova Password Temporanea</Label>
                  <div className="flex gap-2">
                    <Input
                      id="new-password"
                      type="text"
                      value={newPassword}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Importante:</strong> Salva questa password e comunicala all'utente.
                    Non sarà più possibile recuperarla.
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleClose}>Chiudi</AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetPasswordDialog;
