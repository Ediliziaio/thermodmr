import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Eye, LogIn, Mail, MapPin, Pencil, Phone, Trash2, TrendingUp, TrendingDown, ShoppingCart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDealerActivityInfo } from "@/lib/dealerActivityUtils";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { EditDealerDialog } from "./EditDealerDialog";
import { DeleteDealerDialog } from "./DeleteDealerDialog";
import type { DealerWithStats } from "@/hooks/useDealers";
import { useNavigate } from "react-router-dom";
import { formatCurrency, cn } from "@/lib/utils";

interface DealerRowViewProps {
  dealers: DealerWithStats[];
}

function DealerRow({ dealer }: { dealer: DealerWithStats }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const totalPaid = dealer.total_paid || 0;
  const totalRemaining = dealer.total_remaining || 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "flex items-center border-b px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer",
          isOpen && "bg-muted/30"
        )}
      >
        <div className="flex-1 grid grid-cols-[2fr_1fr_0.5fr_0.9fr_0.9fr_0.9fr_1fr] gap-4 items-center min-w-0">
          <span className="font-medium truncate">{dealer.ragione_sociale}</span>
          <span className="text-sm text-muted-foreground truncate">{dealer.p_iva}</span>
          <span className="text-sm text-center">{dealer.orders_count || 0}</span>
          <span className="text-sm font-semibold">{formatCurrency(dealer.total_revenue || 0)}</span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(totalPaid)}
          </span>
          <span className={cn(
            "text-sm font-semibold",
            totalRemaining > 0
              ? "text-amber-600 dark:text-amber-400"
              : "text-muted-foreground"
          )}>
            {formatCurrency(totalRemaining)}
          </span>
          <span className="flex justify-end">
            {(() => {
              const activity = getDealerActivityInfo(dealer.last_order_date);
              return <Badge variant={activity.variant} className="text-xs">{activity.label}</Badge>;
            })()}
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 shrink-0">
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="px-4 py-4 bg-muted/20 border-b space-y-4">
          {/* Mini KPI */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Ordini:</span>
              <span className="font-semibold">{dealer.orders_count || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-muted-foreground">Incassato:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalPaid)}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className={cn("h-4 w-4", totalRemaining > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground")} />
              <span className="text-muted-foreground">Residuo:</span>
              <span className={cn("font-semibold", totalRemaining > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground")}>
                {formatCurrency(totalRemaining)}
              </span>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <a
              href={`mailto:${dealer.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{dealer.email}</span>
            </a>
            <a
              href={`tel:${dealer.telefono}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>{dealer.telefono}</span>
            </a>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="truncate">
                {dealer.indirizzo}, {dealer.cap} {dealer.citta} ({dealer.provincia})
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/rivenditori/${dealer.id}`)}
            >
              <Eye className="h-4 w-4 mr-1.5" />
              Dettaglio
            </Button>
            <EditDealerDialog
              dealer={dealer}
              trigger={
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1.5" />
                  Modifica
                </Button>
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = `mailto:${dealer.email}`)}
            >
              <Mail className="h-4 w-4 mr-1.5" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = `tel:${dealer.telefono}`)}
            >
              <Phone className="h-4 w-4 mr-1.5" />
              Chiama
            </Button>
            <DeleteDealerDialog
              dealer={dealer}
              trigger={
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  Elimina
                </Button>
              }
            />
            <Button
              size="sm"
              onClick={() => navigate(`/rivenditori/${dealer.id}/area`)}
              className="ml-auto"
            >
              <LogIn className="h-4 w-4 mr-1.5" />
              Accedi Area
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function DealerRowView({ dealers }: DealerRowViewProps) {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center border-b px-4 py-2.5 bg-muted/50">
        <div className="flex-1 grid grid-cols-[2fr_1fr_0.5fr_0.9fr_0.9fr_0.9fr_1fr] gap-4 items-center">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ragione Sociale</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">P.IVA</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Ordini</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fatturato</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Incassato</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Da Incassare</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Ultimo Ordine</span>
        </div>
        <div className="w-8 ml-2 shrink-0" />
      </div>

      {/* Rows */}
      {dealers.map((dealer) => (
        <DealerRow key={dealer.id} dealer={dealer} />
      ))}
    </Card>
  );
}
