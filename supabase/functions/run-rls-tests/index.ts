import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestResult {
  test: string;
  table: string;
  role: string;
  status: 'pass' | 'fail' | 'skip';
  message: string;
  details?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting scheduled RLS test run...');

    // Create test run record
    const { data: testRun, error: runError } = await supabase
      .from('rls_test_runs')
      .insert({ status: 'running' })
      .select()
      .single();

    if (runError) throw runError;
    const testRunId = testRun.id;

    const results: TestResult[] = [];

    try {
      // Create test users
      const timestamp = Date.now();
      const testPassword = 'TestPassword123!';
      
      const testUsers = {
        super_admin: await createTestUser(supabase, `test-admin-${timestamp}@test.com`, testPassword, 'super_admin'),
        commerciale: await createTestUser(supabase, `test-comm-${timestamp}@test.com`, testPassword, 'commerciale'),
        rivenditore: await createTestUser(supabase, `test-riv-${timestamp}@test.com`, testPassword, 'rivenditore'),
      };

      // Sign in as super_admin to create test data
      const adminClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!);
      await adminClient.auth.signInWithPassword({
        email: testUsers.super_admin.email,
        password: testPassword,
      });

      // Create test dealer
      const { data: testDealer } = await adminClient
        .from('dealers')
        .insert({
          ragione_sociale: 'Test Dealer',
          p_iva: '12345678901',
          codice_fiscale: 'TSTDLR00A01H501Z',
          email: 'dealer@test.com',
          telefono: '1234567890',
          indirizzo: 'Test St',
          citta: 'Test City',
          cap: '12345',
          provincia: 'TS',
          commerciale_owner_id: testUsers.commerciale.userId,
        })
        .select()
        .single();

      // Create test order
      const orderId = `TEST-${timestamp}`;
      await adminClient.from('orders').insert({
        id: orderId,
        dealer_id: testDealer.id,
        commerciale_id: testUsers.commerciale.userId,
        creato_da_user_id: testUsers.commerciale.userId,
        importo_totale: 1000,
        importo_acconto: 300,
      });

      // Run tests for each role
      for (const [roleName, userData] of Object.entries(testUsers)) {
        const roleClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!);
        await roleClient.auth.signInWithPassword({
          email: userData.email,
          password: testPassword,
        });

        // Test profiles
        results.push(await testTableAccess(roleClient, 'profiles', roleName, roleName === 'super_admin' ? 'any' : 1));
        
        // Test user_roles
        results.push(await testTableAccess(roleClient, 'user_roles', roleName, roleName === 'super_admin' ? 'any' : 1));
        
        // Test dealers
        results.push(await testTableAccess(roleClient, 'dealers', roleName, 
          roleName === 'super_admin' || roleName === 'commerciale' ? 'any' : 'none'));
        
        // Test orders
        results.push(await testTableAccess(roleClient, 'orders', roleName, 'any'));
        
        // Test order_lines
        results.push(await testTableAccess(roleClient, 'order_lines', roleName, 'any'));
        
        // Test payments
        results.push(await testTableAccess(roleClient, 'payments', roleName, 'any'));
        
        // Test clients
        results.push(await testTableAccess(roleClient, 'clients', roleName, 'any'));
        
        // Test attachments
        results.push(await testTableAccess(roleClient, 'attachments', roleName, 'any'));
        
        // Test commissions
        results.push(await testTableAccess(roleClient, 'commissions', roleName,
          roleName === 'super_admin' ? 'any' : roleName === 'commerciale' ? 'any' : 'none'));
      }

      // Cleanup
      await adminClient.from('orders').delete().eq('id', orderId);
      if (testDealer) {
        await adminClient.from('dealers').delete().eq('id', testDealer.id);
      }
      
      for (const userData of Object.values(testUsers)) {
        await supabase.auth.admin.deleteUser(userData.userId);
      }

      // Store results
      const testResultsToInsert = results.map(r => ({
        test_run_id: testRunId,
        test_name: `View ${r.table}`,
        table_name: r.table,
        role: r.role,
        status: r.status,
        message: r.message,
        details: r.details,
      }));

      await supabase.from('rls_test_results').insert(testResultsToInsert);

      // Update test run summary
      const passedCount = results.filter(r => r.status === 'pass').length;
      const failedCount = results.filter(r => r.status === 'fail').length;
      const skippedCount = results.filter(r => r.status === 'skip').length;

      await supabase
        .from('rls_test_runs')
        .update({
          total_tests: results.length,
          passed_tests: passedCount,
          failed_tests: failedCount,
          skipped_tests: skippedCount,
          completed_at: new Date().toISOString(),
          status: 'completed',
        })
        .eq('id', testRunId);

      console.log(`RLS test run completed: ${passedCount} passed, ${failedCount} failed`);

      return new Response(
        JSON.stringify({
          success: true,
          testRunId,
          summary: { total: results.length, passed: passedCount, failed: failedCount, skipped: skippedCount },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Test run error:', error);
      
      await supabase
        .from('rls_test_runs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_message: error instanceof Error ? error.message : String(error),
        })
        .eq('id', testRunId);

      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function createTestUser(supabase: any, email: string, password: string, role: 'super_admin' | 'commerciale' | 'rivenditore') {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) throw authError;
  const userId = authData.user.id;

  // Create profile
  await supabase.from('profiles').insert({
    id: userId,
    email,
    display_name: `Test ${role}`,
  });

  // Assign role
  await supabase.from('user_roles').insert({
    user_id: userId,
    role,
  });

  return { userId, email };
}

async function testTableAccess(
  client: any,
  table: string,
  role: string,
  expectedCount: number | 'any' | 'none'
): Promise<TestResult> {
  try {
    const { count, error } = await client
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (expectedCount === 'none' && error) {
      return {
        test: `View ${table}`,
        table,
        role,
        status: 'pass',
        message: `Correctly denied access to ${table}`,
      };
    } else if (expectedCount === 'any' && !error) {
      return {
        test: `View ${table}`,
        table,
        role,
        status: 'pass',
        message: `Can access ${table} (found ${count} records)`,
      };
    } else if (typeof expectedCount === 'number' && count === expectedCount) {
      return {
        test: `View ${table}`,
        table,
        role,
        status: 'pass',
        message: `Found expected ${expectedCount} records in ${table}`,
      };
    } else {
      return {
        test: `View ${table}`,
        table,
        role,
        status: 'fail',
        message: `Expected ${expectedCount} records, got ${count || 'error'}`,
        details: error?.message,
      };
    }
  } catch (error) {
    return {
      test: `View ${table}`,
      table,
      role,
      status: 'fail',
      message: `Error testing ${table}: ${error instanceof Error ? error.message : String(error)}`,
      details: JSON.stringify(error, null, 2),
    };
  }
}
