import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, AlertCircle, History, Play } from "lucide-react";
import { useRLSTests } from "@/hooks/useRLSTests";
import { useScheduledRLSTests } from "@/hooks/useScheduledRLSTests";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

export default function RLSTest() {
  const { runTests, isRunning, results, progress } = useRLSTests();
  const { testRuns, isLoading: isLoadingHistory } = useScheduledRLSTests();
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

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList>
            <TabsTrigger value="manual">
              <Play className="h-4 w-4 mr-2" />
              Manual Tests
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Test History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6">

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
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Test History</CardTitle>
                <CardDescription>
                  Results from automated weekly RLS test runs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : testRuns.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No test runs found. Scheduled tests run automatically every week.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {testRuns.map((run) => (
                      <Card key={run.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-base">
                                Test Run - {format(new Date(run.started_at), "PPpp")}
                              </CardTitle>
                              <CardDescription>
                                {run.status === "completed" && run.completed_at
                                  ? `Completed at ${format(new Date(run.completed_at), "PPpp")}`
                                  : run.status === "running"
                                  ? "Currently running..."
                                  : `Failed: ${run.error_message}`}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={
                                run.status === "completed"
                                  ? "default"
                                  : run.status === "running"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {run.status.toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {run.status === "running" && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Test in progress...</span>
                              </div>
                              <Progress value={undefined} className="animate-pulse" />
                            </div>
                          )}

                          {run.status === "completed" && (
                            <>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Total</p>
                                  <p className="text-2xl font-bold">{run.total_tests}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Passed</p>
                                  <p className="text-2xl font-bold text-green-600">
                                    {run.passed_tests}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Failed</p>
                                  <p className="text-2xl font-bold text-red-600">
                                    {run.failed_tests}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Skipped</p>
                                  <p className="text-2xl font-bold text-yellow-600">
                                    {run.skipped_tests}
                                  </p>
                                </div>
                              </div>

                              {run.results && run.results.length > 0 && (
                                <div className="space-y-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setShowDetails(
                                        showDetails === run.id ? null : run.id
                                      )
                                    }
                                  >
                                    {showDetails === run.id
                                      ? "Hide Details"
                                      : "Show Details"}
                                  </Button>

                                  {showDetails === run.id && (
                                    <div className="space-y-2 pt-2">
                                      {run.results.map((result, idx) => (
                                        <div
                                          key={idx}
                                          className="border rounded-lg p-3 space-y-1"
                                        >
                                          <div className="flex items-start gap-3">
                                            {result.status === "pass" ? (
                                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                            ) : result.status === "fail" ? (
                                              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                            ) : (
                                              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-medium text-sm">
                                                  {result.test_name}
                                                </h4>
                                                <Badge
                                                  variant={
                                                    result.status === "pass"
                                                      ? "default"
                                                      : result.status === "fail"
                                                      ? "destructive"
                                                      : "secondary"
                                                  }
                                                  className="text-xs"
                                                >
                                                  {result.status.toUpperCase()}
                                                </Badge>
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  {result.table_name}
                                                </Badge>
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  {result.role}
                                                </Badge>
                                              </div>
                                              <p className="text-sm text-muted-foreground mt-1">
                                                {result.message}
                                              </p>
                                              {result.details && (
                                                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                                  {result.details}
                                                </pre>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
