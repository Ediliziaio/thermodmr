import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Euro } from "lucide-react";

interface PaymentTrendData {
  month: string;
  acconti: number;
  saldi: number;
  parziali: number;
  totale: number;
}

interface PaymentTrendsDetailedChartProps {
  data: PaymentTrendData[];
  title?: string;
}

export function PaymentTrendsDetailedChart({ data, title = "Trend Pagamenti Mensili" }: PaymentTrendsDetailedChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
          <p className="text-sm font-bold mt-2 border-t pt-1">
            Totale: {formatCurrency(payload.reduce((sum: number, p: any) => sum + p.value, 0))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Euro className="h-5 w-5 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="acconti" stackId="a" fill="hsl(var(--chart-1))" name="Acconti" radius={[0, 0, 0, 0]} />
            <Bar dataKey="parziali" stackId="a" fill="hsl(var(--chart-2))" name="Parziali" radius={[0, 0, 0, 0]} />
            <Bar dataKey="saldi" stackId="a" fill="hsl(var(--chart-3))" name="Saldi" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 rounded-lg bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">Acconti</p>
            <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-1))" }}>
              {formatCurrency(data.reduce((sum, d) => sum + d.acconti, 0))}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">Parziali</p>
            <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-2))" }}>
              {formatCurrency(data.reduce((sum, d) => sum + d.parziali, 0))}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">Saldi</p>
            <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-3))" }}>
              {formatCurrency(data.reduce((sum, d) => sum + d.saldi, 0))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
