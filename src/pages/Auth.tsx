import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, CheckCircle2, ArrowLeft, KeyRound, Mail } from "lucide-react";
import { z } from "zod";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { useLanguage } from "@/i18n/LanguageContext";

type View = "login" | "forgot" | "reset";

const Auth = () => {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const [view, setView] = useState<View>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({ password: "", confirm: "" });

  const loginSchema = z.object({
    email: z.string().email(t.area.auth.emailNonValida),
    password: z.string().min(6, t.area.auth.passwordMinimo6),
  });

  const resetSchema = z.object({
    password: z.string()
      .min(8, t.area.auth.passwordMinimo8)
      .regex(/[A-Z]/, t.area.auth.passwordMaiuscola)
      .regex(/[0-9]/, t.area.auth.passwordNumero),
    confirm: z.string(),
  }).refine((d) => d.password === d.confirm, {
    message: t.area.auth.passwordNonCoincidono,
    path: ["confirm"],
  });

  // Supabase invia PASSWORD_RECOVERY event quando l'utente clicca il link email
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setView("reset");
        setError(null);
        setSuccess(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const clearMessages = () => { setError(null); setSuccess(null); };

  /* ── Login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);
    try {
      loginSchema.parse(loginData);
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError(t.area.auth.emailPasswordNonCorretti);
        } else if (error.message.includes("rate limit")) {
          setError(t.area.auth.troppiTentativi);
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Recupera password ── */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!forgotEmail) { setError(t.area.auth.emailNonValida); return; }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      setSuccess(t.area.auth.linkInviato);
    } catch {
      setError(t.area.auth.erroreGenerico);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Salva nuova password ── */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);
    try {
      resetSchema.parse(resetData);
      const { error } = await supabase.auth.updateUser({ password: resetData.password });
      if (error) throw error;
      setSuccess(t.area.auth.passwordAggiornata);
      setTimeout(() => { setView("login"); setResetData({ password: "", confirm: "" }); setSuccess(null); }, 2000);
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.errors[0].message);
      else setError(t.area.auth.erroreGenerico);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader />

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">
              {view === "login" && t.area.auth.accedi}
              {view === "forgot" && t.area.auth.recuperaPassword}
              {view === "reset" && t.area.auth.nuovaPassword}
            </CardTitle>
            <CardDescription>
              {view === "login" && t.area.auth.accettaTermini}
              {view === "forgot" && t.area.auth.descRecupera}
              {view === "reset" && t.area.auth.descRecupera}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Messaggi globali */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in-0 slide-in-from-top-1">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="animate-in fade-in-0 slide-in-from-top-1 border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-300">{success}</AlertDescription>
              </Alert>
            )}

            {/* ── VIEW: LOGIN ── */}
            {view === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.area.auth.placeholder_email}
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => { setView("forgot"); clearMessages(); setForgotEmail(loginData.email); }}
                      className="text-xs text-primary hover:underline"
                    >
                      {t.area.auth.haiDimenticato}
                    </button>
                  </div>
                  <PasswordInput
                    id="password"
                    value={loginData.password}
                    onChange={(value) => setLoginData({ ...loginData, password: value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.accedendo}</>
                  ) : (
                    <><Mail className="mr-2 h-4 w-4" />{t.area.auth.accedi}</>
                  )}
                </Button>
              </form>
            )}

            {/* ── VIEW: RECUPERA PASSWORD ── */}
            {view === "forgot" && !success && (
              <form onSubmit={handleForgot} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder={t.area.auth.placeholder_email}
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.inviandoLink}</>
                  ) : (
                    <><KeyRound className="mr-2 h-4 w-4" />{t.area.auth.inviaLink}</>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => { setView("login"); clearMessages(); }}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {t.area.auth.tornaAlLogin}
                </button>
              </form>
            )}

            {/* Dopo invio link: solo bottone torna al login */}
            {view === "forgot" && success && (
              <button
                type="button"
                onClick={() => { setView("login"); clearMessages(); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center mt-2"
              >
                <ArrowLeft className="h-3 w-3" />
                {t.area.auth.tornaAlLogin}
              </button>
            )}

            {/* ── VIEW: NUOVA PASSWORD ── */}
            {view === "reset" && !success && (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t.area.auth.nuovaPassword}</Label>
                  <PasswordInput
                    id="new-password"
                    value={resetData.password}
                    onChange={(value) => setResetData({ ...resetData, password: value })}
                    required
                    disabled={isLoading}
                  />
                  <PasswordStrengthIndicator password={resetData.password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t.area.auth.confermaPassword}</Label>
                  <PasswordInput
                    id="confirm-password"
                    value={resetData.confirm}
                    onChange={(value) => setResetData({ ...resetData, confirm: value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.salvandoPassword}</>
                  ) : (
                    <><KeyRound className="mr-2 h-4 w-4" />{t.area.auth.salvaPassword}</>
                  )}
                </Button>
              </form>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
