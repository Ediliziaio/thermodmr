import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfWeek, addWeeks, endOfWeek, getYear } from "date-fns";
import { it } from "date-fns/locale";

interface OrderSchedulingCardProps {
  isSuperAdmin: boolean;
  dataFineProduzione: Date | undefined;
  setDataFineProduzione: (d: Date | undefined) => void;
  settimanaConsegna: string;
  setSettimanaConsegna: (s: string) => void;
  dataConsegnaPrevista: Date | undefined;
  setDataConsegnaPrevista: (d: Date | undefined) => void;
}

export function OrderSchedulingCard({
  isSuperAdmin,
  dataFineProduzione,
  setDataFineProduzione,
  settimanaConsegna,
  setSettimanaConsegna,
  dataConsegnaPrevista,
  setDataConsegnaPrevista,
}: OrderSchedulingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produzione & Consegna</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data Fine Produzione */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Data Fine Produzione</Label>
          {isSuperAdmin ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataFineProduzione && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataFineProduzione ? format(dataFineProduzione, "dd/MM/yyyy") : "Seleziona data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataFineProduzione}
                  onSelect={setDataFineProduzione}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <p className="font-medium text-foreground">
              {dataFineProduzione ? format(dataFineProduzione, "dd/MM/yyyy") : "Da definire"}
            </p>
          )}
        </div>

        {/* Settimana Consegna */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Settimana Consegna</Label>
          {isSuperAdmin ? (
            <div className="space-y-1">
              <Select
                value={settimanaConsegna || ""}
                onValueChange={(val) => setSettimanaConsegna(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleziona settimana" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 53 }, (_, i) => {
                    const weekNum = i + 1;
                    const year = getYear(new Date());
                    const ws = startOfWeek(addWeeks(new Date(year, 0, 4), weekNum - 1), { weekStartsOn: 1 });
                    const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
                    const monthLabel = monthNames[ws.getMonth()];
                    return (
                      <SelectItem key={weekNum} value={String(weekNum)}>
                        {weekNum} - {monthLabel} {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {settimanaConsegna && Number(settimanaConsegna) >= 1 && Number(settimanaConsegna) <= 53 && (
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    const year = getYear(new Date());
                    const weekStart = startOfWeek(addWeeks(new Date(year, 0, 4), Number(settimanaConsegna) - 1), { weekStartsOn: 1 });
                    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
                    return `${format(weekStart, "dd MMM", { locale: it })} - ${format(weekEnd, "dd MMM yyyy", { locale: it })}`;
                  })()}
                </p>
              )}
            </div>
          ) : (
            <p className="font-medium text-foreground">
              {settimanaConsegna ? `Settimana ${settimanaConsegna}` : "Da definire"}
            </p>
          )}
        </div>

        {/* Data Consegna Prevista */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Data Consegna Prevista</Label>
          {isSuperAdmin ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataConsegnaPrevista && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataConsegnaPrevista ? format(dataConsegnaPrevista, "dd/MM/yyyy") : "Seleziona data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataConsegnaPrevista}
                  onSelect={setDataConsegnaPrevista}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <p className="font-medium text-foreground">
              {dataConsegnaPrevista ? format(dataConsegnaPrevista, "dd/MM/yyyy") : "Da definire"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
