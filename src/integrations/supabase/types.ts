export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          created_at: string
          dimensione: number
          id: string
          nome_file: string
          ordine_id: string
          tipo_mime: string
          uploaded_by_user_id: string
          url: string
        }
        Insert: {
          created_at?: string
          dimensione: number
          id?: string
          nome_file: string
          ordine_id: string
          tipo_mime: string
          uploaded_by_user_id: string
          url: string
        }
        Update: {
          created_at?: string
          dimensione?: number
          id?: string
          nome_file?: string
          ordine_id?: string
          tipo_mime?: string
          uploaded_by_user_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders_with_payment_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_uploaded_by_user_id_fkey"
            columns: ["uploaded_by_user_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_uploaded_by_user_id_fkey"
            columns: ["uploaded_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          azione: string
          created_at: string
          entity: string
          entity_id: string
          id: string
          new_values: Json | null
          old_values: Json | null
          user_id: string
        }
        Insert: {
          azione: string
          created_at?: string
          entity: string
          entity_id: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          user_id: string
        }
        Update: {
          azione?: string
          created_at?: string
          entity?: string
          entity_id?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          cognome: string
          created_at: string
          dealer_id: string
          email: string | null
          id: string
          indirizzo: string | null
          nome: string
          note: string | null
          telefono: string | null
          updated_at: string
        }
        Insert: {
          cognome: string
          created_at?: string
          dealer_id: string
          email?: string | null
          id?: string
          indirizzo?: string | null
          nome: string
          note?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          cognome?: string
          created_at?: string
          dealer_id?: string
          email?: string | null
          id?: string
          indirizzo?: string | null
          nome?: string
          note?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          base_calcolo: Database["public"]["Enums"]["commission_base"]
          commerciale_id: string
          created_at: string
          data_liquidazione: string | null
          id: string
          importo_calcolato: number
          ordine_id: string
          percentuale: number
          stato_liquidazione: Database["public"]["Enums"]["liquidation_status"]
          updated_at: string
        }
        Insert: {
          base_calcolo?: Database["public"]["Enums"]["commission_base"]
          commerciale_id: string
          created_at?: string
          data_liquidazione?: string | null
          id?: string
          importo_calcolato: number
          ordine_id: string
          percentuale?: number
          stato_liquidazione?: Database["public"]["Enums"]["liquidation_status"]
          updated_at?: string
        }
        Update: {
          base_calcolo?: Database["public"]["Enums"]["commission_base"]
          commerciale_id?: string
          created_at?: string
          data_liquidazione?: string | null
          id?: string
          importo_calcolato?: number
          ordine_id?: string
          percentuale?: number
          stato_liquidazione?: Database["public"]["Enums"]["liquidation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders_with_payment_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_requests: {
        Row: {
          azienda: string | null
          created_at: string
          email: string
          id: string
          letto: boolean
          messaggio: string
          nome: string
          telefono: string | null
        }
        Insert: {
          azienda?: string | null
          created_at?: string
          email: string
          id?: string
          letto?: boolean
          messaggio: string
          nome: string
          telefono?: string | null
        }
        Update: {
          azienda?: string | null
          created_at?: string
          email?: string
          id?: string
          letto?: boolean
          messaggio?: string
          nome?: string
          telefono?: string | null
        }
        Relationships: []
      }
      dealers: {
        Row: {
          cap: string
          citta: string
          codice_fiscale: string
          commerciale_owner_id: string
          commissione_personalizzata: number | null
          created_at: string
          email: string
          id: string
          indirizzo: string
          note: string | null
          p_iva: string
          provincia: string
          ragione_sociale: string
          telefono: string
          updated_at: string
        }
        Insert: {
          cap: string
          citta: string
          codice_fiscale: string
          commerciale_owner_id: string
          commissione_personalizzata?: number | null
          created_at?: string
          email: string
          id?: string
          indirizzo: string
          note?: string | null
          p_iva: string
          provincia: string
          ragione_sociale: string
          telefono: string
          updated_at?: string
        }
        Update: {
          cap?: string
          citta?: string
          codice_fiscale?: string
          commerciale_owner_id?: string
          commissione_personalizzata?: number | null
          created_at?: string
          email?: string
          id?: string
          indirizzo?: string
          note?: string | null
          p_iva?: string
          provincia?: string
          ragione_sociale?: string
          telefono?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dealers_commerciale_owner_id_fkey"
            columns: ["commerciale_owner_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealers_commerciale_owner_id_fkey"
            columns: ["commerciale_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_snapshots: {
        Row: {
          acconti_totali: number
          commerciale_id: string | null
          consegnati_count: number
          created_at: string
          dealer_id: string | null
          giorni_lead_2_consegna: number
          id: string
          importo_totale: number
          incassato_totale: number
          ordini_count: number
          periodo: string
          tasso_conversione: number
          ticket_medio: number
        }
        Insert: {
          acconti_totali?: number
          commerciale_id?: string | null
          consegnati_count?: number
          created_at?: string
          dealer_id?: string | null
          giorni_lead_2_consegna?: number
          id?: string
          importo_totale?: number
          incassato_totale?: number
          ordini_count?: number
          periodo: string
          tasso_conversione?: number
          ticket_medio?: number
        }
        Update: {
          acconti_totali?: number
          commerciale_id?: string | null
          consegnati_count?: number
          created_at?: string
          dealer_id?: string | null
          giorni_lead_2_consegna?: number
          id?: string
          importo_totale?: number
          incassato_totale?: number
          ordini_count?: number
          periodo?: string
          tasso_conversione?: number
          ticket_medio?: number
        }
        Relationships: [
          {
            foreignKeyName: "kpi_snapshots_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpi_snapshots_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpi_snapshots_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpi_snapshots_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      order_lines: {
        Row: {
          categoria: string
          created_at: string
          descrizione: string
          id: string
          iva: number
          misure: Json | null
          ordine_id: string
          prezzo_unitario: number
          quantita: number
          sconto: number
          totale_riga: number
        }
        Insert: {
          categoria: string
          created_at?: string
          descrizione: string
          id?: string
          iva?: number
          misure?: Json | null
          ordine_id: string
          prezzo_unitario: number
          quantita?: number
          sconto?: number
          totale_riga: number
        }
        Update: {
          categoria?: string
          created_at?: string
          descrizione?: string
          id?: string
          iva?: number
          misure?: Json | null
          ordine_id?: string
          prezzo_unitario?: number
          quantita?: number
          sconto?: number
          totale_riga?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_lines_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders_with_payment_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cliente_finale_id: string | null
          commerciale_id: string
          created_at: string
          creato_da_user_id: string
          data_consegna_prevista: string | null
          data_fine_produzione: string | null
          data_inserimento: string
          data_scadenza_preventivo: string | null
          dealer_id: string
          id: string
          importo_acconto: number
          importo_totale: number
          modalita_pagamento: string | null
          note_interna: string | null
          note_rivenditore: string | null
          settimana_consegna: number | null
          stato: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          cliente_finale_id?: string | null
          commerciale_id: string
          created_at?: string
          creato_da_user_id: string
          data_consegna_prevista?: string | null
          data_fine_produzione?: string | null
          data_inserimento?: string
          data_scadenza_preventivo?: string | null
          dealer_id: string
          id: string
          importo_acconto?: number
          importo_totale?: number
          modalita_pagamento?: string | null
          note_interna?: string | null
          note_rivenditore?: string | null
          settimana_consegna?: number | null
          stato?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          cliente_finale_id?: string | null
          commerciale_id?: string
          created_at?: string
          creato_da_user_id?: string
          data_consegna_prevista?: string | null
          data_fine_produzione?: string | null
          data_inserimento?: string
          data_scadenza_preventivo?: string | null
          dealer_id?: string
          id?: string
          importo_acconto?: number
          importo_totale?: number
          modalita_pagamento?: string | null
          note_interna?: string | null
          note_rivenditore?: string | null
          settimana_consegna?: number | null
          stato?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_cliente_finale_id_fkey"
            columns: ["cliente_finale_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_creato_da_user_id_fkey"
            columns: ["creato_da_user_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_creato_da_user_id_fkey"
            columns: ["creato_da_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          created_at: string
          data_pagamento: string
          id: string
          importo: number
          metodo: string
          ordine_id: string
          ricevuta_url: string | null
          riferimento: string | null
          tipo: Database["public"]["Enums"]["payment_type"]
        }
        Insert: {
          created_at?: string
          data_pagamento: string
          id?: string
          importo: number
          metodo: string
          ordine_id: string
          ricevuta_url?: string | null
          riferimento?: string | null
          tipo: Database["public"]["Enums"]["payment_type"]
        }
        Update: {
          created_at?: string
          data_pagamento?: string
          id?: string
          importo?: number
          metodo?: string
          ordine_id?: string
          ricevuta_url?: string | null
          riferimento?: string | null
          tipo?: Database["public"]["Enums"]["payment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders_with_payment_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          email: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name: string
          email: string
          id: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      rls_test_results: {
        Row: {
          created_at: string
          details: string | null
          id: string
          message: string
          role: string
          status: string
          table_name: string
          test_name: string
          test_run_id: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          message: string
          role: string
          status: string
          table_name: string
          test_name: string
          test_run_id: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          message?: string
          role?: string
          status?: string
          table_name?: string
          test_name?: string
          test_run_id?: string
        }
        Relationships: []
      }
      rls_test_runs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          failed_tests: number
          id: string
          passed_tests: number
          skipped_tests: number
          started_at: string
          status: string
          total_tests: number
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          failed_tests?: number
          id?: string
          passed_tests?: number
          skipped_tests?: number
          started_at?: string
          status?: string
          total_tests?: number
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          failed_tests?: number
          id?: string
          passed_tests?: number
          skipped_tests?: number
          started_at?: string
          status?: string
          total_tests?: number
        }
        Relationships: []
      }
      settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          creato_da_user_id: string
          id: string
          oggetto: string
          ordine_id: string
          priorita: string
          stato: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creato_da_user_id: string
          id?: string
          oggetto: string
          ordine_id: string
          priorita?: string
          stato?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creato_da_user_id?: string
          id?: string
          oggetto?: string
          ordine_id?: string
          priorita?: string
          stato?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_ordine_id_fkey"
            columns: ["ordine_id"]
            isOneToOne: false
            referencedRelation: "orders_with_payment_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          allegato_nome: string | null
          allegato_tipo: string | null
          allegato_url: string | null
          created_at: string
          id: string
          messaggio: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          allegato_nome?: string | null
          allegato_tipo?: string | null
          allegato_url?: string | null
          created_at?: string
          id?: string
          messaggio: string
          ticket_id: string
          user_id: string
        }
        Update: {
          allegato_nome?: string | null
          allegato_tipo?: string | null
          allegato_url?: string | null
          created_at?: string
          id?: string
          messaggio?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      commerciali_with_stats: {
        Row: {
          dealers_count: number | null
          display_name: string | null
          email: string | null
          fatturato_totale: number | null
          id: string | null
          is_active: boolean | null
          ordini_count: number | null
          provvigioni_dovute: number | null
          provvigioni_liquidate: number | null
        }
        Relationships: []
      }
      dealers_with_stats: {
        Row: {
          cap: string | null
          citta: string | null
          codice_fiscale: string | null
          commerciale_owner_id: string | null
          commissione_personalizzata: number | null
          created_at: string | null
          email: string | null
          id: string | null
          indirizzo: string | null
          note: string | null
          orders_count: number | null
          p_iva: string | null
          provincia: string | null
          ragione_sociale: string | null
          telefono: string | null
          total_paid: number | null
          total_remaining: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dealers_commerciale_owner_id_fkey"
            columns: ["commerciale_owner_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealers_commerciale_owner_id_fkey"
            columns: ["commerciale_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_with_payment_stats: {
        Row: {
          cliente_finale_id: string | null
          commerciale_id: string | null
          created_at: string | null
          creato_da_user_id: string | null
          data_consegna_prevista: string | null
          data_inserimento: string | null
          data_ultimo_pagamento: string | null
          dealer_id: string | null
          id: string | null
          importo_acconto: number | null
          importo_da_pagare: number | null
          importo_pagato: number | null
          importo_totale: number | null
          modalita_pagamento: string | null
          note_interna: string | null
          note_rivenditore: string | null
          numero_pagamenti: number | null
          percentuale_pagata: number | null
          stato: Database["public"]["Enums"]["order_status"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_cliente_finale_id_fkey"
            columns: ["cliente_finale_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_commerciale_id_fkey"
            columns: ["commerciale_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_creato_da_user_id_fkey"
            columns: ["creato_da_user_id"]
            isOneToOne: false
            referencedRelation: "commerciali_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_creato_da_user_id_fkey"
            columns: ["creato_da_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cleanup_old_audit_logs: {
        Args: { p_days_to_keep?: number }
        Returns: number
      }
      get_commerciale_stats: {
        Args: {
          p_commerciale_id: string
          p_end_date?: string
          p_start_date?: string
        }
        Returns: Json
      }
      get_dashboard_kpis: {
        Args: {
          p_commerciale_id?: string
          p_end_date?: string
          p_start_date?: string
        }
        Returns: Json
      }
      get_order_stats: { Args: { p_order_id: string }; Returns: Json }
      get_revenue_by_month: {
        Args: { p_commerciale_id?: string; p_months?: number }
        Returns: Json
      }
      get_top_dealers: {
        Args: {
          p_commerciale_id?: string
          p_end_date?: string
          p_limit?: number
          p_start_date?: string
        }
        Returns: Json
      }
      get_upcoming_deadlines: {
        Args: {
          p_commerciale_id?: string
          p_days_ahead?: number
          p_limit?: number
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_user_role: {
        Args: {
          p_new_role: Database["public"]["Enums"]["app_role"]
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "super_admin" | "commerciale" | "rivenditore"
      commission_base: "totale" | "margine" | "personalizzata"
      liquidation_status: "dovuta" | "liquidata"
      order_status:
        | "preventivo"
        | "da_confermare"
        | "da_pagare_acconto"
        | "in_lavorazione"
        | "da_saldare"
        | "da_consegnare"
        | "consegnato"
      payment_type: "acconto" | "saldo" | "parziale"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "commerciale", "rivenditore"],
      commission_base: ["totale", "margine", "personalizzata"],
      liquidation_status: ["dovuta", "liquidata"],
      order_status: [
        "preventivo",
        "da_confermare",
        "da_pagare_acconto",
        "in_lavorazione",
        "da_saldare",
        "da_consegnare",
        "consegnato",
      ],
      payment_type: ["acconto", "saldo", "parziale"],
    },
  },
} as const
