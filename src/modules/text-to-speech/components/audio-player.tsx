import { Spinner } from "@/components/ui/spinner";
import { useWaveSurfer } from "../hooks/use-wavesurfer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { VoiceAvatar } from "@/components/avatar/voice-avatar";
import { DownloadButton } from "./button/download-button";
import { ControlButton } from "./button/control-button";

interface Props {
  id?: string;
  name: string;
  text: string;
  audioUrl: string;
}

export const AudioPlayer = ({ id, name, text, audioUrl }: Props) => {
  const {
    containerRef,
    isReady,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seekForward,
    seekBackward,
  } = useWaveSurfer(audioUrl);

  const formatTime = (seconds: number): string => {
    return format(new Date(seconds * 1000), "mm:ss");
  };
  return (
    <div className="hidden lg:flex flex-col gap-8 h-full flex-1 border-t">
      <div className="p-6 pb-0">
        <h3 className="font-semibold text-foreground">Voice preview</h3>
      </div>

      <div className="relative flex items-center justify-center">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Badge
              variant="outline"
              className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
            >
              <Spinner className="size-4" />
              <span>Loading audio...</span>
            </Badge>
          </div>
        )}

        <div
          className={cn(
            "w-full transition-opacity duration-200",
            !isReady && "opacity-0",
          )}
          ref={containerRef}
        />
      </div>

      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold tabular-nums text-foreground tracking-tight">
          {formatTime(currentTime)} /{" "}
          <span className="text-muted-foreground">{formatTime(duration)}</span>
        </p>
      </div>
      <div className="flex items-center p-6">
        <div className="grid grid-cols-3 w-full">
          <div className="flex min-w-0 gap-0.5">
            <p className="text-foreground text-sm font-medium truncate">
              {text}
            </p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <VoiceAvatar seed={id ?? name} name={name} />
              <span className="truncate">{name}</span>
            </div>
          </div>
          <ControlButton
            isPlaying={isPlaying}
            isReady={isReady}
            togglePlayPause={togglePlayPause}
            seekForward={seekForward}
            seekBackward={seekBackward}
          />

          <div className="flex justify-end">
            <DownloadButton audioUrl={audioUrl} text={text} label="Download" />
          </div>
        </div>
      </div>
    </div>
  );
};
