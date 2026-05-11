import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { Textarea } from "@/components/ui/textarea";
import { MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { useStore } from "@tanstack/react-form";
import { ttsFormOptions } from "../text-to-speech-form";
import { VoiceSelectorButton } from "../voice-selector-button";
import { GenerateButton } from "../button/generate-button";
import { PromptSuggestion } from "../prompt-suggestion";
import { FadeEffect } from "./fade-effect";
import { TextInputStats } from "./text-input-stats";
import { Drawersetting } from "../text-to-speech-panel/drawer-setting";
import { DrawerHistory } from "../text-to-speech-panel/drawer-history";

export const TextInputPanel = () => {
  const form = useTypedAppFormContext(ttsFormOptions);
  const text = useStore(form.store, (state) => state.values.text);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              placeholder="start typing or paste your text here..."
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="absolute inset-0 resize-none border-none bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed shadow-none tracking-tight focus-visible:ring-0 wrap-break-word"
              maxLength={MAX_TEXT_INPUT_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
        <FadeEffect />
      </div>
      <div className="shrink-0 p-4 lg:p-6"></div>

      {/* Mobile view */}
      <div className="flex flex-col gap-3 lg:hidden">
        <Drawersetting>
          <VoiceSelectorButton />
        </Drawersetting>
        <DrawerHistory />
        <GenerateButton
          size="sm"
          disabled={isSubmitting}
          onClick={form.handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Desktop view */}
      {text.length > 0 ? (
        <TextInputStats text={text}>
          <GenerateButton
            size="sm"
            disabled={isSubmitting}
            onClick={form.handleSubmit}
            isSubmitting={isSubmitting}
          />
        </TextInputStats>
      ) : (
        <div className="hidden lg:block">
          <PromptSuggestion
            onSelect={(prompt) => form.setFieldValue("text", prompt)}
          />
        </div>
      )}
    </div>
  );
};
