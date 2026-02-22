

## Miglioramento Pagina Catalogo `/prodotti-pubblico`

### Problema attuale
La pagina catalogo ha un hero debole (testo su sfondo grigio chiaro) molto diverso dalle pagine dettaglio prodotto che hanno hero con immagini full-width, overlay scuro e breadcrumb. Manca coerenza visiva.

---

### Modifiche previste

#### 1. Hero full-width con immagine e overlay (come le pagine dettaglio)
- Sostituire l'hero attuale (sfondo grigio, solo testo) con il componente `ProductHero` gia esistente, adattato per la pagina catalogo
- Immagine di sfondo full-width con overlay gradient scuro
- Breadcrumb: `Home > Prodotti`
- Testo bianco su sfondo scuro, stesso stile delle pagine dettaglio

#### 2. Aggiungere immagini alle card dei 3 modelli PVC
- Le 3 card DMR CONFORT / DOMUS / PASSIVE attualmente hanno solo icona + testo
- Aggiungere un'immagine in cima a ogni card per renderle piu visive e cliccabili
- Aggiungere i badge colorati ("Miglior Prezzo", "Best Seller", "Top di Gamma") come nelle pagine dettaglio

#### 3. Aggiungere immagini piu pertinenti ai prodotti accessori
- Sostituire le foto Unsplash generiche (uffici, interni generici) con immagini piu pertinenti a portoncini, cassonetti, tapparelle e persiane

#### 4. Aggiungere sezione CTA finale
- Prima del footer, aggiungere una sezione CTA con sfondo colorato (come nelle pagine dettaglio) con invito a contattare per preventivo

#### 5. Contatore rapido delle categorie
- Sotto l'hero, aggiungere una barra con 3-4 numeri chiave: "7 Linee di Prodotto", "3 Modelli Finestre", "100+ Colori", "Consegna 2-6 Settimane"

---

### Riepilogo tecnico

| File | Modifiche |
|------|-----------|
| `src/pages/ProdottiPubblico.tsx` | Sostituzione hero con versione full-width image + overlay, aggiunta immagini e badge alle card PVC, immagini accessori aggiornate, barra contatori, sezione CTA finale |

Nessun nuovo file necessario: si riutilizza lo stile del `ProductHero` direttamente nella pagina (senza il breadcrumb a 3 livelli, solo 2). Nessuna modifica al routing o al database.

