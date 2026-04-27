"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { TextInputPanel } from "@/modules/dashboard/components/text-input-panel";
import { SettingPanel } from "../components/setting-panel";
import { ttsFormOptions } from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";

export const TextToSpeechView = () => {
  const form = useAppForm({
    ...ttsFormOptions,
    onSubmit: async () => {},
  });

  return (
    <form.AppForm>
      <form className="flex flex-1 overflow-hidden min-h-0">
        <div className="flex flex-col min-h-0 flex-1">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingPanel />
      </form>
    </form.AppForm>
  );
};
