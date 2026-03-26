import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePayment, type PaymentType } from "@/hooks/usePayments";
import { formatCurrency } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface QuickPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  orderTotal: number;
  amountPaid: number;
}

export function QuickPaymentDialog({
  open,
  onOpenChange,
  orderId,
  orderTotal,
  amountPaid,
}: QuickPaymentDialogProps) {
  const remaining = Math.max(0, orderTotal - amountPaid);
  const createPayment = useCreatePayment();

  const [form, setForm] = useState({
    tipo: "parziale" as PaymentType,
    importo: remaining,
    dataPagamento: new Date().toISOString().split("T")[0],
    metodo: "Bonifico",
    riferimento: "",
  });

  // Sync importo when dialog opens or remaining changes
  useEffect(() => {
    if (open) {
      setForm(prev => ({ ...prev, importo: remaining }));
    }
  }, [open, remaining]);

  const handleSubmit = () => {
    if (!form.importo || form.importo <= 0) {
      toast({ title: "Errore", description: "Importo non valido.", variant: "destructive" });
      return;
    }
    if (amountPaid + form.importo > orderTotal) {
      toast({
        title: "Errore",
        description: `Supera il totale ordine (${formatCurrency(orderTotal)}).`,
        variant: "destructive",
      });
      return;
    }

    createPayment.mutate(
      {
        ordineId: orderId,
        tipo: form.tipo,
        importo: form.importo,
        dataPagamento: form.dataPagamento,
        metodo: form.metodo,
        riferimento: form.riferimento || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setForm({
            tipo: "parziale",
            importo: remaining,
            dataPagamento: new Date().toISOString().split("T")[0],
            metodo: "Bonifico",
            riferimento: "",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Pagamento rapido</DialogTitle>
          <DialogDescription>
            Ordine {orderId} · Saldo: {formatCurrency(remaining)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Tipo</Label>
            <Select
              value={form.tipo}
              onValueChange={(v) => setForm({ ...form, tipo: v as PaymentType })}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acconto">Acconto</SelectItem>
                <SelectItem value="parziale">Parziale</SelectItem>
                <SelectItem value="saldo">Saldo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Importo (€)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="h-9"
              value={form.importo}
              onChange={(e) =>
                setForm({ ...form, importo: parseFloat(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Data</Label>
            <Input
              type="date"
              className="h-9"
              value={form.dataPagamento}
              onChange={(e) =>
                setForm({ ...form, dataPagamento: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Metodo</Label>
            <Select
              value={form.metodo}
              onValueChange={(v) => setForm({ ...form, metodo: v })}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bonifico">Bonifico</SelectItem>
                <SelectItem value="Carta">Carta</SelectItem>
                <SelectItem value="Contanti">Contanti</SelectItem>
                <SelectItem value="Assegno">Assegno</SelectItem>
                <SelectItem value="RiBa">RiBa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Riferimento</Label>
            <Input
              className="h-9"
              value={form.riferimento}
              onChange={(e) =>
                setForm({ ...form, riferimento: e.target.value })
              }
              placeholder="CRO, TRN..."
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={createPayment.isPending}
          >
            {createPayment.isPending ? "Salvataggio..." : "Registra Pagamento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
