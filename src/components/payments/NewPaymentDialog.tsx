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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCreatePayment } from "@/hooks/usePayments";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface NewPaymentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NewPaymentDialog({ open: controlledOpen, onOpenChange }: NewPaymentDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const [formData, setFormData] = useState({
    ordineId: "",
    tipo: "acconto" as "acconto" | "saldo" | "parziale",
    importo: "",
    dataPagamento: new Date().toISOString().split("T")[0],
    metodo: "Bonifico",
    riferimento: "",
  });

  const createPayment = useCreatePayment();

  // Fetch orders for selection
  const { data: orders = [] } = useQuery({
    queryKey: ["ordersForPayment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          stato,
          importo_totale,
          dealers!inner(ragione_sociale)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const importo = Number(formData.importo);

    if (!importo || importo <= 0) {
      toast({
        title: "Errore",
        description: "L'importo deve essere maggiore di zero.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.ordineId) {
      toast({
        title: "Errore",
        description: "Seleziona un ordine.",
        variant: "destructive",
      });
      return;
    }

    createPayment.mutate(
      {
        ordineId: formData.ordineId,
        tipo: formData.tipo,
        importo,
        dataPagamento: formData.dataPagamento,
        metodo: formData.metodo,
        riferimento: formData.riferimento || undefined,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setFormData({
            ordineId: "",
            tipo: "acconto",
            importo: "",
            dataPagamento: new Date().toISOString().split("T")[0],
            metodo: "Bonifico",
            riferimento: "",
          });
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registra Nuovo Pagamento</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del pagamento ricevuto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ordineId">Ordine</Label>
            <Select
              value={formData.ordineId}
              onValueChange={(value) =>
                setFormData({ ...formData, ordineId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona ordine" />
              </SelectTrigger>
              <SelectContent>
                {orders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.id} - {(order.dealers as any)?.ragione_sociale} (
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(order.importo_totale)}
                    )
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo Pagamento</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: "acconto" | "saldo" | "parziale") =>
                setFormData({ ...formData, tipo: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acconto">Acconto</SelectItem>
                <SelectItem value="parziale">Parziale</SelectItem>
                <SelectItem value="saldo">Saldo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="importo">Importo (€)</Label>
            <Input
              id="importo"
              type="number"
              step="0.01"
              value={formData.importo}
              onChange={(e) =>
                setFormData({ ...formData, importo: e.target.value })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataPagamento">Data Pagamento</Label>
            <Input
              id="dataPagamento"
              type="date"
              value={formData.dataPagamento}
              onChange={(e) =>
                setFormData({ ...formData, dataPagamento: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metodo">Metodo</Label>
            <Select
              value={formData.metodo}
              onValueChange={(value) =>
                setFormData({ ...formData, metodo: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bonifico">Bonifico</SelectItem>
                <SelectItem value="Carta di Credito">Carta di Credito</SelectItem>
                <SelectItem value="Contante">Contante</SelectItem>
                <SelectItem value="Assegno">Assegno</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="riferimento">Riferimento (opzionale)</Label>
            <Input
              id="riferimento"
              value={formData.riferimento}
              onChange={(e) =>
                setFormData({ ...formData, riferimento: e.target.value })
              }
              placeholder="Es: TRN123456"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={createPayment.isPending}>
              {createPayment.isPending ? "Registrazione..." : "Registra Pagamento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
