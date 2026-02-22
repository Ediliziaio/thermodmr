

## Ristrutturazione Pagina Prodotti

### Problema attuale
La pagina mostra 4 prodotti generici (Finestre PVC, Finestre Alluminio, Porte e Portoncini, Persiane e Oscuranti) senza corrispondenza con i prodotti reali di ThermoDMR. Mancano i modelli specifici e le categorie corrette.

---

### Nuova struttura prodotti

La pagina verra organizzata in **5 categorie principali**, ciascuna con i propri dettagli:

| Categoria | Dettagli |
|-----------|----------|
| **Finestre in PVC** | 3 modelli specifici presentati come sotto-card (es. Modello 1, Modello 2, Modello 3 - i nomi placeholder verranno usati finche non forniti quelli reali) |
| **Portoncini in PVC** | Portoncini d'ingresso in PVC con caratteristiche di sicurezza e isolamento |
| **Cassonetti** | Cassonetti coibentati per avvolgibili |
| **Tapparelle** | Tapparelle in PVC e alluminio, motorizzabili |
| **Persiane** | Persiane in alluminio con lamelle orientabili |

---

### Layout della pagina

**Hero** - Resta uguale, con titolo e sottotitolo aggiornati.

**Sezione per ogni categoria** - Alternanza immagine/testo (come ora), ma:
- Per le **Finestre in PVC** (la categoria principale), layout espanso con:
  - Descrizione generale della linea
  - 3 sotto-card affiancate, una per modello, con nome, breve descrizione e caratteristiche chiave
  - Ogni card con icona e lista features
- Per le altre 4 categorie, layout standard immagine + testo + features come attualmente

**CTA finale** - Bottone "Richiedi Preventivo" che porta a `/contatti` su ogni sezione.

---

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/ProdottiPubblico.tsx` | Riscrittura completa dei dati prodotto e aggiunta layout a 3 sotto-card per la sezione Finestre PVC |

Le immagini resteranno quelle esistenti (`product-pvc.jpg`, `product-porte.jpg`, `product-persiane.jpg`, `product-alluminio.jpg`) riassegnate alle categorie corrette. Per Cassonetti e Tapparelle verranno usate immagini placeholder o la stessa immagine PVC.

Le icone Lucide verranno aggiornate per riflettere meglio ogni categoria (es. `Shield` per portoncini, `Blinds` per tapparelle, `Box` per cassonetti).

