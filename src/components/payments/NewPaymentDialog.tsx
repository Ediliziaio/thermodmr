import { useState, useMemo } from "react";
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
import { OrderCombobox } from "./OrderCombobox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, getStatusLabel, getStatusVariant } from "@/lib/utils";

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

  // Fetch orders with payment stats for selection
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["ordersForPayment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders_with_payment_stats")
        .select(`
          id,
          stato,
          importo_totale,
          importo_pagato,
          importo_da_pagare,
          percentuale_pagata,
          data_inserimento,
          dealers!inner(
            id,
            ragione_sociale
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as any[];
    },
    staleTime: 5 * 60 * 1000, // 5 minuti
  });

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === formData.ordineId),
    [orders, formData.ordineId]
  );

  const handleOrderSelect = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setFormData((prev) => {
      const newData = { ...prev, ordineId: orderId };

      // Auto-suggerisci importo basato sul tipo di pagamento
      if (!prev.importo || prev.importo === "0") {
        if (prev.tipo === "acconto" && order.importo_totale) {
          // Suggerisci 30% per acconto
          newData.importo = (order.importo_totale * 0.3).toFixed(2);
        } else if (prev.tipo === "saldo" && order.importo_da_pagare) {
          // Suggerisci l'intero importo rimanente per saldo
          newData.importo = order.importo_da_pagare.toFixed(2);
        }
      }

      return newData;
    });

    // Mostra toast informativo se c'è ancora da pagare
    if (order.importo_da_pagare && order.importo_da_pagare > 0) {
      toast({
        title: "💡 Suggerimento",
        description: `L'ordine ha ancora ${formatCurrency(order.importo_da_pagare)} da pagare.`,
      });
    }
  };

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

    // Validazione avanzata: controlla se l'importo supera il da pagare
    if (selectedOrder && selectedOrder.importo_da_pagare !== undefined) {
      const importoDaPagare = selectedOrder.importo_da_pagare;
      if (importo > importoDaPagare + 0.01) {
        // +0.01 per tolleranza arrotondamenti
        toast({
          title: "⚠️ Attenzione",
          description: `L'importo (${formatCurrency(importo)}) supera il rimanente da pagare (${formatCurrency(importoDaPagare)}).`,
          variant: "destructive",
        });
        return;
      }
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
            <OrderCombobox
              value={formData.ordineId}
              onValueChange={handleOrderSelect}
              orders={orders}
              isLoading={isLoading}
            />
          </div>

          {/* Preview Ordine Selezionato */}
          {selectedOrder && (
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ordine Selezionato</span>
                <Badge variant={getStatusVariant(selectedOrder.stato)}>
                  {getStatusLabel(selectedOrder.stato)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                🏢 {selectedOrder.dealers.ragione_sociale}
              </div>
              <div className="flex gap-4 text-sm">
                <span>💰 Totale: {formatCurrency(selectedOrder.importo_totale)}</span>
                {selectedOrder.importo_da_pagare !== undefined && (
                  <span className="text-orange-600 font-medium">
                    💵 Da Pagare: {formatCurrency(selectedOrder.importo_da_pagare)}
                  </span>
                )}
              </div>

              {/* Progress Bar Pagamento */}
              {selectedOrder.percentuale_pagata !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Pagato</span>
                    <span className="font-medium">
                      {(selectedOrder.percentuale_pagata ?? 0).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={selectedOrder.percentuale_pagata} className="h-2" />
                </div>
              )}
            </div>
          )}

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
