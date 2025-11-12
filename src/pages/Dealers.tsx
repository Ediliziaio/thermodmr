import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useDealers } from "@/hooks/useDealers";
import NewDealerDialog from "@/components/dealers/NewDealerDialog";

export default function Dealers() {
  const { data: dealers, isLoading, error } = useDealers();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Errore nel caricamento dei rivenditori</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rivenditori</h1>
          <p className="text-muted-foreground mt-1">
            Gestisci i rivenditori e le loro informazioni
          </p>
        </div>
        <NewDealerDialog />
      </div>

      {/* Dealers Grid */}
      {dealers && dealers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dealers.map((dealer) => (
            <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dealer.ragione_sociale}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      P.IVA: {dealer.p_iva}
                    </p>
                  </div>
                  {dealer.commissione_personalizzata && (
                    <Badge variant="secondary">
                      {dealer.commissione_personalizzata}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{dealer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{dealer.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {dealer.indirizzo}, {dealer.citta} ({dealer.provincia})
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{dealer.ordersCount || 0}</p>
                      <p className="text-xs text-muted-foreground">Ordini</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(dealer.totalRevenue || 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Fatturato</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nessun rivenditore trovato</p>
            <p className="text-sm text-muted-foreground mt-2">
              Crea il tuo primo rivenditore per iniziare
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
