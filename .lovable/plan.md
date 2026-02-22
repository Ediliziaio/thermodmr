

## Sostituire le immagini nelle pagine prodotto con le foto caricate

### Immagini da copiare e rinominare

| File originale | Nuovo nome in `src/assets/` | Pagina |
|---|---|---|
| `PORTONCINO.avif` | `thermodmr-portoncino-ingresso.avif` | Portoncini (hero + caratteristiche) |
| `PORTONCINO_2.jpeg` | `thermodmr-portoncino-moderno.jpeg` | Portoncini (galleria img 1) |
| `PORTONCINO_3.jpg` | `thermodmr-portoncini-colori.jpg` | Portoncini (galleria img 2) |
| `CASSONETTO.jpg` | `thermodmr-cassonetto-sezione.jpg` | Cassonetti (hero + caratteristiche) |
| `cassonetti2.jpg` | `thermodmr-cassonetto-installato.jpg` | Cassonetti (galleria img 1) |
| `tapparella-alluminio-coibentato-media-celeste.webp` | `thermodmr-tapparella-coibentata.webp` | Tapparelle (hero + caratteristiche + galleria img 1) |
| `persiana-in-alluminio.webp` | `thermodmr-persiana-verde.webp` | Persiane (hero + caratteristiche) |
| `persiane_alu_2_1.jpg` | `thermodmr-persiana-legno.jpg` | Persiane (galleria img 1) |

### Modifiche per ogni pagina

**1. `src/pages/products/Portoncini.tsx`**
- Importare 3 immagini (portoncino-ingresso, portoncino-moderno, portoncini-colori)
- Hero (riga 66): sostituire URL Unsplash con import portoncino-ingresso
- Caratteristiche (riga 73): sostituire URL Unsplash con import portoncino-ingresso
- Galleria (righe 13-15): sostituire le 3 URL Unsplash -- img 1 con portoncino-moderno, img 2 con portoncini-colori, img 3 con portoncino-ingresso

**2. `src/pages/products/Cassonetti.tsx`**
- Importare 2 immagini (cassonetto-sezione, cassonetto-installato)
- Hero (riga 65): sostituire con cassonetto-sezione
- Caratteristiche (riga 72): sostituire con cassonetto-installato
- Galleria (righe 13-16): sostituire img 1 con cassonetto-installato, img 2 con cassonetto-sezione, le altre 2 restano (solo 2 foto disponibili)

**3. `src/pages/products/Tapparelle.tsx`**
- Importare 1 immagine (tapparella-coibentata)
- Hero (riga 65): sostituire con tapparella-coibentata
- Caratteristiche (riga 72): sostituire con tapparella-coibentata
- Galleria (riga 13): sostituire img 1 con tapparella-coibentata

**4. `src/pages/products/Persiane.tsx`**
- Importare 2 immagini (persiana-verde, persiana-legno)
- Hero (riga 65): sostituire con persiana-verde
- Caratteristiche (riga 72): sostituire con persiana-legno
- Galleria (righe 13-14): img 1 con persiana-verde, img 2 con persiana-legno

### Dettaglio tecnico
Tutte le immagini importate come moduli ES6. I nomi dei file non contengono riferimenti ad altre aziende. Le URL Unsplash rimanenti nella galleria (dove non ci sono abbastanza foto) restano invariate.

