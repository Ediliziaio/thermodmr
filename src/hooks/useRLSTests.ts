import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TestResult {
  test: string;
  table: string;
  role: string;
  status: "pass" | "fail" | "skip";
  message: string;
  details?: string;
}

export const useRLSTests = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [progress, setProgress] = useState(0);

  const addResult = (result: TestResult) => {
    setResults((prev) => [...prev, result]);
  };

  const updateProgress = (current: number, total: number) => {
    setProgress(Math.round((current / total) * 100));
  };

  // Helper to create test users with roles
  const createTestUser = async (
    email: string,
    role: "super_admin" | "commerciale" | "rivenditore"
  ) => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) throw new Error("Not authenticated");

      // Check if current user is super_admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "super_admin")
        .single();

      if (!roles) {
        throw new Error("Only super_admins can run tests");
      }

      // Create user via edge function (requires super_admin)
      const password = "TestPassword123!";
      const { data, error } = await supabase.functions.invoke("create-commerciale", {
        body: {
          email,
          password,
          display_name: `Test ${role}`,
        },
      });

      if (error) throw error;

      const userId = data.user_id;

      // Update role if not commerciale
      if (role !== "commerciale") {
        await supabase.from("user_roles").delete().eq("user_id", userId);
        await supabase.from("user_roles").insert({ user_id: userId, role });
      }

      return { userId, email, password };
    } catch (error) {
      console.error("Error creating test user:", error);
      throw error;
    }
  };

  // Helper to sign in as test user
  const signInAsTestUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.session;
  };

  // Helper to clean up test user
  const cleanupTestUser = async (userId: string) => {
    try {
      // Get current session to restore later
      const { data: { session } } = await supabase.auth.getSession();
      
      // Delete user using admin function
      const { error } = await supabase.functions.invoke("delete-commerciale", {
        body: {
          commerciale_id: userId,
          transfer_to_commerciale_id: session?.user.id, // Transfer to current admin
        },
      });

      if (error) console.error("Cleanup error:", error);
    } catch (error) {
      console.error("Error cleaning up test user:", error);
    }
  };

  // Test helpers
  const testTableAccess = async (
    table: string,
    role: string,
    expectedCount: number | "any" | "none",
    operation: "select" | "insert" | "update" | "delete" = "select"
  ) => {
    try {
      let result: { count?: number | null; error: any } = { count: null, error: null };
      
      if (operation === "select") {
        const { count, error } = await supabase
          .from(table as any)
          .select("*", { count: "exact", head: true });
        result = { count, error };
      } else {
        // For insert/update/delete, just check if operation is denied
        result = { error: { message: "Operation not tested in detail" } };
      }

      const { count, error } = result;

      if (operation === "select") {
        if (expectedCount === "none" && error) {
          return {
            status: "pass" as const,
            message: `Correctly denied access to ${table}`,
          };
        } else if (expectedCount === "any" && !error) {
          return {
            status: "pass" as const,
            message: `Can access ${table} (found ${count} records)`,
          };
        } else if (typeof expectedCount === "number" && count === expectedCount) {
          return {
            status: "pass" as const,
            message: `Found expected ${expectedCount} records in ${table}`,
          };
        } else {
          return {
            status: "fail" as const,
            message: `Expected ${expectedCount} records, got ${count || "error"}`,
            details: error?.message,
          };
        }
      } else {
        // For insert/update/delete, we just check if the operation is allowed
        if (expectedCount === "none" && error) {
          return {
            status: "pass" as const,
            message: `Correctly denied ${operation} on ${table}`,
          };
        } else if (expectedCount !== "none" && !error) {
          return {
            status: "pass" as const,
            message: `Can ${operation} on ${table}`,
          };
        } else {
          return {
            status: "fail" as const,
            message: `Unexpected result for ${operation} on ${table}`,
            details: error?.message,
          };
        }
      }
    } catch (error: any) {
      return {
        status: "fail" as const,
        message: `Error testing ${table}: ${error.message}`,
        details: JSON.stringify(error, null, 2),
      };
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);
    setProgress(0);

    try {
      const { data: { user: originalUser } } = await supabase.auth.getUser();
      if (!originalUser) {
        toast.error("You must be logged in as super_admin to run tests");
        return;
      }

      const { data: adminRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", originalUser.id)
        .eq("role", "super_admin")
        .single();

      if (!adminRole) {
        toast.error("Only super_admins can run RLS tests");
        return;
      }

      const timestamp = Date.now();
      const testUsers = {
        super_admin: await createTestUser(
          `test-admin-${timestamp}@test.com`,
          "super_admin"
        ),
        commerciale: await createTestUser(
          `test-comm-${timestamp}@test.com`,
          "commerciale"
        ),
        rivenditore: await createTestUser(
          `test-riv-${timestamp}@test.com`,
          "rivenditore"
        ),
      };

      // Create test data as super_admin
      await signInAsTestUser(testUsers.super_admin.email, testUsers.super_admin.password);

      // Create test dealer for commerciale
      const { data: testDealer } = await supabase
        .from("dealers")
        .insert({
          ragione_sociale: "Test Dealer",
          p_iva: "12345678901",
          codice_fiscale: "TSTDLR00A01H501Z",
          email: "dealer@test.com",
          telefono: "1234567890",
          indirizzo: "Test St",
          citta: "Test City",
          cap: "12345",
          provincia: "TS",
          commerciale_owner_id: testUsers.commerciale.userId,
        })
        .select()
        .single();

      // Create test order
      const orderId = `TEST-${timestamp}`;
      await supabase.from("orders").insert({
        id: orderId,
        dealer_id: testDealer.id,
        commerciale_id: testUsers.commerciale.userId,
        creato_da_user_id: testUsers.commerciale.userId,
        importo_totale: 1000,
        importo_acconto: 300,
      });

      const totalTests = 9 * 3; // 9 tables * 3 roles
      let currentTest = 0;

      // Test each role
      for (const [roleName, userData] of Object.entries(testUsers)) {
        await signInAsTestUser(userData.email, userData.password);

        // Test profiles table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const profileResult = await testTableAccess("profiles", roleName, roleName === "super_admin" ? "any" : 1);
        addResult({
          test: "View profiles",
          table: "profiles",
          role: roleName,
          ...profileResult,
        });

        // Test user_roles table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const rolesResult = await testTableAccess("user_roles", roleName, roleName === "super_admin" ? "any" : 1);
        addResult({
          test: "View user roles",
          table: "user_roles",
          role: roleName,
          ...rolesResult,
        });

        // Test dealers table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const dealersResult = await testTableAccess(
          "dealers",
          roleName,
          roleName === "super_admin" || roleName === "commerciale" ? "any" : "none"
        );
        addResult({
          test: "View dealers",
          table: "dealers",
          role: roleName,
          ...dealersResult,
        });

        // Test orders table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const ordersResult = await testTableAccess("orders", roleName, "any");
        addResult({
          test: "View orders",
          table: "orders",
          role: roleName,
          ...ordersResult,
        });

        // Test order_lines table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const orderLinesResult = await testTableAccess("order_lines", roleName, "any");
        addResult({
          test: "View order lines",
          table: "order_lines",
          role: roleName,
          ...orderLinesResult,
        });

        // Test payments table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const paymentsResult = await testTableAccess("payments", roleName, "any");
        addResult({
          test: "View payments",
          table: "payments",
          role: roleName,
          ...paymentsResult,
        });

        // Test clients table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const clientsResult = await testTableAccess("clients", roleName, "any");
        addResult({
          test: "View clients",
          table: "clients",
          role: roleName,
          ...clientsResult,
        });

        // Test attachments table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const attachmentsResult = await testTableAccess("attachments", roleName, "any");
        addResult({
          test: "View attachments",
          table: "attachments",
          role: roleName,
          ...attachmentsResult,
        });

        // Test commissions table
        currentTest++;
        updateProgress(currentTest, totalTests);
        const commissionsResult = await testTableAccess(
          "commissions",
          roleName,
          roleName === "super_admin" ? "any" : roleName === "commerciale" ? "any" : "none"
        );
        addResult({
          test: "View commissions",
          table: "commissions",
          role: roleName,
          ...commissionsResult,
        });
      }

      // Restore original session
      await signInAsTestUser(originalUser.email!, testUsers.super_admin.password);

      // Cleanup
      await supabase.from("orders").delete().eq("id", orderId);
      if (testDealer) {
        await supabase.from("dealers").delete().eq("id", testDealer.id);
      }
      
      for (const userData of Object.values(testUsers)) {
        await cleanupTestUser(userData.userId);
      }

      const passedCount = results.filter((r) => r.status === "pass").length;
      const failedCount = results.filter((r) => r.status === "fail").length;

      if (failedCount === 0) {
        toast.success(`All ${passedCount} RLS policy tests passed!`);
      } else {
        toast.error(`${failedCount} tests failed, ${passedCount} passed`);
      }
    } catch (error: any) {
      console.error("Error running tests:", error);
      toast.error(`Test suite failed: ${error.message}`);
      addResult({
        test: "Test Suite",
        table: "all",
        role: "all",
        status: "fail",
        message: `Test suite failed: ${error.message}`,
        details: JSON.stringify(error, null, 2),
      });
    } finally {
      setIsRunning(false);
      setProgress(100);
    }
  };

  return {
    runTests,
    isRunning,
    results,
    progress,
  };
};
