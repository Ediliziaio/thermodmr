

## Aggiungere "Preventivi" nella sidebar per il Super Admin

### Modifiche previste

---

#### 1. Sidebar - nuova voce "Preventivi" (`src/components/Layout.tsx`)

Aggiungere una nuova voce nel menu di navigazione, posizionata subito dopo "Ordini":

```
{ name: "Preventivi", href: "/preventivi", icon: FileText, roles: ["super_admin"] }
```

Visibile solo per il ruolo `super_admin`.

---

#### 2. Nuova rotta `/preventivi` (`src/App.tsx`)

Aggiungere una rotta protetta `/preventivi` che renderizza il componente `DealerPreventivi` (gia esistente) senza passare un `dealerId`, cosi mostra tutti i preventivi di tutti i dealer.

---

#### 3. Conversione automatica

La conversione e gia implementata: quando un preventivo viene convertito (bottone "Converti" nella pagina Preventivi), il suo stato cambia da `preventivo` a `da_confermare`. Dato che la pagina Ordini filtra `.neq("stato", "preventivo")`, l'ordine convertito appare automaticamente nella lista Ordini e scompare dai Preventivi. Non servono modifiche aggiuntive per questo comportamento.

---

### Riepilogo

| File | Modifica |
|------|----------|
| `src/components/Layout.tsx` | Aggiungere voce "Preventivi" nell'array `navigation` |
| `src/App.tsx` | Aggiungere rotta `/preventivi` con lazy load di `DealerPreventivi` |

