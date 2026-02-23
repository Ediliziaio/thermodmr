import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface OrderStatusData {
  name: string;
  value: number;
  color: string;
}

interface OrderStatusPieChartProps {
  data: OrderStatusData[];
}

export const OrderStatusPieChart = React.memo(function OrderStatusPieChart({ data }: OrderStatusPieChartProps) {
  const isMobile = useIsMobile();
  const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader className={isMobile ? "p-4" : ""}>
        <CardTitle className={isMobile ? "text-base" : ""}>Ordini per Stato</CardTitle>
        <CardDescription className={isMobile ? "text-xs" : ""}>{totalOrders} ordini totali</CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-0" : ""}>
        <ResponsiveContainer width="100%" height={isMobile ? 280 : 300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={!isMobile}
              label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={isMobile ? 70 : 80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: isMobile ? '11px' : '13px',
              }}
            />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={isMobile ? 8 : 12}
              wrapperStyle={{ 
                fontSize: isMobile ? '10px' : '12px',
                paddingTop: '10px' 
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
