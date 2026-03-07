import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

interface StatusStepperProps {
  currentStatus: OrderStatus;
}

const steps: { status: OrderStatus; label: string; color: string; bgColor: string }[] = [
  { status: "preventivo", label: "Preventivo", color: "border-slate-500 bg-slate-500 text-white", bgColor: "bg-slate-500" },
  { status: "da_confermare", label: "Da Confermare", color: "border-amber-500 bg-amber-500 text-white", bgColor: "bg-amber-500" },
  { status: "da_pagare_acconto", label: "Acconto", color: "border-orange-500 bg-orange-500 text-white", bgColor: "bg-orange-500" },
  { status: "in_lavorazione", label: "Lavorazione", color: "border-blue-500 bg-blue-500 text-white", bgColor: "bg-blue-500" },
  { status: "da_saldare", label: "Da Saldare", color: "border-red-500 bg-red-500 text-white", bgColor: "bg-red-500" },
  { status: "da_consegnare", label: "Consegna", color: "border-purple-500 bg-purple-500 text-white", bgColor: "bg-purple-500" },
  { status: "consegnato", label: "Consegnato", color: "border-green-500 bg-green-500 text-white", bgColor: "bg-green-500" },
];

const currentColors: Record<string, string> = {
  preventivo: "border-slate-500 text-slate-600 dark:text-slate-400",
  da_confermare: "border-amber-500 text-amber-600 dark:text-amber-400",
  da_pagare_acconto: "border-orange-500 text-orange-600 dark:text-orange-400",
  in_lavorazione: "border-blue-500 text-blue-600 dark:text-blue-400",
  da_saldare: "border-red-500 text-red-600 dark:text-red-400",
  da_consegnare: "border-purple-500 text-purple-600 dark:text-purple-400",
  consegnato: "border-green-500 text-green-600 dark:text-green-400",
};

export function StatusStepper({ currentStatus }: StatusStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <div className="w-full py-4">
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
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? step.color
                      : isCurrent
                      ? cn("bg-background", currentColors[step.status])
                      : "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-1.5 text-center">
                  <p
                    className={cn(
                      "text-[10px] font-medium leading-tight",
                      isCurrent || isCompleted
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
                    "h-0.5 flex-1 mx-1.5 transition-all duration-300",
                    isCompleted ? step.bgColor : "bg-muted"
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
