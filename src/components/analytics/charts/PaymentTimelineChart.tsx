import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface PaymentData {
  data_pagamento: string;
  importo: number;
  tipo: string;
}

interface PaymentTimelineChartProps {
  payments: PaymentData[];
  totalAmount: number;
  title?: string;
}

export function PaymentTimelineChart({ 
  payments, 
  totalAmount,
  title = "Timeline Pagamenti" 
}: PaymentTimelineChartProps) {
  // Ordina pagamenti per data
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(a.data_pagamento).getTime() - new Date(b.data_pagamento).getTime()
  );

  // Crea dati cumulativi per il grafico
  let cumulative = 0;
  const chartData = sortedPayments.map((payment) => {
    cumulative += Number(payment.importo);
    const percentage = (cumulative / totalAmount) * 100;

    return {
      date: format(new Date(payment.data_pagamento), "dd MMM yyyy", { locale: it }),
      importo: Number(payment.importo),
      cumulativo: cumulative,
      percentuale: percentage,
      tipo: payment.tipo,
    };
  });

  // Aggiungi punto iniziale (0) se ci sono pagamenti
  if (chartData.length > 0) {
    const firstPaymentDate = new Date(sortedPayments[0].data_pagamento);
    firstPaymentDate.setDate(firstPaymentDate.getDate() - 1);
    
    chartData.unshift({
      date: format(firstPaymentDate, "dd MMM yyyy", { locale: it }),
      importo: 0,
      cumulativo: 0,
      percentuale: 0,
      tipo: "",
    });
  }

  const totalPaid = cumulative;
  const remaining = totalAmount - totalPaid;
  const percentagePaid = totalAmount > 0 ? (totalPaid / totalAmount * 100).toFixed(1) : "0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {title}
          </span>
          <Badge variant={Number(percentagePaid) === 100 ? "default" : "secondary"}>
            {percentagePaid}% Pagato
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Totale Ordine</p>
            <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pagato</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Rimanente</p>
            <p className="text-xl font-bold text-orange-600">{formatCurrency(remaining)}</p>
          </div>
        </div>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "cumulativo") {
                    return [formatCurrency(value), "Totale Pagato"];
                  }
                  return [formatCurrency(value), "Pagamento"];
                }}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="cumulativo"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={2}
                fill="url(#colorCumulative)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nessun pagamento registrato
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Pagamento</span>
            <span className="font-medium">{percentagePaid}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${
                Number(percentagePaid) === 100 
                  ? "bg-green-500" 
                  : Number(percentagePaid) > 50 
                    ? "bg-primary" 
                    : "bg-orange-500"
              }`}
              style={{ width: `${percentagePaid}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
