import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, FileDown, Send } from "lucide-react";
import { mockOrders, mockPayments, getOrderSaldo } from "@/lib/mock-data";
import { OrderStatus, OrderLine, Attachment } from "@/types";
import { StatusStepper } from "@/components/orders/StatusStepper";
import { OrderLinesEditor } from "@/components/orders/OrderLinesEditor";
import { PaymentsSection } from "@/components/orders/PaymentsSection";
import { AttachmentsSection } from "@/components/orders/AttachmentsSection";
import { useState } from "react";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/ordini")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna agli Ordini
        </Button>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Ordine non trovato</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const orderPayments = mockPayments.filter((p) => p.ordineId === order.id);
  
  // Mock data for order lines and attachments
  const [orderLines, setOrderLines] = useState<OrderLine[]>([
    {
      id: "line-1",
      ordineId: order.id,
      categoria: "Finestra",
      descrizione: "Finestra PVC bianco 120x140",
      quantita: 4,
      prezzoUnitario: 450,
      sconto: 10,
      iva: 22,
      totaleRiga: 1952.64,
    },
    {
      id: "line-2",
      ordineId: order.id,
      categoria: "Portafinestra",
      descrizione: "Portafinestra scorrevole 180x210",
      quantita: 2,
      prezzoUnitario: 890,
      sconto: 5,
      iva: 22,
      totaleRiga: 2059.82,
    },
  ]);

  const mockAttachments: Attachment[] = [
    {
      id: "att-1",
      ordineId: order.id,
      uploadedByUserId: "user-1",
      nomeFile: "preventivo-firmato.pdf",
      tipoMime: "application/pdf",
      url: "#",
      dimensione: 245678,
      createdAt: new Date("2024-03-15"),
    },
    {
      id: "att-2",
      ordineId: order.id,
      uploadedByUserId: "user-1",
      nomeFile: "planimetria-casa.jpg",
      tipoMime: "image/jpeg",
      url: "#",
      dimensione: 1234567,
      createdAt: new Date("2024-03-16"),
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      [OrderStatus.DA_CONFERMARE]: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      [OrderStatus.DA_PAGARE_ACCONTO]: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      [OrderStatus.IN_LAVORAZIONE]: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      [OrderStatus.DA_CONSEGNARE]: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      [OrderStatus.CONSEGNATO]: "bg-green-500/10 text-green-700 dark:text-green-400",
    };
    return colors[status];
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels = {
      [OrderStatus.DA_CONFERMARE]: "Da Confermare",
      [OrderStatus.DA_PAGARE_ACCONTO]: "Da Pagare Acconto",
      [OrderStatus.IN_LAVORAZIONE]: "In Lavorazione",
      [OrderStatus.DA_CONSEGNARE]: "Da Consegnare",
      [OrderStatus.CONSEGNATO]: "Consegnato",
    };
    return labels[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/ordini")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna agli Ordini
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{order.id}</h1>
            <p className="text-muted-foreground mt-1">
              {order.dealer?.ragioneSociale}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Esporta PDF
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Invia al Dealer
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Stato Ordine</CardTitle>
            <Badge variant="outline" className={getStatusColor(order.stato)}>
              {getStatusLabel(order.stato)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <StatusStepper currentStatus={order.stato} />
          
          {/* Status Change (Super Admin Only) */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <Label className="mb-2 block">
              Cambia Stato (Solo Super Admin)
            </Label>
            <Select value={order.stato}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderStatus.DA_CONFERMARE}>
                  Da Confermare
                </SelectItem>
                <SelectItem value={OrderStatus.DA_PAGARE_ACCONTO}>
                  Da Pagare Acconto
                </SelectItem>
                <SelectItem value={OrderStatus.IN_LAVORAZIONE}>
                  In Lavorazione
                </SelectItem>
                <SelectItem value={OrderStatus.DA_CONSEGNARE}>
                  Da Consegnare
                </SelectItem>
                <SelectItem value={OrderStatus.CONSEGNATO}>
                  Consegnato
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Lines */}
          <OrderLinesEditor lines={orderLines} onLinesChange={setOrderLines} />

          {/* Payments */}
          <PaymentsSection
            orderId={order.id}
            payments={orderPayments}
            totalAmount={order.importoTotale}
          />

          {/* Attachments */}
          <AttachmentsSection orderId={order.id} attachments={mockAttachments} />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Economic Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo Economico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Totale Ordine</span>
                  <span className="font-medium">
                    {formatCurrency(order.importoTotale)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Acconto</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(order.importoAcconto)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Incassato</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(
                      orderPayments.reduce((sum, p) => sum + p.importo, 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Da Saldo</span>
                  <span className="text-orange-600 dark:text-orange-400">
                    {formatCurrency(getOrderSaldo(order.id))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Ordine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Data Inserimento</p>
                <p className="font-medium">{formatDate(order.dataInserimento)}</p>
              </div>
              {order.dataConsegnaPrevista && (
                <div>
                  <p className="text-muted-foreground">Consegna Prevista</p>
                  <p className="font-medium">
                    {formatDate(order.dataConsegnaPrevista)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Ultimo Aggiornamento</p>
                <p className="font-medium">{formatDate(order.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Note Interne</Label>
                <Textarea
                  placeholder="Note visibili solo internamente..."
                  defaultValue={order.noteInterna}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Note Rivenditore</Label>
                <Textarea
                  placeholder="Note visibili al rivenditore..."
                  defaultValue={order.noteRivenditore}
                  rows={3}
                />
              </div>
              <Button className="w-full" variant="outline">
                Salva Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
