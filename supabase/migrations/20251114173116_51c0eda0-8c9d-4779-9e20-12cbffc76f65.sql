-- Create table to store RLS test results
CREATE TABLE IF NOT EXISTS public.rls_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_run_id uuid NOT NULL,
  test_name text NOT NULL,
  table_name text NOT NULL,
  role text NOT NULL,
  status text NOT NULL CHECK (status IN ('pass', 'fail', 'skip')),
  message text NOT NULL,
  details text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_rls_test_results_run_id ON public.rls_test_results(test_run_id);
CREATE INDEX idx_rls_test_results_created_at ON public.rls_test_results(created_at DESC);
CREATE INDEX idx_rls_test_results_status ON public.rls_test_results(status);

-- Create summary table for test runs
CREATE TABLE IF NOT EXISTS public.rls_test_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_tests integer NOT NULL DEFAULT 0,
  passed_tests integer NOT NULL DEFAULT 0,
  failed_tests integer NOT NULL DEFAULT 0,
  skipped_tests integer NOT NULL DEFAULT 0,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  error_message text
);

-- RLS policies for test results (only super_admins can view)
ALTER TABLE public.rls_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rls_test_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view all test results"
  ON public.rls_test_results
  FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can view all test runs"
  ON public.rls_test_runs
  FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert test results"
  ON public.rls_test_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can manage test runs"
  ON public.rls_test_runs
  FOR ALL
  USING (true);