import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Commission {
  id: string;
  ordine_id: string;
  commerciale_id: string;
  base_calcolo: "totale" | "margine" | "personalizzata";
  percentuale: number;
  importo_calcolato: number;
  stato_liquidazione: "dovuta" | "liquidata";
  data_liquidazione?: string;
  created_at: string;
  updated_at: string;
}

export interface CommissionWithDetails extends Commission {
  orders: {
    id: string;
    data_inserimento: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

export interface CommissionFilters {
  commercialeId?: string;
  stato?: "dovuta" | "liquidata";
  periodo?: "mese" | "trimestre" | "anno";
}

export const useCommissions = (filters?: CommissionFilters) => {
  return useQuery({
    queryKey: ["commissions", filters],
    queryFn: async () => {
      let query = supabase
        .from("commissions")
        .select(`
          *,
          orders!inner(
            id,
            data_inserimento,
            importo_totale,
            dealer_id,
            dealers!inner(
              ragione_sociale
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (filters?.commercialeId) {
        query = query.eq("commerciale_id", filters.commercialeId);
      }

      if (filters?.stato) {
        query = query.eq("stato_liquidazione", filters.stato);
      }

      if (filters?.periodo) {
        const now = new Date();
        let startDate: Date;

        switch (filters.periodo) {
          case "mese":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case "trimestre":
            startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
            break;
          case "anno":
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        query = query.gte("created_at", startDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as CommissionWithDetails[];
    },
  });
};

export const useCommissionsByCommerciale = (commercialeId: string) => {
  return useCommissions({ commercialeId });
};

export const useUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      commissionId, 
      dataLiquidazione 
    }: { 
      commissionId: string; 
      dataLiquidazione: string;
    }) => {
      const { data, error } = await supabase
        .from("commissions")
        .update({
          stato_liquidazione: "liquidata",
          data_liquidazione: dataLiquidazione,
          updated_at: new Date().toISOString(),
        })
        .eq("id", commissionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
      toast({
        title: "Provvigione liquidata",
        description: "La provvigione è stata liquidata con successo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile liquidare la provvigione: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useCommissionsSummary = (commercialeId?: string) => {
  return useQuery({
    queryKey: ["commissionsSummary", commercialeId],
    queryFn: async () => {
      let query = supabase
        .from("commissions")
        .select("importo_calcolato, stato_liquidazione");

      if (commercialeId) {
        query = query.eq("commerciale_id", commercialeId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const totaleMaturate = data
        .filter((c) => c.stato_liquidazione === "dovuta")
        .reduce((sum, c) => sum + Number(c.importo_calcolato), 0);

      const totaleLiquidate = data
        .filter((c) => c.stato_liquidazione === "liquidata")
        .reduce((sum, c) => sum + Number(c.importo_calcolato), 0);

      return {
        totaleMaturate,
        totaleLiquidate,
        totaleGenerale: totaleMaturate + totaleLiquidate,
      };
    },
  });
};
