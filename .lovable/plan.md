

# Piano: Ottimizzazione Mobile della Homepage (/)

## Analisi
La homepage pubblica ha già una buona base responsive (grid responsive, `sm:` breakpoints, touch targets 48px). Le ottimizzazioni si concentrano su spacing, tipografia e usabilità mobile.

## Modifiche

### 1. `src/pages/Home.tsx` — Hero Section
- Ridurre padding top su mobile (`pt-24` invece di `pt-28`) per guadagnare spazio
- Ridurre il titolo H1 da `text-3xl` a `text-2xl` su mobile per evitare overflow
- Ridurre lo spazio tra elementi (`space-y-6` invece di `space-y-8`)
- Hero image: ridurre da `w-[280px]` a `w-[240px]` su mobile
- Badge "Profilo Tedesco" ecc.: wrappare su 2 colonne con `grid grid-cols-2` su mobile

### 2. `src/pages/Home.tsx` — Chi Siamo
- Ridurre `py-24` a `py-16` su mobile (`py-16 sm:py-24`)
- Ridurre padding laterale da `px-6` a `px-4` su mobile (`px-4 sm:px-6`)

### 3. `src/pages/Home.tsx` — Products Section
- Ridurre padding verticale su mobile (`py-16 sm:py-24`)
- PVC Models: su mobile singola colonna (`grid-cols-1 sm:grid-cols-3`)
- Card immagini: altezza ridotta su mobile (`h-36 sm:h-44`)

### 4. `src/pages/Home.tsx` — Sezioni WhyThermoDMR, Guarantees, FindDealer, BecomeDealer
- Ridurre padding verticale su mobile (`py-16 sm:py-24`, `py-20 sm:py-28`)
- Padding laterale uniforme `px-4 sm:px-6`

### 5. `src/pages/Home.tsx` — Contact Form
- Padding form ridotto su mobile (`p-4 sm:p-8`)
- Già gestito con `p-5 sm:p-8`, ma uniformare

### 6. `src/components/PublicFooter.tsx`
- Footer grid: su mobile singola colonna con spacing ridotto (`gap-6 sm:gap-12`)
- Social icons: dimensione touch-friendly (già 44px, ok)

### 7. `src/components/PublicNavbar.tsx`
- Aggiungere safe-area padding per dispositivi con notch (`env(safe-area-inset-top)`)
- Mobile menu: aggiungere CTA "Richiedi Preventivo" in fondo al menu mobile

## Impatto
Nessuna modifica al database. Solo CSS/layout adjustments per migliorare l'esperienza mobile con spacing più compatti, tipografia adattata e layout single-column dove necessario.

