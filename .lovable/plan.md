

## Fix Logo: Ripristinare Trasparenza

### Problema
La conversione del logo da PNG a WebP ha perso il canale alfa (trasparenza). Il risultato e un logo con sfondo nero visibile nella sidebar, navbar e pagina di login.

### Soluzione
Il file PNG originale (`src/assets/logo_Thermodmr.png`) esiste ancora nel progetto. La soluzione piu rapida e affidabile e tornare a usare il PNG originale, dato che la conversione WebP automatica non ha preservato la trasparenza.

### Modifiche

Ripristinare l'import del PNG in tutti i 5 file che sono stati modificati:

| File | Modifica |
|------|----------|
| `src/components/Layout.tsx` | `import logo from "@/assets/logo_Thermodmr.png"` |
| `src/components/PublicNavbar.tsx` | `import logo from "@/assets/logo_Thermodmr.png"` |
| `src/components/PublicFooter.tsx` | `import logo from "@/assets/logo_Thermodmr.png"` |
| `src/components/auth/AuthHeader.tsx` | `import logo from "@/assets/logo_Thermodmr.png"` |
| `src/pages/Home.tsx` | `import logo from "@/assets/logo_Thermodmr.png"` |

Dopo il ripristino, eliminare il file WebP difettoso (`src/assets/logo_Thermodmr.webp`).

Le ottimizzazioni di `loading="eager"`, `fetchPriority="high"` e `width`/`height` espliciti aggiunte in precedenza al tag `img` nel Layout verranno mantenute -- queste continuano a migliorare le performance di caricamento anche con il PNG.

### Nota
Per ottenere una vera conversione WebP con trasparenza in futuro, il logo dovrebbe essere convertito con uno strumento esterno (es. Squoosh, cwebp) che preservi il canale alfa, e poi caricato manualmente nel progetto.
