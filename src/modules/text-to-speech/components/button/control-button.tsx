import { Button } from "@/components/ui/button";
import { Pause, Play, Redo, Undo } from "lucide-react";

interface Props {
  isPlaying: boolean;
  isReady: boolean;
  togglePlayPause: () => void;
  seekForward: (seconds: number) => void;
  seekBackward: (seconds: number) => void;
}
export const ControlButton = ({
  isPlaying,
  isReady,
  togglePlayPause,
  seekForward,
  seekBackward,
}: Props) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="ghost"
        onClick={() => seekBackward(5)}
        className="flex-col"
        size="icon-lg"
        disabled={!isReady}
      >
        <Undo className="size-4" />
        <span className="text-sm font-medium">5</span>
      </Button>

      <Button
        onClick={togglePlayPause}
        size="icon"
        className="rounded-full"
        type="button"
      >
        {isPlaying ? (
          <Pause className="fill-background" />
        ) : (
          <Play className="fill-background" />
        )}
      </Button>
      <Button
        variant="ghost"
        onClick={() => seekForward(5)}
        className="flex-col"
        size="icon-lg"
        disabled={!isReady}
        type="button"
      >
        <Redo className="size-4" />
        <span className="text-sm font-medium">5</span>
      </Button>
    </div>
  );
};
