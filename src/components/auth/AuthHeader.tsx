import { Package } from "lucide-react";

export const AuthHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mb-2">
      {/* Logo */}
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Package className="w-8 h-8" />
      </div>
      
      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight">
        Gestionale Ordini
      </h1>
      
      {/* Subtitle */}
      <p className="text-sm text-muted-foreground text-center">
        Gestisci ordini, pagamenti e provvigioni
      </p>
    </div>
  );
};
