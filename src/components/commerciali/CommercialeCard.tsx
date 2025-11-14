import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShoppingCart, Euro, TrendingUp } from "lucide-react";
import { CommercialeStats } from "@/hooks/useCommerciali";
import { useNavigate } from "react-router-dom";
import { EditCommercialeDialog } from "./EditCommercialeDialog";

interface CommercialeCardProps {
  commerciale: CommercialeStats;
}

export const CommercialeCard = ({ commerciale }: CommercialeCardProps) => {
  const navigate = useNavigate();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => navigate(`/commerciali/${commerciale.id}`)}
          >
            <CardTitle className="text-lg">{commerciale.display_name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{commerciale.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={commerciale.is_active ? "default" : "secondary"}>
              {commerciale.is_active ? "Attivo" : "Inattivo"}
            </Badge>
            <EditCommercialeDialog
              commercialeId={commerciale.id}
              currentEmail={commerciale.email}
              currentDisplayName={commerciale.display_name}
              currentIsActive={commerciale.is_active}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent 
        className="cursor-pointer"
        onClick={() => navigate(`/commerciali/${commerciale.id}`)}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Dealers</p>
              <p className="text-lg font-semibold">{commerciale.dealers_count}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Ordini</p>
              <p className="text-lg font-semibold">{commerciale.ordini_count}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Fatturato</p>
              <p className="text-lg font-semibold">{formatCurrency(commerciale.fatturato_totale)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Provvigioni</p>
              <p className="text-lg font-semibold">
                {formatCurrency(commerciale.provvigioni_dovute + commerciale.provvigioni_liquidate)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
