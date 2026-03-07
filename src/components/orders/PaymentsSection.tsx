import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { formatCurrency, formatDate } from "@/lib/utils";

import type { Tables } from "@/integrations/supabase/types";

type Payment = Tables<"payments">;
import { useCreatePayment } from "@/hooks/usePayments";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentsSectionProps {
  orderId: string;
  payments: Payment[];
  totalAmount: number;
}

export function PaymentsSection({ orderId, payments, totalAmount }: PaymentsSectionProps) {
  const { userRole } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const canCreatePayment = userRole === "super_admin" || userRole === "commerciale";
  const [newPayment, setNewPayment] = useState({
    tipo: "acconto" as string,
    importo: 0,
    dataPagamento: new Date().toISOString().split("T")[0],
    metodo: "Bonifico",
    riferimento: "",
  });
  const createPayment = useCreatePayment();


  const totalPaid = payments.reduce((sum, p) => sum + p.importo, 0);
  const remaining = totalAmount - totalPaid;

  const getPaymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      acconto: "Acconto",
      saldo: "Saldo",
      parziale: "Parziale",
    };
    return labels[type] || type;
  };

  const getPaymentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      acconto: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      saldo: "bg-green-500/10 text-green-700 dark:text-green-400",
      parziale: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    };
    return colors[type] || "";
  };

  const handleAddPayment = () => {
    const importo = Number(newPayment.importo);

    // Validazioni
    if (!importo || importo <= 0) {
      toast({
        title: "Errore",
        description: "L'importo deve essere maggiore di zero.",
        variant: "destructive",
      });
      return;
    }

    if (!newPayment.metodo) {
      toast({
        title: "Errore",
        description: "Seleziona un metodo di pagamento.",
        variant: "destructive",
      });
      return;
    }

    // Verifica che la somma dei pagamenti non superi il totale
    if (totalPaid + importo > totalAmount) {
      toast({
        title: "Errore",
        description: `L'importo totale dei pagamenti (${formatCurrency(totalPaid + importo)}) supererebbe il totale dell'ordine (${formatCurrency(totalAmount)}).`,
        variant: "destructive",
      });
      return;
    }

    // Crea il pagamento
    createPayment.mutate({
      ordineId: orderId,
      tipo: newPayment.tipo,
      importo,
      dataPagamento: newPayment.dataPagamento,
      metodo: newPayment.metodo,
      riferimento: newPayment.riferimento || undefined,
    });

    setIsDialogOpen(false);
    // Reset form
    setNewPayment({
      tipo: "acconto",
      importo: 0,
      dataPagamento: new Date().toISOString().split("T")[0],
      metodo: "Bonifico",
      riferimento: "",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pagamenti</CardTitle>
        {canCreatePayment && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registra Pagamento
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registra Nuovo Pagamento</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del pagamento ricevuto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Tipo Pagamento</Label>
                <Select
                  value={newPayment.tipo}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, tipo: value })
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
                <Label>Importo (€)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newPayment.importo}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      importo: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Data Pagamento</Label>
                <Input
                  type="date"
                  value={newPayment.dataPagamento}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, dataPagamento: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Metodo</Label>
                <Select
                  value={newPayment.metodo}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, metodo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bonifico">Bonifico</SelectItem>
                    <SelectItem value="Carta">Carta di Credito</SelectItem>
                    <SelectItem value="Contanti">Contanti</SelectItem>
                    <SelectItem value="Assegno">Assegno</SelectItem>
                    <SelectItem value="RiBa">RiBa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Riferimento</Label>
                <Input
                  value={newPayment.riferimento}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, riferimento: e.target.value })
                  }
                  placeholder="CRO, TRN o numero ricevuta"
                />
              </div>

              <Button 
                onClick={handleAddPayment} 
                className="w-full"
                disabled={createPayment.isPending}
              >
                {createPayment.isPending ? "Registrazione..." : "Conferma Pagamento"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Totale Ordine</p>
            <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Incassato</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalPaid)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Da Saldare</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>

        {/* Payment History */}
        <div className="space-y-4">
          <h4 className="font-medium">Storico Pagamenti</h4>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nessun pagamento registrato
            </p>
          ) : (
            payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getPaymentTypeColor(payment.tipo)}>
                      {getPaymentTypeLabel(payment.tipo)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {payment.metodo}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(payment.data_pagamento)}
                  </p>
                  {payment.riferimento && (
                    <p className="text-xs text-muted-foreground">
                      Rif: {payment.riferimento}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatCurrency(payment.importo)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
