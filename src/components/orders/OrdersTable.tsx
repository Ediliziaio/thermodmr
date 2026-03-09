import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, AlertCircle, Plus, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { OrderWithPaymentStats } from "@/types/orders";

const ORDER_STATUSES = [
  { key: "preventivo", label: "Preventivo", color: "bg-slate-500" },
  { key: "da_confermare", label: "Da Confermare", color: "bg-amber-500" },
  { key: "da_pagare_acconto", label: "Da Pagare Acconto", color: "bg-orange-500" },
  { key: "in_lavorazione", label: "In Lavorazione", color: "bg-blue-500" },
  { key: "da_saldare", label: "Da Saldare", color: "bg-red-500" },
  { key: "da_consegnare", label: "Da Consegnare", color: "bg-purple-500" },
  { key: "consegnato", label: "Consegnato", color: "bg-green-500" },
] as const;

interface OrdersTableProps {
  orders: OrderWithPaymentStats[];
  selectedOrderIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  isDealerArea: boolean;
  userRole: string | null;
  onStatusChange: (orderId: string, stato: string) => void;
  onQuickPayment: (orderId: string, orderTotal: number, amountPaid: number) => void;
}

const COLUMNS = [
  { key: 'id', label: 'ID Ordine' },
  { key: 'dealer', label: 'Rivenditore' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'stato', label: 'Stato' },
  { key: 'data_inserimento', label: 'Data Inserimento' },
  { key: 'importo_totale', label: 'Importo Totale' },
  { key: 'importo_acconto', label: 'Acconto' },
  { key: 'importo_da_pagare', label: 'Importo da Pagare' },
  { key: 'data_consegna_prevista', label: 'Consegna Prevista' },
  { key: 'settimana_consegna', label: 'Sett.' },
];

export function OrdersTable({
  orders,
  selectedOrderIds,
  onToggleSelect,
  onToggleSelectAll,
  onSort,
  sortConfig,
  isDealerArea,
  userRole,
  onStatusChange,
  onQuickPayment,
}: OrdersTableProps) {
  const navigate = useNavigate();

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="h-3 w-3 ml-1 text-muted-foreground/50" />;
    return sortConfig.direction === 'asc'
      ? <ArrowUp className="h-3 w-3 ml-1" />
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-background z-10">
          <tr className="border-b text-left text-sm font-medium text-muted-foreground">
            {!isDealerArea && (
              <th className="pb-3 pr-4 w-12">
                <Checkbox
                  checked={selectedOrderIds.size === orders.length && orders.length > 0}
                  onCheckedChange={onToggleSelectAll}
                  aria-label="Seleziona tutti gli ordini"
                />
              </th>
            )}
            {COLUMNS.map(col => (
              <th
                key={col.key}
                className="pb-3 pr-4 cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => onSort(col.key)}
              >
                <span className="inline-flex items-center">
                  {col.label}
                  <SortIcon columnKey={col.key} />
                </span>
              </th>
            ))}
            {!isDealerArea && <th className="pb-3">Azioni</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isOverdue = order.data_consegna_prevista && new Date(order.data_consegna_prevista) < new Date();
            const hasUrgentBalance = order.importo_da_pagare > 0 && order.stato !== 'consegnato';
            const isSelected = selectedOrderIds.has(order.id!);

            return (
              <tr
                key={order.id}
                className={cn(
                  "border-b last:border-0 hover:bg-muted/50 transition-colors",
                  isSelected && "bg-muted/50",
                  isDealerArea && "cursor-pointer"
                )}
                onClick={isDealerArea ? () => navigate(`../ordini/${order.id}`, { relative: 'path' }) : undefined}
              >
                {!isDealerArea && (
                  <td className="py-4 pr-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleSelect(order.id!)}
                      aria-label={`Seleziona ordine ${order.id}`}
                    />
                  </td>
                )}
                <td className="py-4 pr-4">
                  <p className="font-medium">{order.id}</p>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-sm">{order.dealers?.ragione_sociale || "-"}</p>
                  <p className="text-xs text-muted-foreground">{order.dealers?.email || ""}</p>
                </td>
                <td className="py-4 pr-4 text-sm">
                  {order.clients ? `${order.clients.nome} ${order.clients.cognome}` : "-"}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {userRole === "super_admin" && !isDealerArea ? (
                      <Select
                        value={order.stato!}
                        onValueChange={(value) => {
                          if (value !== order.stato) onStatusChange(order.id!, value);
                        }}
                      >
                        <SelectTrigger className="h-auto border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:ml-1 [&>svg]:h-3 [&>svg]:w-3">
                          <Badge variant="outline" className={getStatusColor(order.stato!)}>
                            {getStatusLabel(order.stato!)}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map((s) => (
                            <SelectItem key={s.key} value={s.key}>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                {s.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline" className={getStatusColor(order.stato!)}>
                        {getStatusLabel(order.stato!)}
                      </Badge>
                    )}
                    {hasUrgentBalance && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Saldo
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="py-4 pr-4 text-sm">
                  {formatDate(new Date(order.data_inserimento!))}
                </td>
                <td className="py-4 pr-4 font-medium">
                  {formatCurrency(order.importo_totale!)}
                </td>
                <td className="py-4 pr-4 text-sm">
                  {formatCurrency(order.importo_acconto!)}
                </td>
                <td className="py-4 pr-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1 cursor-help">
                        <div className="flex items-center gap-1.5">
                          <p className={cn(
                            "font-medium text-sm",
                            order.importo_da_pagare === 0
                              ? "text-green-600"
                              : order.importo_da_pagare > order.importo_totale! * 0.5
                                ? "text-red-600"
                                : "text-orange-600"
                          )}>
                            {formatCurrency(order.importo_da_pagare)}
                          </p>
                          {order.importo_da_pagare > 0 && !isDealerArea && (userRole === "super_admin" || userRole === "commerciale") && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuickPayment(order.id!, order.importo_totale!, order.importo_pagato);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className={cn(
                              "h-1.5 rounded-full transition-all",
                              order.percentuale_pagata === 100
                                ? "bg-green-500"
                                : (order.percentuale_pagata ?? 0) > 50
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                            )}
                            style={{ width: `${order.percentuale_pagata ?? 0}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {order.numero_pagamenti} pag. • {(order.percentuale_pagata ?? 0).toFixed(0)}%
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">Dettaglio Pagamenti</p>
                        <p className="text-sm">Totale: {formatCurrency(order.importo_totale!)}</p>
                        <p className="text-sm">Pagato: {formatCurrency(order.importo_pagato)}</p>
                        <p className="text-sm">Mancante: {formatCurrency(order.importo_da_pagare)}</p>
                        {order.data_ultimo_pagamento && (
                          <p className="text-xs text-muted-foreground">
                            Ultimo: {formatDate(new Date(order.data_ultimo_pagamento))}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </td>
                <td className="py-4 pr-4 text-sm">
                  <span className={cn(isOverdue && "text-red-600 font-medium")}>
                    {order.data_consegna_prevista
                      ? formatDate(new Date(order.data_consegna_prevista))
                      : "N/A"}
                  </span>
                </td>
                <td className="py-4 pr-4 text-sm text-center">
                  {(order as any).settimana_consegna ? (
                    <Badge variant="outline" className="font-mono">
                      W{(order as any).settimana_consegna}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                {!isDealerArea && (
                  <td className="py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/ordini/${order.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Dettagli
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
