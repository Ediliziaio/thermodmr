import { format } from "date-fns";
import { it } from "date-fns/locale";

/**
 * Convert array of objects to CSV string
 */
export function arrayToCSV(data: Record<string, any>[], headers?: string[]): string {
  if (data.length === 0) return "";

  // Use provided headers or extract from first object
  const keys = headers || Object.keys(data[0]);
  
  // Create header row
  const headerRow = keys.join(",");
  
  // Create data rows
  const dataRows = data.map(row => 
    keys.map(key => {
      const value = row[key];
      
      // Handle special types
      if (value === null || value === undefined) return "";
      if (typeof value === "object") return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(",")
  );
  
  return [headerRow, ...dataRows].join("\n");
}

/**
 * Download CSV file
 */
export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Format date for export
 */
export function formatDateForExport(date: string | Date | null | undefined): string {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd/MM/yyyy", { locale: it });
}

/**
 * Format currency for export
 */
export function formatCurrencyForExport(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0,00";
  return value.toFixed(2).replace(".", ",");
}

/**
 * Export dealers to CSV
 */
export function exportDealers(dealers: any[]) {
  const data = dealers.map(d => ({
    "Ragione Sociale": d.ragione_sociale,
    "P.IVA": d.p_iva,
    "Codice Fiscale": d.codice_fiscale,
    "Email": d.email,
    "Telefono": d.telefono,
    "Indirizzo": d.indirizzo,
    "CAP": d.cap,
    "Città": d.citta,
    "Provincia": d.provincia,
    "Fatturato Totale": formatCurrencyForExport(d.total_revenue),
    "Numero Ordini": d.orders_count || 0,
    "Commissione Personalizzata": d.commissione_personalizzata ? formatCurrencyForExport(d.commissione_personalizzata) : "",
    "Data Creazione": formatDateForExport(d.created_at),
  }));

  const csv = arrayToCSV(data);
  const filename = `rivenditori_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`;
  downloadCSV(csv, filename);
}

/**
 * Export orders to CSV
 */
export function exportOrders(orders: any[]) {
  const data = orders.map(o => ({
    "ID": o.id,
    "Rivenditore": o.dealers?.ragione_sociale || "",
    "Commerciale": o.profiles?.display_name || "",
    "Stato": o.stato,
    "Data Inserimento": formatDateForExport(o.data_inserimento),
    "Data Consegna Prevista": formatDateForExport(o.data_consegna_prevista),
    "Importo Totale": formatCurrencyForExport(o.importo_totale),
    "Importo Acconto": formatCurrencyForExport(o.importo_acconto),
    "Importo Pagato": formatCurrencyForExport(o.importo_pagato),
    "Importo Da Pagare": formatCurrencyForExport(o.importo_da_pagare),
    "Percentuale Pagata": o.percentuale_pagata ? `${o.percentuale_pagata.toFixed(2)}%` : "0%",
    "Cliente Finale": o.clients ? `${o.clients.nome} ${o.clients.cognome}` : "",
    "Note Interna": o.note_interna || "",
    "Note Rivenditore": o.note_rivenditore || "",
  }));

  const csv = arrayToCSV(data);
  const filename = `ordini_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`;
  downloadCSV(csv, filename);
}

/**
 * Export payments to CSV
 */
export function exportPayments(payments: any[]) {
  const data = payments.map(p => ({
    "ID": p.id,
    "Ordine": p.ordine_id,
    "Rivenditore": p.orders?.dealers?.ragione_sociale || "",
    "Tipo": p.tipo,
    "Metodo": p.metodo,
    "Importo": formatCurrencyForExport(p.importo),
    "Data Pagamento": formatDateForExport(p.data_pagamento),
    "Riferimento": p.riferimento || "",
    "Data Creazione": formatDateForExport(p.created_at),
  }));

  const csv = arrayToCSV(data);
  const filename = `pagamenti_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`;
  downloadCSV(csv, filename);
}

/**
 * Export commerciali to CSV
 */
export function exportCommerciali(commerciali: any[]) {
  const data = commerciali.map(c => ({
    "Nome": c.display_name,
    "Email": c.email,
    "Stato": c.is_active ? "Attivo" : "Inattivo",
    "Numero Rivenditori": c.dealers_count || 0,
    "Numero Ordini": c.ordini_count || 0,
    "Fatturato Totale": formatCurrencyForExport(c.fatturato_totale),
    "Provvigioni Dovute": formatCurrencyForExport(c.provvigioni_dovute),
    "Provvigioni Liquidate": formatCurrencyForExport(c.provvigioni_liquidate),
  }));

  const csv = arrayToCSV(data);
  const filename = `commerciali_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`;
  downloadCSV(csv, filename);
}
