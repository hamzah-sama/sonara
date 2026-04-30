import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useVoiceContext } from "../contexts/voice-contexts";
import { ttsFormOptions } from "./text-to-speech-form";
import { useStore } from "@tanstack/react-form";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VoiceAvatar } from "@/components/avatar/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "@/modules/voices/data/voice-categories";

export const VoiceSelector = () => {
  const { customVoices, systemVoices, allVoices: voices } = useVoiceContext();
  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (state) => state.values.voiceId);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const selectedVoice = voices.find((voice) => voice.id === voiceId);
  const hasMissingSelectedVoices = Boolean(voiceId) && !selectedVoice;
  const currentVoice = selectedVoice
    ? selectedVoice
    : hasMissingSelectedVoices
      ? { id: voiceId, name: "unavailable voice", category: null as null }
      : voices[0];
  return (
    <Field>
      <FieldLabel>Voice Style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(value) => {
          form.setFieldValue("voiceId", value);
        }}
        disabled={isSubmitting}
      >
        <SelectTrigger className="w-full h-auto px4 py-2 rounde-lg bg-white gap-1">
          <SelectValue>
            {currentVoice && (
              <>
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span className="truncate text-sm font-medium tracking-tight">
                  {currentVoice.name}
                  {currentVoice.category &&
                    ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasMissingSelectedVoices && currentVoice && (
            <>
              <SelectGroup>
                <SelectLabel>Selected voice</SelectLabel>
                <SelectItem value={currentVoice.id}>
                  <VoiceAvatar
                    seed={currentVoice.id}
                    name={currentVoice.name}
                  />
                  <span className="truncate text-sm font-medium tracking-tight">
                    {currentVoice.name}
                    {currentVoice.category &&
                      ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                  </span>
                </SelectItem>
              </SelectGroup>
              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}

          {customVoices.length > 0 && (
            <>
              <SelectGroup>
                <SelectLabel>Team voices</SelectLabel>
                {customVoices.map((voice) => {
                  return (
                    <SelectItem key={voice.id} value={voice.id}>
                      <VoiceAvatar seed={voice.id} name={voice.name} />
                      <span className="truncate text-sm font-medium tracking-tight">
                        {voice.name} - {VOICE_CATEGORY_LABELS[voice.category]}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}

          {systemVoices.length > 0 && (
            <>
              <SelectGroup>
                <SelectLabel>Built-in voices</SelectLabel>
                {systemVoices.map((voice) => {
                  return (
                    <SelectItem key={voice.id} value={voice.id}>
                      <VoiceAvatar seed={voice.id} name={voice.name} />
                      <span className="truncate text-sm font-medium tracking-tight">
                        {voice.name} - {VOICE_CATEGORY_LABELS[voice.category]}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
};
