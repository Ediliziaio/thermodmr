import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StatusStepperProps {
  currentStatus: OrderStatus;
}

const steps = [
  { status: OrderStatus.DA_CONFERMARE, label: "Da Confermare", number: 1 },
  { status: OrderStatus.DA_PAGARE_ACCONTO, label: "Da Pagare Acconto", number: 2 },
  { status: OrderStatus.IN_LAVORAZIONE, label: "In Lavorazione", number: 3 },
  { status: OrderStatus.DA_CONSEGNARE, label: "Da Consegnare", number: 4 },
  { status: OrderStatus.CONSEGNATO, label: "Consegnato", number: 5 },
];

export function StatusStepper({ currentStatus }: StatusStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.status} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isCurrent
                        ? "text-foreground"
                        : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
