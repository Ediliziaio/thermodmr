

## Creazione Preventivi di Esempio

Inseriro 5 preventivi di esempio con dati realistici, distribuiti tra diversi dealer e con righe d'ordine dettagliate.

### Preventivi da creare

| ID | Dealer | Descrizione | Importo | Scadenza | Note |
|----|--------|-------------|---------|----------|------|
| PRV-2026-0002 | Dealer Milano Srl | Ristrutturazione appartamento - finestre e porte | ~8.500 EUR | +30gg | Preventivo urgente |
| PRV-2026-0003 | Partner Roma Snc | Fornitura serramenti villa | ~15.200 EUR | +45gg | Cliente premium |
| PRV-2026-0004 | Panorma Infissi | Sostituzione infissi ufficio | ~6.800 EUR | +20gg | Reverse Charge (IVA 0%) |
| PRV-2026-0005 | Rivenditore Torino Spa | Portoni e finestre capannone | ~22.000 EUR | +60gg | Grande fornitura industriale |
| PRV-2026-0006 | Infissi Moderni | Preventivo showroom | ~4.300 EUR | +15gg | Piccola fornitura |

### Dettagli per ogni preventivo

Ogni preventivo avra:
- 2-4 righe d'ordine con categorie miste (Finestre, Porte, Accessori)
- Misure realistiche (larghezza x altezza)
- Sconti variabili (0-15%)
- IVA mista: la maggior parte al 22%, uno al 0% (Reverse Charge), uno al 10%
- Acconto calcolato al 30% del totale
- Note interne e del rivenditore dove appropriato

### Dati tecnici

- Stato: `preventivo` per tutti
- `commerciale_id`: Super Admin (5c038f03...) per i suoi dealer, Commerciale Test (1b44ea72...) per i suoi
- `creato_da_user_id`: stesso del commerciale
- `data_scadenza_preventivo`: date future realistiche
- Inserimento tramite query SQL dirette sulle tabelle `orders` e `order_lines`
