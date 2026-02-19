import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import DealerDashboard from "./DealerDashboard";
import { Skeleton } from "@/components/ui/skeleton";

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
    <>
      <DealerDashboard dealerId={id} dealerName={dealer?.ragione_sociale || undefined} />
      {hasNextPage && <div ref={ref} />}
    </>
  );
}
