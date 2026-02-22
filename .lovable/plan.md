

## Miglioramento UX Mobile - Tutte le pagine pubbliche

### Problemi identificati

| Area | Problema |
|------|----------|
| Navbar mobile | Menu senza animazione, touch target piccoli (36px vs 44px WCAG), nessun overlay di sfondo |
| Hero | Immagine 280x280 troppo grande su schermi piccoli, pulsanti non full-width, badge sovrapposti |
| FindDealer | Pulsante CTA "Contattaci per Trovare il Tuo Rivenditore" troppo lungo, esce dallo schermo |
| Vantaggi/Garanzie | Layout icon+testo orizzontale troppo stretto su mobile |
| Contact Form | Spaziatura form non ottimale |
| Footer | Griglia 4 colonne si comprime troppo |
| Pagine secondarie | ChiSiamo, DiventaRivenditore non ottimizzate per touch |

---

### 1. PublicNavbar - Menu mobile migliorato

**File**: `src/components/PublicNavbar.tsx`

- Aggiungere overlay scuro animato dietro il menu aperto (backdrop)
- Animare apertura/chiusura con framer-motion (slide-down + fade)
- Aumentare touch target a minimo 44px (py-3.5 invece di py-2.5)
- Aggiungere separatori visivi tra le voci
- Prodotti dropdown: aumentare touch target sottovoci
- Bloccare lo scroll del body quando il menu e aperto

---

### 2. Home - Hero section

**File**: `src/pages/Home.tsx`

- Immagine profilo: ridurre a 220x220 su schermi piccoli (da 280x280)
- Pulsanti CTA: full-width su mobile (`w-full sm:w-auto`)
- Badge "Consegna" e "Qualita Tedesca": ridurre font e padding su mobile
- Ridurre padding laterale da px-6 a px-4 su mobile
- Titolo hero: ridurre da text-4xl a text-3xl su schermi < 375px

---

### 3. Home - Sezione Vantaggi (WhyThermoDMR)

- Su mobile: layout verticale (icona sopra, testo sotto) invece di orizzontale
- Ridurre padding interno card da p-8 a p-5 su mobile

---

### 4. Home - Sezione Garanzie

- Su mobile: layout verticale icona+testo come per Vantaggi
- Ridurre padding da p-6 a p-4

---

### 5. Home - FindDealer

- CTA button: testo piu corto su mobile ("Trova il Rivenditore" al posto del testo lungo)
- Griglia 3 card servizi: `grid-cols-1` su mobile invece di `sm:grid-cols-3`

---

### 6. Home - BecomeDealer

- Pulsante CTA full-width su mobile
- Ridurre padding titolo

---

### 7. Home - Contact Form

- Ridurre padding form da p-8 a p-5 su mobile
- Textarea: ridurre rows a 3 su mobile

---

### 8. PublicFooter

**File**: `src/components/PublicFooter.tsx`

- Griglia: `grid-cols-1` su mobile (attualmente sm:grid-cols-2 funziona, ma migliorare spaziatura)
- Icone social: aumentare touch target a 44x44px (da 36x36)
- Ridurre gap tra sezioni

---

### 9. Pagina DiventaRivenditore

**File**: `src/pages/DiventaRivenditore.tsx`

- Hero: pulsanti full-width su mobile
- Griglia vantaggi: `grid-cols-1` su mobile piccolo, `sm:grid-cols-2`
- Steps: layout verticale su mobile con linea connettore verticale
- CTA finale: pulsante full-width

---

### 10. Pagina ChiSiamo

**File**: `src/pages/ChiSiamo.tsx`

- Valori: layout verticale icon+testo su mobile
- Numeri: ridurre font contatori su schermi piccoli

---

### Dettagli tecnici - File modificati

| File | Modifiche |
|------|-----------|
| `src/components/PublicNavbar.tsx` | Overlay animato, touch target 44px, scroll lock, animazione slide-down |
| `src/pages/Home.tsx` | Hero responsive, CTA full-width, layout verticale vantaggi/garanzie, FindDealer CTA corto |
| `src/components/PublicFooter.tsx` | Social icon 44px, spaziatura mobile |
| `src/pages/DiventaRivenditore.tsx` | CTA full-width, griglia responsive, steps verticali |
| `src/pages/ChiSiamo.tsx` | Layout verticale valori su mobile |

Tutte le modifiche usano classi Tailwind responsive (prefissi `sm:`, `md:`, `lg:`) e framer-motion per le animazioni. Nessuna dipendenza aggiuntiva necessaria.

