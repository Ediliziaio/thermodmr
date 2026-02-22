

## Redesign Landing Page - Stile TeknoFinestre con Colori del Logo e Immagini Reali

La pagina attuale ha due problemi principali rispetto a TeknoFinestre:
1. **Nessuna immagine reale** - Solo forme astratte e icone, mentre TeknoFinestre usa foto reali di interni, finestre e prodotti
2. **Stile troppo "tech/dark"** - Sfondo nero con blob decorativi, mentre TeknoFinestre ha un aspetto luminoso e professionale con foto a tutto schermo

### Cosa cambia

**Hero** - Da sfondo nero con blob a **foto a tutto schermo** di un interno moderno con grandi finestre luminose (come TeknoFinestre), con overlay scuro semitrasparente per leggibilita del testo. A destra, immagine del profilo di un serramento (come fa TeknoFinestre con il taglio tecnico del profilo).

**Chi Siamo** - Aggiunta immagine reale di infissi/serramenti in alluminio nella colonna destra (come TeknoFinestre), al posto del box astratto "Produzione Interna 100%".

**Contatori** - Sfondo con immagine reale di infissi installati (come TeknoFinestre che usa una foto di infissi Schuco), con overlay scuro per contrasto.

**Prodotti** - Ogni card avra un'immagine reale del prodotto (finestre PVC, alluminio, porte, persiane) invece delle sole icone.

**Perche Scegliere ThermoDMR** - Layout piu visivo con immagini di supporto.

**CTA Finale** - Sfondo con foto reale di showroom/installazione, non gradiente piatto.

### Colori

I colori principali restano quelli del logo ThermoDMR gia in uso:
- Rosso/arancio principale: `hsl(10, 80%, 50%)` per CTA, accenti, titoli evidenziati
- Arancio gradiente: `hsl(25-30, 90%, 55%)` per sfumature
- Sfondo hero: foto reale con overlay scuro, non sfondo nero piatto
- Sezioni chiare: bianco e grigio chiaro come TeknoFinestre

### Immagini (da Unsplash, royalty-free)

Tutte le immagini saranno caricate da URL Unsplash per dare un aspetto professionale e reale:
- Hero background: interno moderno con grandi finestre panoramiche
- Hero destra: profilo tecnico di un serramento (o finestra aperta)
- Chi Siamo: installazione di infissi moderni
- Contatori background: facciata con infissi in alluminio
- Prodotti: 4 foto specifiche (finestre PVC, alluminio, porta d'ingresso, persiane)
- CTA finale: showroom di serramenti

### Modifiche tecniche

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Riscrittura completa dello stile visivo: aggiunta immagini reali da Unsplash, layout ispirato a TeknoFinestre, mantenimento del copy B2B per rivenditori e dei colori del logo |

Il copy orientato ai rivenditori resta invariato. Cambia solo la presentazione visiva per avvicinarla allo stile TeknoFinestre.

