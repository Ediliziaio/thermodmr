

## 1. Nuova pagina "Diventa Rivenditore"

Creare `src/pages/DiventaRivenditore.tsx` - una landing page dedicata ai rivenditori che vogliono entrare nella rete ThermoDMR. Struttura:

- **Hero** con sfondo immagine e overlay scuro, titolo "Diventa Rivenditore ThermoDMR", sottotitolo sui vantaggi della partnership
- **Sezione Vantaggi** - griglia con i benefici chiave: prezzi di fabbrica, zona esclusiva, supporto marketing, consegna rapida, pagamenti flessibili, formazione tecnica
- **Come Funziona** - 3 step: Candidatura, Valutazione, Partnership attiva
- **CTA finale** con link al form contatti (o form inline) con tipo utente pre-selezionato su "rivenditore"

Stile coerente con le altre pagine pubbliche (PublicNavbar + PublicFooter, animazioni framer-motion, colori hsl(195,85%,45%)).

Aggiungere la rotta `/diventa-rivenditore` in `App.tsx`.

---

## 2. Menu navbar migliorato con dropdown Prodotti

Aggiornare `src/components/PublicNavbar.tsx`:

- **Prodotti** diventa un menu dropdown (hover su desktop, click su mobile) con sottovoci:
  - Finestre PVC (link a /prodotti-pubblico)
  - DMR Confort (/prodotti/dmr-confort)
  - DMR Domus (/prodotti/dmr-domus)
  - DMR Passive (/prodotti/dmr-passive)
  - Portoncini (/prodotti/portoncini)
  - Cassonetti (/prodotti/cassonetti)
  - Tapparelle (/prodotti/tapparelle)
  - Persiane (/prodotti/persiane)
- Aggiungere voce **"Diventa Rivenditore"** nel menu (link a /diventa-rivenditore)
- Su mobile: le sottovoci prodotti appaiono come lista indentata espandibile

---

## 3. Aggiornamenti collegati

- **Home.tsx**: aggiornare il link "Candidati Ora" nella sezione BecomeDealer per puntare a `/diventa-rivenditore` invece di `#contatti`
- **ProdottiPubblico.tsx**: aggiornare il CTA finale "Diventa Rivenditore" per linkare a `/diventa-rivenditore`
- **PublicFooter.tsx**: aggiungere link "Diventa Rivenditore" nella colonna "Link Utili" e aggiornare i link prodotti nel footer per puntare alle pagine specifiche

---

## Dettagli tecnici

| File | Azione |
|------|--------|
| `src/pages/DiventaRivenditore.tsx` | Nuovo file - landing page rivenditori |
| `src/App.tsx` | Aggiungere rotta `/diventa-rivenditore` |
| `src/components/PublicNavbar.tsx` | Dropdown prodotti + voce "Diventa Rivenditore" |
| `src/pages/Home.tsx` | Link BecomeDealer aggiornato |
| `src/pages/ProdottiPubblico.tsx` | Link CTA aggiornato |
| `src/components/PublicFooter.tsx` | Link prodotti specifici + link Diventa Rivenditore |

