import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface Props {
  isSignedIn: boolean | undefined;
}
export const AuthButton = ({ isSignedIn }: Props) => {
  return (
    <>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="border-blue-700 text-blue-500 px-4 py-2 rounded-full"
          >
            Sign In
          </Button>
        </SignInButton>
      )}
    </>
  );
};
