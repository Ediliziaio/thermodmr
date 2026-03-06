

# Fix: `getFileIcon` crash su `tipo_mime` undefined

## Problema
In `AttachmentsSection.tsx` riga 48, `getFileIcon(mimeType: string)` chiama `mimeType.startsWith()` ma alcuni allegati nel DB hanno `tipo_mime` undefined/null (probabilmente allegati vecchi o dati incompleti). Questo causa il crash "Cannot read properties of undefined (reading 'startsWith')".

## Fix
**File:** `src/components/orders/AttachmentsSection.tsx`
- Aggiungere un guard in `getFileIcon`: se `mimeType` è falsy, restituire l'icona generica `FileText`
- Aggiungere optional chaining anche nel punto di chiamata come ulteriore protezione

Una riga di codice risolve il problema.

