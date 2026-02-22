

## Restyling Copy Home Page: da B2B a Comunicazione Generalista

### Obiettivo
Trasformare la home page da una comunicazione esclusivamente rivolta ai rivenditori a uno stile "design + miglior prezzo", ispirato a Fossati Serramenti, Termoplast e Cosmet Group. La pagina parlera sia al cliente privato che al rivenditore, con sezioni dedicate per entrambi.

---

### Modifiche al Copy (sezione per sezione)

#### 1. HERO
| Prima | Dopo |
|-------|------|
| "Il Partner Produttore che Ti Fa Guadagnare di Piu" | "Finestre di Design al Miglior Prezzo di Mercato" |
| "Tempi certi, prezzi piu bassi, pagamenti flessibili" | "Design italiano, isolamento superiore, qualita certificata" |
| CTA "Diventa Rivenditore" | CTA "Richiedi Preventivo" + "Scopri i Prodotti" |
| Badge: "Tempi certi, Prezzo piu basso, Pagamenti flessibili, Margini garantiti" | Badge: "Made in Italy", "Isolamento Classe A", "Garanzia 15 Anni", "Design Esclusivo" |

#### 2. CHI SIAMO
| Prima | Dopo |
|-------|------|
| "Produciamo Infissi di Qualita per Far Crescere la Tua Attivita" | "Produciamo Infissi di Design con Tecnologia e Passione Italiana" |
| Focus su prezzi e margini per rivenditori | Focus su qualita, produzione interna, design contemporaneo, sostenibilita |
| CTA "Richiedi Informazioni Commerciali" | CTA "Scopri la Nostra Storia" (link a /chi-siamo) |

#### 3. CONTATORI (Stats)
| Prima | Dopo |
|-------|------|
| "200+ Rivenditori Attivi" | "50.000+ Finestre Installate" |
| "15gg Tempi Medi di Consegna" | "15gg Tempi di Consegna" (invariato ma generalista) |
| "98% Consegne Puntuali" | "98% Clienti Soddisfatti" |

#### 4. PRODOTTI
Copy aggiornato: da "Cosa Puoi Vendere" a "La Nostra Gamma". Struttura invariata (3 PVC + 4 accessori).

#### 5. VANTAGGI (Perche Scegliere ThermoDMR)
Riscrittura completa con vantaggi generali (non piu metriche dealer):

| Card | Contenuto |
|------|-----------|
| Isolamento Superiore | Classe A di isolamento termico e acustico, risparmio energetico fino al 40% |
| Design Made in Italy | Linee pulite, finiture curate, ampia scelta di colori e stili |
| Miglior Rapporto Qualita/Prezzo | Produzione diretta senza intermediari, prezzo di fabbrica |
| Garanzia e Assistenza | Fino a 15 anni di garanzia, assistenza post-vendita dedicata |

#### 6. GARANZIE
Copy generalista: qualita prodotto, certificazioni, garanzia lunga, supporto post-vendita.

#### 7. NUOVA SEZIONE: "Trova il Rivenditore di Zona"
- Sfondo chiaro, icona mappa
- Titolo: "Trova il Rivenditore ThermoDMR piu Vicino a Te"
- Sottotitolo: "Una rete di professionisti qualificati su tutto il territorio nazionale"
- CTA: "Contattaci per trovare il tuo rivenditore" (link a #contatti)

#### 8. NUOVA SEZIONE: "Vuoi Diventare un Nostro Rivenditore?"
- Sfondo scuro con overlay (stile CTA attuale)
- Titolo: "Vuoi Diventare un Rivenditore ThermoDMR?"
- Sottotitolo: vantaggi chiave (prezzi di fabbrica, zona esclusiva, supporto marketing, consegne rapide)
- CTA: "Candidati Ora" (link a #contatti)
- Questa sezione sostituisce la vecchia FinalCta che diceva "Inizia a Guadagnare di Piu"

#### 9. CONTACT FORM
| Prima | Dopo |
|-------|------|
| Titolo "Diventa Rivenditore ThermoDMR" | Titolo "Contattaci" |
| Sottotitolo su commerciale | "Compila il form per richiedere un preventivo o per informazioni sulla nostra rete di rivenditori" |
| Campo "Azienda" | Campo "Azienda (opzionale)" con select: "Sono un privato" / "Sono un rivenditore" / "Altro" |

---

### Struttura finale della pagina

```text
+----------------------------------+
| PublicNavbar                     |
+----------------------------------+
| HERO (design + prezzo)           |
+----------------------------------+
| CHI SIAMO (design + qualita)     |
+----------------------------------+
| CONTATORI (stats generali)       |
+----------------------------------+
| PRODOTTI (invariato layout)      |
+----------------------------------+
| VANTAGGI (generali)              |
+----------------------------------+
| GARANZIE (qualita prodotto)      |
+----------------------------------+
| TROVA IL RIVENDITORE DI ZONA     |  <-- NUOVA
+----------------------------------+
| DIVENTA RIVENDITORE              |  <-- NUOVA (sostituisce FinalCta)
+----------------------------------+
| CONTACT FORM (generalista)       |
+----------------------------------+
| PublicFooter                     |
+----------------------------------+
```

---

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Riscrittura copy di tutte le sezioni, aggiunta 2 nuove sezioni (Trova Rivenditore + Diventa Rivenditore), aggiornamento form contatti con campo tipo utente |

Nessun nuovo file, nessuna modifica al routing. Tutto contenuto in `Home.tsx`.

