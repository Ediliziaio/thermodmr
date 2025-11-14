import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelChart, Funnel, Cell, LabelList, ResponsiveContainer, Tooltip } from "recharts";

interface ConversionFunnelChartProps {
  data: Array<{
    stage: string;
    count: number;
    rate: number;
  }>;
}

const stageLabels: Record<string, string> = {
  da_confermare: "Da Confermare",
  da_pagare_acconto: "Da Pagare Acconto",
  in_lavorazione: "In Lavorazione",
  da_consegnare: "Da Consegnare",
  consegnato: "Consegnato",
};

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  const funnelData = data.map((item, index) => ({
    name: stageLabels[item.stage] || item.stage,
    value: item.count,
    rate: item.rate,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel di Conversione</CardTitle>
        <CardDescription>Andamento ordini attraverso gli stati</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <FunnelChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value} ordini (${props.payload.rate.toFixed(1)}% conversion)`,
                name
              ]}
            />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive
            >
              <LabelList
                position="right"
                fill="hsl(var(--foreground))"
                stroke="none"
                dataKey="name"
              />
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
