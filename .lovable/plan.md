

## Ottimizzare la pagina Chi Siamo e aggiungere scroll-to-top

### 1. Scroll to top alla navigazione

Attualmente quando si cambia pagina, la vista resta nella posizione precedente. Verra creato un componente `ScrollToTop` che usa `useLocation` di react-router-dom per fare `window.scrollTo(0, 0)` ad ogni cambio di route. Verra inserito dentro `BrowserRouter` in `src/App.tsx`.

**File nuovo:** `src/components/ScrollToTop.tsx`
**File modificato:** `src/App.tsx` -- importare e inserire `<ScrollToTop />` subito dopo `<BrowserRouter>`

### 2. Aggiornare immagine nella pagina Chi Siamo

La sezione "La Nostra Storia" usa `/images/chi-siamo.jpg` (immagine generica dal public folder). Verra sostituita con una delle foto reali gia presenti in `src/assets/`, ad esempio `thermodmr-infissi-esterni.webp` (che mostra infissi installati, coerente con la sezione "storia/produzione").

Per dare piu impatto visivo, aggiungiamo anche un'immagine nell'hero della pagina usando `thermodmr-serramenti-vista-mare.jpg`, trasformando l'hero in un layout a 2 colonne su desktop (testo a sinistra, immagine a destra).

**File modificato:** `src/pages/ChiSiamo.tsx`
- Importare le immagini da `src/assets/`
- Hero: aggiungere colonna immagine su desktop
- Sezione Storia: sostituire `/images/chi-siamo.jpg` con import di `thermodmr-infissi-esterni.webp`

### Dettaglio tecnico

**ScrollToTop.tsx:**
```text
useEffect con dipendenza su pathname
-> window.scrollTo(0, 0) ad ogni cambio
```

**ChiSiamo.tsx modifiche:**
- Riga 59: `src="/images/chi-siamo.jpg"` diventa `src={imgInfissiEsterni}`
- Hero (righe 35-52): layout grid 2 colonne su lg, immagine a destra
- Import di 2 immagini: `thermodmr-infissi-esterni.webp` e `thermodmr-serramenti-vista-mare.jpg`
