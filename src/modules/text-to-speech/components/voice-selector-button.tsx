import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { useVoiceContext } from "../contexts/voice-contexts";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { useStore } from "@tanstack/react-form";
import { ChevronDownIcon } from "lucide-react";
import { VoiceAvatar } from "@/components/avatar/voice-avatar";

export const VoiceSelectorButton = () => {
  const { allVoices } = useVoiceContext();
  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (state) => state.values.voiceId);

  const currentVoice =
    allVoices.find((voice) => voice.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice ? currentVoice.name : "Select Voice";
  return (
    <DrawerTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 justify-start px-2 gap-2"
      >
        {currentVoice && (
          <VoiceAvatar
            seed={currentVoice.id}
            name={currentVoice.name}
            className="size-6"
          />
        )}
        <span className="flex-1 truncate text-sm text-left font-medium">
          {buttonLabel}
        </span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </Button>
    </DrawerTrigger>
  );
};
