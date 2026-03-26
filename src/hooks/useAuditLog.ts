import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuditLogEntry {
  entity: string;
  entity_id: string;
  azione: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
}

export const useCreateAuditLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: AuditLogEntry) => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("audit_log")
        .insert({
          user_id: user.id,
          entity: entry.entity,
          entity_id: entry.entity_id,
          azione: entry.azione,
          old_values: entry.old_values,
          new_values: entry.new_values,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditLog"] });
    },
    onError: (error: Error) => {
      console.error("Failed to create audit log:", error.message);
    },
  });
};
