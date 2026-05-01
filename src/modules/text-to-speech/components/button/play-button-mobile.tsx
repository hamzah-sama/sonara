import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface Props {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const PlayButtonMobile = ({ isPlaying, audioRef }: Props) => {
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };
  return (
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
  );
};
