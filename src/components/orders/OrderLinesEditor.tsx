import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { IvaSelector } from "./IvaSelector";

/** Internal normalized line format (camelCase) */
interface OrderLine {
  id: string;
  ordineId: string;
  categoria: string;
  descrizione: string;
  quantita: number;
  prezzoUnitario: number;
  sconto: number;
  iva: number;
  totaleRiga: number;
  misure?: Record<string, any>;
}

interface OrderLinesEditorProps {
  lines: any[];
  onLinesChange: (lines: OrderLine[]) => void;
  orderStatus?: string;
  readOnly?: boolean;
  title?: string;
}

const categories = [
  "Finestra",
  "Portafinestra",
  "Scorrevole",
  "Porta",
  "Accessorio",
];

/** Normalize a line from DB snake_case or internal camelCase */
function normalizeLine(raw: any): OrderLine {
  return {
    id: raw.id || `line-${Date.now()}-${Math.random()}`,
    ordineId: raw.ordine_id ?? raw.ordineId ?? "",
    categoria: raw.categoria || "Finestra",
    descrizione: raw.descrizione || "",
    quantita: Number(raw.quantita) || 1,
    prezzoUnitario: Number(raw.prezzo_unitario ?? raw.prezzoUnitario) || 0,
    sconto: Number(raw.sconto) || 0,
    iva: Number(raw.iva) ?? 22,
    totaleRiga: Number(raw.totale_riga ?? raw.totaleRiga) || 0,
    misure: raw.misure,
  };
}

export function OrderLinesEditor({ lines, onLinesChange, orderStatus, readOnly = false, title = "Righe Ordine" }: OrderLinesEditorProps) {
  const [editingLines, setEditingLines] = useState<OrderLine[]>(() => lines.map(normalizeLine));

  // Sync when external lines change (e.g. after refetch)
  useEffect(() => {
    setEditingLines(lines.map(normalizeLine));
  }, [lines]);

  const canEdit = !readOnly && (orderStatus === "da_confermare" || orderStatus === "preventivo" || !orderStatus);

  const calculateLineTotal = (line: OrderLine) => {
    const subtotal = line.quantita * line.prezzoUnitario;
    const afterDiscount = subtotal * (1 - line.sconto / 100);
    const withIva = afterDiscount * (1 + line.iva / 100);
    return withIva;
  };

  const addNewLine = () => {
    const newLine: OrderLine = {
      id: `line-${Date.now()}`,
      ordineId: "",
      categoria: "Finestra",
      descrizione: "",
      quantita: 1,
      prezzoUnitario: 0,
      sconto: 0,
      iva: 22,
      totaleRiga: 0,
    };
    const updated = [...editingLines, newLine];
    setEditingLines(updated);
    onLinesChange(updated);
  };

  const removeLine = (id: string) => {
    const updated = editingLines.filter((line) => line.id !== id);
    setEditingLines(updated);
    onLinesChange(updated);
  };

  const updateLine = (id: string, field: keyof OrderLine, value: any) => {
    const updated = editingLines.map((line) => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value };
        updatedLine.totaleRiga = calculateLineTotal(updatedLine);
        return updatedLine;
      }
      return line;
    });
    setEditingLines(updated);
    onLinesChange(updated);
  };

  const totalImporto = editingLines.reduce((sum, line) => sum + calculateLineTotal(line), 0);
  const totalIva = editingLines.reduce((sum, line) => {
    const subtotal = line.quantita * line.prezzoUnitario;
    const afterDiscount = subtotal * (1 - line.sconto / 100);
    return sum + (afterDiscount * line.iva / 100);
  }, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {canEdit && (
          <Button onClick={addNewLine} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Riga
          </Button>
        )}
      </CardHeader>
      {!canEdit && readOnly && orderStatus && orderStatus !== "da_confermare" && orderStatus !== "preventivo" && (
        <div className="px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            Le righe possono essere modificate solo quando l'ordine è in stato "Da Confermare" o "Preventivo"
          </p>
        </div>
      )}
      <CardContent className="space-y-6">
        {editingLines.map((line, index) => (
          <div key={line.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Riga #{index + 1}
              </span>
              {canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLine(line.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={line.categoria}
                  onValueChange={(value) => updateLine(line.id, "categoria", value)}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Descrizione</Label>
                <Input
                  value={line.descrizione}
                  onChange={(e) => updateLine(line.id, "descrizione", e.target.value)}
                  placeholder="Descrizione prodotto"
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label>Quantità</Label>
                <Input
                  type="number"
                  min="1"
                  value={line.quantita}
                  onChange={(e) =>
                    updateLine(line.id, "quantita", parseInt(e.target.value) || 1)
                  }
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label>Prezzo Unitario (€)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={line.prezzoUnitario}
                  onChange={(e) =>
                    updateLine(line.id, "prezzoUnitario", parseFloat(e.target.value) || 0)
                  }
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label>Sconto (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={line.sconto}
                  onChange={(e) =>
                    updateLine(line.id, "sconto", parseFloat(e.target.value) || 0)
                  }
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label>IVA</Label>
                <IvaSelector
                  value={line.iva}
                  onChange={(value) => updateLine(line.id, "iva", value)}
                  disabled={!canEdit}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Totale Riga</p>
                <p className="text-lg font-bold">
                  {formatCurrency(calculateLineTotal(line))}
                </p>
              </div>
            </div>
          </div>
        ))}

        {editingLines.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nessuna riga presente. {canEdit ? 'Clicca su "Aggiungi Riga" per iniziare.' : ''}</p>
          </div>
        )}

        {editingLines.length > 0 && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Imponibile</span>
              <span className="font-medium">
                {formatCurrency(totalImporto - totalIva)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA Totale</span>
              <span className="font-medium">{formatCurrency(totalIva)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>{title.replace("Righe", "Totale")}</span>
              <span>{formatCurrency(totalImporto)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
