import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Euro,
  Bell,
  Plus,
  ExternalLink,
  CreditCard
} from "lucide-react";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { useDealerOrderStats, useRecentActivity, usePaymentReminders } from "@/hooks/useDealerDashboard";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

export default function DealerDashboard() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDealerOrderStats();
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity();
  const { data: reminders, isLoading: remindersLoading } = usePaymentReminders();

  if (statsLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  const newActivitiesCount = activities?.filter(a => a.isNew).length || 0;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Benvenuto</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Panoramica dei tuoi ordini e notifiche
          </p>
        </div>
        <Button onClick={() => navigate("/ordini")} size="lg" className="min-h-[44px]">
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Ordine
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tutti i tuoi ordini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatturato Totale</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valore totale ordini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Importo Incassato</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatCurrency(stats.totalPaid)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pagamenti ricevuti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Da Saldare</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{formatCurrency(stats.totalRemaining)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Importo rimanente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Payment Reminders Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
      {/* Order Distribution by Status */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg md:text-xl">Distribuzione Ordini per Stato</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            I tuoi ordini suddivisi per stato di avanzamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-4 sm:p-6 pt-0">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(status)}>
                      {getStatusLabel(status)}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">
                    {count} ordini
                  </span>
                </div>
                <Progress 
                  value={(count / stats.totalOrders) * 100} 
                  className="h-2"
                />
              </div>
            ))}
            
            {stats.totalOrders === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nessun ordine ancora</p>
                <Button 
                  onClick={() => navigate("/ordini")} 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                >
                  Crea il tuo primo ordine
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Attività Recente</CardTitle>
              {newActivitiesCount > 0 && (
                <Badge variant="default" className="bg-primary text-xs">
                  {newActivitiesCount} nuove
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs md:text-sm">
              Aggiornamenti sugli ordini degli ultimi 7 giorni
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : activities && activities.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      activity.isNew ? "bg-primary/5 border-primary/20" : "bg-muted/30"
                    } hover:bg-accent/50 transition-colors cursor-pointer`}
                    onClick={() => navigate(`/ordini/${activity.orderId}`)}
                  >
                    <div className="mt-1">
                      {activity.type === "status_change" && (
                        <Clock className="h-4 w-4 text-primary" />
                      )}
                      {activity.type === "payment" && (
                        <CreditCard className="h-4 w-4 text-success" />
                      )}
                      {activity.type === "new_order" && (
                        <Package className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(activity.timestamp, { 
                          addSuffix: true, 
                          locale: it 
                        })}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nessuna notifica recente</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Reminders */}
        <Card className="md:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Promemoria Pagamenti
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Ordini che richiedono attenzione per i pagamenti
            </CardDescription>
          </CardHeader>
          <CardContent>
            {remindersLoading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
            ) : reminders && reminders.length > 0 ? (
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.orderId}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/ordini/${reminder.orderId}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Ordine {reminder.orderId}</span>
                          <Badge variant="outline" className={getStatusColor(reminder.stato)}>
                            {getStatusLabel(reminder.stato)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Totale</p>
                            <p className="font-medium">{formatCurrency(reminder.totalAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Pagato</p>
                            <p className="font-medium text-success">{formatCurrency(reminder.paidAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rimanente</p>
                            <p className="font-medium text-warning">{formatCurrency(reminder.remainingAmount)}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progresso pagamento</span>
                            <span>{reminder.percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={reminder.percentage} className="h-2" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50 text-success" />
                <p>Ottimo! Nessun pagamento in sospeso</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button 
              onClick={() => navigate("/ordini")} 
              variant="outline" 
              className="justify-start h-auto py-4"
            >
              <Plus className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Crea Ordine</p>
                <p className="text-xs text-muted-foreground">Nuovo ordine cliente</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => navigate("/ordini")} 
              variant="outline" 
              className="justify-start h-auto py-4"
            >
              <Package className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Visualizza Ordini</p>
                <p className="text-xs text-muted-foreground">Tutti i tuoi ordini</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => navigate("/ordini")} 
              variant="outline" 
              className="justify-start h-auto py-4"
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Report</p>
                <p className="text-xs text-muted-foreground">Statistiche ordini</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
