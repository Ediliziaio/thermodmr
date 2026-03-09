import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useCreateDealer } from "@/hooks/useDealers";
import { useAuth } from "@/contexts/AuthContext";

interface NewDealerDialogProps {
  trigger?: React.ReactNode;
}

export default function NewDealerDialog({ trigger }: NewDealerDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const createDealer = useCreateDealer();

  const [formData, setFormData] = useState({
    ragione_sociale: "",
    p_iva: "",
    codice_fiscale: "",
    email: "",
    telefono: "",
    indirizzo: "",
    citta: "",
    cap: "",
    provincia: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;

    await createDealer.mutateAsync({
      ...formData,
      commerciale_owner_id: user.id,
    });

    setFormData({
      ragione_sociale: "",
      p_iva: "",
      codice_fiscale: "",
      email: "",
      telefono: "",
      indirizzo: "",
      citta: "",
      cap: "",
      provincia: "",
      note: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Rivenditore
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuovo Rivenditore</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="ragione_sociale">Ragione Sociale *</Label>
              <Input
                id="ragione_sociale"
                value={formData.ragione_sociale}
                onChange={(e) => setFormData({ ...formData, ragione_sociale: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="p_iva">Partita IVA *</Label>
              <Input
                id="p_iva"
                value={formData.p_iva}
                onChange={(e) => setFormData({ ...formData, p_iva: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="codice_fiscale">Codice Fiscale *</Label>
              <Input
                id="codice_fiscale"
                value={formData.codice_fiscale}
                onChange={(e) => setFormData({ ...formData, codice_fiscale: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono">Telefono *</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="indirizzo">Indirizzo *</Label>
              <Input
                id="indirizzo"
                value={formData.indirizzo}
                onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="citta">Città *</Label>
              <Input
                id="citta"
                value={formData.citta}
                onChange={(e) => setFormData({ ...formData, citta: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="cap">CAP *</Label>
              <Input
                id="cap"
                value={formData.cap}
                onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="provincia">Provincia *</Label>
              <Input
                id="provincia"
                value={formData.provincia}
                onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                maxLength={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="commissione_personalizzata">Commissione Personalizzata (%)</Label>
              <Input
                id="commissione_personalizzata"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.commissione_personalizzata}
                onChange={(e) => setFormData({ ...formData, commissione_personalizzata: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button type="submit" disabled={createDealer.isPending}>
              {createDealer.isPending ? "Creazione..." : "Crea Rivenditore"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
