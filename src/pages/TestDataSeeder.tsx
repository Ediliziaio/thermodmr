import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Database, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function TestDataSeeder() {
  const { hasRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!hasRole("super_admin")) {
    return <Navigate to="/" replace />;
  }

  const handleSeedData = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("Non autenticato");
      }

      const response = await supabase.functions.invoke("seed-test-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) {
        throw response.error;
      }

      setResult(response.data);
    } catch (err: any) {
      console.error("Errore durante il seeding:", err);
      setError(err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Seed Test Data
          </CardTitle>
          <CardDescription>
            Crea utenti di test e dati di esempio per testare il sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Questa operazione creerà:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>1 utente Commerciale (email: commerciale.test@example.com, password: TestCommerciale123!)</li>
              <li>1 utente Rivenditore (email: rivenditore.test@example.com, password: TestRivenditore123!)</li>
              <li>3 dealer assegnati al commerciale</li>
              <li>7 ordini con stati diversi</li>
              <li>Righe d'ordine dettagliate</li>
              <li>Pagamenti di esempio</li>
            </ul>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Attenzione:</strong> Questa operazione può essere eseguita solo da Super Admin.
              Gli utenti verranno creati con email confermate e potranno effettuare il login immediatamente.
            </AlertDescription>
          </Alert>

          <Button
            onClick={handleSeedData}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creazione dati in corso...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Crea Dati di Test
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">
                <strong>Errore:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {result && result.success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="ml-2">
                <div className="space-y-2">
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    Dati creati con successo!
                  </p>
                  <div className="text-sm space-y-1 text-green-700 dark:text-green-300">
                    <p><strong>Commerciale:</strong> {result.data.users.commerciale.email}</p>
                    <p><strong>Rivenditore:</strong> {result.data.users.rivenditore.email}</p>
                    <p><strong>Dealer creati:</strong> {result.data.dealers}</p>
                    <p><strong>Ordini creati:</strong> {result.data.orders}</p>
                    <p><strong>Righe ordine:</strong> {result.data.orderLines}</p>
                    <p><strong>Pagamenti:</strong> {result.data.payments}</p>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Ora puoi effettuare il logout e testare il login con le credenziali sopra.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
