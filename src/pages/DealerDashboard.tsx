import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Euro,
  Bell,
  ExternalLink,
  CreditCard,
  RefreshCw,
  ShoppingCart,
  Headphones,
} from "lucide-react";
import { formatCurrency, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
import { useDealerOrderStats, useRecentActivity, usePaymentReminders } from "@/hooks/useDealerDashboard";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { useLanguage } from "@/i18n/LanguageContext";

interface DealerDashboardProps {
  dealerId?: string;
  dealerName?: string;
}

export default function DealerDashboard({ dealerId, dealerName }: DealerDashboardProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDealerOrderStats(dealerId);
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity(dealerId);
  const { data: reminders, isLoading: remindersLoading } = usePaymentReminders(dealerId);

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
      <div className="flex items-center justify-center min-h-[400px] p-4 md:p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
            <CardTitle>{t.area.common.erroreCaricamento}</CardTitle>
            <CardDescription>
              {t.area.common.impossibileCaricareConnessione}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => refetchStats()} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t.area.common.riprova}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const newActivitiesCount = activities?.filter(a => a.isNew).length || 0;
  const globalPaymentPercentage = stats.totalRevenue > 0
    ? Math.min(100, (stats.totalPaid / stats.totalRevenue) * 100)
    : 0;

  const basePath = dealerId ? `/rivenditori/${dealerId}/area` : "";

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {dealerName ? `${t.area.dealerDashboard.benvenuto} ${dealerName}` : t.area.dealerDashboard.benvenuto}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {dealerName ? t.area.dealerDashboard.descAdmin : t.area.dealerDashboard.desc}
        </p>
      </div>

      {/* KPI Cards - 4 colonne */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.area.dealerDashboard.ordiniTotali}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.area.dealerDashboard.tuttiGliOrdini}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.area.dealerDashboard.valoreTotale}</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.area.dealerDashboard.importoComplessivo}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.area.dealerDashboard.pagato}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalPaid)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.area.dealerDashboard.pagamentiEffettuati}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.area.dealerDashboard.daPagare}</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{formatCurrency(stats.totalRemaining)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.area.dealerDashboard.importoRimanente}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Global Payment Progress */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{t.area.dealerDashboard.progressoPagamento}</p>
            <p className="text-sm font-bold">{globalPaymentPercentage.toFixed(1)}%</p>
          </div>
          <Progress value={globalPaymentPercentage} className="h-3" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{t.area.dealerDashboard.pagato}: {formatCurrency(stats.totalPaid)}</span>
            <span>{t.area.dealerDashboard.valoreTotale}: {formatCurrency(stats.totalRevenue)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Grid: Status Distribution + Recent Activity */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Order Distribution by Status */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg md:text-xl">{t.area.dealerDashboard.distribuzionePerStato}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t.area.dealerDashboard.distribuzioneDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-4 sm:p-6 pt-0">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(status)}>
                    {getStatusLabel(status)}
                  </Badge>
                  <span className="text-sm font-medium">{count} {t.area.nav.ordini}</span>
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
                <p>{t.area.common.nessuDatoDisponibile}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">{t.area.dealerDashboard.attivitaRecente}</CardTitle>
              {newActivitiesCount > 0 && (
                <Badge variant="default" className="bg-primary text-xs">
                  {newActivitiesCount} {t.area.dealerDashboard.nuove}
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs md:text-sm">
              {t.area.dealerDashboard.attivitaDesc}
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
                    onClick={() => navigate(`${basePath}/ordini/${activity.orderId}`)}
                  >
                    <div className="mt-1">
                      {activity.type === "status_change" && (
                        <Clock className="h-4 w-4 text-primary" />
                      )}
                      {activity.type === "payment" && (
                        <CreditCard className="h-4 w-4 text-green-600" />
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
                <p>{t.area.dealerDashboard.nessunNotifica}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Reminders - Read Only */}
        <Card className={cn(
          "md:col-span-2 border-l-4 transition-all",
          reminders && reminders.length > 0 ? "border-l-destructive shadow-lg" : "border-l-transparent"
        )}>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className={cn(
                  "h-5 w-5",
                  reminders && reminders.length > 0 ? "text-destructive" : "text-orange-500"
                )} />
                <CardTitle className="text-lg md:text-xl">{t.area.dealerDashboard.promemoriaPagementi}</CardTitle>
              </div>
              {reminders && reminders.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {reminders.length}
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs md:text-sm">
              {t.area.dealerDashboard.promemoriaDesc}
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
                    className="border rounded-lg p-4 hover:bg-destructive/5 transition-colors cursor-pointer bg-destructive/5 border-destructive/20"
                    onClick={() => navigate(`${basePath}/ordini/${reminder.orderId}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="font-medium">{t.area.dealerDashboard.ordine} {reminder.orderId}</span>
                          <Badge variant="outline" className={getStatusColor(reminder.stato)}>
                            {getStatusLabel(reminder.stato)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">{t.area.dealerDashboard.totale}</p>
                            <p className="font-medium">{formatCurrency(reminder.totalAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t.area.dealerDashboard.pagato}</p>
                            <p className="font-medium text-green-600">{formatCurrency(reminder.paidAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t.area.dealerDashboard.rimanente}</p>
                            <p className="font-bold text-destructive">{formatCurrency(reminder.remainingAmount)}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>{t.area.dealerDashboard.progressoLabel}</span>
                            <span>{reminder.percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={reminder.percentage} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50 text-green-600" />
                <p className="text-sm font-medium">{t.area.dealerDashboard.tuttoInRegola}</p>
                <p className="text-xs mt-1">{t.area.dealerDashboard.nessunPagamentoSospeso}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links - Read Only */}
      <Card>
        <CardHeader>
          <CardTitle>{t.area.dealerDashboard.linkRapidi}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button
              onClick={() => navigate(`${basePath}/ordini`)}
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">{t.area.dealerDashboard.visualizzaOrdini}</p>
                <p className="text-xs text-muted-foreground">{t.area.dealerDashboard.tuttiOrdini}</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate(`${basePath}/pagamenti`)}
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <CreditCard className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">{t.area.dealerDashboard.storicoPagementi}</p>
                <p className="text-xs text-muted-foreground">{t.area.dealerDashboard.consultaPagementi}</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate(`${basePath}/assistenza`)}
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <Headphones className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">{t.area.nav.assistenza}</p>
                <p className="text-xs text-muted-foreground">{t.area.dealerDashboard.apriTicket}</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
