"use client";

import { TextInputPanel } from "@/modules/text-to-speech/components/text-input-panel";
import { SettingPanel } from "../components/setting-panel";
import {
  defaultTTSValues,
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { VoiceContextProvider } from "../contexts/voice-contexts";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  initialValues?: Partial<TTSFormValues>;
}

export const TextToSpeechView = ({ initialValues }: Props) => {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());

  const { customVoices, systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  const resolveVoiceId =
    initialValues?.voiceId &&
    allVoices.some((voice) => voice.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolveVoiceId,
  };

  return (
    <VoiceContextProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <form className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex flex-col min-h-0 flex-1">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingPanel />
        </form>
      </TextToSpeechForm>
    </VoiceContextProvider>
  );
};
