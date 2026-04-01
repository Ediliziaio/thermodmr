import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle, Loader2, CheckCircle2, ArrowLeft,
  KeyRound, Mail, Lock, ExternalLink, ShieldCheck,
} from "lucide-react";
import { z } from "zod";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo_Thermodmr.png";
import { WWW_URL } from "@/utils/subdomain";

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);
    try {
      loginSchema.parse(loginData);
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) setError(t.area.auth.emailPasswordNonCorretti);
        else if (error.message.includes("rate limit")) setError(t.area.auth.troppiTentativi);
        else setError(error.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen flex">

      {/* ── PANNELLO SINISTRO — brand (solo desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 bg-[hsl(0,0%,8%)] text-white relative overflow-hidden">
        {/* Pattern decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[hsl(195,85%,45%)] blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[hsl(195,85%,45%)] blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <img src={logo} alt="ThermoDMR" className="h-14 object-contain brightness-0 invert" />
        </div>

        {/* Centro — claim */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-[hsl(195,85%,65%)]">
            <ShieldCheck className="h-4 w-4" />
            Area Riservata
          </div>
          <h1 className="text-4xl font-bold leading-snug">
            Gestisci la tua<br />
            <span className="text-[hsl(195,85%,55%)]">rete di rivenditori</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Ordini, preventivi, pagamenti e statistiche — tutto in un unico pannello sicuro.
          </p>
        </div>

        {/* Footer pannello */}
        <div className="relative z-10">
          <a
            href={WWW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            thermodmr.com
          </a>
        </div>
      </div>

      {/* ── PANNELLO DESTRO — form ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-sm space-y-8">

          {/* Logo mobile */}
          <div className="flex flex-col items-center gap-3 lg:hidden">
            <img src={logo} alt="ThermoDMR" className="h-12 object-contain" />
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted rounded-full px-3 py-1">
              <Lock className="h-3 w-3" />
              Area Riservata
            </span>
          </div>

          {/* Header form */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              {view === "login" && t.area.auth.accedi}
              {view === "forgot" && t.area.auth.recuperaPassword}
              {view === "reset" && t.area.auth.nuovaPassword}
            </h2>
            <p className="text-sm text-muted-foreground">
              {view === "login" && "Inserisci le tue credenziali per accedere"}
              {view === "forgot" && t.area.auth.descRecupera}
              {view === "reset" && "Scegli una nuova password sicura per il tuo account"}
            </p>
          </div>

          {/* Feedback */}
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

          {/* ── LOGIN ── */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
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
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => { setView("forgot"); clearMessages(); setForgotEmail(loginData.email); }}
                    className="text-xs text-primary hover:underline font-medium"
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
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.accedendo}</>
                  : <><Mail className="mr-2 h-4 w-4" />{t.area.auth.accedi}</>
                }
              </Button>
            </form>
          )}

          {/* ── RECUPERA PASSWORD ── */}
          {view === "forgot" && !success && (
            <form onSubmit={handleForgot} className="space-y-5">
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
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.inviandoLink}</>
                  : <><KeyRound className="mr-2 h-4 w-4" />{t.area.auth.inviaLink}</>
                }
              </Button>

              <button
                type="button"
                onClick={() => { setView("login"); clearMessages(); }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t.area.auth.tornaAlLogin}
              </button>
            </form>
          )}

          {view === "forgot" && success && (
            <button
              type="button"
              onClick={() => { setView("login"); clearMessages(); }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.area.auth.tornaAlLogin}
            </button>
          )}

          {/* ── NUOVA PASSWORD ── */}
          {view === "reset" && !success && (
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="new-password">{t.area.auth.nuovaPassword}</Label>
                <PasswordInput
                  id="new-password"
                  value={resetData.password}
                  onChange={(value) => setResetData({ ...resetData, password: value })}
                  required
                  disabled={isLoading}
                  className="h-11"
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
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.area.auth.salvandoPassword}</>
                  : <><KeyRound className="mr-2 h-4 w-4" />{t.area.auth.salvaPassword}</>
                }
              </Button>
            </form>
          )}

          {/* Footer — solo su login */}
          {view === "login" && (
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              {t.area.auth.accettaTermini}
            </p>
          )}

          {/* Link sito pubblico — mobile */}
          <div className="flex justify-center lg:hidden">
            <a
              href={WWW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              thermodmr.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
