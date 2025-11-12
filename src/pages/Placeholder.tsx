import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Sezione in Sviluppo
          </CardTitle>
          <CardDescription>
            Questa sezione verrà implementata nelle prossime fasi del progetto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Il sistema è stato progettato con un'architettura modulare per facilitare l'aggiunta
            di nuove funzionalità. Questa sezione sarà presto disponibile.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
