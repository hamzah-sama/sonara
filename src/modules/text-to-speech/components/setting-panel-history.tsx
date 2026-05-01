import { VoiceAvatar } from "@/components/avatar/voice-avatar";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AudioLines, AudioWaveform, Clock } from "lucide-react";
import Link from "next/link";

export const SettingPanelHistory = () => {
  const trpc = useTRPC();
  const { data: generations } = useSuspenseQuery(
    trpc.generations.getAll.queryOptions(),
  );

  if (!generations.length)
    return (
      <div className="flex flex-col h-full items-center justify-center gap-2 p-8">
        <div className="relative flex w-25 items-center justify-center">
          <div className="absolute left-0 z-10 bg-muted p-3 -rotate-30 rounded-full">
            <AudioLines className="size-4 text-muted-foreground" />
          </div>
          <div className="relative z-10 bg-muted p-3 rounded-full">
            <AudioWaveform className="size-4 text-background" />
          </div>
          <div className="absolute right-0 z-10 bg-muted p-3 rotate-30 rounded-full">
            <Clock className="size-4 text-muted-foreground" />
          </div>
        </div>
        <p className="font-semibold tracking-tight text-foreground">
          No generation yet
        </p>
        <p className="text-xs max-w-48 text-muted-foreground text-center">
          Generate some audio and it will appear here
        </p>
      </div>
    );
  return (
    <div className="flex flex-col gap-1 p-2">
      {generations.map((generation) => (
        <Link
          href={`/text-to-speech/${generation.id}`}
          key={generation.id}
          className="flex items-center hover:bg-muted transition-colors text-left p-3 gap-3 rounded-lg"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-sm text-muted-foreground font-medium">
              {generation.text}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <VoiceAvatar
                seed={generation.id}
                name={generation.voiceName}
                className="shrink-0"
              />
              <span>{generation.voiceName}</span>
              <span>&middot;</span>
              <span>
                {formatDistanceToNow(new Date(generation.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
