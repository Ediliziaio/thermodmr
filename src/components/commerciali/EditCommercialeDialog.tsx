import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";
import { useUpdateCommerciale } from "@/hooks/useCommerciali";

interface EditCommercialeDialogProps {
  commercialeId: string;
  currentEmail: string;
  currentDisplayName: string;
  currentIsActive: boolean;
}

export function EditCommercialeDialog({
  commercialeId,
  currentEmail,
  currentDisplayName,
  currentIsActive,
}: EditCommercialeDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [isActive, setIsActive] = useState(currentIsActive);
  const { mutate: updateCommerciale, isPending } = useUpdateCommerciale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateCommerciale(
      {
        user_id: commercialeId,
        email: email !== currentEmail ? email : undefined,
        display_name: displayName !== currentDisplayName ? displayName : undefined,
        is_active: isActive !== currentIsActive ? isActive : undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica Commerciale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display_name">Nome</Label>
            <Input
              id="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is_active">Stato Attivo</Label>
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
