

## Sostituire la foto hero con l'immagine del serramento PVC

### Cosa cambia
L'immagine quadrata nella sezione Hero della homepage (attualmente `hero-profile.jpg` - una foto di interni/corridoio) verra sostituita con la foto del serramento in PVC bianco (Squareline) caricata dall'utente.

### Passaggi

1. **Copiare l'immagine** dal caricamento utente a `src/assets/serramenti-pvc-squareline.png`

2. **Modificare `src/pages/Home.tsx`**:
   - Importare l'immagine come modulo ES6: `import heroSerramento from "@/assets/serramenti-pvc-squareline.png"`
   - Sostituire `src="/images/hero-profile.jpg"` con `src={heroSerramento}`
   - Aggiornare l'alt text a "Serramento in PVC ThermoDMR"
   - L'immagine del serramento ha sfondo bianco/chiaro, quindi potrebbe servire aggiungere uno sfondo bianco al contenitore (`bg-white`) per integrarlo meglio con lo sfondo scuro dell'hero

