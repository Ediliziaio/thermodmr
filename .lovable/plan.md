

## Miglioramento Pagine Prodotto

### Panoramica
Tutte le 7 pagine prodotto (DMR Confort, Domus, Passive, Portoncini, Cassonetti, Tapparelle, Persiane) e la pagina catalogo `/prodotti` hanno la stessa struttura ripetitiva e usano foto generiche Unsplash. Il piano migliora la UX aggiungendo elementi visivi e informativi che rendono ogni pagina piu coinvolgente.

---

### 1. Hero con immagine a tutta larghezza
Attualmente l'hero e solo testo su sfondo grigio chiaro. Aggiungere un'immagine hero a tutta larghezza con overlay scuro e testo sopra, simile ai siti premium di serramenti.

- Sfondo: immagine grande (diversa per ogni prodotto) con overlay gradient scuro
- Testo: bianco, con badge prodotto (es. "Best Seller" per DOMUS, "Top di Gamma" per PASSIVE)
- Breadcrumb sotto la navbar: Home > Prodotti > DMR Confort

### 2. Breadcrumb di navigazione
Aggiungere un breadcrumb in cima a ogni pagina prodotto per facilitare la navigazione:
`Home > Prodotti > DMR CONFORT`

### 3. Badge prodotto
Aggiungere un badge colorato accanto al nome del prodotto:
- DMR CONFORT: "Miglior Prezzo" (verde)
- DMR DOMUS: "Best Seller" (arancione/dorato)
- DMR PASSIVE: "Top di Gamma" (viola/premium)

### 4. Immagini piu pertinenti
Sostituire le foto generiche con immagini Unsplash piu pertinenti ai serramenti (finestre, profili PVC, dettagli tecnici, installazioni). Usare foto diverse per ogni prodotto.

### 5. Sezione "Confronta i Modelli" (solo pagine PVC)
Nelle 3 pagine DMR (Confort, Domus, Passive), aggiungere prima del CTA finale una tabella di confronto rapido tra i 3 modelli, con link alle altre pagine. Questo aiuta l'utente a capire le differenze senza tornare al catalogo.

### 6. Navigazione tra prodotti correlati
Aggiungere una sezione "Scopri anche" prima del footer con card degli altri prodotti della stessa categoria, per facilitare l'esplorazione.

### 7. Migliorare la galleria
Aggiungere sotto ogni immagine della galleria una didascalia descrittiva per dare contesto alle foto.

---

### Riepilogo tecnico

| File | Modifiche |
|------|-----------|
| `src/components/products/ProductHero.tsx` | **Nuovo** - Componente hero con immagine full-width, overlay, breadcrumb e badge |
| `src/components/products/ProductComparison.tsx` | **Nuovo** - Tabella comparativa per i 3 modelli PVC |
| `src/components/products/RelatedProducts.tsx` | **Nuovo** - Sezione "Scopri anche" con card prodotti correlati |
| `src/components/products/ProductGallery.tsx` | Aggiunta supporto didascalie sotto le immagini |
| `src/pages/products/DmrConfort.tsx` | Uso nuovi componenti, immagini aggiornate, badge "Miglior Prezzo" |
| `src/pages/products/DmrDomus.tsx` | Uso nuovi componenti, immagini aggiornate, badge "Best Seller" |
| `src/pages/products/DmrPassive.tsx` | Uso nuovi componenti, immagini aggiornate, badge "Top di Gamma" |
| `src/pages/products/Portoncini.tsx` | Uso nuovi componenti, immagini aggiornate |
| `src/pages/products/Cassonetti.tsx` | Uso nuovi componenti, immagini aggiornate |
| `src/pages/products/Tapparelle.tsx` | Uso nuovi componenti, immagini aggiornate |
| `src/pages/products/Persiane.tsx` | Uso nuovi componenti, immagini aggiornate |

Nessuna modifica al database o al routing.

