import { Button } from "@/components/ui/button";
import { useCheckout } from "../hooks/use-checkout";
import { Spinner } from "@/components/ui/spinner";

export const UpgradeCard = () => {
  const { checkout, isPending, url } = useCheckout();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-foreground font-semibold tracking-tight">
        Pay as you go
      </p>
      <p className="text-xm text-muted-foreground mt-1">
        Generate speech starting at $0.30 per 1,000 characters
      </p>
      <Button
        className="w-full text-xs"
        onClick={checkout}
        disabled={isPending}
        variant="outline"
        size="sm"
      >
        {isPending ? (
          <>
            <Spinner />
            Redirecting...
          </>
        ) : (
          "Upgrade"
        )}
      </Button>
    </div>
  );
};
