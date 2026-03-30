import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const loginSchema = z.object({
    email: z.string().email(t.area.auth.emailNonValida),
    password: z.string().min(6, t.area.auth.passwordMinimo6),
  });

  const signupSchema = z.object({
    email: z.string().email(t.area.auth.emailNonValida),
    password: z.string()
      .min(8, t.area.auth.passwordMinimo8)
      .regex(/[A-Z]/, t.area.auth.passwordMaiuscola)
      .regex(/[0-9]/, t.area.auth.passwordNumero)
      .regex(/[^A-Za-z0-9]/, t.area.auth.passwordSpeciale),
    displayName: z.string().min(2, t.area.auth.nomeMinimo2),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t.area.auth.passwordNonCoincidono,
    path: ["confirmPassword"],
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      signupSchema.parse(signupData);
      const { error } = await signUp(
        signupData.email,
        signupData.password,
        signupData.displayName
      );

      if (error) {
        if (error.message.includes("already registered")) {
          setError(t.area.auth.emailGiaRegistrata);
        } else if (error.message.includes("rate limit")) {
          setError(t.area.auth.troppiTentativi);
        } else {
          setError(error.message);
        }
      } else {
        // Registration submitted — may require email confirmation
        setSignupSuccess(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null);
    setSignupSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader />

        <Card className="border-border/50 shadow-xl">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.area.auth.accedi}</TabsTrigger>
                <TabsTrigger value="signup">{t.area.auth.registrati}</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="animate-in fade-in-0 slide-in-from-top-1">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t.area.auth.placeholder_email}
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <PasswordInput
                      id="login-password"
                      value={loginData.password}
                      onChange={(value) =>
                        setLoginData({ ...loginData, password: value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.area.auth.accedendo}
                      </>
                    ) : (
                      t.area.auth.accedi
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {signupSuccess ? (
                  <Alert className="animate-in fade-in-0 slide-in-from-top-1 border-green-500 bg-green-50 dark:bg-green-950">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      {t.area.auth.registrazioneCompletata}
                    </AlertDescription>
                  </Alert>
                ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="animate-in fade-in-0 slide-in-from-top-1">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t.area.auth.nomeCompleto}</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={t.area.auth.placeholder_nome}
                      value={signupData.displayName}
                      onChange={(e) =>
                        setSignupData({ ...signupData, displayName: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={t.area.auth.placeholder_email}
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <PasswordInput
                      id="signup-password"
                      value={signupData.password}
                      onChange={(value) =>
                        setSignupData({ ...signupData, password: value })
                      }
                      required
                      disabled={isLoading}
                    />
                    <PasswordStrengthIndicator password={signupData.password} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">{t.area.auth.confermaPassword}</Label>
                    <PasswordInput
                      id="signup-confirm"
                      value={signupData.confirmPassword}
                      onChange={(value) =>
                        setSignupData({ ...signupData, confirmPassword: value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.area.auth.registrando}
                      </>
                    ) : (
                      t.area.auth.registrati
                    )}
                  </Button>
                </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          {t.area.auth.accettaTermini}
        </p>
      </div>
    </div>
  );
};

export default Auth;
