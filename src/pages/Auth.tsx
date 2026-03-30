import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const Auth = () => {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.string().email(t.area.auth.emailNonValida),
    password: z.string().min(6, t.area.auth.passwordMinimo6),
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader />

        <Card className="border-border/50 shadow-xl">
          <CardContent className="pt-6">
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
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                  onChange={(value) => setLoginData({ ...loginData, password: value })}
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
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          {t.area.auth.accettaTermini}
        </p>
      </div>
    </div>
  );
};

export default Auth;
