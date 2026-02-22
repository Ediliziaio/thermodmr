

## Pagine Dedicate per Ogni Prodotto + Rinomina Modelli

### Cosa cambia

1. **Rinomina i 3 modelli di Finestre PVC**:
   - "Modello Base" diventa **DMR CONFORT**
   - "Modello Plus" diventa **DMR DOMUS**
   - "Modello Premium" diventa **DMR PASSIVE**

2. **Crea 7 pagine dedicate**, una per ogni prodotto:

| Pagina | Route | Contenuto |
|--------|-------|-----------|
| DMR CONFORT | `/prodotti/dmr-confort` | Pagina dedicata con hero, specifiche tecniche dettagliate, vantaggi, CTA |
| DMR DOMUS | `/prodotti/dmr-domus` | Pagina dedicata con hero, specifiche tecniche dettagliate, vantaggi, CTA |
| DMR PASSIVE | `/prodotti/dmr-passive` | Pagina dedicata con hero, specifiche tecniche dettagliate, vantaggi, CTA |
| Portoncini in PVC | `/prodotti/portoncini` | Pagina dedicata con dettagli, finiture, sicurezza |
| Cassonetti | `/prodotti/cassonetti` | Pagina dedicata con specifiche coibentazione |
| Tapparelle | `/prodotti/tapparelle` | Pagina dedicata con opzioni motorizzazione |
| Persiane | `/prodotti/persiane` | Pagina dedicata con lamelle e finiture |

3. **Aggiorna la pagina catalogo** (`/prodotti-pubblico`):
   - Le 3 card dei modelli PVC diventano cliccabili e linkano alle rispettive pagine
   - Le 4 sezioni degli altri prodotti aggiungono un bottone "Scopri di piu" che linka alla pagina dedicata
   - I nomi vengono aggiornati (DMR CONFORT, DMR DOMUS, DMR PASSIVE)

### Struttura di ogni pagina prodotto

Ogni pagina avra:
- PublicNavbar + PublicFooter (condivisi)
- Hero con nome prodotto e immagine
- Sezione specifiche tecniche dettagliate (espansione delle features attuali)
- Sezione vantaggi chiave
- CTA "Richiedi Preventivo" che porta a `/contatti`

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/ProdottiPubblico.tsx` | Rinomina modelli, aggiunge link alle pagine dedicate |
| `src/pages/products/DmrConfort.tsx` | NUOVO - Pagina DMR CONFORT |
| `src/pages/products/DmrDomus.tsx` | NUOVO - Pagina DMR DOMUS |
| `src/pages/products/DmrPassive.tsx` | NUOVO - Pagina DMR PASSIVE |
| `src/pages/products/Portoncini.tsx` | NUOVO - Pagina Portoncini in PVC |
| `src/pages/products/Cassonetti.tsx` | NUOVO - Pagina Cassonetti |
| `src/pages/products/Tapparelle.tsx` | NUOVO - Pagina Tapparelle |
| `src/pages/products/Persiane.tsx` | NUOVO - Pagina Persiane |
| `src/App.tsx` | Aggiunta 7 nuove route sotto `/prodotti/` |

