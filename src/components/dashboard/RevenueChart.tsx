import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface RevenueChartProps {
  data: Array<{
    month: string;
    ricavi: number;
    acconti: number;
    incassato: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const isMobile = useIsMobile();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className={isMobile ? "p-4" : ""}>
        <CardTitle className={isMobile ? "text-base" : ""}>Andamento Ricavi</CardTitle>
        <CardDescription className={isMobile ? "text-xs" : ""}>Ultimi 6 mesi</CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-0" : ""}>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <LineChart 
            data={data}
            margin={isMobile ? { top: 5, right: 5, left: -20, bottom: 5 } : undefined}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              angle={isMobile ? -35 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis 
              className="text-xs"
              tickFormatter={formatCurrency}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 50 : 60}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: isMobile ? '11px' : '13px',
              }}
            />
            <Legend 
              iconSize={isMobile ? 8 : 12}
              wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
            />
            <Line
              type="monotone"
              dataKey="ricavi"
              name="Ricavi Totali"
              stroke="hsl(var(--primary))"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ fill: 'hsl(var(--primary))', r: isMobile ? 3 : 4 }}
            />
            <Line
              type="monotone"
              dataKey="acconti"
              name="Acconti"
              stroke="hsl(var(--chart-2))"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ fill: 'hsl(var(--chart-2))', r: isMobile ? 3 : 4 }}
            />
            <Line
              type="monotone"
              dataKey="incassato"
              name="Incassato"
              stroke="hsl(var(--chart-3))"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ fill: 'hsl(var(--chart-3))', r: isMobile ? 3 : 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
