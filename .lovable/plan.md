

# Rimuovere tab "Drag & Drop" e usare D&D direttamente nella Pipeline

## Cosa cambia

Il tab "Drag & Drop" viene rimosso. La vista "Pipeline" userà direttamente il componente `OrderPipelineDnD` (che ha già il drag & drop integrato), eliminando la distinzione tra pipeline statica e pipeline D&D. Due sole viste: **Lista** e **Pipeline** (con D&D incluso).

## File da modificare

### `src/pages/Orders.tsx`
- Rimuovere il tipo `"pipeline-dnd"` da `ViewMode` → diventa `"lista" | "pipeline"`
- Rimuovere il `TabsTrigger` "Drag & Drop" e l'import `GripVertical`
- Nel rendering condizionale, il caso `viewMode === "pipeline"` renderizza `OrderPipelineDnD` al posto di `OrderPipelineView`
- Rimuovere il blocco `viewMode === "pipeline-dnd"`
- Rimuovere import di `OrderPipelineView` (non più usato)

