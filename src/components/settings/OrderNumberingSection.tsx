import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, Save, RefreshCw } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const OrderNumberingSection = () => {
  const { data: settings, isLoading } = useSettings("order_numbering");
  const updateSetting = useUpdateSetting();
  
  const [format, setFormat] = useState("ORD-{YYYY}-{####}");
  const [counter, setCounter] = useState("1");
  const [prefix, setPrefix] = useState("ORD");

  useEffect(() => {
    if (settings) {
      const formatSetting = settings.find((s) => s.key === "order_number_format");
      const counterSetting = settings.find((s) => s.key === "order_number_counter");
      const prefixSetting = settings.find((s) => s.key === "order_number_prefix");
      
      if (formatSetting) setFormat(String(formatSetting.value).replace(/"/g, ""));
      if (counterSetting) setCounter(String(counterSetting.value));
      if (prefixSetting) setPrefix(String(prefixSetting.value).replace(/"/g, ""));
    }
  }, [settings]);

  const handleSave = () => {
    updateSetting.mutate({ key: "order_number_format", value: format });
    updateSetting.mutate({ key: "order_number_counter", value: counter });
    updateSetting.mutate({ key: "order_number_prefix", value: prefix });
  };

  const getPreview = () => {
    const year = new Date().getFullYear();
    const paddedCounter = counter.padStart(4, "0");
    return format
      .replace("{YYYY}", String(year))
      .replace("{YY}", String(year).slice(-2))
      .replace("{####}", paddedCounter)
      .replace("{###}", counter.padStart(3, "0"))
      .replace("{##}", counter.padStart(2, "0"));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Numerazione Ordini
        </CardTitle>
        <CardDescription>
          Personalizza il formato e il contatore degli ID degli ordini
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prefix">Prefisso</Label>
          <Input
            id="prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="ORD"
          />
          <p className="text-sm text-muted-foreground">
            Prefisso fisso per tutti gli ordini
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Formato Numero Ordine</Label>
          <Input
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            placeholder="ORD-{YYYY}-{####}"
          />
          <p className="text-sm text-muted-foreground">
            Usa: {"{YYYY}"} per anno completo, {"{YY}"} per anno a 2 cifre, {"{####}"} per numero progressivo
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="counter">Contatore Corrente</Label>
          <div className="flex gap-2">
            <Input
              id="counter"
              type="number"
              min="1"
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCounter("1")}
              title="Reset contatore"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Prossimo numero ordine disponibile
          </p>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Anteprima prossimo ordine:</span>
            <Badge variant="secondary" className="text-lg font-mono">
              {getPreview()}
            </Badge>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateSetting.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateSetting.isPending ? "Salvataggio..." : "Salva Modifiche"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderNumberingSection;