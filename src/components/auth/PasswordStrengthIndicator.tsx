interface Props {
  password: string;
}

const checks = [
  { label: "8+ caratteri", test: (p: string) => p.length >= 8 },
  { label: "Maiuscola", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Numero", test: (p: string) => /[0-9]/.test(p) },
];

export const PasswordStrengthIndicator = ({ password }: Props) => {
  if (!password) return null;

  const passed = checks.filter((c) => c.test(password)).length;
  const colors = ["bg-red-400", "bg-orange-400", "bg-green-500"];
  const barColor = colors[passed - 1] ?? "bg-muted";

  return (
    <div className="space-y-1.5 mt-1">
      <div className="flex gap-1">
        {checks.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < passed ? barColor : "bg-muted"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-xs transition-colors ${
              c.test(password) ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            {c.test(password) ? "✓" : "·"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
};
