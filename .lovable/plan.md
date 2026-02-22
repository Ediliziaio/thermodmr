

## Navbar Sempre Bianca + Pagine Dedicate

### 1. Navbar sempre bianca con logo originale

Attualmente la navbar cambia da scura (trasparente su sfondo scuro) a bianca allo scroll, e il logo viene invertito con `brightness-0 invert`. Questo crea problemi di leggibilita.

**Soluzione**: La navbar sara SEMPRE bianca con ombra leggera, il logo sempre nei colori originali, e i link sempre scuri. Niente piu logica `scrolled` per i colori. Resta solo un leggero effetto ombra allo scroll.

Modifiche nel componente `Navbar` in `src/pages/Home.tsx`:
- Rimuovere la condizione `scrolled` per i colori di sfondo
- Navbar sempre `bg-white border-b shadow-sm`
- Logo sempre con colori originali (rimuovere `brightness-0 invert`)
- Link sempre in colore scuro con accento blu/teal per l'attivo
- Icona hamburger sempre scura

---

### 2. Pagine dedicate per le sezioni

Creare pagine separate accessibili dalla navbar della landing, con layout coerente (navbar + footer condivisi):

| Pagina | Route | Contenuto |
|--------|-------|-----------|
| Chi Siamo | `/chi-siamo` | Storia aziendale, valori, produzione interna, team. Espansione della sezione attuale con piu dettagli |
| Prodotti | `/prodotti-pubblico` | Catalogo prodotti con schede dettagliate per PVC, Alluminio, Porte, Persiane |
| Vantaggi | `/vantaggi` | Perche scegliere ThermoDMR - vantaggi competitivi espansi |
| Garanzie | `/garanzie` | Dettaglio garanzie contrattuali |
| Contatti | `/contatti` | Form di contatto + mappa + info aziendali |

Ogni pagina avra:
- La stessa Navbar bianca (estratta come componente condiviso)
- Lo stesso Footer
- Contenuto espanso rispetto alla sezione corrispondente nella homepage

---

### 3. Aggiornamento navigazione

- I link nella navbar della landing punteranno alle nuove pagine (con `Link to=`) invece di fare scroll alle sezioni
- Nella homepage le sezioni restano come anteprima con bottoni "Scopri di piu" che portano alla pagina dedicata
- Le route vengono aggiunte in `App.tsx`

---

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Navbar sempre bianca, logo originale, link alle pagine invece di scroll |
| `src/components/PublicNavbar.tsx` | NUOVO - Componente navbar condiviso per tutte le pagine pubbliche |
| `src/components/PublicFooter.tsx` | NUOVO - Componente footer condiviso |
| `src/pages/ChiSiamo.tsx` | NUOVO - Pagina dedicata Chi Siamo |
| `src/pages/ProdottiPubblico.tsx` | NUOVO - Pagina catalogo prodotti |
| `src/pages/VantaggiPage.tsx` | NUOVO - Pagina vantaggi competitivi |
| `src/pages/GaranziePage.tsx` | NUOVO - Pagina garanzie |
| `src/pages/ContattiPage.tsx` | NUOVO - Pagina contatti con form |
| `src/App.tsx` | Aggiunta route per le 5 nuove pagine pubbliche |

