import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, Eye, Mail, MapPin, MoreVertical, Pencil, Phone, Trash2 } from "lucide-react";
import { EditDealerDialog } from "./EditDealerDialog";
import { DeleteDealerDialog } from "./DeleteDealerDialog";
import type { DealerWithStats } from "@/hooks/useDealers";
import { useNavigate } from "react-router-dom";

interface DealerCardProps {
  dealer: DealerWithStats;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

export function DealerCard({ dealer }: DealerCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on dropdown or interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('[role="menu"]') || target.closest('button') || target.closest('a')) return;
    navigate(`/rivenditori/${dealer.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{dealer.ragione_sociale}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>P.IVA: {dealer.p_iva}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/rivenditori/${dealer.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                Visualizza Dettaglio
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <EditDealerDialog
                dealer={dealer}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifica
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuItem
                onClick={() => (window.location.href = `mailto:${dealer.email}`)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Invia Email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => (window.location.href = `tel:${dealer.telefono}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Chiama
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteDealerDialog
                dealer={dealer}
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Elimina
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span className="break-all">{dealer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{dealer.telefono}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span>
              {dealer.indirizzo}, {dealer.cap} {dealer.citta} ({dealer.provincia})
            </span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ordini:</span>
            <span className="font-medium">{dealer.orders_count || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fatturato totale:</span>
            <span className="font-semibold">
              {formatCurrency(dealer.total_revenue || 0)}
            </span>
          </div>
          {dealer.commissione_personalizzata && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Commissione:</span>
              <Badge variant="secondary">
                {dealer.commissione_personalizzata}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
