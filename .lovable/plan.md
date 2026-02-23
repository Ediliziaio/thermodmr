

## Miglioramento Sezione Rivenditori - Vista Riga con Espansione

### Obiettivo

Aggiungere una **vista a righe (tabella)** alternativa alla vista a griglia (card) attuale, con un toggle per passare da una all'altra. Nella vista riga, ogni rivenditore mostra i dati principali in una singola riga compatta. Cliccando su una freccia/chevron la riga si espande per mostrare i dettagli aggiuntivi (contatti, indirizzo, azioni).

### Come funzionera

```text
+-------------------------------------------------------------+
| Ragione Sociale | P.IVA | Ordini | Fatturato | Comm. | [v]  |
+-------------------------------------------------------------+
|  (espanso)                                                   |
|  Email: ...   Telefono: ...                                  |
|  Indirizzo: ...                                              |
|  [Dettaglio] [Modifica] [Email] [Chiama] [Elimina] [Accedi]  |
+-------------------------------------------------------------+
```

- **Toggle vista**: due icone (griglia / lista) nell'header accanto al pulsante "Nuovo Rivenditore"
- **Riga compatta**: ragione sociale, P.IVA, ordini, fatturato, commissione, chevron per espandere
- **Riga espansa**: email, telefono, indirizzo completo, pulsanti azione (dettaglio, modifica, elimina, accedi area)
- **Solo desktop**: su mobile resta la vista card attuale (le righe non funzionano bene su schermi piccoli)

### File da modificare/creare

| File | Modifica |
|------|----------|
| `src/components/dealers/DealerRowView.tsx` | **Nuovo** - Componente vista riga con Collapsible per l'espansione |
| `src/pages/Dealers.tsx` | Aggiungere stato `viewMode` ("grid" / "list"), toggle nell'header, rendering condizionale |

### Dettaglio tecnico

#### 1. Nuovo componente: `DealerRowView.tsx`

- Usa `Collapsible` da Radix (gia installato) per l'espansione riga
- Ogni riga e un componente `DealerRow` che riceve il dealer
- **Riga chiusa**: layout flex/grid con colonne allineate:
  - Ragione Sociale (bold)
  - P.IVA (testo piccolo)
  - Ordini (numero)
  - Fatturato (formattato)
  - Commissione (badge, se presente)
  - ChevronDown che ruota quando aperto
- **Riga aperta** (`CollapsibleContent`): sezione con padding che mostra:
  - Email (con icona Mail, cliccabile mailto)
  - Telefono (con icona Phone, cliccabile tel)
  - Indirizzo completo (con icona MapPin)
  - Riga di azioni: Visualizza Dettaglio, Modifica (EditDealerDialog), Invia Email, Chiama, Elimina (DeleteDealerDialog), Accedi Area Rivenditore
- Struttura con header fisso (intestazioni colonne) e righe scrollabili
- Stesse azioni del DealerCard (navigate, edit, delete, email, tel)

#### 2. Modifica: `Dealers.tsx`

- Aggiungere stato: `const [viewMode, setViewMode] = useState<"grid" | "list">("grid")`
- Nell'header desktop, accanto a `NewDealerDialog`, aggiungere toggle con due Button icon:
  - `LayoutGrid` (icona griglia) - attivo quando viewMode === "grid"
  - `List` (icona lista) - attivo quando viewMode === "list"
- Nel rendering desktop, condizionare:
  - `viewMode === "grid"` -> griglia attuale con `DealerCard`
  - `viewMode === "list"` -> nuovo `DealerRowView` con lista di righe espandibili
- La preferenza di vista non necessita di persistenza (stato locale e sufficiente)

#### 3. Struttura riga espandibile

Ogni riga usa il pattern Collapsible di Radix:

```text
<Collapsible>
  <div className="flex items-center border-b px-4 py-3 hover:bg-muted/50">
    <div className="flex-1 grid grid-cols-5 gap-4 items-center">
      <span>Ragione Sociale</span>
      <span>P.IVA</span>
      <span>Ordini</span>
      <span>Fatturato</span>
      <span>Commissione</span>
    </div>
    <CollapsibleTrigger>
      <ChevronDown className="transition-transform" />
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>
    <!-- dettagli contatto + azioni -->
  </CollapsibleContent>
</Collapsible>
```

