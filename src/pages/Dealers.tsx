import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDealers, mockOrders } from "@/lib/mock-data";
import { Plus, Mail, Phone, MapPin } from "lucide-react";

export default function Dealers() {
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuovo Rivenditore
        </Button>
      </div>

      {/* Dealers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDealers.map((dealer) => {
          const dealerOrders = mockOrders.filter(o => o.dealerId === dealer.id);
          const totalRevenue = dealerOrders.reduce((sum, o) => sum + o.importoTotale, 0);

          return (
            <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dealer.ragioneSociale}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      P.IVA: {dealer.pIva}
                    </p>
                  </div>
                  {dealer.commissionePersonalizzata && (
                    <Badge variant="secondary">
                      {dealer.commissionePersonalizzata}%
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
                      <p className="text-2xl font-bold">{dealerOrders.length}</p>
                      <p className="text-xs text-muted-foreground">Ordini</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {new Intl.NumberFormat("it-IT", {
                          style: "currency",
                          currency: "EUR",
                          maximumFractionDigits: 0,
                        }).format(totalRevenue)}
                      </p>
                      <p className="text-xs text-muted-foreground">Fatturato</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Visualizza Dettagli
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
