export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMMERCIALE = "COMMERCIALE",
  RIVENDITORE = "RIVENDITORE",
}

export enum OrderStatus {
  PREVENTIVO = "PREVENTIVO",
  DA_CONFERMARE = "DA_CONFERMARE",
  DA_PAGARE_ACCONTO = "DA_PAGARE_ACCONTO",
  IN_LAVORAZIONE = "IN_LAVORAZIONE",
  DA_CONSEGNARE = "DA_CONSEGNARE",
  CONSEGNATO = "CONSEGNATO",
}

export enum PaymentType {
  ACCONTO = "ACCONTO",
  SALDO = "SALDO",
  PARZIALE = "PARZIALE",
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  commercialeId?: string;
  rivenditoreId?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Dealer {
  id: string;
  ragioneSociale: string;
  pIva: string;
  codiceFiscale: string;
  email: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  provincia: string;
  note?: string;
  commercialeOwnerId: string;
  commissionePersonalizzata?: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  dealerId: string;
  dealer?: Dealer;
  commercialeId: string;
  creatoDaUserId: string;
  clienteFinaleId?: string;
  stato: OrderStatus;
  dataInserimento: Date;
  dataConsegnaPrevista?: Date;
  importoTotale: number;
  importoAcconto: number;
  noteInterna?: string;
  noteRivenditore?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderLine {
  id: string;
  ordineId: string;
  categoria: string;
  descrizione: string;
  quantita: number;
  prezzoUnitario: number;
  sconto: number;
  iva: number;
  totaleRiga: number;
  misure?: {
    larghezza?: number;
    altezza?: number;
    profilo?: string;
    coloreInterno?: string;
    coloreEsterno?: string;
    vetro?: string;
    accessori?: any;
  };
}

export interface Payment {
  id: string;
  ordineId: string;
  tipo: PaymentType;
  importo: number;
  dataPagamento: Date;
  metodo: string;
  riferimento?: string;
  ricevutaURL?: string;
}

export interface Attachment {
  id: string;
  ordineId: string;
  uploadedByUserId: string;
  nomeFile: string;
  tipoMime: string;
  url: string;
  dimensione: number;
  createdAt: Date;
}

export interface Commission {
  id: string;
  ordineId: string;
  commercialeId: string;
  baseCalcolo: "TOTALE" | "MARGINE" | "PERSONALIZZATA";
  percentuale: number;
  importoCalcolato: number;
  statoLiquidazione: "DOVUTA" | "LIQUIDATA";
  dataLiquidazione?: Date;
}

export interface KPISnapshot {
  id: string;
  periodo: string;
  commercialeId?: string;
  dealerId?: string;
  ordiniCount: number;
  importoTotale: number;
  accontiTotali: number;
  incassatoTotale: number;
  consegnatiCount: number;
  tassoConversione: number;
  ticketMedio: number;
  giorniLead2Consegna: number;
}
