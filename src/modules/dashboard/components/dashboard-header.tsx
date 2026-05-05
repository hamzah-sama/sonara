"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

export const DashboardHeader = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex items-start justify-between ">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to see you</p>
        <h1 className="text-2xl lg:text-3xl tracking-tight font-semibold">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button variant="outline" size="sm">
          <Link
            href="mailto:hamzah.sama@gmail.com"
            className="flex items-center gap-2"
          >
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="mailto:hamzah.sama@gmail.com"
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
