import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Eye, Trash2, Calendar, CreditCard, Building2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface PaymentWithDetails {
  id: string;
  tipo: string;
  importo: number;
  metodo: string;
  data_pagamento: string;
  riferimento: string | null;
  ordine_id: string;
  orders: {
    id: string;
    stato: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

interface PaymentMobileCardProps {
  payment: PaymentWithDetails;
  isSelected: boolean;
  onToggleSelect: () => void;
  onViewOrder: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

export function PaymentMobileCard({
  payment,
  isSelected,
  onToggleSelect,
  onViewOrder,
  onDelete,
  canDelete,
}: PaymentMobileCardProps) {
  const x = useMotionValue(0);
  
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["rgb(239 68 68)", "rgb(255 255 255)", "rgb(34 197 94)"]
  );

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 80;
    
    if (info.offset.x > threshold) {
      onToggleSelect();
    } else if (info.offset.x < -threshold) {
      onViewOrder();
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "acconto": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "saldo": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "parziale": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getMetodoIcon = (metodo: string) => {
    const icons: Record<string, string> = {
      bonifico: "🏦",
      carta: "💳",
      contanti: "💵",
      assegno: "📝"
    };
    return icons[metodo.toLowerCase()] || "💰";
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: it });
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x }}
      className="relative mb-3"
    >
      {/* Background Indicators */}
      <motion.div 
        style={{ background }}
        className="absolute inset-0 rounded-lg flex items-center justify-between px-6"
      >
        <div className="flex items-center gap-2 text-white font-medium">
          <Checkbox className="h-6 w-6" /> Seleziona
        </div>
        <div className="flex items-center gap-2 text-white font-medium">
          Ordine <Eye className="h-5 w-5" />
        </div>
      </motion.div>

      {/* Card Content */}
      <Card 
        className={`relative bg-background ${isSelected ? 'ring-2 ring-primary' : ''}`}
        style={{ touchAction: 'pan-y' }}
      >
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={isSelected}
                onCheckedChange={onToggleSelect}
                className="h-6 w-6"
                aria-label={`Seleziona pagamento ${payment.id}`}
              />
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getTipoBadgeColor(payment.tipo)}>
                    {payment.tipo.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">
                  {formatCurrency(payment.importo)}
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-2 mb-3">
            {/* Data */}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Data:</span>
              <span className="font-medium">
                {formatDate(payment.data_pagamento)}
              </span>
            </div>

            {/* Ordine */}
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Ordine:</span>
              <button
                onClick={onViewOrder}
                className="font-medium text-primary hover:underline"
              >
                {payment.ordine_id}
              </button>
            </div>

            {/* Dealer */}
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Dealer:</span>
              <span className="font-medium">
                {payment.orders.dealers.ragione_sociale}
              </span>
            </div>

            {/* Metodo */}
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Metodo:</span>
              <span className="font-medium capitalize">
                {getMetodoIcon(payment.metodo)} {payment.metodo}
              </span>
            </div>

            {/* Riferimento */}
            {payment.riferimento && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Rif:</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {payment.riferimento}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10"
              onClick={onViewOrder}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vai all'Ordine
            </Button>
            
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-destructive hover:bg-destructive/10"
                onClick={onDelete}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
