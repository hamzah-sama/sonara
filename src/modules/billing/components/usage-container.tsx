"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { UsageCard } from "./usage-card";
import { UpgradeCard } from "./upgrade-card";

export const UsageContainer = () => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.billing.getStatus.queryOptions());
  return (
    <div className="bg-background border border-border p-3 group-data-[collapsible=icon]:hidden rounded-lg">
      {isLoading ? null : data?.hasActiveSubscription ? (
        <UsageCard estimatedCost={data.estimatedCost} />
      ) : (
        <UpgradeCard />
      )}
    </div>
  );
};
