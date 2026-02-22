

## Landing Page pubblica ThermoDMR

Creare una landing page moderna e professionale accessibile a `/` per i visitatori non autenticati, con i colori del brand ThermoDMR (rosso/arancio del logo, toni scuri, bianco).

---

### Struttura della pagina

La landing page sara composta da queste sezioni:

1. **Navbar** - Logo ThermoDMR a sinistra, pulsante "Accedi" a destra
2. **Hero Section** - Grande titolo "Finestre di Design Moderno, Resistenti nel tempo", sottotitolo descrittivo, CTA "Accedi al Gestionale", immagine/illustrazione decorativa con gradiente rosso-arancio
3. **Features** - 3-4 card con icone che descrivono i vantaggi del gestionale (Gestione Ordini, Rete Rivenditori, Pagamenti e Provvigioni, Analytics)
4. **CTA finale** - Sezione con sfondo colorato e pulsante per accedere
5. **Footer** - Logo, copyright, link utili

### Palette colori (ispirata al logo)

- Primario: rosso/arancio (`hsl(10, 80%, 50%)`) per CTA e accenti
- Sfondo hero: gradiente dal rosso scuro al nero/grigio scurissimo
- Testi: bianco su sfondi scuri, grigio scuro su bianco
- Card: bianco con ombra sottile

### Modifiche tecniche

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Nuovo file - landing page completa con tutte le sezioni |
| `src/App.tsx` | Aggiungere rotta `/home` per la landing page; modificare `/` per mostrare la landing se non autenticato, altrimenti la dashboard |
| `src/components/ProtectedRoute.tsx` | Nessuna modifica necessaria |

### Routing

- `/` - Se l'utente e autenticato, mostra la dashboard. Se non autenticato, mostra la landing page
- `/auth` - Resta la pagina di login/registrazione
- La landing avra un pulsante "Accedi" che porta a `/auth`

### Dettagli implementativi

- Utilizzo di `framer-motion` (gia installato) per animazioni di entrata delle sezioni
- `react-intersection-observer` (gia installato) per animazioni on-scroll
- Il componente `Home.tsx` sara autocontenuto con tutte le sezioni inline
- Responsive: layout a colonna singola su mobile, multi-colonna su desktop
- Il logo `logo_Thermodmr.png` sara usato nella navbar e nel footer

