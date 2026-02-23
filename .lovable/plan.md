

## Ottimizzazione Sezione Impostazioni

### Cosa manca attualmente

Analizzando il codice e il database, la sezione Impostazioni ha 5 tab funzionanti ma con diverse lacune:

1. **Nessuna vista Audit Log** -- la route `/audit` mostra solo un Placeholder "Sezione in Sviluppo"
2. **Commissioni: manca commissione per tipo prodotto** -- la memoria indica che si dovrebbe poter configurare commissioni per tipo prodotto, ma attualmente c'e solo percentuale globale e base di calcolo
3. **PDF Template: manca P.IVA, telefono, email, codice SDI** -- i dati aziendali sono incompleti (solo nome, indirizzo e logo)
4. **Integrazioni: manca password SMTP** -- il form SMTP non ha campo password
5. **Tab responsive** -- i 5 tab in `grid-cols-5` si rompono su mobile
6. **Nessun feedback di validazione** -- i form non validano i dati prima del salvataggio
7. **Audit Log nella sezione Impostazioni** -- manca un tab o sotto-sezione per visualizzare lo storico delle modifiche recenti

### Piano di implementazione

#### 1. Rendere i tab responsive (Impostazioni.tsx)
- Sostituire `grid grid-cols-5` con un layout scrollabile orizzontale su mobile (`flex overflow-x-auto`)
- Aggiungere icone ai tab per renderli piu leggibili

#### 2. Completare i dati aziendali nel PDF Template (PDFTemplateSection.tsx)
Aggiungere i campi mancanti:
- P.IVA
- Codice Fiscale
- Telefono
- Email aziendale
- Codice SDI / PEC
- Condizioni di vendita / note a pie di pagina

Aggiungere le corrispondenti chiavi nel database con una migrazione:
- `pdf_template_company_vat` (P.IVA)
- `pdf_template_company_cf` (Codice Fiscale)
- `pdf_template_company_phone` (Telefono)
- `pdf_template_company_email` (Email)
- `pdf_template_company_sdi` (SDI/PEC)
- `pdf_template_footer_notes` (Note pie di pagina)

#### 3. Completare la sezione Commissioni (CommissionSettingsSection.tsx)
Aggiungere la possibilita di impostare commissioni differenziate per categoria prodotto. Aggiungere un'area con le categorie principali (Serramenti PVC, Persiane, Portoncini, Tapparelle, Cassonetti) con percentuale personalizzata per ciascuna.

Nuova chiave database:
- `commission_by_category` (jsonb con le percentuali per categoria)

#### 4. Aggiungere campo password SMTP (IntegrationSection.tsx)
- Aggiungere il campo `smtp_password` (tipo password) nel form SMTP
- Nuova chiave database: `smtp_password`

#### 5. Aggiungere tab Audit Log (nuovo AuditLogSection.tsx)
Creare un nuovo componente che mostra le ultime attivita del sistema dalla tabella `audit_log`:
- Tabella con colonne: Data, Utente, Azione, Entita, Dettagli
- Filtri per data e tipo entita
- Paginazione

Aggiungere il tab "Audit" nella pagina Impostazioni (6 tab totali).

#### 6. Validazione form
Aggiungere validazioni base prima del salvataggio:
- Email valida per SMTP
- URL valida per webhook e logo
- Percentuale tra 0 e 100

### Dettaglio tecnico

#### Migrazione database
Inserire le nuove chiavi settings mancanti:

```sql
INSERT INTO settings (key, category, value, description) VALUES
  ('pdf_template_company_vat', 'pdf_template', '""', 'Partita IVA azienda'),
  ('pdf_template_company_cf', 'pdf_template', '""', 'Codice Fiscale azienda'),
  ('pdf_template_company_phone', 'pdf_template', '""', 'Telefono azienda'),
  ('pdf_template_company_email', 'pdf_template', '""', 'Email azienda'),
  ('pdf_template_company_sdi', 'pdf_template', '""', 'Codice SDI o PEC'),
  ('pdf_template_footer_notes', 'pdf_template', '""', 'Note a pie di pagina PDF'),
  ('smtp_password', 'integration', '""', 'SMTP password'),
  ('commission_by_category', 'commission', '{}', 'Commissioni per categoria prodotto')
ON CONFLICT (key) DO NOTHING;
```

#### File da creare
| File | Descrizione |
|------|-------------|
| `src/components/settings/AuditLogSection.tsx` | Nuovo componente per visualizzare lo storico audit |

#### File da modificare
| File | Modifica |
|------|----------|
| `src/pages/Impostazioni.tsx` | Tab responsive + aggiungere tab Audit + icone sui tab |
| `src/components/settings/PDFTemplateSection.tsx` | Aggiungere campi P.IVA, CF, telefono, email, SDI, note footer |
| `src/components/settings/CommissionSettingsSection.tsx` | Aggiungere sezione commissioni per categoria prodotto |
| `src/components/settings/IntegrationSection.tsx` | Aggiungere campo password SMTP |

