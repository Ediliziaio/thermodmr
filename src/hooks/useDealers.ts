import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface DealerWithStats {
  id: string;
  ragione_sociale: string;
  p_iva: string;
  codice_fiscale: string;
  email: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  provincia: string;
  note: string | null;
  commerciale_owner_id: string;
  commissione_personalizzata: number | null;
  created_at: string;
  updated_at: string;
  ordersCount?: number;
  totalRevenue?: number;
}

export const useDealers = () => {
  return useQuery({
    queryKey: ["dealers"],
    queryFn: async () => {
      // Prima ottieni i dealers
      const { data: dealers, error: dealersError } = await supabase
        .from("dealers")
        .select("*")
        .order("ragione_sociale", { ascending: true });

      if (dealersError) throw dealersError;

      // Poi ottieni le statistiche per ogni dealer
      const dealersWithStats = await Promise.all(
        (dealers || []).map(async (dealer) => {
          const { data: orders, error: ordersError } = await supabase
            .from("orders")
            .select("importo_totale")
            .eq("dealer_id", dealer.id);

          if (ordersError) {
            console.error("Error fetching orders for dealer:", ordersError);
            return {
              ...dealer,
              ordersCount: 0,
              totalRevenue: 0,
            };
          }

          const ordersCount = orders?.length || 0;
          const totalRevenue = orders?.reduce((sum, order) => sum + (order.importo_totale || 0), 0) || 0;

          return {
            ...dealer,
            ordersCount,
            totalRevenue,
          };
        })
      );

      return dealersWithStats as DealerWithStats[];
    },
  });
};

export const useDealerById = (dealerId: string) => {
  return useQuery({
    queryKey: ["dealers", dealerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dealers")
        .select("*")
        .eq("id", dealerId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!dealerId,
  });
};

export const useCreateDealer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dealerData: {
      ragione_sociale: string;
      p_iva: string;
      codice_fiscale: string;
      email: string;
      telefono: string;
      indirizzo: string;
      citta: string;
      cap: string;
      provincia: string;
      note?: string;
      commissione_personalizzata?: number;
      commerciale_owner_id: string;
    }) => {
      const { data, error } = await supabase
        .from("dealers")
        .insert([dealerData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
      toast({
        title: "Rivenditore creato",
        description: "Il rivenditore è stato creato con successo",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile creare il rivenditore",
        variant: "destructive",
      });
      console.error("Error creating dealer:", error);
    },
  });
};

export const useUpdateDealer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dealerId,
      updates,
    }: {
      dealerId: string;
      updates: Partial<DealerWithStats>;
    }) => {
      const { error } = await supabase
        .from("dealers")
        .update(updates)
        .eq("id", dealerId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
      queryClient.invalidateQueries({ queryKey: ["dealers", variables.dealerId] });
      toast({
        title: "Rivenditore aggiornato",
        description: "I dati del rivenditore sono stati aggiornati con successo",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il rivenditore",
        variant: "destructive",
      });
      console.error("Error updating dealer:", error);
    },
  });
};
