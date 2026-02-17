

## Reset Password per f.andriciuc@overthemol.com

### Problema
L'utente esiste nel database (creato il 12/11/2025, email confermata), ma la password "Password2025!" non funziona. L'ultimo accesso risale al 26/11/2025 -- la password potrebbe essere stata modificata in seguito.

### Soluzione
Creare una edge function temporanea di amministrazione che resetta la password usando il service role key (che bypassa l'autenticazione).

### Dettagli Tecnici

**1. Creare `supabase/functions/admin-reset-password/index.ts`**

Una funzione semplice e temporanea che:
- Accetta `userId` e `newPassword` nel body
- Usa il service role key per chiamare `auth.admin.updateUserById()`
- Imposta la nuova password "Password2025!"
- Protetta con un segreto hardcoded temporaneo nell'header (per evitare uso non autorizzato)

**2. Chiamare la funzione per resettare la password**

Dopo il deploy, la funzione verra' invocata una volta per impostare la password a "Password2025!" per l'utente `5c038f03-cc9e-401c-a498-0104e7d0425e`.

**3. Rimuovere la funzione temporanea**

Dopo il reset, la funzione verra' eliminata per sicurezza.

### Risultato Atteso
Potrai accedere con:
- Email: f.andriciuc@overthemol.com
- Password: Password2025!

