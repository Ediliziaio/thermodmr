import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useRLSTests } from "@/hooks/useRLSTests";
import { Layout } from "@/components/Layout";

export default function RLSTest() {
  const { runTests, isRunning, results, progress } = useRLSTests();
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getStatusIcon = (status: "pass" | "fail" | "skip") => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "skip":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: "pass" | "fail" | "skip") => {
    const variants = {
      pass: "default",
      fail: "destructive",
      skip: "secondary",
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const totalTests = results.length;
  const passedTests = results.filter((r) => r.status === "pass").length;
  const failedTests = results.filter((r) => r.status === "fail").length;
  const skippedTests = results.filter((r) => r.status === "skip").length;

  return (
    <Layout>
      <div className="container mx-auto py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">RLS Policy Test Suite</h1>
          <p className="text-muted-foreground">
            Comprehensive testing of Row Level Security policies across all tables and roles
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
            <CardDescription>
              This will create temporary test users, verify access permissions, and clean up automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={runTests}
              disabled={isRunning}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests... {progress}%
                </>
              ) : (
                "Run All Tests"
              )}
            </Button>

            {totalTests > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{totalTests}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{passedTests}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedTests}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Skipped</p>
                  <p className="text-2xl font-bold text-yellow-600">{skippedTests}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Detailed results for each RLS policy test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-2 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(result.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium">{result.test}</h3>
                          {getStatusBadge(result.status)}
                          <Badge variant="outline" className="text-xs">
                            {result.table}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {result.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {result.message}
                        </p>
                        {result.details && showDetails === `${index}` && (
                          <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                            {result.details}
                          </pre>
                        )}
                      </div>
                    </div>
                    {result.details && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowDetails(showDetails === `${index}` ? null : `${index}`)
                        }
                      >
                        {showDetails === `${index}` ? "Hide" : "Details"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
