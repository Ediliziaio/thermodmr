

## Aggiornare le immagini con foto reali dei prodotti

### Problema attuale

- **Home page**: Cassonetti usa `thermodmr-infissi-esterni.webp` (foto generica), Tapparelle e Persiane usano entrambi `thermodmr-finestra-bicolore.webp` (stessa immagine sbagliata), Portoncini usa `thermodmr-porta-scorrevole.webp` (scorrevole, non portoncino)
- **Pagina Prodotti Pubblico**: tutte le immagini sono stock da Unsplash, nessuna foto reale ThermoDMR

### Mappatura corretta delle immagini

| Prodotto | Immagine attuale | Immagine corretta |
|----------|-----------------|-------------------|
| Portoncini | `thermodmr-porta-scorrevole.webp` | `thermodmr-portoncino-ingresso.avif` |
| Cassonetti | `thermodmr-infissi-esterni.webp` | `thermodmr-cassonetto-installato.jpg` |
| Tapparelle | `thermodmr-finestra-bicolore.webp` | `thermodmr-tapparella-coibentata.webp` |
| Persiane | `thermodmr-finestra-bicolore.webp` | `thermodmr-persiana-verde.webp` |
| DMR Confort | (Unsplash in prodotti) | `thermodmr-scorrevoli-terrazza.jpg` (gia usata in home) |
| DMR Domus | (Unsplash in prodotti) | `thermodmr-finestra-effetto-legno.jpg` (gia usata in home) |
| DMR Passive | (Unsplash in prodotti) | `thermodmr-serramenti-vista-mare.jpg` (gia usata in home) |

### File modificati

**1. `src/pages/Home.tsx`**
- Sostituire `imgPortoncini` con import di `thermodmr-portoncino-ingresso.avif`
- Sostituire `imgCassonetti` con import di `thermodmr-cassonetto-installato.jpg`
- Aggiungere import `thermodmr-tapparella-coibentata.webp` per Tapparelle
- Aggiungere import `thermodmr-persiana-verde.webp` per Persiane
- Rimuovere import `imgBicolore` (non piu necessario)
- Aggiornare array `homeAccessories` con le immagini corrette

**2. `src/pages/ProdottiPubblico.tsx`**
- Importare le stesse immagini reali da `src/assets/`
- Sostituire tutte le URL Unsplash nell'array `pvcModels` con le foto reali
- Sostituire tutte le URL Unsplash nell'array `otherProducts` con le foto reali
- Sostituire l'immagine hero Unsplash con una foto reale (`thermodmr-finestre-pvc-interni.webp`)

