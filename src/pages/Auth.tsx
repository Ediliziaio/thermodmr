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

const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve essere almeno 6 caratteri"),
});

const signupSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string()
    .min(8, "La password deve essere almeno 8 caratteri")
    .regex(/[A-Z]/, "La password deve contenere almeno una maiuscola")
    .regex(/[0-9]/, "La password deve contenere almeno un numero")
    .regex(/[^A-Za-z0-9]/, "La password deve contenere almeno un carattere speciale"),
  displayName: z.string().min(2, "Il nome deve essere almeno 2 caratteri"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const [signupSuccess, setSignupSuccess] = useState(false);

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
          setError("Email o password non corretti");
        } else if (error.message.includes("rate limit")) {
          setError("Troppi tentativi. Riprova tra qualche minuto.");
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
          setError("Questo indirizzo email è già registrato");
        } else if (error.message.includes("rate limit")) {
          setError("Troppi tentativi. Riprova tra qualche minuto.");
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
                <TabsTrigger value="login">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
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
                      placeholder="nome@esempio.it"
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
                        Accesso in corso...
                      </>
                    ) : (
                      "Accedi"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {signupSuccess ? (
                  <Alert className="animate-in fade-in-0 slide-in-from-top-1 border-green-500 bg-green-50 dark:bg-green-950">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      Registrazione completata. Controlla la tua email per confermare l'account prima di accedere.
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
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Mario Rossi"
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
                      placeholder="nome@esempio.it"
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
                    <Label htmlFor="signup-confirm">Conferma Password</Label>
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
                        Registrazione in corso...
                      </>
                    ) : (
                      "Registrati"
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
          Accedendo, accetti i nostri termini di servizio e la privacy policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
