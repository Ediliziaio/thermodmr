import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useCreateDealer } from "@/hooks/useDealers";
import { useAuth } from "@/contexts/AuthContext";
import { validatePIva, validateCodiceFiscale } from "@/lib/dealerValidation";

interface NewDealerDialogProps {
  trigger?: React.ReactNode;
}

export default function NewDealerDialog({ trigger }: NewDealerDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const createDealer = useCreateDealer();
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    const newErrors: Record<string, string> = {};
    const pivaError = validatePIva(formData.p_iva);
    if (pivaError) newErrors.p_iva = pivaError;
    const cfError = validateCodiceFiscale(formData.codice_fiscale);
    if (cfError) newErrors.codice_fiscale = cfError;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (!user?.id) return;

    try {
      await createDealer.mutateAsync({
        ...formData,
        codice_fiscale: formData.codice_fiscale.toUpperCase(),
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
      setErrors({});
      setOpen(false);
    } catch {
      // error handled by mutation
    }
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
                onChange={(e) => {
                  setFormData({ ...formData, p_iva: e.target.value });
                  if (errors.p_iva) setErrors((prev) => ({ ...prev, p_iva: "" }));
                }}
                maxLength={11}
                required
              />
              {errors.p_iva && <p className="text-sm text-destructive mt-1">{errors.p_iva}</p>}
            </div>

            <div>
              <Label htmlFor="codice_fiscale">Codice Fiscale *</Label>
              <Input
                id="codice_fiscale"
                value={formData.codice_fiscale}
                onChange={(e) => {
                  setFormData({ ...formData, codice_fiscale: e.target.value.toUpperCase() });
                  if (errors.codice_fiscale) setErrors((prev) => ({ ...prev, codice_fiscale: "" }));
                }}
                maxLength={16}
                required
              />
              {errors.codice_fiscale && <p className="text-sm text-destructive mt-1">{errors.codice_fiscale}</p>}
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
