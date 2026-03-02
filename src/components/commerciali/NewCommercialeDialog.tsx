import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Check } from "lucide-react";
import { useCreateCommerciale } from "@/hooks/useCommerciali";
import { useToast } from "@/hooks/use-toast";

interface NewCommercialeDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function NewCommercialeDialog({ open, onOpenChange, children }: NewCommercialeDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const [formData, setFormData] = useState({ email: "", display_name: "" });
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const createCommerciale = useCreateCommerciale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCommerciale.mutate(formData, {
      onSuccess: (result) => {
        setFormData({ email: "", display_name: "" });
        if (result?.generated_password) {
          setGeneratedPassword(result.generated_password);
        } else {
          setIsOpen(false);
        }
      },
    });
  };

  const handleCopyPassword = async () => {
    if (!generatedPassword) return;
    await navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    toast({ title: "Password copiata negli appunti" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setGeneratedPassword(null);
      setCopied(false);
      setFormData({ email: "", display_name: "" });
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {children ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Commerciale
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {generatedPassword ? "Commerciale Creato" : "Crea Nuovo Commerciale"}
          </DialogTitle>
          <DialogDescription>
            {generatedPassword
              ? "Copia la password generata e condividila con il nuovo commerciale."
              : "Inserisci i dati del nuovo commerciale. La password verrà generata automaticamente."}
          </DialogDescription>
        </DialogHeader>

        {generatedPassword ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Password Generata</Label>
              <div className="flex gap-2">
                <Input value={generatedPassword} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={handleCopyPassword}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Questa password non sarà più visibile dopo la chiusura di questo dialog.
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleClose(false)}>Chiudi</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Nome Completo</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                placeholder="Mario Rossi"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="mario.rossi@example.com"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Annulla
              </Button>
              <Button type="submit" disabled={createCommerciale.isPending}>
                {createCommerciale.isPending ? "Creazione..." : "Crea Commerciale"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
