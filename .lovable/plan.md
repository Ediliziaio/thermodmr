

## Sostituire le immagini della Homepage con le foto caricate

### Cosa resta invariato
- L'immagine di sfondo dell'Hero (`/images/hero-bg.jpg`) -- come richiesto
- L'immagine del serramento PVC nella Hero (gia aggiornata)
- Le immagini di sfondo dei contatori e della CTA

### Immagini da copiare e rinominare

I file caricati verranno copiati in `src/assets/` con nomi neutri (senza riferimenti ad altre aziende):

| File originale | Nuovo nome in `src/assets/` | Destinazione |
|---|---|---|
| `WnD-finestra-pvc-infissi-square-maxi-3G.webp` | `thermodmr-finestre-pvc-interni.webp` | Chi Siamo |
| `copertina-infissi-pvc.jpg` | `thermodmr-scorrevoli-terrazza.jpg` | PVC Model: DMR CONFORT |
| `infissi-pacifici-tivoli-finestre-pvc-winbox.jpg` | `thermodmr-finestra-effetto-legno.jpg` | PVC Model: DMR DOMUS |
| `Serramenti-in-PVC_1.jpg` | `thermodmr-serramenti-vista-mare.jpg` | PVC Model: DMR PASSIVE |
| `oknoplast-psk-porta-finestra-scorrevole.webp` | `thermodmr-porta-scorrevole.webp` | Accessorio: Portoncini |
| `alluminia_group_infissi_pvc-821x1024.webp` | `thermodmr-infissi-esterni.webp` | Accessorio: Cassonetti |
| `bicolore_9fb3b13b-eecd-4d14-b29c-eda2c76d931d.webp` | `thermodmr-finestra-bicolore.webp` | Accessorio: Tapparelle e Persiane (condivisa) |

### Modifiche al codice in `src/pages/Home.tsx`

1. **Aggiungere 7 import** per le nuove immagini con nomi neutri
2. **Chi Siamo** (riga 214): sostituire `/images/chi-siamo.jpg` con l'import della foto interni PVC bianchi
3. **PVC Models** (righe 310, 317, 324): sostituire le 3 URL Unsplash con le foto importate
4. **Accessories** (righe 333, 339, 345, 351): sostituire le 4 URL Unsplash con le foto importate (l'immagine bicolore verra usata per 2 accessori)

### Dettaglio tecnico

Tutte le immagini saranno importate come moduli ES6 (`import nomeImg from "@/assets/..."`) per una migliore ottimizzazione del bundle. I riferimenti Unsplash verranno completamente rimossi dalla homepage.

