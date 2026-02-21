import { useState } from "react";
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
import { OrderLine } from "@/types";

interface OrderLinesEditorProps {
  lines: OrderLine[];
  onLinesChange: (lines: OrderLine[]) => void;
  orderStatus?: string;
  readOnly?: boolean;
}

const categories = [
  "Finestra",
  "Portafinestra",
  "Scorrevole",
  "Porta",
  "Accessorio",
];

export function OrderLinesEditor({ lines, onLinesChange, orderStatus, readOnly = false }: OrderLinesEditorProps) {
  const [editingLines, setEditingLines] = useState<OrderLine[]>(lines);
  
  const canEdit = !readOnly && (orderStatus === "da_confermare" || !orderStatus);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

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
    setEditingLines([...editingLines, newLine]);
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
        <CardTitle>Righe Ordine</CardTitle>
        {canEdit && (
          <Button onClick={addNewLine} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Riga
          </Button>
        )}
      </CardHeader>
      {!canEdit && orderStatus !== "da_confermare" && (
        <div className="px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            Le righe possono essere modificate solo quando l'ordine è in stato "Da Confermare"
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
                <Select
                  value={String(line.iva)}
                  onValueChange={(value) => updateLine(line.id, "iva", parseFloat(value))}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% - Reverse Charge</SelectItem>
                    <SelectItem value="4">4% - IVA ridotta</SelectItem>
                    <SelectItem value="10">10% - IVA ridotta</SelectItem>
                    <SelectItem value="22">22% - IVA ordinaria</SelectItem>
                  </SelectContent>
                </Select>
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
            <p>Nessuna riga presente. Clicca su "Aggiungi Riga" per iniziare.</p>
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
              <span>Totale Ordine</span>
              <span>{formatCurrency(totalImporto)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
