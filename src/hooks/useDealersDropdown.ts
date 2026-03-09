import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DealerOption {
  id: string;
  ragione_sociale: string;
}

/**
 * Lightweight hook that fetches only dealer id + name for dropdown selectors.
 * Much lighter than useDealersInfinite which loads full stats.
 */
export const useDealersDropdown = () => {
  return useQuery({
    queryKey: ["dealers-dropdown"],
    queryFn: async (): Promise<DealerOption[]> => {
      const { data, error } = await supabase
        .from("dealers")
        .select("id, ragione_sociale")
        .order("ragione_sociale", { ascending: true });

      if (error) throw error;
      return (data || []) as DealerOption[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
