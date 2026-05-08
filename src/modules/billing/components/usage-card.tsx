import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrency } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

interface Props {
  estimatedCost: number;
}

export const UsageCard = ({ estimatedCost }: Props) => {
  const trpc = useTRPC();
  const portalMutation = useMutation(
    trpc.billing.createPortalSession.mutationOptions({}),
  );

  const openPortal = useCallback(() => {
    portalMutation.mutate(undefined, {
      onSuccess: (data) => {
        window.open(data.portalUrl, "_blank");
      },
    });
  }, [portalMutation]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-foreground tracking-tight font-semibold text-sm">
        Current usage
      </p>
      <p className="text-xl font-bold tracking-tight mt-1 text-foreground">
        {formatCurrency(estimatedCost)}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Estimated this period
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={openPortal}
        disabled={portalMutation.isPending}
        className="text-xs w-full"
      >
        {portalMutation.isPending ? (
          <>
            <Spinner /> Redirecting...
          </>
        ) : (
          "Manage Subscription"
        )}
      </Button>
    </div>
  );
};
