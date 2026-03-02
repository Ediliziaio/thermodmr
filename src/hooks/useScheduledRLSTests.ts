import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type TestRun = Tables<"rls_test_runs">;
type TestResult = Tables<"rls_test_results">;

interface ScheduledTestRun extends TestRun {
  results?: TestResult[];
}

const fetchTestRunsWithResults = async (): Promise<ScheduledTestRun[]> => {
  const { data: runs, error } = await supabase
    .from("rls_test_runs")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(10);

  if (error) throw error;

  const runsWithResults = await Promise.all(
    (runs || []).map(async (run) => {
      const { data: results } = await supabase
        .from("rls_test_results")
        .select("*")
        .eq("test_run_id", run.id)
        .order("created_at", { ascending: true });

      return { ...run, results: results || [] };
    })
  );

  return runsWithResults;
};

export const useScheduledRLSTests = () => {
  const { data: testRuns = [], isLoading, refetch } = useQuery({
    queryKey: ["rls-test-runs"],
    queryFn: fetchTestRunsWithResults,
    staleTime: 30_000,
  });

  return { testRuns, isLoading, refetch };
};
