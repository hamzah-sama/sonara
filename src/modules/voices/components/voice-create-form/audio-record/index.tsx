import { cn, formatFileSize, formatTime } from "@/lib/utils";
import { useAudioRecorder } from "./use-audio-recorder";
import { FileAudio, Mic, Pause, Play, RotateCcw, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudioPlayback } from "@/hooks/use-audio-playback";

interface Props {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid: boolean;
}

export const AudioRecord = ({ file, onFileChange, isInvalid }: Props) => {
  const {
    isRecording,
    audioBlob,
    error,
    elapsedTime,
    containerRef,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const { togglePlayPause, isPlaying } = useAudioPlayback(file);

  const handleStop = () => {
    stopRecording((blob) => {
      const recordedFile = new File([blob], "recording.wav", {
        type: "audio/wav",
      });
      onFileChange(recordedFile);
    });
  };

  const handleReRecord = () => {
    onFileChange(null);
    resetRecording();
  };

  if (isRecording) {
    return (
      <div className="flex flex-col rounded-2xl border overflow-hidden">
        <div ref={containerRef} className="w-full" />
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-[28px] leading-[1.2] font-semibold tracking-tight ">
            {formatTime(elapsedTime)}
          </p>
          <Button variant="destructive" size="sm" type="button" onClick={handleStop}>
            <Square className="size-5" />
            Stop
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center px-6 py-10 border rounded-2x border-destructive/50 bg-destructive/5">
        <p className="text-center text-sm text-destructive">{error}</p>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={resetRecording}
        >
          Try again
        </Button>
      </div>
    );
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4 ">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-muted">
          <FileAudio className="size-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
            {audioBlob && elapsedTime > 0 && ` - ${formatTime(elapsedTime)}`}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={togglePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handleReRecord}
          title="Record again"
        >
          <RotateCcw className="size-5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center cursor-pointer gap-4 rounded-2xl overflow-hidden border px-6 py-10",
        isInvalid && "border-destructive",
      )}
    >
      <div className="flex items-center justify-center rounded-xl size-12 bg-muted ">
        <Mic className="size-5 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1.5 items-center">
        <p className="text-base font-semibold tracking-tight">
          Record your voice
        </p>
        <p className="text-xs text-muted-foreground">
          Click record to start capturing audio
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={startRecording}
      >
        <Mic className="size-5" />
      </Button>
    </div>
  );
};
