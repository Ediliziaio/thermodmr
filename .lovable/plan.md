

## Correzione DMR DOMUS con contenuti da Salamander greenEvolution 76 MD

I contenuti attuali del DMR DOMUS sono basati sulla pagina Petecki sbagliata. La fonte corretta e la pagina infiexpert.it del Salamander greenEvolution 76 MD. Ecco tutte le correzioni necessarie.

---

### Differenze trovate rispetto al contenuto attuale

| Dato | Attuale (sbagliato) | Corretto (da infiexpert) |
|------|---------------------|--------------------------|
| Camere | 5 | 6 |
| Acustica | 38 dB | 47 dB (classe 5) |
| Sicurezza | RC2 opzionale | Fino a RC3 |
| Guarnizioni | 2 o 3 | 3 con guarnizione mediana |
| Vetro | Gas argon generico | Fino a 24/28/40 mm, doppio vetro 3.3.1 Lowe Laminato con gas argon e canalina calda |
| Finiture | Woodec e Aludec | Pellicole di alta qualita in vasta gamma di colori (NO Woodec/Aludec) |
| Ferramenta | Roto generica | ROTO NX di sicurezza |
| Saldatura | Non menzionata | Saldatura invisibile, superficie perfettamente piana |
| Rinforzo | Non menzionato | Acciaio zincato 1,5-2,5 mm |

---

### Modifiche a DmrDomus.tsx

**Hero description** - Riscrivere:
- Profilo a 6 camere, profondita costruttiva 76 mm, 3 livelli di guarnizione
- Comfort superiore con protezione termica e acustica ottimale e massimo grado di sicurezza
- Aspetto classico ed elegante con bordi fini
- Rimuovere ogni riferimento a Woodec e Aludec

**Paragrafo caratteristiche** - Aggiornare con contenuti infiexpert:
- 6 camere isolanti con profondita costruttiva di 76 mm e 3 livelli di guarnizione
- Protezione termica e acustica ottimale fino a 47 dB
- Saldatura invisibile per superficie perfettamente piana e aspetto estetico superiore
- Ferramenta ROTO NX antieffrazione fino a classe RC3
- Rinforzi in acciaio zincato per alta stabilita e lunga durata

**Features list** - Sostituire completamente:
- Profilo a 6 camere isolanti per massimo isolamento termico e acustico
- Profondita costruttiva 76 mm con 3 livelli di guarnizione e guarnizione mediana
- Protezione acustica fino a 47 dB (classe 5) per ambienti silenziosi
- Resistenza all'effrazione fino alla classe RC3
- Saldatura invisibile per superficie perfettamente piana e aspetto estetico superiore
- Vetrocamera doppio vetro 3.3.1 Lowe Laminato con gas argon e canalina calda
- Rinforzi in acciaio zincato 1,5-2,5 mm per alta stabilita e lunga durata
- Pellicole di alta qualita in vasta gamma di colori

**Specifiche tecniche** - Aggiornare:
- Profilo: da "5 camere" a "6 camere"
- Classe: resta "A"
- Vetrocamera: da "Con gas argon" a "Doppio vetro Lowe con gas argon"
- Uf (telaio): rimuovere, sostituire con "Profondita: 76 mm"
- Uw: resta "1.3 W/m2K" (come richiesto dall'utente)
- Abbattimento acustico: da "38 dB" a "47 dB"

**Benefits** - Aggiornare:
- Efficienza Energetica: riferimento a 6 camere invece di 5
- Silenziosita: 47 dB invece di 38 dB, guarnizioni triple
- Robustezza: Ferramenta ROTO NX, fino a RC3

**Sezione colori** - Rimuovere riferimento a "finiture Woodec e Aludec", sostituire con "pellicole di alta qualita in vasta gamma di colori"

---

### Modifiche a ProductComparison.tsx

Aggiornare i dati del DMR DOMUS nella tabella confronto:
- Camere: da "5" a "6"
- Acustica: da "38 dB" a "47 dB"
- Vetro: da "Gas argon" a "Doppio Lowe + argon"
- Sicurezza: da "RC2 opzionale" a "Fino a RC3"

---

### Riepilogo file modificati

| File | Modifiche |
|------|-----------|
| `src/pages/products/DmrDomus.tsx` | Riscrittura completa contenuti: 6 camere, 47 dB, RC3, 3 guarnizioni, saldatura invisibile, ROTO NX, rinforzo acciaio zincato, rimozione Woodec/Aludec |
| `src/components/products/ProductComparison.tsx` | Aggiornamento dati DMR DOMUS: 6 camere, 47 dB, RC3, vetro |

