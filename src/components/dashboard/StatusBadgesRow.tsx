import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface StatusBadgesRowProps {
  ordersByStatus: Record<string, number>;
}

const STATUS_ORDER = [
  "da_confermare",
  "da_pagare_acconto",
  "in_lavorazione",
  "da_saldare",
  "da_consegnare",
  "consegnato",
];

export function StatusBadgesRow({ ordersByStatus }: StatusBadgesRowProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 flex-wrap">
      {STATUS_ORDER.map((status) => {
        const count = ordersByStatus[status] || 0;
        if (count === 0) return null;
        return (
          <Badge
            key={status}
            className={`${getStatusColor(status)} cursor-pointer hover:opacity-80 transition-opacity text-xs px-3 py-1`}
            variant="outline"
            onClick={() => navigate(`/ordini?status=${status}`)}
          >
            {getStatusLabel(status)}: {count}
          </Badge>
        );
      })}
    </div>
  );
}
