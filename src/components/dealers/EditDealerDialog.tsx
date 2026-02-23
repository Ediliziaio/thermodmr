import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useUpdateDealer, type DealerWithStats } from "@/hooks/useDealers";

interface EditDealerDialogProps {
  dealer: DealerWithStats;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditDealerDialog({ dealer, trigger, open: controlledOpen, onOpenChange }: EditDealerDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const { mutate: updateDealer, isPending } = useUpdateDealer();

  const [formData, setFormData] = useState({
    ragione_sociale: dealer.ragione_sociale,
    p_iva: dealer.p_iva,
    codice_fiscale: dealer.codice_fiscale,
    email: dealer.email,
    telefono: dealer.telefono,
    indirizzo: dealer.indirizzo,
    cap: dealer.cap,
    citta: dealer.citta,
    provincia: dealer.provincia,
    commissione_personalizzata: dealer.commissione_personalizzata?.toString() || "",
    note: dealer.note || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateDealer(
      {
        id: dealer.id,
        ...formData,
        commissione_personalizzata: formData.commissione_personalizzata
          ? parseFloat(formData.commissione_personalizzata)
          : null,
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
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifica Rivenditore</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="ragione_sociale">Ragione Sociale *</Label>
              <Input
                id="ragione_sociale"
                value={formData.ragione_sociale}
                onChange={(e) =>
                  setFormData({ ...formData, ragione_sociale: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p_iva">Partita IVA *</Label>
              <Input
                id="p_iva"
                value={formData.p_iva}
                onChange={(e) => setFormData({ ...formData, p_iva: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codice_fiscale">Codice Fiscale *</Label>
              <Input
                id="codice_fiscale"
                value={formData.codice_fiscale}
                onChange={(e) =>
                  setFormData({ ...formData, codice_fiscale: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono *</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="indirizzo">Indirizzo *</Label>
              <Input
                id="indirizzo"
                value={formData.indirizzo}
                onChange={(e) =>
                  setFormData({ ...formData, indirizzo: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cap">CAP *</Label>
              <Input
                id="cap"
                value={formData.cap}
                onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citta">Città *</Label>
              <Input
                id="citta"
                value={formData.citta}
                onChange={(e) => setFormData({ ...formData, citta: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provincia">Provincia *</Label>
              <Input
                id="provincia"
                value={formData.provincia}
                onChange={(e) =>
                  setFormData({ ...formData, provincia: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissione_personalizzata">
                Commissione Personalizzata (%)
              </Label>
              <Input
                id="commissione_personalizzata"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.commissione_personalizzata}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    commissione_personalizzata: e.target.value,
                  })
                }
                placeholder="Lascia vuoto per usare default"
              />
            </div>

            <div className="col-span-2 space-y-2">
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
