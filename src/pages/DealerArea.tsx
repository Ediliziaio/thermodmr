import { useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DealerAreaLayout } from "@/components/DealerAreaLayout";
import DealerDashboard from "./DealerDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const Orders = lazy(() => import("./Orders"));
const OrderDetail = lazy(() => import("./OrderDetail"));
const Pagamenti = lazy(() => import("./Pagamenti"));
const DealerPreventivi = lazy(() => import("./DealerPreventivi"));
const DealerAssistenza = lazy(() => import("./DealerAssistenza"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function DealerArea() {
  const { id } = useParams<{ id: string }>();

  // Fetch dealer by ID directly — avoids searching through paginated list
  const { data: dealer, isLoading } = useQuery({
    queryKey: ["dealer-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dealers")
        .select("id, ragione_sociale")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <DealerAreaLayout dealerId={id!} dealerName={dealer?.ragione_sociale || undefined}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route index element={<DealerDashboard dealerId={id} dealerName={dealer?.ragione_sociale || undefined} />} />
          <Route path="preventivi" element={<DealerPreventivi dealerId={id} readOnly />} />
          <Route path="ordini" element={<Orders dealerId={id} />} />
          <Route path="ordini/:id" element={<OrderDetail />} />
          <Route path="pagamenti" element={<Pagamenti dealerId={id} />} />
          <Route path="assistenza" element={<DealerAssistenza dealerId={id} />} />
        </Routes>
      </Suspense>
    </DealerAreaLayout>
  );
}
