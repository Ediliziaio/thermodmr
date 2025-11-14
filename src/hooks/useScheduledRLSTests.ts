import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type TestRun = Tables<"rls_test_runs">;
type TestResult = Tables<"rls_test_results">;

interface ScheduledTestRun extends TestRun {
  results?: TestResult[];
}

export const useScheduledRLSTests = () => {
  const [testRuns, setTestRuns] = useState<ScheduledTestRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestRuns = async () => {
    setIsLoading(true);
    try {
      const { data: runs, error } = await supabase
        .from("rls_test_runs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      // Fetch results for each run
      const runsWithResults = await Promise.all(
        (runs || []).map(async (run) => {
          const { data: results } = await supabase
            .from("rls_test_results")
            .select("*")
            .eq("test_run_id", run.id)
            .order("created_at", { ascending: true });

          return {
            ...run,
            results: results || [],
          };
        })
      );

      setTestRuns(runsWithResults);
    } catch (error) {
      console.error("Error fetching test runs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestRuns();

    // Subscribe to real-time updates for new test runs
    const channel = supabase
      .channel("rls_test_runs_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rls_test_runs",
        },
        () => {
          fetchTestRuns();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    testRuns,
    isLoading,
    refetch: fetchTestRuns,
  };
};
