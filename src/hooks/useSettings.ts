import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Setting {
  id: string;
  key: string;
  value: any;
  category: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useSettings = (category?: string) => {
  return useQuery({
    queryKey: ["settings", category],
    queryFn: async () => {
      let query = supabase.from("settings").select("*");
      
      if (category) {
        query = query.eq("category", category);
      }
      
      const { data, error } = await query.order("key");

      if (error) throw error;
      return data as Setting[];
    },
    staleTime: 10 * 60 * 1000, // impostazioni di sistema cambiano raramente
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase
        .from("settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Impostazione aggiornata",
        description: "Le modifiche sono state salvate con successo",
      });
    },
    onError: (error) => {
      console.error("Error updating setting:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare l'impostazione",
        variant: "destructive",
      });
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Single query with embedded user_roles — avoids double round-trip and client-side join
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("display_name");

      if (error) throw error;

      return (profiles || []).map((profile) => ({
        ...profile,
        roles: (profile.user_roles || []).map((r: { role: string }) => r.role),
      }));
    },
    staleTime: 2 * 60 * 1000, // profili non cambiano di frequente
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "super_admin" | "commerciale" | "rivenditore" }) => {
      const { error } = await supabase.rpc("update_user_role", {
        p_user_id: userId,
        p_new_role: role,
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["commerciali-list"] });
      toast({
        title: "Ruolo aggiornato",
        description: "Il ruolo dell'utente è stato modificato con successo",
      });
    },
    onError: (error) => {
      console.error("Error updating user role:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il ruolo dell'utente",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: isActive })
        .eq("id", userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato dell'utente è stato modificato con successo",
      });
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'utente",
        variant: "destructive",
      });
    },
  });
};