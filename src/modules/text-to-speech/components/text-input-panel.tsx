import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { Textarea } from "@/components/ui/textarea";
import { COST_PER_CHAR, MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { useStore } from "@tanstack/react-form";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import { PromptSuggestion } from "./prompt-suggestion";
import { SettingDrawer } from "./setting-drawer";
import { VoiceSelectorButton } from "./voice-selector-button";
import { DrawerHistory } from "./drawer-history";
import { GenerateButton } from "./button/generate-button";

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
        <div className="absolute inset-x-0 bottom-0 h-8 pointer-events-none bg-linear-to-t from-background to-transparent " />
      </div>
      <div className="shrink-0 p-4 lg:p-6"></div>

      {/* Mobile view */}
      <div className="flex flex-col gap-3 lg:hidden">
        <SettingDrawer>
          <VoiceSelectorButton />
        </SettingDrawer>
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
        <div className="lg:flex hidden items-center justify-between">
          <Badge variant="outline" className="border-dashed gap-1.5 p-2">
            <Coins className="size-3 text-chart-5" />
            {text.trim().length === 0 ? (
              "Start typing to estimate"
            ) : (
              <span className="tabular-nums">
                ${(text.length * COST_PER_CHAR).toFixed(4)} estimated
              </span>
            )}
          </Badge>
          <div className="flex items-center gap-3">
            <p className="tracking-tight text-xs">
              {text.length.toLocaleString("en-US")}
              <span className="text-xs text-muted-foreground">
                &nbsp;/&nbsp; {MAX_TEXT_INPUT_LENGTH.toLocaleString("en-US")}{" "}
                characters
              </span>
            </p>
            <GenerateButton
              size="sm"
              disabled={isSubmitting}
              onClick={form.handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
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
