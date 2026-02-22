

## Immagini Dedicate per Prodotti + Aggiornamento Home Page

### 1. Immagini dedicate per ogni pagina prodotto

Attualmente tutte le pagine usano le stesse 4 immagini (`product-pvc.jpg`, `product-porte.jpg`, `product-alluminio.jpg`, `product-persiane.jpg`). Useremo immagini Unsplash diverse per ogni prodotto, inserite direttamente come URL nel codice, cosi ogni pagina avra la sua immagine unica e pertinente.

| Pagina | Immagine attuale | Nuova immagine (Unsplash) |
|--------|-----------------|--------------------------|
| DMR CONFORT | product-pvc.jpg | Finestra PVC classica, ambiente luminoso |
| DMR DOMUS | product-pvc.jpg | Finestra moderna grande vetrata |
| DMR PASSIVE | product-pvc.jpg | Finestra premium, edificio contemporaneo |
| Portoncini | product-porte.jpg | Portoncino d'ingresso elegante |
| Cassonetti | product-pvc.jpg | Cassonetto/avvolgibile coibentato |
| Tapparelle | product-alluminio.jpg | Tapparella motorizzata su finestra |
| Persiane | product-persiane.jpg | Persiane in alluminio su facciata |

Le immagini saranno anche aggiornate nella pagina catalogo (`ProdottiPubblico.tsx`).

---

### 2. Aggiornamento sezione Prodotti nella Home Page

La sezione "I Nostri Prodotti" nella home mostra ancora 4 card generiche ("Finestre PVC", "Finestre Alluminio", "Porte e Portoncini", "Persiane e Oscuranti"). Verra ristrutturata per riflettere i prodotti reali:

**Nuovo layout:**
- Sezione principale "Finestre in PVC" con le 3 sotto-card DMR CONFORT / DMR DOMUS / DMR PASSIVE (cliccabili, linkano alle pagine dedicate)
- Sotto, griglia 4 colonne con le altre categorie: Portoncini, Cassonetti, Tapparelle, Persiane (cliccabili, linkano alle pagine dedicate)
- Bottone "Scopri Tutta la Gamma" che linka a `/prodotti-pubblico`

---

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Riscrittura sezione Products con i 7 prodotti reali (3 PVC + 4 accessori), link alle pagine, immagini Unsplash dedicate |
| `src/pages/ProdottiPubblico.tsx` | Aggiornamento immagini con URL Unsplash dedicati per ogni categoria |
| `src/pages/products/DmrConfort.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/DmrDomus.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/DmrPassive.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/Portoncini.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/Cassonetti.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/Tapparelle.tsx` | Nuova immagine Unsplash dedicata |
| `src/pages/products/Persiane.tsx` | Nuova immagine Unsplash dedicata |

