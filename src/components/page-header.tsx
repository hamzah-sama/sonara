import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

interface Props {
  className?: string;
  title: string;
  triggerClass?: string;
}

export const PageHeader = ({ className, title, triggerClass }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className={triggerClass} />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Link
            href="mailto:V2M5M@example.com"
            className="flex items-center gap-2"
          >
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="mailto:V2M5M@example.com"
            className="flex items-center gap-2"
          >
            <Headphones />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
