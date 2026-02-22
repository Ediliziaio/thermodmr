

## Miglioramenti UX della Home Page

### Problemi identificati e soluzioni proposte

---

### 1. Navbar: logo troppo piccolo su mobile, "Area Riservata" occupa troppo spazio
- Il bottone "Area Riservata" su mobile appare prima del menu hamburger, spostando il logo troppo a sinistra
- Ridurre leggermente il padding del bottone su mobile e rendere il testo piu corto ("Accedi") solo su schermi piccoli

### 2. Hero: immagine profilo nascosta su mobile
- L'immagine del profilo serramento (`hidden lg:flex`) non si vede mai su mobile, perdendo un elemento visivo forte
- Mostrare l'immagine anche su mobile, ridimensionata, sotto il testo hero (prima dei badge)

### 3. Hero: badge "Profilo Tedesco" ecc. poco leggibili su mobile
- I 4 badge con check sono piccoli e compressi su 2 righe con poco contrasto (text-white/50)
- Aumentare il contrasto a text-white/70 e dare piu spazio verticale

### 4. Sezione "Chi Siamo": immagine sotto il testo su mobile senza spazio
- Aggiungere un gap verticale piu generoso tra testo e immagine su mobile (da gap-16 a gap-10 su mobile, gap-16 su lg)

### 5. Contatori: "2-6 sett." poco chiaro visivamente
- Il prefisso "2-" non e animato, quindi il contatore parte da "2-0 sett." e anima solo il "6" - un po' confuso
- Rendere il contatore statico per questo specifico stat: mostrare direttamente "2-6 sett." senza animazione

### 6. Prodotti: immagine DMR PASSIVE rotta
- Dallo screenshot, la terza card (DMR PASSIVE) mostra un'immagine grigia/non caricata. L'URL Unsplash potrebbe essere non valido
- Sostituire con un'immagine Unsplash funzionante

### 7. Sezione Vantaggi (sfondo scuro): testo descrizione poco leggibile
- Il testo delle descrizioni e `text-white/50` (50% opacita) su sfondo scuro - difficile da leggere
- Aumentare a `text-white/65` per migliore leggibilita

### 8. Sezione "Trova il Rivenditore": troppo vuota e generica
- La sezione e molto semplice con solo icona, titolo, sottotitolo e bottone - visivamente debole
- Aggiungere 3 mini-card in riga sotto il sottotitolo con vantaggi chiave (es. "Consulenza gratuita", "Sopralluogo dedicato", "Preventivo in 24h") per dare piu sostanza

### 9. Contact Form: titolo duplicato
- Il label sopra e "Contattaci" e anche l'h2 e "Contattaci" - ridondante
- Cambiare il label superiore in "Parliamone" o "Scrivici" e lasciare l'h2 "Contattaci"

### 10. Contact Form: campo "Tipo" senza label descrittivo
- Il select "Tipo" non spiega bene cosa si sta selezionando
- Rinominare la label in "Chi sei?" per essere piu chiaro e amichevole

### 11. Smooth scroll: i link navbar non scrollano smooth alle sezioni
- I link nella navbar puntano a pagine separate (/chi-siamo, /vantaggi, /garanzie) invece che alle sezioni della stessa pagina
- Aggiungere scroll smooth per i link che corrispondono a sezioni presenti nella home (#chi-siamo, #vantaggi, #garanzie, #contatti) quando si e gia sulla homepage

### 12. Footer: testo brand ancora orientato ai rivenditori
- Il footer dice "Produciamo serramenti di alta qualita per far crescere la tua attivita. Il tuo successo e il nostro obiettivo." - ancora B2B
- Aggiornare a "Produciamo serramenti di alta qualita con profilo tedesco. Design, isolamento e il miglior prezzo di mercato."

---

### Riepilogo tecnico

| File | Modifiche |
|------|-----------|
| `src/pages/Home.tsx` | Fix immagine DMR PASSIVE, contatore statico per "2-6 sett.", hero image visibile su mobile, contrasto testi migliorato, sezione "Trova Rivenditore" arricchita, fix titolo form duplicato, label "Chi sei?" |
| `src/components/PublicNavbar.tsx` | Testo bottone responsive ("Accedi" su mobile) |
| `src/components/PublicFooter.tsx` | Aggiornamento testo brand nel footer |

Nessun nuovo file, nessuna modifica al routing o al database.

