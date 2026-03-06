

# Rimozione completa RLS Test

## File da eliminare
- `src/pages/RLSTest.tsx`
- `src/hooks/useRLSTests.ts`
- `src/hooks/useScheduledRLSTests.ts`
- `supabase/functions/run-rls-tests/index.ts`
- `docs/RLS_TEST_SUITE.md`

## File da modificare

### `src/App.tsx`
- Rimuovere lazy import `RLSTest`
- Rimuovere la Route `/rls-test`

### `src/components/Layout.tsx`
- Rimuovere la voce "RLS Test" dal navigation array
- Rimuovere import `Shield`

