import { useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import { DealerAreaLayout } from "@/components/DealerAreaLayout";
import DealerDashboard from "./DealerDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const Orders = lazy(() => import("./Orders"));
const OrderDetail = lazy(() => import("./OrderDetail"));
const Pagamenti = lazy(() => import("./Pagamenti"));
// DealerPreventivi removed - dealer area is read-only
const DealerAssistenza = lazy(() => import("./DealerAssistenza"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function DealerArea() {
  const { id } = useParams<{ id: string }>();
  const { data: dealersData, isLoading, fetchNextPage, hasNextPage } = useDealersInfinite();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const allDealers = dealersData?.pages.flatMap((p) => p.data) || [];
  const dealer = allDealers.find((d) => d.id === id);

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
          {/* Preventivi route removed - dealer area is read-only */}
          <Route path="ordini" element={<Orders dealerId={id} />} />
          <Route path="ordini/:orderId" element={<OrderDetail />} />
          <Route path="pagamenti" element={<Pagamenti dealerId={id} />} />
          <Route path="assistenza" element={<DealerAssistenza dealerId={id} />} />
        </Routes>
      </Suspense>
      {hasNextPage && <div ref={ref} />}
    </DealerAreaLayout>
  );
}
