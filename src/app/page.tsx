"use client";
import { Button } from "@/src/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { AuthButton } from "../components/auth-button";

const Page = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => {
          if (!isSignedIn) {
            toast.error("You must be signed in to click the button");
            openSignIn();
            return;
          }
          toast.success("clicked 🎉");
        }}
      >
        Click me
      </Button>
      <AuthButton isSignedIn={isSignedIn} />
    </div>
  );
};

export default Page;
