<<<<<<< HEAD
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background min-h-screen">
      <div className="text-2xl font-semibold">Welcome to Sonara</div>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher />
        <UserButton />
      </div>
=======
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
>>>>>>> 08a485ace8bc8e3c7a5405ece324d829356cacf1
    </div>
  );
};

export default Page;
