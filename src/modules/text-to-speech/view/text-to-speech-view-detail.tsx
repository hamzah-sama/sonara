"use client";

import { TextInputPanel } from "@/modules/text-to-speech/components/text-input-panel";
import { SettingPanel } from "../components/setting-panel";
import {
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { VoiceContextProvider } from "../contexts/voice-contexts";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQueries } from "@tanstack/react-query";

interface Props {
  generationId: string;
}

export const TextToSpeechViewDetail = ({ generationId }: Props) => {
  const trpc = useTRPC();
  const [generated, voices] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const data = generated.data;

  const { customVoices, systemVoices } = voices.data;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  const resolveVoiceId =
    data?.voiceId && allVoices.some((voice) => voice.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data?.text,
    voiceId: resolveVoiceId,
    temperature: data?.temperature,
    topP: data?.topP,
    topK: data?.topK,
    repetitionPenalty: data?.repetitionPenalty,
  };

  const generationVoice = {
    id: data?.voiceId ?? undefined,
    name: data?.voiceName,
  };

  return (
    <VoiceContextProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
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
