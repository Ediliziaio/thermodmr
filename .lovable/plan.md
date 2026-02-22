

## Miglioramenti Landing Page ThermoDMR

Ho analizzato tutte le sezioni della landing page e trovato diversi problemi da correggere, dal piu critico al meno.

---

### 1. BUG CRITICO: Le sezioni intermedie sono invisibili durante lo scroll

Le sezioni Chi Siamo, Contatori, Prodotti, Vantaggi e Garanzie non appaiono quando si scrolla la pagina normalmente. Restano trasparenti (opacity: 0) perche le animazioni framer-motion non si attivano correttamente. Solo cliccando il menu di navigazione si riesce a vederle.

**Soluzione**: Abbassare il `threshold` da `0.2` a `0.05` e aggiungere `rootMargin: "0px 0px -50px 0px"` per far partire le animazioni prima. In alternativa, usare `initial="visible"` come fallback.

---

### 2. Bottone "Scopri i Vantaggi" quasi invisibile

Nella Hero, il bottone secondario ha bordo e testo bianchi semitrasparenti su overlay scuro - si legge a fatica.

**Soluzione**: Aggiungere sfondo semitrasparente `bg-white/15` e rendere il bordo piu visibile `border-white/50`.

---

### 3. Sezione "Perche Scegliere ThermoDMR" poco impattante

Le 4 card sono generiche: sfondo quasi bianco, icona pallida, nessun elemento visivo forte. Sembrano identiche alla sezione Garanzie sotto.

**Soluzione**: 
- Sfondo sezione scuro (grigio scuro/nero) con card bianche per contrasto forte
- Icone piu grandi con sfondo colorato pieno (non solo 10% opacita)
- Aggiungere numeri/dati chiave in evidenza (es. "15gg" in grande sopra il titolo)

---

### 4. Sezione Garanzie troppo simile ai Vantaggi

Stesse card bianche, stesso layout. L'utente non percepisce la differenza.

**Soluzione**:
- Layout diverso: card con bordo sinistro colorato (accent bar) invece di card centrate
- Oppure icone con sfondo pieno teal e testo bianco
- Aggiungere una linea/badge "Garantito contrattualmente" su ogni card

---

### 5. Footer troppo scarno

Solo logo, un telefono placeholder e un link. Mancano: indirizzo, P.IVA, social media, e soprattutto i dati reali.

**Soluzione**:
- Aggiungere colonna con indirizzo e P.IVA
- Aggiungere link ai social (anche se placeholder)
- Layout a 4 colonne: Brand | Prodotti | Contatti | Legal

---

### 6. Manca un form di contatto

Tutti i CTA ("Diventa Rivenditore", "Richiedi Informazioni") puntano al footer che ha solo email e telefono. Nessun modo per il rivenditore di lasciare i propri dati.

**Soluzione**: Aggiungere una sezione "Contattaci" prima del footer con un form semplice: Nome, Azienda, Email, Telefono, Messaggio, e bottone "Invia Richiesta". I dati verranno salvati nel database.

---

### 7. Active link nella navbar poco visibile

Quando si e su una sezione, il link attivo nel menu cambia colore ma non ha abbastanza contrasto.

**Soluzione**: Aggiungere un indicatore visivo piu forte (underline o dot sotto il link attivo).

---

### Dettagli tecnici

| File | Modifiche |
|------|-----------|
| `src/pages/Home.tsx` | Fix animazioni (threshold/rootMargin), miglioramento bottone hero, redesign sezioni Vantaggi e Garanzie con layout differenziato, footer arricchito, form di contatto |
| Migrazione DB | Creare tabella `contact_requests` per salvare i dati del form |

### Priorita consigliata

1. Fix animazioni (critico - senza questo la pagina e inutilizzabile)
2. Form di contatto (senza form i CTA non fanno nulla)
3. Miglioramento visivo Vantaggi/Garanzie
4. Footer e dettagli minori

