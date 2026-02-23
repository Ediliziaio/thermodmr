import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, Save } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const PRODUCT_CATEGORIES = [
  { key: "serramenti_pvc", label: "Serramenti PVC" },
  { key: "persiane", label: "Persiane" },
  { key: "portoncini", label: "Portoncini" },
  { key: "tapparelle", label: "Tapparelle" },
  { key: "cassonetti", label: "Cassonetti" },
];

const CommissionSettingsSection = () => {
  const { data: settings, isLoading } = useSettings("commission");
  const updateSetting = useUpdateSetting();
  
  const [percentage, setPercentage] = useState("3.0");
  const [calculationBase, setCalculationBase] = useState("totale");
  const [categoryCommissions, setCategoryCommissions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const percentageSetting = settings.find((s) => s.key === "default_commission_percentage");
      const baseSetting = settings.find((s) => s.key === "commission_calculation_base");
      const categorySetting = settings.find((s) => s.key === "commission_by_category");
      
      if (percentageSetting) setPercentage(String(percentageSetting.value));
      if (baseSetting) setCalculationBase(String(baseSetting.value).replace(/"/g, ""));
      if (categorySetting && typeof categorySetting.value === "object" && categorySetting.value !== null) {
        const vals: Record<string, string> = {};
        for (const cat of PRODUCT_CATEGORIES) {
          vals[cat.key] = String((categorySetting.value as any)[cat.key] ?? "");
        }
        setCategoryCommissions(vals);
      }
    }
  }, [settings]);

  const validate = () => {
    const pct = parseFloat(percentage);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      toast({ title: "Errore", description: "La percentuale deve essere tra 0 e 100", variant: "destructive" });
      return false;
    }
    for (const cat of PRODUCT_CATEGORIES) {
      const val = categoryCommissions[cat.key];
      if (val && val !== "") {
        const n = parseFloat(val);
        if (isNaN(n) || n < 0 || n > 100) {
          toast({ title: "Errore", description: `Percentuale per ${cat.label} deve essere tra 0 e 100`, variant: "destructive" });
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateSetting.mutate({ key: "default_commission_percentage", value: percentage });
    updateSetting.mutate({ key: "commission_calculation_base", value: calculationBase });
    
    const categoryValues: Record<string, number | null> = {};
    for (const cat of PRODUCT_CATEGORIES) {
      const val = categoryCommissions[cat.key];
      categoryValues[cat.key] = val && val !== "" ? parseFloat(val) : null;
    }
    updateSetting.mutate({ key: "commission_by_category", value: categoryValues });
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Commissioni per Categoria Prodotto</h3>
            <p className="text-sm text-muted-foreground">
              Imposta percentuali differenziate per categoria. Lascia vuoto per usare la percentuale di default.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div key={cat.key} className="space-y-1">
                <Label htmlFor={`cat-${cat.key}`}>{cat.label}</Label>
                <div className="relative">
                  <Input
                    id={`cat-${cat.key}`}
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder={percentage}
                    value={categoryCommissions[cat.key] || ""}
                    onChange={(e) =>
                      setCategoryCommissions((prev) => ({ ...prev, [cat.key]: e.target.value }))
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
            ))}
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

export default CommissionSettingsSection;
