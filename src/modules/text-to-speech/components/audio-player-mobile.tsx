import { VoiceAvatar } from "@/components/avatar/voice-avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  id?: string;
  name: string;
  text: string;
  audioUrl: string;
}

export const AudioPlayerMobile = ({ id, name, text, audioUrl }: Props) => {
  const isMobile = useIsMobile();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isMobile) {
      audioRef.current?.pause();
    }
  }, [isMobile]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleDownload = () => {
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!audioUrl) return null;

  return (
    <div className="border-t lg:hidden p-4">
      <audio ref={audioRef} src={audioUrl} />
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{text}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-0.5 gap-1">
            <VoiceAvatar seed={id ?? name} name={name} className="shrink-0" />
            <p className="truncate text-xs text-muted-foreground">{name}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              type="button"
              variant="ghost"
              size="icon"
            >
              <Download className="size-4" />
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
          </div>
        </div>
      </div>
    </div>
  );
};
