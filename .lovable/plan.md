

# Rimozione completa sezioni Provvigioni e Commerciali

## Panoramica
Eliminare tutte le pagine, componenti, hook e route relative a Provvigioni e Commerciali. Rimuovere anche il tab Commissioni dalle Impostazioni. I riferimenti a `commerciale_id` nei filtri (Dealers, Analytics, ecc.) e nel DB restano invariati — si rimuove solo l'UI dedicata.

## File da eliminare

### Pagine
- `src/pages/Provvigioni.tsx`
- `src/pages/Commerciali.tsx`
- `src/pages/CommercialeDetail.tsx`
- `src/pages/CommercialeDashboard.tsx`

### Componenti
- `src/components/commerciali/AssignDealersDialog.tsx`
- `src/components/commerciali/BulkDeleteCommercialiDialog.tsx`
- `src/components/commerciali/CommercialFilters.tsx`
- `src/components/commerciali/CommercialeCard.tsx`
- `src/components/commerciali/DeleteCommercialeDialog.tsx`
- `src/components/commerciali/EditCommercialeDialog.tsx`
- `src/components/commerciali/MobileCommercialCard.tsx`
- `src/components/commerciali/MobileCommercialFilters.tsx`
- `src/components/commerciali/NewCommercialeDialog.tsx`
- `src/components/commissions/CommissionStatusBadge.tsx`
- `src/components/commissions/LiquidateCommissionDialog.tsx`
- `src/components/settings/CommissionSettingsSection.tsx`

### Hook
- `src/hooks/useCommerciali.ts`
- `src/hooks/useCommercialiInfinite.ts`
- `src/hooks/useCommissions.ts`
- `src/hooks/useCommercialeDashboard.ts`

### Edge Functions
- `src/supabase/functions/delete-commerciale/index.ts`
- `src/supabase/functions/update-commerciale/index.ts`
- `src/supabase/functions/notify-dealer-reassignment/index.ts`

## File da modificare

### `src/App.tsx`
- Rimuovere lazy imports: `CommercialeDetail`, `Commerciali`, `Provvigioni`
- Rimuovere le 3 Route: `/commerciali`, `/commerciali/:id`, `/provvigioni`

### `src/components/Layout.tsx`
- Rimuovere dal navigation array: voce "Commerciali" e "Provvigioni"
- Rimuovere import `Briefcase`, `TrendingUp` (se non usati altrove)

### `src/pages/SmartDashboard.tsx`
- Rimuovere import `CommercialeDashboard`
- Rimuovere il blocco `if (userRole === "commerciale")` — reindirizzare i commerciali come i rivenditori (a `/ordini`) o mostrare la Dashboard standard

### `src/pages/Impostazioni.tsx`
- Rimuovere import `CommissionSettingsSection`
- Rimuovere tab "Commissioni" (TabsTrigger + TabsContent)
- Rimuovere import `Percent`

### `src/components/dealers/DealerFilters.tsx`
- Rimuovere il filtro "Commerciale" (select + import `useCommercialiInfinite`)

### `src/components/dealers/MobileDealerFilters.tsx`
- Rimuovere il filtro "Commerciale" (select + import `useCommercialiInfinite`)

### `src/pages/Analytics.tsx`
- Rimuovere import `useCommercialiInfinite` e il filtro per commerciale se presente

### `src/components/settings/UserManagementSection.tsx`
- Rimuovere il tab "Commerciali" e il filtro per ruolo commerciale (TabsTrigger + TabsContent per commerciali)
- Rimuovere l'opzione "Commerciale" dal Select ruolo nel renderUserCard
- Aggiornare `grid-cols-3` a `grid-cols-2` nella TabsList

Nessuna modifica al database — le colonne `commerciale_id` e `commerciale_owner_id` restano per compatibilità.

