import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import { useCreatePreventivo } from "@/hooks/useOrders";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const orderLineSchema = z.object({
  categoria: z.string().min(1, "Categoria richiesta"),
  descrizione: z.string().min(1, "Descrizione richiesta"),
  quantita: z.coerce.number().min(1, "Quantità minima 1"),
  prezzo_unitario: z.coerce.number().min(0, "Prezzo deve essere >= 0"),
  sconto: z.coerce.number().min(0).max(100).default(0),
  iva: z.coerce.number().min(0).max(100).default(22),
});

const preventivoFormSchema = z.object({
  dealer_id: z.string().uuid("Seleziona un rivenditore"),
  cliente_nome: z.string().optional(),
  cliente_cognome: z.string().optional(),
  cliente_email: z.string().email().optional().or(z.literal("")),
  cliente_telefono: z.string().optional(),
  cliente_indirizzo: z.string().optional(),
  data_consegna_prevista: z.string().optional(),
  data_scadenza_preventivo: z.string().min(1, "Data scadenza richiesta"),
  note_rivenditore: z.string().optional(),
  note_interna: z.string().optional(),
  order_lines: z.array(orderLineSchema).min(1, "Aggiungi almeno una riga"),
});

type PreventivoFormValues = z.infer<typeof preventivoFormSchema>;

const calculateLineTotal = (line: z.infer<typeof orderLineSchema>) => {
  const subtotal = line.quantita * line.prezzo_unitario;
  const afterDiscount = subtotal * (1 - line.sconto / 100);
  return afterDiscount * (1 + line.iva / 100);
};

interface NewPreventivoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDealerId?: string;
}

export function NewPreventivoDialog({ open, onOpenChange, defaultDealerId }: NewPreventivoDialogProps) {
  const { data: dealersData } = useDealersInfinite();
  const dealers = useMemo(() => dealersData?.pages.flatMap(p => p.data) || [], [dealersData]);
  const createPreventivoMutation = useCreatePreventivo();

  const form = useForm<PreventivoFormValues>({
    resolver: zodResolver(preventivoFormSchema),
    defaultValues: {
      dealer_id: defaultDealerId || "",
      data_scadenza_preventivo: "",
      order_lines: [
        { categoria: "Infissi", descrizione: "", quantita: 1, prezzo_unitario: 0, sconto: 0, iva: 22 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_lines",
  });

  const watchedLines = form.watch("order_lines");
  const importoTotale = watchedLines.reduce((sum, line) => sum + calculateLineTotal(line), 0);

  const onSubmit = async (values: PreventivoFormValues) => {
    await createPreventivoMutation.mutateAsync({
      dealer_id: values.dealer_id,
      cliente_nome: values.cliente_nome,
      cliente_cognome: values.cliente_cognome,
      cliente_email: values.cliente_email,
      cliente_telefono: values.cliente_telefono,
      cliente_indirizzo: values.cliente_indirizzo,
      data_consegna_prevista: values.data_consegna_prevista,
      data_scadenza_preventivo: values.data_scadenza_preventivo,
      note_rivenditore: values.note_rivenditore,
      note_interna: values.note_interna,
      order_lines: values.order_lines,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crea Nuovo Preventivo</DialogTitle>
          <DialogDescription>
            Compila i dati del preventivo e aggiungi le righe prodotto
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dealer Selection */}
            <FormField
              control={form.control}
              name="dealer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rivenditore *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona rivenditore" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dealers?.map((dealer) => (
                        <SelectItem key={dealer.id} value={dealer.id}>
                          {dealer.ragione_sociale}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data Scadenza Preventivo */}
            <FormField
              control={form.control}
              name="data_scadenza_preventivo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Scadenza Preventivo *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold mb-4">Cliente Finale (Opzionale)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="cliente_nome" render={({ field }) => (
                    <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cliente_cognome" render={({ field }) => (
                    <FormItem><FormLabel>Cognome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cliente_email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cliente_telefono" render={({ field }) => (
                    <FormItem><FormLabel>Telefono</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cliente_indirizzo" render={({ field }) => (
                    <FormItem className="col-span-2"><FormLabel>Indirizzo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* Order Lines */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Righe Preventivo *</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ categoria: "Infissi", descrizione: "", quantita: 1, prezzo_unitario: 0, sconto: 0, iva: 22 })}>
                    <Plus className="h-4 w-4 mr-2" />Aggiungi Riga
                  </Button>
                </div>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-6 gap-3 items-start">
                          <FormField control={form.control} name={`order_lines.${index}.categoria`} render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Categoria</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger className="h-9"><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                  <SelectItem value="Infissi">Infissi</SelectItem>
                                  <SelectItem value="Porte">Porte</SelectItem>
                                  <SelectItem value="Accessori">Accessori</SelectItem>
                                  <SelectItem value="Altro">Altro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`order_lines.${index}.descrizione`} render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel className="text-xs">Descrizione</FormLabel>
                              <FormControl><Input className="h-9" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`order_lines.${index}.quantita`} render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Q.tà</FormLabel>
                              <FormControl><Input type="number" className="h-9" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`order_lines.${index}.prezzo_unitario`} render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Prezzo €</FormLabel>
                              <FormControl><Input type="number" step="0.01" className="h-9" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <div className="flex items-end gap-2">
                            <FormField control={form.control} name={`order_lines.${index}.sconto`} render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel className="text-xs">Sc. %</FormLabel>
                                <FormControl><Input type="number" step="0.01" className="h-9" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            {fields.length > 1 && (
                              <Button type="button" variant="ghost" size="sm" className="h-9" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">IVA: {watchedLines[index]?.iva || 22}%</span>
                          <span className="font-semibold">
                            Totale riga: {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(calculateLineTotal(watchedLines[index]))}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <FormField control={form.control} name="data_consegna_prevista" render={({ field }) => (
              <FormItem><FormLabel>Data Consegna Prevista</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="note_rivenditore" render={({ field }) => (
              <FormItem><FormLabel>Note Rivenditore</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="note_interna" render={({ field }) => (
              <FormItem><FormLabel>Note Interna</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <Separator />

            {/* Totals */}
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between text-lg font-semibold">
                <span>Importo Totale Preventivo:</span>
                <span>{new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(importoTotale)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
              <Button type="submit" disabled={createPreventivoMutation.isPending}>
                {createPreventivoMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crea Preventivo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
