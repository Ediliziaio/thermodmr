import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, LogIn, Mail, MapPin, Phone, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditDealerDialog } from "./EditDealerDialog";
import { DeleteDealerDialog } from "./DeleteDealerDialog";
import type { DealerWithStats } from "@/hooks/useDealers";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getDealerActivityInfo } from "@/lib/dealerActivityUtils";

interface MobileDealerCardProps {
  dealer: DealerWithStats;
}

export function MobileDealerCard({ dealer }: MobileDealerCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80;
    const wasDragging = Math.abs(info.offset.x) > 10;
    setIsDragging(false);

    if (info.offset.x > threshold) {
      // Swipe right - Edit
      setShowEditDialog(true);
      x.set(0);
    } else if (info.offset.x < -threshold) {
      // Swipe left - Delete
      setShowDeleteDialog(true);
      x.set(0);
    } else {
      // Reset
      x.set(0);
    }
  };

  return (
    <>
      <motion.div
        style={{ x, opacity, scale }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        className="relative"
      >
        {/* Swipe Actions Background */}
        <div className="absolute inset-0 flex justify-between items-center px-6 pointer-events-none">
          <motion.div
            className="flex items-center gap-2 text-primary"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <Pencil className="h-5 w-5" />
            <span className="font-medium">Modifica</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-destructive"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <span className="font-medium">Elimina</span>
            <Trash2 className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Card Content */}
        <Card
          className="w-full hover:shadow-md transition-shadow touch-manipulation cursor-pointer"
          onClick={() => { if (!isDragging) navigate(`/rivenditori/${dealer.id}/area`); }}
        >
          <CardContent className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base truncate">
                  {dealer.ragione_sociale}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Building2 className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">P.IVA: {dealer.p_iva}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${dealer.email}`}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors active:scale-95 min-h-[44px]"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="truncate">{dealer.email}</span>
              </a>
              <a
                href={`tel:${dealer.telefono}`}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors active:scale-95 min-h-[44px]"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>{dealer.telefono}</span>
              </a>
              <div className="flex items-start gap-2 min-h-[44px]">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <span className="text-xs leading-relaxed">
                  {dealer.indirizzo}, {dealer.cap} {dealer.citta} ({dealer.provincia})
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-3 border-t grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Ordini</p>
                <p className="text-lg font-semibold">{dealer.orders_count || 0}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-muted-foreground">Fatturato</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(dealer.total_revenue || 0)}
                </p>
              </div>
            </div>

            {/* Footer with hint and chevron */}
            <div className="pt-2 border-t">
              <Button
                className="w-full"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/rivenditori/${dealer.id}/area`);
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Accedi
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Controlled dialogs for swipe actions */}
      <EditDealerDialog
        dealer={dealer}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <DeleteDealerDialog
        dealer={dealer}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
}
