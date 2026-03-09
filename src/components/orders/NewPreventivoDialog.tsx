import { useState, useEffect, useRef } from "react";
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
import { Plus, Trash2, Loader2, Paperclip, X } from "lucide-react";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import { useCreatePreventivo } from "@/hooks/useOrders";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { MODALITA_PAGAMENTO_OPTIONS } from "@/lib/orderConstants";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const orderLineSchema = z.object({
  categoria: z.string().min(1, "Categoria richiesta"),
  descrizione: z.string().min(1, "Descrizione richiesta"),
  quantita: z.coerce.number().min(1, "Quantità minima 1"),
  prezzo_unitario: z.coerce.number().min(0, "Prezzo deve essere >= 0"),
  sconto: z.coerce.number().min(0).max(100).default(0),
  iva: z.coerce.number().default(0),
});

const preventivoFormSchema = z.object({
  dealer_id: z.string().uuid("Seleziona un rivenditore"),
  riferimento_preventivo: z.string().optional(),
  cliente_nome: z.string().optional(),
  cliente_cognome: z.string().optional(),
  cliente_email: z.string().email().optional().or(z.literal("")),
  cliente_telefono: z.string().optional(),
  cliente_indirizzo: z.string().optional(),
  data_scadenza_preventivo: z.string().min(1, "Data scadenza richiesta"),
  modalita_pagamento: z.string().optional(),
  note_rivenditore: z.string().optional(),
  note_interna: z.string().optional(),
  order_lines: z.array(orderLineSchema).min(1, "Aggiungi almeno una riga"),
});

type PreventivoFormValues = z.infer<typeof preventivoFormSchema>;

export interface PreventivoDefaultValues {
  dealer_id?: string;
  riferimento_preventivo?: string;
  cliente_nome?: string;
  cliente_cognome?: string;
  cliente_email?: string;
  cliente_telefono?: string;
  cliente_indirizzo?: string;
  note_rivenditore?: string;
  note_interna?: string;
  order_lines?: Array<{
    categoria: string;
    descrizione: string;
    quantita: number;
    prezzo_unitario: number;
    sconto: number;
    iva: number;
  }>;
}

const getDefault30DaysDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const calculateLineTotal = (line: z.infer<typeof orderLineSchema>) => {
  const subtotal = line.quantita * line.prezzo_unitario;
  return subtotal * (1 - line.sconto / 100);
};

interface NewPreventivoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDealerId?: string;
  defaultValues?: PreventivoDefaultValues;
}

export function NewPreventivoDialog({ open, onOpenChange, defaultDealerId, defaultValues }: NewPreventivoDialogProps) {
  const isDuplicate = !!defaultValues;
  const { data: dealersData } = useDealersInfinite();
  const dealers = useMemo(() => dealersData?.pages.flatMap(p => p.data) || [], [dealersData]);
  const createPreventivoMutation = useCreatePreventivo();
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PreventivoFormValues>({
    resolver: zodResolver(preventivoFormSchema),
    defaultValues: {
      dealer_id: defaultDealerId || "",
      riferimento_preventivo: "",
      data_scadenza_preventivo: "",
      order_lines: [
        { categoria: "Infissi", descrizione: "", quantita: 1, prezzo_unitario: 0, sconto: 0, iva: 0 },
      ],
    },
  });

  // Pre-fill form when duplicating
  useEffect(() => {
    if (defaultValues && open) {
      form.reset({
        dealer_id: defaultValues.dealer_id || defaultDealerId || "",
        riferimento_preventivo: defaultValues.riferimento_preventivo || "",
        cliente_nome: defaultValues.cliente_nome || "",
        cliente_cognome: defaultValues.cliente_cognome || "",
        cliente_email: defaultValues.cliente_email || "",
        cliente_telefono: defaultValues.cliente_telefono || "",
        cliente_indirizzo: defaultValues.cliente_indirizzo || "",
        data_scadenza_preventivo: "", // always empty for duplicates
        note_rivenditore: defaultValues.note_rivenditore || "",
        note_interna: defaultValues.note_interna || "",
        order_lines: defaultValues.order_lines && defaultValues.order_lines.length > 0
          ? defaultValues.order_lines.map(l => ({ ...l, iva: 0 }))
          : [{ categoria: "Infissi", descrizione: "", quantita: 1, prezzo_unitario: 0, sconto: 0, iva: 0 }],
      });
    }
  }, [defaultValues, open]);

  // Reset pending files when dialog closes
  useEffect(() => {
    if (!open) {
      setPendingFiles([]);
    }
  }, [open]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_lines",
  });

  const watchedLines = form.watch("order_lines");
  const importoTotale = watchedLines.reduce((sum, line) => sum + calculateLineTotal(line), 0);

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setPendingFiles(prev => [...prev, ...Array.from(files)]);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadAttachments = async (preventivoId: string) => {
    if (pendingFiles.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    for (const file of pendingFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${preventivoId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("order-attachments")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        continue;
      }

      const { error: insertError } = await supabase
        .from("attachments")
        .insert({
          ordine_id: preventivoId,
          nome_file: file.name,
          url: fileName,
          tipo_mime: file.type,
          dimensione: file.size,
          uploaded_by_user_id: user.id,
        });

      if (insertError) {
        console.error("Error inserting attachment record:", insertError);
      }
    }
  };

  const onSubmit = async (values: PreventivoFormValues) => {
    const newPreventivo = await createPreventivoMutation.mutateAsync({
      dealer_id: values.dealer_id,
      riferimento_preventivo: values.riferimento_preventivo,
      cliente_nome: values.cliente_nome,
      cliente_cognome: values.cliente_cognome,
      cliente_email: values.cliente_email,
      cliente_telefono: values.cliente_telefono,
      cliente_indirizzo: values.cliente_indirizzo,
      data_scadenza_preventivo: values.data_scadenza_preventivo,
      modalita_pagamento: values.modalita_pagamento,
      note_rivenditore: values.note_rivenditore,
      note_interna: values.note_interna,
      order_lines: values.order_lines,
    });

    // Upload pending files after preventivo creation
    if (pendingFiles.length > 0) {
      setUploadingFiles(true);
      try {
        await uploadAttachments(newPreventivo.id);
        toast({
          title: "Allegati caricati",
          description: `${pendingFiles.length} allegati caricati con successo.`,
        });
      } catch (error) {
        console.error("Error uploading attachments:", error);
        toast({
          title: "Errore allegati",
          description: "Alcuni allegati non sono stati caricati correttamente.",
          variant: "destructive",
        });
      } finally {
        setUploadingFiles(false);
      }
    }

    onOpenChange(false);
    form.reset();
    setPendingFiles([]);
  };

  const isSubmitting = createPreventivoMutation.isPending || uploadingFiles;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isDuplicate ? "Duplica Preventivo" : "Crea Nuovo Preventivo"}</DialogTitle>
          <DialogDescription>
            {isDuplicate
              ? "Modifica i dati pre-compilati e salva come nuovo preventivo"
              : "Compila i dati del preventivo e aggiungi le righe prodotto"}
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

            {/* Riferimento Preventivo */}
            <FormField
              control={form.control}
              name="riferimento_preventivo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Riferimento Preventivo</FormLabel>
                  <FormControl>
                    <Input placeholder="Es. PRV-cliente-001, rif. interno..." {...field} />
                  </FormControl>
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
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ categoria: "Infissi", descrizione: "", quantita: 1, prezzo_unitario: 0, sconto: 0, iva: 0 })}>
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
                        <div className="mt-2 flex justify-end text-sm">
                          <span className="font-semibold whitespace-nowrap">
                            Totale: {formatCurrency(calculateLineTotal(watchedLines[index]))}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modalità Pagamento */}
            <FormField
              control={form.control}
              name="modalita_pagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modalità di Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona modalità" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MODALITA_PAGAMENTO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField control={form.control} name="note_rivenditore" render={({ field }) => (
              <FormItem><FormLabel>Note Rivenditore</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="note_interna" render={({ field }) => (
              <FormItem><FormLabel>Note Interna</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            {/* Attachments */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Allegati</h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddFiles}>
                    <Paperclip className="h-4 w-4 mr-2" />Aggiungi Allegato
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {pendingFiles.length > 0 ? (
                  <div className="space-y-2">
                    {pendingFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/30 rounded-md px-3 py-2 text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <Paperclip className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-muted-foreground text-xs shrink-0">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 shrink-0" onClick={() => handleRemoveFile(index)}>
                          <X className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nessun allegato selezionato</p>
                )}
              </CardContent>
            </Card>

            <Separator />

            {/* Totals */}
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between text-lg font-semibold">
                <span>Importo Totale Preventivo:</span>
                <span>{formatCurrency(importoTotale)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDuplicate ? "Duplica Preventivo" : "Crea Preventivo"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
