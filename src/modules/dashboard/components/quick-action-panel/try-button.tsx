"use client";

import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  href: string;
}
export const TryButton = ({ href }: Props) => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  return (
    <Button variant="outline" asChild className="w-fit" size="xs">
      <Link
        href={href}
        onClick={(e) => {
          if (!isSignedIn) {
            clerk.openSignIn();
            toast.error("Please sign in to execute this action");
            e.preventDefault();
            return;
          }
        }}
      >
        <ArrowRight className="size-3" />
        Try it out
      </Link>
    </Button>
  );
};
