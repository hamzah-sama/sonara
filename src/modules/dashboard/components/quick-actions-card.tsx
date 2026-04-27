import { Button } from "@/components/ui/button";
import { QuickAction } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = QuickAction;

export const QuickActionsCard = ({
  title,
  description,
  gradient,
  href,
}: Props) => {
  return (
    <div className="flex gap-4 rounded-xl bg-card p-3">
      <div
        className={cn(
          "relative h-31 w-41 overflow-hidden shrink-0 rounded-xl bg-linear-to-br",
          gradient,
        )}
      >
        <div className="absolute flex items-center justify-center inset-0">
          <div className="size-12 bg-white/30 rounded-full" />
        </div>
        <div className="absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20" />
      </div>

      <div className="flex flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <Button variant="outline" asChild className="w-fit" size="xs">
          <Link href={href}>
            <ArrowRight className="size-3" />
            Try it out
          </Link>
        </Button>
      </div>
    </div>
  );
};
