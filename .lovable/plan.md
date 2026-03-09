

# Verifica Allegati: Problemi Trovati e Fix

## Stato attuale del codice applicativo

Il codice in `AttachmentsSection.tsx` e `NewPreventivoDialog.tsx` e' **corretto**:
- Upload: salva il path relativo nel campo `url` (es. `orderId/timestamp-random.ext`)
- Download: usa `createSignedUrl()` per generare URL temporanei (bucket privato)
- Delete: rimuove sia il file dallo storage che il record dal DB

## Problema trovato: Policy DELETE mancante sullo storage

Il bucket `order-attachments` ha solo 2 policy:
- **SELECT** — per visualizzare/scaricare file
- **INSERT** — per caricare file

**Manca la policy DELETE** su `storage.objects`. Quando un utente tenta di eliminare un allegato, la rimozione del file dallo storage **fallisce silenziosamente** (il record DB viene eliminato, ma il file resta orfano nello storage).

## Fix: Migration SQL

Creare una migration che aggiunge la policy DELETE:

```sql
CREATE POLICY "Users can delete attachments"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'order-attachments'
    AND auth.uid() IS NOT NULL
    AND (
      has_role(auth.uid(), 'super_admin'::app_role)
      OR (storage.foldername(name))[1] IN (
        SELECT id FROM public.orders WHERE creato_da_user_id = auth.uid()
      )
    )
  );
```

Questo permette:
- **Super Admin**: eliminare qualsiasi allegato
- **Rivenditori**: eliminare allegati solo dai propri ordini

## Riepilogo

| Componente | Stato |
|---|---|
| Upload file (storage + DB) | OK |
| Download (signed URL) | OK |
| Delete DB record | OK |
| Delete file dallo storage | **BLOCCATO** — manca policy DELETE |
| Allegati in creazione preventivo | OK |

Una sola migration risolve il problema. Nessuna modifica al codice applicativo necessaria.

