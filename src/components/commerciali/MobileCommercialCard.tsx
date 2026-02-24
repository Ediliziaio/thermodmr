import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Edit, Trash2, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState } from "react";
import type { CommercialeStats } from "@/hooks/useCommerciali";

interface MobileCommercialCardProps {
  commercial: CommercialeStats;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

export function MobileCommercialCard({ 
  commercial, 
  onEdit, 
  onDelete,
  onViewDetail 
}: MobileCommercialCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  // Swipe right = Edit (green), Swipe left = Delete (red)
  const backgroundRight = useTransform(x, [0, 100], ["rgba(0,0,0,0)", "rgba(34, 197, 94, 0.2)"]);
  const backgroundLeft = useTransform(x, [-100, 0], ["rgba(239, 68, 68, 0.2)", "rgba(0,0,0,0)"]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 80;

    if (info.offset.x > threshold) {
      onEdit(commercial.id);
    } else if (info.offset.x < -threshold) {
      onDelete(commercial.id);
    }

    x.set(0);
  };

  const provvigioni_totali = commercial.provvigioni_dovute + commercial.provvigioni_liquidate;

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Background indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pl-6"
        style={{ backgroundColor: backgroundRight }}
      >
        <Edit className="h-6 w-6 text-green-600" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-6"
        style={{ backgroundColor: backgroundLeft }}
      >
        <Trash2 className="h-6 w-6 text-red-600" />
      </motion.div>

      {/* Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative"
      >
        <Card className="touch-none">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{commercial.display_name}</h3>
                <p className="text-sm text-muted-foreground">{commercial.email}</p>
              </div>
              <Badge variant={commercial.is_active ? "default" : "secondary"}>
                {commercial.is_active ? "Attivo" : "Inattivo"}
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Rivenditori</p>
                <p className="text-lg font-bold">{commercial.dealers_count}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Ordini</p>
                <p className="text-lg font-bold">{commercial.ordini_count}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Fatturato</p>
                <p className="text-sm font-semibold">{formatCurrency(commercial.fatturato_totale)}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Provvigioni</p>
                <p className="text-sm font-semibold">{formatCurrency(provvigioni_totali)}</p>
              </div>
            </div>

            {/* Provvigioni Details */}
            <div className="flex gap-2 text-xs mb-3">
              <div className="flex-1 bg-orange-50 dark:bg-orange-950/20 rounded px-2 py-1">
                <span className="text-muted-foreground">Dovute: </span>
                <span className="font-medium">{formatCurrency(commercial.provvigioni_dovute)}</span>
              </div>
              <div className="flex-1 bg-green-50 dark:bg-green-950/20 rounded px-2 py-1">
                <span className="text-muted-foreground">Liquidate: </span>
                <span className="font-medium">{formatCurrency(commercial.provvigioni_liquidate)}</span>
              </div>
            </div>

            {/* Actions */}
            {!isDragging && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-10"
                  onClick={() => window.location.href = `mailto:${commercial.email}`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                {onViewDetail && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10"
                    onClick={() => onViewDetail(commercial.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Dettagli
                  </Button>
                )}
              </div>
            )}

            {/* Swipe Hint */}
            {!isDragging && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                ← Scorri per eliminare • Scorri per modificare →
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
