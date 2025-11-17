import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, Save } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";

const CommissionSettingsSection = () => {
  const { data: settings, isLoading } = useSettings("commission");
  const updateSetting = useUpdateSetting();
  
  const [percentage, setPercentage] = useState("3.0");
  const [calculationBase, setCalculationBase] = useState("totale");

  useEffect(() => {
    if (settings) {
      const percentageSetting = settings.find((s) => s.key === "default_commission_percentage");
      const baseSetting = settings.find((s) => s.key === "commission_calculation_base");
      
      if (percentageSetting) setPercentage(String(percentageSetting.value));
      if (baseSetting) setCalculationBase(String(baseSetting.value).replace(/"/g, ""));
    }
  }, [settings]);

  const handleSave = () => {
    updateSetting.mutate({ key: "default_commission_percentage", value: percentage });
    updateSetting.mutate({ key: "commission_calculation_base", value: calculationBase });
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
          <Percent className="h-5 w-5" />
          Regole Commissioni
        </CardTitle>
        <CardDescription>
          Configura le percentuali e le regole di calcolo delle commissioni
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="percentage">Percentuale Commissione di Default (%)</Label>
          <Input
            id="percentage"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Questa percentuale verrà applicata automaticamente a tutti i nuovi ordini
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calculationBase">Base di Calcolo</Label>
          <Select value={calculationBase} onValueChange={setCalculationBase}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totale">Totale Ordine (al netto IVA)</SelectItem>
              <SelectItem value="margine">Margine (se gestito)</SelectItem>
              <SelectItem value="personalizzata">Personalizzata per dealer</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Seleziona come calcolare le commissioni per i commerciali
          </p>
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

export default CommissionSettingsSection;