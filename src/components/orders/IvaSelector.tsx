import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const STANDARD_IVA_VALUES = [0, 4, 10, 22];

interface IvaSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
}

export function IvaSelector({ value, onChange, disabled = false, className, triggerClassName }: IvaSelectorProps) {
  const isCustom = !STANDARD_IVA_VALUES.includes(value);
  const [showCustomInput, setShowCustomInput] = useState(isCustom);

  useEffect(() => {
    if (isCustom) {
      setShowCustomInput(true);
    }
  }, [isCustom]);

  if (showCustomInput) {
    return (
      <div className={`flex items-center gap-1 ${className || ""}`}>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          disabled={disabled}
          className={triggerClassName || "h-9"}
          placeholder="IVA %"
        />
        <span className="text-xs text-muted-foreground">%</span>
        {!disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => {
              setShowCustomInput(false);
              onChange(22);
            }}
            title="Torna alle opzioni standard"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Select
      value={String(value)}
      onValueChange={(v) => {
        if (v === "custom") {
          setShowCustomInput(true);
          onChange(0);
        } else {
          onChange(parseFloat(v));
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">0% - Reverse Charge</SelectItem>
        <SelectItem value="4">4% - IVA ridotta</SelectItem>
        <SelectItem value="10">10% - IVA ridotta</SelectItem>
        <SelectItem value="22">22% - IVA ordinaria</SelectItem>
        <SelectItem value="custom">Personalizzata...</SelectItem>
      </SelectContent>
    </Select>
  );
}
