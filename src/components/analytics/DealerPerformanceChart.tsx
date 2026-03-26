import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Users, TrendingUp, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrencyCompact } from "@/lib/utils";

interface DealerPerformance {
  dealer: string;
  ordini: number;
  valore: number;
  ticketMedio: number;
  tassoConsegna: number;
}

interface DealerPerformanceChartProps {
  data: DealerPerformance[];
  title?: string;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function DealerPerformanceChart({ data, title = "Performance Dealers" }: DealerPerformanceChartProps) {

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-4 shadow-lg space-y-2">
          <p className="font-semibold text-sm">{data.dealer}</p>
          <div className="space-y-1 text-xs">
            <p><span className="text-muted-foreground">Ordini:</span> <span className="font-medium">{data.ordini}</span></p>
            <p><span className="text-muted-foreground">Valore:</span> <span className="font-medium">{formatCurrencyCompact(data.valore)}</span></p>
            <p><span className="text-muted-foreground">Ticket Medio:</span> <span className="font-medium">{formatCurrencyCompact(data.ticketMedio)}</span></p>
            <p><span className="text-muted-foreground">Tasso Consegna:</span> <span className="font-medium">{data.tassoConsegna.toFixed(1)}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "?";
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return <Badge className="bg-yellow-500">🥇 1°</Badge>;
    if (index === 1) return <Badge className="bg-gray-400">🥈 2°</Badge>;
    if (index === 2) return <Badge className="bg-orange-600">🥉 3°</Badge>;
    return <Badge variant="outline">{index + 1}°</Badge>;
  };

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
            <Users className="h-10 w-10 opacity-40" />
            <p className="text-sm">Nessun dealer con ordini nel periodo selezionato</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top 3 Dealers Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {data.slice(0, 3).map((dealer, index) => (
            <Card key={dealer.dealer} className="bg-accent/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(dealer.dealer)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm truncate max-w-[120px]">{dealer.dealer}</p>
                      {getRankBadge(index)}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Package className="h-3 w-3" /> Ordini
                    </span>
                    <span className="font-semibold">{dealer.ordini}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Valore
                    </span>
                    <span className="font-semibold">{formatCurrencyCompact(dealer.valore)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ticket Medio</span>
                    <span className="font-semibold">{formatCurrencyCompact(dealer.ticketMedio)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Consegne</span>
                    <span className="font-semibold">{dealer.tassoConsegna.toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" className="text-xs" />
            <YAxis dataKey="dealer" type="category" className="text-xs" width={90} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="valore" fill="hsl(var(--primary))" name="Valore (€)" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* All Dealers Table */}
        {data.length > 3 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground">Classifica Completa</h4>
            <div className="space-y-1">
              {data.slice(3).map((dealer, index) => (
                <div
                  key={dealer.dealer}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {getRankBadge(index + 3)}
                    <span className="text-sm font-medium">{dealer.dealer}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">{dealer.ordini} ordini</span>
                    <span className="font-semibold">{formatCurrencyCompact(dealer.valore)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
