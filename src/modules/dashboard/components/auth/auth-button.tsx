import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInButton, useClerk, UserButton } from "@clerk/nextjs";
import { User2Icon } from "lucide-react";

export const AuthButton = () => {
  const { isSignedIn } = useClerk();
  return (
    <>
      {isSignedIn ? (
        <UserButton
          showName
          fallback={
            <Skeleton className="h-8.5 w-full bg-white group-data-[collapsible=icon]:size-8 rounded-md border border-border " />
          }
          appearance={{
            elements: {
              rootBox:
                "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
              userButtonTrigger:
                "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
              userButtonBox: "flex-row-reverse! gap-2!",
              userButtonOuterIdentifier:
                "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
              userButtonAvatarBox: "size-6!",
            },
          }}
        />
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="border-blue-700 text-blue-500 py-2 rounded-full w-full flex items-center justify-center gap-4"
          >
            <User2Icon />
            Sign In
          </Button>
        </SignInButton>
      )}
    </>
  );
};
