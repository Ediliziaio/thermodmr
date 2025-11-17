import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface OrderTrendsChartProps {
  data: Array<{
    date: string;
    ordini: number;
    valore: number;
    consegnati: number;
  }>;
  title?: string;
}

type ChartType = "line" | "bar" | "area";

export function OrderTrendsChart({ data, title = "Trend Ordini" }: OrderTrendsChartProps) {
  const [chartType, setChartType] = useState<ChartType>("line");
  
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
              {entry.name}: {entry.dataKey === 'valore' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="ordini" fill="hsl(var(--primary))" name="Ordini" radius={[4, 4, 0, 0]} />
            <Bar dataKey="consegnati" fill="hsl(var(--chart-2))" name="Consegnati" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorOrdini" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConsegnati" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="ordini" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorOrdini)" name="Ordini" />
            <Area type="monotone" dataKey="consegnati" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorConsegnati)" name="Consegnati" />
          </AreaChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="ordini" stroke="hsl(var(--primary))" strokeWidth={2} name="Ordini" dot={{ fill: "hsl(var(--primary))" }} />
            <Line type="monotone" dataKey="consegnati" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Consegnati" dot={{ fill: "hsl(var(--chart-2))" }} />
            <Line type="monotone" dataKey="valore" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Valore (k€)" dot={{ fill: "hsl(var(--chart-3))" }} />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              Linee
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              Barre
            </Button>
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              Area
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
