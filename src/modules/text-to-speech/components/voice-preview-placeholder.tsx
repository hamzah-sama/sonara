import { Button } from "@/components/ui/button";
import { AudioLines, BookOpen, Sparkles, Volume } from "lucide-react";
import Link from "next/link";

export const VoicePreviewPlaceholder = () => {
  return (
    <div className="hidden lg:flex flex-1 justify-center items-center flex-col gap-6 border-t">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center justify-center w-32 relative gap-3">
          <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-4">
            <Volume className="size-5 text-muted-foreground" />
          </div>
          <div className="relative z-10 bg-foreground rounded-full p-4">
            <Sparkles className="size-5 text-background" />
          </div>
          <div className="absolute right-0 -rotate-30 rounded-full bg-muted p-4">
            <AudioLines className="size-5 text-muted-foreground" />
          </div>
        </div>
        <p className="text-lg font-semibold tracking-tight text-foreground">
          Preview will appear here
        </p>
        <p className="text-center text-muted-foreground text-sm max-w-64">
          Once you generate, your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="mailto:hamzah.sama@gmail.com">
          <BookOpen />
          Don't know how?
        </Link>
      </Button>
    </div>
  );
};
