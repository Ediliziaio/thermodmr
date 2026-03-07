import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Calendar, Euro, AlertCircle, CalendarDays } from "lucide-react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { OrderWithDetails } from "@/hooks/useOrdersInfinite";

interface OrderMobileCardProps {
  order: OrderWithDetails;
  isSelected: boolean;
  onToggleSelect: () => void;
  onViewDetails: () => void;
  userRole: string;
}

export function OrderMobileCard({
  order,
  isSelected,
  onToggleSelect,
  onViewDetails,
  userRole,
}: OrderMobileCardProps) {
  const x = useMotionValue(0);
  
  // Background color cambia durante lo swipe
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["hsl(var(--destructive))", "hsl(var(--background))", "hsl(var(--primary))"]
  );

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 80;
    
    if (info.offset.x > threshold) {
      // Swipe RIGHT → Seleziona/Deseleziona
      onToggleSelect();
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } else if (info.offset.x < -threshold) {
      // Swipe LEFT → Apri Dettagli
      onViewDetails();
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  const isOverdue = order.data_consegna_prevista && 
    new Date(order.data_consegna_prevista) < new Date();
  const hasUrgentBalance = order.importo_da_pagare > 0 && 
    order.stato !== 'consegnato';

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x }}
      className="relative mb-3"
    >
      {/* Background Indicators durante swipe */}
      <motion.div 
        style={{ background }}
        className="absolute inset-0 rounded-lg flex items-center justify-between px-6"
      >
        <div className="flex items-center gap-2 text-primary-foreground font-medium">
          <Checkbox className="h-6 w-6 pointer-events-none" /> Seleziona
        </div>
        <div className="flex items-center gap-2 text-primary-foreground font-medium">
          Dettagli <Eye className="h-5 w-5" />
        </div>
      </motion.div>

      {/* Card Content */}
      <Card 
        className={`relative bg-background ${isSelected ? 'ring-2 ring-primary' : ''}`}
        style={{ touchAction: 'pan-y' }}
      >
        <CardContent className="p-4">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Checkbox più grande per touch */}
              <Checkbox
                checked={isSelected}
                onCheckedChange={onToggleSelect}
                className="h-6 w-6"
                aria-label={`Seleziona ordine ${order.id}`}
              />
              
              <div>
                <p className="font-semibold text-base">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.dealers?.ragione_sociale || "-"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <Badge 
              variant="outline" 
              className={`${getStatusColor(order.stato)} text-xs px-2 py-1`}
            >
              {getStatusLabel(order.stato)}
            </Badge>
          </div>

          {/* Cliente */}
          {order.clients && (
            <div className="mb-2">
              <p className="text-sm font-medium">
                {order.clients.nome} {order.clients.cognome}
              </p>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            {/* Data Inserimento */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Inserito</p>
                <p className="font-medium">
                  {new Date(order.data_inserimento).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>

            {/* Importo Totale */}
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Totale</p>
                <p className="font-semibold">
                  {formatCurrency(order.importo_totale)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Progress Bar */}
          {order.importo_totale > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Pagato</span>
                <span className="font-medium">
                  {order.percentuale_pagata.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    order.percentuale_pagata === 100 
                      ? 'bg-green-500' 
                      : order.percentuale_pagata > 50 
                      ? 'bg-blue-500' 
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${order.percentuale_pagata}%` }}
                />
              </div>
            </div>
          )}

          {/* Da Pagare con Alert se urgente */}
          {order.importo_da_pagare > 0 && (
            <div 
              className={`flex items-center justify-between p-2 rounded-md ${
                hasUrgentBalance ? 'bg-destructive/10' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {hasUrgentBalance && (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm font-medium">Da Pagare</span>
              </div>
              <span className={`font-bold ${hasUrgentBalance ? 'text-destructive' : ''}`}>
                {formatCurrency(order.importo_da_pagare)}
              </span>
            </div>
          )}

          {/* Consegna Prevista con Alert se scaduta */}
          {order.data_consegna_prevista && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Consegna</span>
              <span className={isOverdue ? 'text-destructive font-medium' : ''}>
                {new Date(order.data_consegna_prevista).toLocaleDateString('it-IT')}
                {isOverdue && " (Scaduta)"}
              </span>
            </div>
          )}

          {/* Action Buttons Row - Touch Friendly */}
          <div className="flex gap-2 mt-4 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10"
              onClick={onViewDetails}
            >
              <Eye className="h-4 w-4 mr-2" />
              Dettagli
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
