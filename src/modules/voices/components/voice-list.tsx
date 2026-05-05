import { VoiceType } from "@/types/voice-type";
import { VoiceCard } from "./voice-card";
import { AudioLines, Mic, Volume2 } from "lucide-react";

interface Props {
  voices: VoiceType[];
  title: string;
}

export const VoiceList = ({ voices, title }: Props) => {
  if (!voices.length)
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="relative h-14 w-32 flex items-center justify-center ">
            <div className="absolute -rotate-30 left-0 rounded-full bg-muted p-4">
              <Volume2 className="size-5 text-muted-foreground" />
            </div>
            <div className="relative z-10 rounded-full bg-foreground p-4">
              <Mic className="size-5 text-muted-foreground" />
            </div>
            <div className="absolute rotate-30 right-0 rounded-full bg-muted p-4">
              <AudioLines className="size-5 text-muted-foreground" />
            </div>
          </div>
          <p className="text-lg font-semibold tracking-tight text-foreground">
            No voice yet
          </p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {title} will appear here
          </p>
        </div>
      </div>
    );
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {voices.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} />
        ))}
      </div>
    </div>
  );
};
