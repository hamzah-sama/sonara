import { Button } from "@/components/ui/button";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { cn, formatFileSize } from "@/lib/utils";
import { AudioLines, FileAudio, FolderOpen, Pause, Play, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface Props {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid: boolean;
}

export const UploadCard = ({ file, onFileChange, isInvalid }: Props) => {
  const { isPlaying, togglePlayPause } = useAudioPlayback(file);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "audio/*": [] },
      maxSize: 20 * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onFileChange(acceptedFiles[0]);
        }
      },
    });

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <div className="flex items-center justify-center bg-muted rounded-lg size-10">
          <FileAudio className="size-5 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>

        <Button
          variant="ghost"
          type="button"
          size="icon-sm"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon-sm"
          onClick={() => onFileChange(null)}
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col cursor-pointer gap-4 items-center justify-center rounded-2xl border px-6 py-10 overflow-hidden transition-colors",
        isDragActive || isInvalid
          ? "border-destructive"
          : isDragActive
            ? "border-primary"
            : "",
      )}
    >
      <input {...getInputProps()}/>
      <div className="flex items-center justify-center size-14 rounded-xl bg-muted">
        <AudioLines className="size-5 text-muted-foreground"/>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-medium tracking-tight">
          Upload your audio file here
        </p>
        <p className="text-xs text-muted-foreground">
          Support your audio format, max size 200MB
        </p>
      </div>

      <Button size='sm' variant='outline' type="button">
        <FolderOpen className="size-4"/>
        Upload file
      </Button>
    </div>
  );
};
