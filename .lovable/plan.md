
Obiettivo: risolvere definitivamente il crash su `/ordini/PRV-2026-0007` (`RangeError: Invalid time value`) nella sezione allegati.

1) Diagnosi confermata (causa reale)
- Il crash non è dovuto al valore DB di `created_at` (nel DB è valido), ma a un mismatch frontend:
  - `AttachmentsSection` legge campi camelCase (`createdAt`, `nomeFile`, `tipoMime`)
  - La query restituisce campi snake_case (`created_at`, `nome_file`, `tipo_mime`)
- Quindi `attachment.createdAt` risulta `undefined` e `formatDateTime(undefined)` genera l’errore.
- Inoltre oggi gli URL allegati sono misti:
  - vecchi record con URL completo pubblico
  - nuovi record con path storage relativo
  Serve compatibilità su download/eliminazione.

2) Intervento tecnico (fix robusta)
A. Allineare il contratto dati degli allegati
- File: `src/components/orders/AttachmentsSection.tsx`
- Sostituire l’interfaccia `Attachment` custom camelCase con il tipo reale DB (`Tables<"attachments">`) oppure adattare il componente a leggere snake_case.
- Aggiornare rendering:
  - `attachment.nome_file`
  - `attachment.tipo_mime`
  - `attachment.created_at`
- Aggiornare `formatDateTime` chiamando il valore DB corretto.

B. Hardening data/UX (no crash anche con dati sporchi)
- In `AttachmentsSection`, aggiungere una funzione safe per data:
  - se `created_at` mancante o invalida → mostrare fallback tipo `Data non disponibile` (senza lanciare eccezioni).
- Mantenere anche guard su MIME type (`tipo_mime?.startsWith(...)`).

C. Normalizzare gestione path storage (compatibilità vecchi + nuovi record)
- In `AttachmentsSection`, introdurre helper `getStoragePath(url)`:
  - se `url` è già path (`PRV-.../file.pdf`) lo usa direttamente
  - se è URL completo (`.../order-attachments/...`) estrae il path
- Usare questo helper in:
  - download (`createSignedUrl(path, 60)`)
  - delete (`remove([path])`)

D. (Opzionale ma consigliato) Pulizia dati storici
- Migrazione SQL per convertire `attachments.url` da URL completo a path relativo per record legacy.
- Non necessaria per sbloccare il bug, ma utile per consistenza futura.

3) File da modificare
- `src/components/orders/AttachmentsSection.tsx` (fix principale)
- Opzionale: migrazione in `supabase/migrations/` per normalizzazione URL legacy.

4) Verifica post-fix (end-to-end)
- Aprire `/ordini/PRV-2026-0007` e confermare assenza di ErrorBoundary.
- Verificare che lista allegati mostri nome, dimensione, data senza crash.
- Testare download allegato legacy (URL completo) e allegato nuovo (path).
- Testare eliminazione allegato in entrambi i formati URL/path.
