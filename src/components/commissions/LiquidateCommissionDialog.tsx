import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUpdateCommissionStatus } from "@/hooks/useCommissions";

interface LiquidateCommissionDialogProps {
  commissionId: string;
  importo: number;
}

export function LiquidateCommissionDialog({
  commissionId,
  importo,
}: LiquidateCommissionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dataLiquidazione, setDataLiquidazione] = useState(
    new Date().toISOString().split("T")[0]
  );
  const updateStatus = useUpdateCommissionStatus();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const handleLiquidate = () => {
    updateStatus.mutate(
      { commissionId, dataLiquidazione },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default">
          Liquida
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liquida Provvigione</DialogTitle>
          <DialogDescription>
            Conferma la liquidazione della provvigione di {formatCurrency(importo)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="dataLiquidazione">Data Liquidazione</Label>
            <Input
              id="dataLiquidazione"
              type="date"
              value={dataLiquidazione}
              onChange={(e) => setDataLiquidazione(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={updateStatus.isPending}
            >
              Annulla
            </Button>
            <Button
              onClick={handleLiquidate}
              disabled={updateStatus.isPending}
            >
              {updateStatus.isPending ? "Liquidazione..." : "Conferma Liquidazione"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
