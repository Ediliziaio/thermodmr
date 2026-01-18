import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpcomingDeadlines } from "@/hooks/useUpcomingDeadlines";
import { useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, CalendarClock, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface DeadlinesWidgetProps {
  commercialeId?: string | null;
  daysAhead?: number;
  limit?: number;
  className?: string;
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    da_confermare: "Da Confermare",
    da_pagare_acconto: "Da Pagare Acconto",
    in_lavorazione: "In Lavorazione",
    da_consegnare: "Da Consegnare",
    consegnato: "Consegnato",
  };
  return labels[status] || status;
};

const getUrgencyColor = (daysRemaining: number): string => {
  if (daysRemaining < 0) return "bg-destructive/10 text-destructive border-destructive/20";
  if (daysRemaining === 0) return "bg-destructive/10 text-destructive border-destructive/20";
  if (daysRemaining <= 2) return "bg-orange-500/10 text-orange-600 border-orange-500/20";
  if (daysRemaining <= 5) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
  return "bg-muted text-muted-foreground border-muted";
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
};

export function DeadlinesWidget({
  commercialeId = null,
  daysAhead = 14,
  limit = 5,
  className,
}: DeadlinesWidgetProps) {
  const navigate = useNavigate();
  const { data: deadlines, isLoading, error } = useUpcomingDeadlines({
    daysAhead,
    limit,
    commercialeId,
  });

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Errore caricamento scadenze
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const hasDeadlines = deadlines && deadlines.length > 0;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarClock className="h-5 w-5 text-primary" />
          Scadenze Imminenti
          {hasDeadlines && (
            <Badge variant="secondary" className="ml-auto">
              {deadlines.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasDeadlines ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              Nessuna scadenza nei prossimi {daysAhead} giorni
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.order_id}
                onClick={() => navigate(`/ordini/${deadline.order_id}`)}
                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      {deadline.order_id}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs flex-shrink-0",
                        getUrgencyColor(deadline.giorni_rimanenti)
                      )}
                    >
                      {deadline.giorni_rimanenti < 0
                        ? `${Math.abs(deadline.giorni_rimanenti)}g in ritardo`
                        : deadline.giorni_rimanenti === 0
                        ? "Oggi"
                        : `${deadline.giorni_rimanenti}g`}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {deadline.dealer_name}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-muted-foreground">
                      Consegna: {format(new Date(deadline.data_consegna), "dd MMM", { locale: it })}
                    </span>
                    {deadline.importo_residuo > 0 && (
                      <span className="font-medium text-warning">
                        Da saldare: {formatCurrency(deadline.importo_residuo)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => navigate("/ordini?filter=scadenze")}
            >
              Vedi tutte le scadenze
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
