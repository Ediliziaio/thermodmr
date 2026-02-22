

## Inserimento Logo ThermoDMR

Inserire il logo caricato in due posizioni:
1. **Sidebar** - In alto a sinistra, al posto del testo "Gestionale Serramenti"
2. **Pagina Login** - Al posto dell'icona Package e del testo "Gestionale Ordini"

### Modifiche

**Copia del file**
- Copiare `user-uploads://logo_Thermodmr.png` in `src/assets/logo_Thermodmr.png`

**`src/components/Layout.tsx`**
- Importare il logo: `import logo from "@/assets/logo_Thermodmr.png"`
- Sostituire il tag `<h1>Gestionale Serramenti</h1>` nella sezione logo della sidebar con un tag `<img>` che mostra il logo, con altezza contenuta (~32-40px) e `object-contain`

**`src/components/auth/AuthHeader.tsx`**
- Importare il logo: `import logo from "@/assets/logo_Thermodmr.png"`
- Sostituire il div con l'icona Package e il titolo "Gestionale Ordini" con il logo come immagine, centrato, con altezza ~60-80px
- Aggiornare il sottotitolo in "Finestre di Design Moderno, Resistenti nel tempo" per coerenza col brand

### Riepilogo

| File | Modifica |
|------|----------|
| `src/assets/logo_Thermodmr.png` | Nuovo file (copia del logo caricato) |
| `src/components/Layout.tsx` | Logo immagine al posto del testo nella sidebar |
| `src/components/auth/AuthHeader.tsx` | Logo immagine al posto dell'icona nella pagina login |
