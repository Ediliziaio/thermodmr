

## Redesign Landing Page ThermoDMR - Stile TeknoFinestre

Riscrivere completamente `src/pages/Home.tsx` ispirandosi al sito TeknoFinestre, con un approccio da copywriting a risposta diretta e UX professionale del settore serramenti.

---

### Struttura della nuova pagina (7 sezioni)

**1. Navbar** (invariata nel concetto, migliorata nello stile)
- Logo a sinistra, pulsante "Area Riservata" a destra
- Sfondo trasparente che diventa solido allo scroll

**2. Hero a tutto schermo** (ispirato a TeknoFinestre)
- Sfondo con gradiente scuro e immagine decorativa di interni con finestre moderne
- Sopratitolo: "THERMODMR - LEADER NEL SETTORE SERRAMENTI"
- Titolo principale orientato al beneficio: "Gestisci la Tua Rete di Rivenditori con Precisione e Controllo Totale"
- Sottotitolo che parla al problema: "Basta fogli Excel, ordini persi e provvigioni calcolate a mano. Un unico gestionale per ordini, pagamenti e performance della tua rete commerciale."
- Due CTA: "Accedi al Gestionale" (primario) + "Scopri le Funzionalita" (secondario, scroll alla sezione features)
- Badge di credibilita sotto le CTA

**3. Sezione "Vision / Chi siamo"** (ispirata a TeknoFinestre)
- Layout a due colonne: testo a sinistra, immagine/illustrazione decorativa a destra
- Titolo: "Il gestionale pensato da chi conosce il settore serramenti"
- Testo che descrive il valore unico: gestionale verticale, non generico
- CTA: "Accedi ora"

**4. Numeri / Social proof con contatori animati** (come TeknoFinestre)
- 4 KPI animati con contatori che salgono:
  - "500+" Rivenditori gestiti
  - "10.000+" Ordini processati
  - "99%" Precisione calcolo provvigioni  
  - "24/7" Accesso ai dati

**5. Features / Prodotti** (migliorata)
- Sopratitolo: "COSA PUOI FARE"
- Titolo: "Tutto Sotto Controllo, in Un'Unica Piattaforma"
- 4 card con icone, titoli orientati al beneficio e descrizioni che parlano al dolore:
  - "Ordini Sempre Sotto Controllo" - Mai piu ordini persi o dimenticati
  - "Rete Commerciale Organizzata" - Ogni commerciale sa esattamente cosa fare
  - "Pagamenti e Provvigioni Automatiche" - Zero errori di calcolo, zero discussioni
  - "Decisioni Basate sui Dati" - KPI in tempo reale, non sensazioni

**6. Garanzie / Trust** (ispirato a TeknoFinestre)
- Titolo: "Cosa Ti Garantiamo"
- 3 garanzie con icone (Shield, Lock, HeadphonesIcon):
  - "Dati Sempre Protetti" - Sicurezza enterprise con crittografia e backup
  - "Accesso Multi-Ruolo" - Admin, commerciali, dealer: ognuno vede solo cio che gli compete
  - "Supporto Dedicato" - Assistenza per configurazione e utilizzo

**7. CTA Finale** (stile TeknoFinestre - "Trasforma la Tua Casa Oggi!")
- Titolo: "Smetti di Rincorrere Dati. Inizia a Gestire."
- Sottotitolo orientato all'azione
- Pulsante prominente

**8. Footer** (migliorato)
- Logo, copyright, link "Area Riservata"

---

### Principi di copywriting a risposta diretta applicati

- Titoli orientati al beneficio, non alla funzionalita
- Sottotitoli che agitano il problema prima di offrire la soluzione
- Social proof con numeri concreti
- CTA multipli lungo la pagina (non solo in fondo)
- Linguaggio diretto: "tu", "tuo", "la tua rete"
- Garanzie per ridurre l'attrito

### Principi UX applicati

- Hero full-viewport come TeknoFinestre
- Contatori animati per engagement visivo (useInView + contatore incrementale)
- Scroll fluido tra sezioni
- Sezioni alternate chiaro/scuro per ritmo visivo
- Hover effects sulle card

### Modifiche tecniche

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Riscrittura completa con le 8 sezioni descritte sopra |

Nessun altro file da modificare. Tutte le dipendenze necessarie (framer-motion, react-intersection-observer, lucide-react) sono gia installate.

