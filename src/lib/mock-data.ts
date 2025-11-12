import { User, UserRole, Dealer, Order, OrderStatus, Payment, PaymentType } from "@/types";

export const mockCurrentUser: User = {
  id: "user-1",
  email: "admin@example.com",
  displayName: "Super Admin",
  role: UserRole.SUPER_ADMIN,
  isActive: true,
  createdAt: new Date("2024-01-01"),
};

export const mockDealers: Dealer[] = [
  {
    id: "dealer-1",
    ragioneSociale: "Serramenti Rossi SRL",
    pIva: "12345678901",
    codiceFiscale: "RSSMRA80A01H501Z",
    email: "info@serramenti-rossi.it",
    telefono: "+39 0123 456789",
    indirizzo: "Via Roma 123",
    citta: "Milano",
    cap: "20100",
    provincia: "MI",
    commercialeOwnerId: "comm-1",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "dealer-2",
    ragioneSociale: "Finestre Bianchi",
    pIva: "98765432109",
    codiceFiscale: "BNCGPP75B15F205W",
    email: "contatti@finestre-bianchi.it",
    telefono: "+39 0234 567890",
    indirizzo: "Corso Italia 45",
    citta: "Torino",
    cap: "10100",
    provincia: "TO",
    commercialeOwnerId: "comm-1",
    commissionePersonalizzata: 3.5,
    createdAt: new Date("2024-02-01"),
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-0001",
    dealerId: "dealer-1",
    dealer: mockDealers[0],
    commercialeId: "comm-1",
    creatoDaUserId: "user-1",
    stato: OrderStatus.DA_PAGARE_ACCONTO,
    dataInserimento: new Date("2024-03-15"),
    dataConsegnaPrevista: new Date("2024-04-30"),
    importoTotale: 15000,
    importoAcconto: 0,
    noteInterna: "Cliente richiede consegna urgente",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-16"),
  },
  {
    id: "ORD-2024-0002",
    dealerId: "dealer-2",
    dealer: mockDealers[1],
    commercialeId: "comm-1",
    creatoDaUserId: "user-1",
    stato: OrderStatus.IN_LAVORAZIONE,
    dataInserimento: new Date("2024-03-10"),
    dataConsegnaPrevista: new Date("2024-04-15"),
    importoTotale: 8500,
    importoAcconto: 2550,
    noteRivenditore: "Verificare colore RAL",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-18"),
  },
  {
    id: "ORD-2024-0003",
    dealerId: "dealer-1",
    dealer: mockDealers[0],
    commercialeId: "comm-1",
    creatoDaUserId: "user-1",
    stato: OrderStatus.CONSEGNATO,
    dataInserimento: new Date("2024-02-20"),
    dataConsegnaPrevista: new Date("2024-03-20"),
    importoTotale: 12000,
    importoAcconto: 3600,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-21"),
  },
];

export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    ordineId: "ORD-2024-0002",
    tipo: PaymentType.ACCONTO,
    importo: 2550,
    dataPagamento: new Date("2024-03-12"),
    metodo: "Bonifico",
    riferimento: "BNF-20240312-001",
  },
  {
    id: "pay-2",
    ordineId: "ORD-2024-0003",
    tipo: PaymentType.ACCONTO,
    importo: 3600,
    dataPagamento: new Date("2024-02-25"),
    metodo: "Bonifico",
    riferimento: "BNF-20240225-003",
  },
  {
    id: "pay-3",
    ordineId: "ORD-2024-0003",
    tipo: PaymentType.SALDO,
    importo: 8400,
    dataPagamento: new Date("2024-03-21"),
    metodo: "Bonifico",
    riferimento: "BNF-20240321-005",
  },
];

export const getOrderSaldo = (orderId: string): number => {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) return 0;
  
  const totalPayments = mockPayments
    .filter(p => p.ordineId === orderId)
    .reduce((sum, p) => sum + p.importo, 0);
  
  return order.importoTotale - totalPayments;
};
