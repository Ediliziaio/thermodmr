import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordCriteria {
  label: string;
  met: boolean;
}

export const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const criteria: PasswordCriteria[] = useMemo(() => [
    { label: "Almeno 8 caratteri", met: password.length >= 8 },
    { label: "Almeno una maiuscola", met: /[A-Z]/.test(password) },
    { label: "Almeno un numero", met: /[0-9]/.test(password) },
    { label: "Almeno un carattere speciale", met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = useMemo(() => {
    return criteria.filter((c) => c.met).length;
  }, [criteria]);

  const getStrengthLabel = () => {
    if (strength === 0) return { label: "Molto debole", color: "bg-destructive" };
    if (strength === 1) return { label: "Debole", color: "bg-destructive" };
    if (strength === 2) return { label: "Discreta", color: "bg-chart-3" };
    if (strength === 3) return { label: "Buona", color: "bg-chart-2" };
    return { label: "Forte", color: "bg-chart-2" };
  };

  const strengthInfo = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Forza password</span>
          <span className={cn(
            "font-medium",
            strength <= 1 && "text-destructive",
            strength === 2 && "text-chart-3",
            strength >= 3 && "text-chart-2"
          )}>
            {strengthInfo.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300 rounded-full",
              strengthInfo.color
            )}
            style={{ width: `${(strength / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Criteria List */}
      <ul className="space-y-1">
        {criteria.map((criterion, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-2 text-xs transition-colors duration-200",
              criterion.met ? "text-chart-2" : "text-muted-foreground"
            )}
          >
            {criterion.met ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            {criterion.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
