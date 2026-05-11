import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  text: string;
}
export const GenerateButton = ({ text }: Props) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  const handleGenerate = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    if (!isSignedIn) {
      clerk.openSignIn();
      toast.error("Please sign in to execute this action");
      return;
    }

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmedText)}`);
  };
  return (
    <Button
      size="sm"
      onClick={handleGenerate}
      disabled={!text.trim()}
      className="w-full lg:w-auto"
    >
      Generate speech
    </Button>
  );
};
