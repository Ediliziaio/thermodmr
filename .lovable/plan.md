

## Galleria Fotografica con Slider per le Pagine Prodotto

### Cosa verra aggiunto

Una nuova sezione "Galleria" con uno slider di immagini verra inserita in ognuna delle 7 pagine prodotto, posizionata tra la sezione "Caratteristiche Principali" e le "Specifiche Tecniche". Lo slider permettera di scorrere tra 4-5 immagini per prodotto, con navigazione tramite frecce e indicatori a punti.

---

### Layout della Galleria

- Titolo "Galleria" centrato con animazione fade-up
- Slider orizzontale con immagini a piena larghezza (aspect ratio 16:9)
- Frecce sinistra/destra per navigare
- Indicatori a punti sotto lo slider per mostrare la slide corrente
- Sfondo chiaro (`bg-[hsl(0,0%,97%)]`) per alternare con le sezioni bianche
- Responsive: immagini si adattano a tutte le dimensioni schermo

---

### Immagini per ogni prodotto

Ogni pagina avra 4-5 immagini Unsplash tematiche diverse:

| Prodotto | Temi immagini |
|----------|--------------|
| DMR CONFORT | Finestre classiche, interni luminosi, dettaglio profilo, vista esterna |
| DMR DOMUS | Grandi vetrate, design moderno, dettaglio ferramenta, ambiente living |
| DMR PASSIVE | Architettura contemporanea, efficienza energetica, vetro triplo, villa moderna |
| Portoncini | Ingresso elegante, dettaglio serratura, pannello decorativo, vista notturna |
| Cassonetti | Cassonetto installato, dettaglio coibentazione, sezione tecnica, facciata |
| Tapparelle | Tapparella motorizzata, telecomando, dettaglio lamella, facciata moderna |
| Persiane | Persiane aperte, dettaglio lamelle, colori RAL, facciata mediterranea |

---

### Dettagli tecnici

Verra utilizzato il componente `Carousel` gia presente nel progetto (`src/components/ui/carousel.tsx`) basato su Embla Carousel, con l'aggiunta degli indicatori a punti (dots) gestiti tramite l'API del carousel.

| File | Modifica |
|------|----------|
| `src/components/products/ProductGallery.tsx` | NUOVO - Componente riutilizzabile galleria con slider, frecce e indicatori |
| `src/pages/products/DmrConfort.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/DmrDomus.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/DmrPassive.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/Portoncini.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/Cassonetti.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/Tapparelle.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |
| `src/pages/products/Persiane.tsx` | Aggiunta sezione galleria con 4 immagini dedicate |

Il componente `ProductGallery` ricevera un array di `{ src, alt }` come prop e gestira internamente lo stato dello slider, le frecce e i dot indicators.
